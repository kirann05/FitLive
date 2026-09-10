import { limit } from "@/lib/limits";
import { javaBackend } from "@/lib/java-backend";
import { z } from "zod";
import { db, load, mutate, owner } from "@/lib/storage";
import { commandSchema, apply } from "@/lib/domain";
export const dynamic = "force-dynamic";
const response = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function GET() {
  try {
    const u = await owner();
    if (!u) return response({ error: "Please sign in to continue." }, 401);
    return response({...(await load(u)),ownerId:u});
  } catch {
    return response(
      { error: "Your saved data is temporarily unavailable. Please retry." },
      503,
    );
  }
}
export async function POST(req: Request) {
  try {
    const u = await owner();
    if (!u) return response({ error: "Please sign in to continue." }, 401);
    if(req.headers.has("X-FitLive-Owner") && req.headers.get("X-FitLive-Owner") !== u) return response({error:"Account changed. Reload before saving."},403);
    const origin = req.headers.get("origin");
    if (origin && origin !== new URL(req.url).origin)
      return response({ error: "Invalid request origin." }, 403);
    if (Number(req.headers.get("content-length") ?? 0) > 200000)
      return response({ error: "Request is too large." }, 413);
    const raw = await req.text();
    if (raw.length > 200000)
      return response({ error: "Request is too large." }, 413);
    const body = z
      .object({
        id: z.string().uuid(),
        version: z.number().int().nonnegative(),
        command: commandSchema,
      })
      .parse(JSON.parse(raw));
    await limit(u, "mutations", 120);
    if (body.command.type === "chat") {
      await limit(u, "coach", 8);
      await limit(u, "coach-day", 100, 86400);
    }
    if (body.command.type === "delete" && !javaBackend()) {
      const previous = await db()
        .prepare("SELECT id FROM operations WHERE owner=? AND id=?")
        .bind(u, body.id)
        .first();
      if (previous) return response(await load(u));
      const snapshot = await load(u);
      if (snapshot.version !== body.version) throw new Error("CONFLICT");
      const blankState = apply(
        snapshot.state,
        body.command,
        body.id,
        body.version,
      );
      const results = await db().batch([
        db()
          .prepare(
            "INSERT INTO accounts(owner,version,data,updated_at,last_operation) VALUES(?,?,?,?,?) ON CONFLICT(owner) DO UPDATE SET data=excluded.data,version=excluded.version,last_operation=excluded.last_operation,updated_at=excluded.updated_at WHERE accounts.version=? RETURNING version",
          )
          .bind(
            u,
            body.version + 1,
            JSON.stringify(blankState),
            new Date().toISOString(),
            body.id,
            body.version,
          ),
        db()
          .prepare(
            "DELETE FROM operations WHERE owner=? AND EXISTS(SELECT 1 FROM accounts WHERE owner=? AND last_operation=?)",
          )
          .bind(u, u, body.id),
        db()
          .prepare(
            "DELETE FROM device_tokens WHERE owner=? AND EXISTS(SELECT 1 FROM accounts WHERE owner=? AND last_operation=?)",
          )
          .bind(u, u, body.id),
        db().prepare("DELETE FROM auth_sessions WHERE owner=? AND EXISTS(SELECT 1 FROM accounts WHERE owner=? AND last_operation=?)").bind(u,u,body.id),
        db()
          .prepare(
            "INSERT OR IGNORE INTO operations(owner,id,created_at) SELECT ?,?,? WHERE EXISTS(SELECT 1 FROM accounts WHERE owner=? AND last_operation=?)",
          )
          .bind(u, body.id, new Date().toISOString(), u, body.id),
      ]);
      if (!results[0].results.length) throw new Error("CONFLICT");
      return response(await load(u));
    }
    return response(await mutate(u, body.command, body.id, body.version));
  } catch (e) {
    const message = e instanceof Error ? e.message : "";
    if (message === "RATE_LIMIT")
      return response(
        { error: "Please pause briefly before trying again." },
        429,
      );
    if (message === "CONFLICT")
      return response(
        {
          error: "Your data changed in another session. Reload and try again.",
        },
        409,
      );
    if (e instanceof z.ZodError)
      return response(
        {
          error: "Please check your input.",
          fields: e.issues.map((x) => x.path.join(".")),
        },
        400,
      );
    if (
      /dietary|pantry|matching|future|Conflicting|verified food|Cart changed|weekly budget|duplicate foods/.test(message)
    )
      return response({ error: message }, 400);
    return response(
      { error: "Could not save. Your input is still here; please retry." },
      503,
    );
  }
}
