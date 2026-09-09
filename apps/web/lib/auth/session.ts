import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { db } from "../database";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { cookieValue, tokenHash } from "./google";
export const SESSION_COOKIE = "fitlive_session";
export const CHALLENGE_COOKIE = "fitlive_login";
export function authConfig() {
  const config = env as unknown as { AUTH_MODE?: string; GOOGLE_CLIENT_ID?: string; APP_ORIGIN?: string };
  const mode = config.AUTH_MODE ?? "platform";
  if (mode !== "platform" && mode !== "google") throw new Error("Invalid authentication configuration");
  return { mode: mode as "platform" | "google", clientId: config.GOOGLE_CLIENT_ID ?? "", origin: config.APP_ORIGIN ?? "" };
}
export function requestOrigin(req: Request) {
  const { origin } = authConfig();
  if (!origin || new URL(origin).origin !== origin || new URL(req.url).origin !== origin) throw new Error("Invalid application origin");
  if (!origin.startsWith("https://") && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) throw new Error("HTTPS required");
  return origin;
}
export function sameOrigin(req: Request) {
  const origin = requestOrigin(req);
  if (req.headers.get("origin") !== origin) throw new Error("Invalid request origin");
}
export function authCookie(name: string, value: string, maxAge: number, origin: string) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${origin.startsWith("https://") ? "; Secure" : ""}`;
}
export async function currentUser() {
  if (authConfig().mode === "platform") return getChatGPTUser();
  const token = cookieValue((await headers()).get("cookie"), SESSION_COOKIE);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const session = await db().prepare("SELECT owner,email,name FROM auth_sessions WHERE hash=? AND expires>?").bind(await tokenHash(token), Math.floor(Date.now()/1000)).first<{owner:string;email:string;name:string}>();
  return session ? { userId: session.owner, email: session.email, displayName: session.name, fullName: session.name } : null;
}
