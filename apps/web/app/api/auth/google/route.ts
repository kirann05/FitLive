import { db } from "@/lib/database";
import { authConfig, authCookie, CHALLENGE_COOKIE, SESSION_COOKIE, sameOrigin, requestOrigin } from "@/lib/auth/session";
import { cookieValue, randomToken, tokenHash, verifyGoogleToken } from "@/lib/auth/google";
export async function POST(req: Request) {
  try { sameOrigin(req); } catch { return Response.json({error:"Invalid request origin."},{status:403}); }
  try {
    const config=authConfig();
    if(config.mode!=="google" || !config.clientId) return Response.json({error:"Google sign-in is not configured."},{status:503});
    if(Number(req.headers.get("content-length")??0)>12000) return new Response(null,{status:413});
    const raw=await req.text();
    if(raw.length>12000) return new Response(null,{status:413});
    const {credential}=JSON.parse(raw);
    const challenge=cookieValue(req.headers.get("cookie"),CHALLENGE_COOKIE);
    if(typeof credential!=="string" || !challenge || !/^[a-f0-9]{64}$/.test(challenge)) throw new Error("Invalid login");
    const nonce=await tokenHash(challenge), now=Math.floor(Date.now()/1000);
    const exists=await db().prepare("SELECT hash FROM auth_challenges WHERE hash=? AND expires>?").bind(nonce,now).first();
    if(!exists) throw new Error("Expired login");
    const user=await verifyGoogleToken(credential,config.clientId,nonce);
    const consumed=await db().prepare("DELETE FROM auth_challenges WHERE hash=? AND expires>? RETURNING hash").bind(nonce,now).first();
    if(!consumed) throw new Error("Used login");
    const token=randomToken(), old=cookieValue(req.headers.get("cookie"),SESSION_COOKIE);
    await db().batch([
      db().prepare("DELETE FROM auth_sessions WHERE hash=?").bind(await tokenHash(old??"")),
      db().prepare("INSERT INTO auth_sessions(hash,owner,email,name,expires) VALUES(?,?,?,?,?)").bind(await tokenHash(token),user.owner,user.email,user.name,now+604800),
    ]);
    const response=Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});
    response.headers.append("Set-Cookie",authCookie(SESSION_COOKIE,token,604800,requestOrigin(req)));
    response.headers.append("Set-Cookie",authCookie(CHALLENGE_COOKIE,"",0,requestOrigin(req)));
    return response;
  } catch { return Response.json({error:"Sign-in could not be verified. Reload this page and try again."},{status:401,headers:{"Cache-Control":"no-store"}}); }
}
