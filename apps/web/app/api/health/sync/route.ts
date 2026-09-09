import { db, load, mutate } from "@/lib/storage";
import { commandSchema } from "@/lib/domain";
export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!token || token.length > 200)
      return Response.json(
        { error: "Device authorization required." },
        { status: 401 },
      );
    const hash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)),
      ),
    )
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
    const device = await db()
      .prepare("SELECT owner FROM device_tokens WHERE hash=? AND expires>?")
      .bind(hash, new Date().toISOString())
      .first<{ owner: string }>();
    if (!device)
      return Response.json(
        { error: "Device token expired or revoked." },
        { status: 401 },
      );
    const raw = await req.text();
    if (raw.length > 100000)
      return Response.json({ error: "Batch too large." }, { status: 413 });
    const input = JSON.parse(raw);
    const command = commandSchema.parse({
      type: "health",
      samples: input.samples,
    });
    if (
      command.type !== "health" ||
      command.samples.some((x) => x.source !== "HealthKit")
    )
      return Response.json(
        { error: "HealthKit summaries required." },
        { status: 400 },
      );
    const snapshot = await load(device.owner);
    if (snapshot.state.mode !== "real" || !snapshot.state.profile.consent)
      return Response.json(
        { error: "Set up and consent to a real workspace first." },
        { status: 409 },
      );
    const digest = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(
            JSON.stringify(command.samples.map((x) => ({ ...x, syncAt: "" }))),
          ),
        ),
      ),
    )
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
    const result = await mutate(
      device.owner,
      command,
      "health-" + digest,
      snapshot.version,
    );
    return Response.json(
      { saved: true, version: result.version, samples: command.samples.length },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return Response.json(
      {
        error:
          e instanceof Error && e.message === "CONFLICT"
            ? "Please retry this batch."
            : "Invalid health batch or storage unavailable.",
      },
      { status: e instanceof Error && e.message === "CONFLICT" ? 409 : 400 },
    );
  }
}
