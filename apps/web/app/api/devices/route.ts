import { javaBackend, javaRequest } from "@/lib/java-backend";
import { db, owner, load } from "@/lib/storage";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const u = await owner();
  if (!u) return Response.json({ error: "Sign in required." }, { status: 401 });
  if (req.headers.get("origin") !== new URL(req.url).origin)
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (javaBackend()) {
    const result = (await javaRequest(u, "/api/devices", "POST", {})) as object;
    return Response.json(
      { ...result, endpoint: javaBackend()!.url },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
  const token = crypto.randomUUID() + crypto.randomUUID();
  const hash = Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)),
    ),
  )
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
  const expires = new Date(Date.now() + 90 * 86400000).toISOString();
  await db().batch([
    db().prepare("DELETE FROM device_tokens WHERE owner=?").bind(u),
    db()
      .prepare("INSERT INTO device_tokens(hash,owner,expires) VALUES(?,?,?)")
      .bind(hash, u, expires),
  ]);
  return Response.json(
    {
      token,
      expires,
      endpoint: new URL("/api/health/sync", req.url).toString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function DELETE(req: Request) {
  const u = await owner();
  if (!u) return Response.json({ error: "Sign in required." }, { status: 401 });
  if (req.headers.get("origin") !== new URL(req.url).origin)
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (javaBackend()) {
    return Response.json(await javaRequest(u, "/api/devices", "DELETE"));
  }
  await db().prepare("DELETE FROM device_tokens WHERE owner=?").bind(u).run();
  return Response.json({ revoked: true });
}

export async function GET(){
 const u=await owner();if(!u)return Response.json({error:"Sign in required."},{status:401});
 try{
 const active=javaBackend()?((await javaRequest(u,"/api/devices","GET")) as {active:boolean}).active:!!await db().prepare("SELECT 1 FROM device_tokens WHERE owner=? AND expires>?").bind(u,new Date().toISOString()).first();
 const {state}=await load(u);const latest=[...state.health].filter(h=>h.source==="HealthKit").sort((a,b)=>b.syncAt.localeCompare(a.syncAt))[0];
 return Response.json({active,lastSync:latest?.syncAt??null,readableTypes:latest?.readableTypes??[]},{headers:{"Cache-Control":"no-store"}});
 }catch{return Response.json({error:"Connection status unavailable."},{status:503});}
}
