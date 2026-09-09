import { z } from "zod";
import { db, load, mutate, owner } from "@/lib/storage";
import { commandSchema } from "@/lib/domain";
export const dynamic = "force-dynamic";
const response = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function GET() {
  try {
    const u = await owner();
    if (!u) return response({ error: "Please sign in to continue." }, 401);
    return response(await load(u));
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
    if (body.command.type === "delete") {
      await db().batch([
        db().prepare("DELETE FROM operations WHERE owner=?").bind(u),
        db().prepare("DELETE FROM accounts WHERE owner=?").bind(u),
        db().prepare("DELETE FROM device_tokens WHERE owner=?").bind(u),
      ]);
      return response(await load(u));
    }
    return response(await mutate(u, body.command, body.id, body.version));
  } catch (e) {
    const message = e instanceof Error ? e.message : "";
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
      /dietary|pantry|matching|future|Conflicting|verified food/.test(message)
    )
      return response({ error: message }, 400);
    return response(
      { error: "Could not save. Your input is still here; please retry." },
      503,
    );
  }
}
