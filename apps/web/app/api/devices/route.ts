import { db, owner } from "@/lib/storage";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const u = await owner();
  if (!u) return Response.json({ error: "Sign in required." }, { status: 401 });
  if (req.headers.get("origin") !== new URL(req.url).origin)
    return Response.json({ error: "Invalid origin." }, { status: 403 });
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
  await db().prepare("DELETE FROM device_tokens WHERE owner=?").bind(u).run();
  return Response.json({ revoked: true });
}
