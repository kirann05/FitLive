import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";
const googleKeys = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));
export async function verifyGoogleToken(token: string, clientId: string, nonce: string, keys: JWTVerifyGetKey = googleKeys) {
  const { payload } = await jwtVerify(token, keys, {
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: clientId,
    algorithms: ["RS256"],
    requiredClaims: ["sub", "exp", "iat", "nonce"],
    maxTokenAge: "10 minutes",
    clockTolerance: 5,
  });
  if (payload.nonce !== nonce || typeof payload.sub !== "string" || !/^[a-zA-Z0-9_-]{1,255}$/.test(payload.sub)) throw new Error("Invalid Google identity");
  if (payload.email_verified !== true || typeof payload.email !== "string" || payload.email.length > 320) throw new Error("A verified Google account is required");
  return { owner: "google:" + payload.sub, email: payload.email, name: typeof payload.name === "string" ? payload.name.slice(0, 120) : payload.email };
}
export function randomToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, "0")).join("");
}
export async function tokenHash(value: string) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))), n => n.toString(16).padStart(2, "0")).join("");
}
export function cookieValue(raw: string | null, name: string) {
  const values = (raw ?? "").split(";").map(x => x.trim()).filter(x => x.startsWith(name + "="));
  return values.length === 1 ? values[0].slice(name.length + 1) : null;
}
