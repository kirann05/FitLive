import { env } from "cloudflare:workers";
export function javaBackend() {
  const e = env as unknown as {
    JAVA_API_URL?: string;
    FITLIVE_BRIDGE_SECRET?: string;
  };
  if (!e.JAVA_API_URL) return null;
  const url = new URL(e.JAVA_API_URL);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    !e.FITLIVE_BRIDGE_SECRET ||
    e.FITLIVE_BRIDGE_SECRET.length < 32
  )
    throw new Error("Invalid Java backend configuration");
  return { url: url.origin, secret: e.FITLIVE_BRIDGE_SECRET };
}
const hex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
export async function javaRequest(
  user: string,
  path: string,
  method = "GET",
  body?: unknown,
) {
  const config = javaBackend();
  if (!config) throw new Error("Java backend not configured");
  if (!/^\/api\/(state|daily|devices|bootstrap)$/.test(path))
    throw new Error("Unknown backend route");
  const raw = body === undefined ? "" : JSON.stringify(body),
    timestamp = String(Math.floor(Date.now() / 1000));
  const digest = hex(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw)),
  );
  const canonical = [method, path, timestamp, user, digest].join("\n");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(config.secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = hex(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(canonical)),
  );
  const r = await fetch(config.url + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Fitlive-Owner": user,
      "X-Fitlive-Time": timestamp,
      "X-Fitlive-Signature": signature,
    },
    ...(body === undefined ? {} : { body: raw }),
    signal: AbortSignal.timeout(30000),
  });
  if (!r.ok)
    throw new Error(
      r.status === 409
        ? "CONFLICT"
        : r.status === 400
          ? "Invalid input or dietary policy conflict."
          : "Java backend unavailable",
    );
  return r.json();
}
