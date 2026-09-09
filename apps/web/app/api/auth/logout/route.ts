import { db } from "@/lib/database";
import { SESSION_COOKIE, authCookie, sameOrigin, requestOrigin } from "@/lib/auth/session";
import { cookieValue, tokenHash } from "@/lib/auth/google";
export async function POST(req: Request) {
  try { sameOrigin(req); } catch { return new Response(null,{status:403}); }
  const token=cookieValue(req.headers.get("cookie"),SESSION_COOKIE);
  if(token) await db().prepare("DELETE FROM auth_sessions WHERE hash=?").bind(await tokenHash(token)).run();
  return Response.json({ok:true},{headers:{"Cache-Control":"no-store","Set-Cookie":authCookie(SESSION_COOKIE,"",0,requestOrigin(req))}});
}
