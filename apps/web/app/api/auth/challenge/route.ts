import { limit } from "@/lib/limits";
import { db } from "@/lib/database";
import { authConfig, authCookie, CHALLENGE_COOKIE, requestOrigin } from "@/lib/auth/session";
import { randomToken, tokenHash } from "@/lib/auth/google";
export async function GET(req: Request) {
  try {
    const config = authConfig();
    const origin = requestOrigin(req);
    if (config.mode !== "google" || !config.clientId) return Response.json({error:"Google sign-in is not configured."},{status:503});
    const fetchSite=req.headers.get("sec-fetch-site");
    if(fetchSite && fetchSite!=="same-origin" && fetchSite!=="none") return Response.json({error:"Invalid request origin."},{status:403});
    await limit("auth:" + await tokenHash(req.headers.get("cf-connecting-ip") ?? "local"), "login", 30, 600);
    const token = randomToken(), nonce = await tokenHash(token), now = Math.floor(Date.now()/1000);
    await db().batch([
      db().prepare("DELETE FROM auth_challenges WHERE expires<?").bind(now),
      db().prepare("DELETE FROM auth_sessions WHERE expires<?").bind(now),
      db().prepare("INSERT INTO auth_challenges(hash,expires) VALUES(?,?)").bind(nonce,now+600),
    ]);
    return Response.json({nonce,clientId:config.clientId},{headers:{"Cache-Control":"no-store","Set-Cookie":authCookie(CHALLENGE_COOKIE,token,600,origin)}});
  } catch { return Response.json({error:"Sign-in is temporarily unavailable."},{status:503}); }
}
