import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { apply, blank, type State } from "./domain";
export const db = () => {
  const d = (env as unknown as { DB?: D1Database }).DB;
  if (!d) throw new Error("Cloud storage is not configured.");
  return d;
};
export async function owner() {
  const u = await getChatGPTUser();
  return u?.userId ?? null;
}
export async function load(user: string) {
  const row = await db()
    .prepare("SELECT version,data FROM accounts WHERE owner=?")
    .bind(user)
    .first<{ version: number; data: string }>();
  return row
    ? { version: row.version, state: JSON.parse(row.data) as State }
    : { version: 0, state: blank() };
}
export async function mutate(
  user: string,
  command: unknown,
  id: string,
  version: number,
) {
  const d = db();
  const existing = await d
    .prepare("SELECT id FROM operations WHERE owner=? AND id=?")
    .bind(user, id)
    .first();
  if (existing) return load(user);
  const snapshot = await load(user);
  if (snapshot.version !== version) throw new Error("CONFLICT");
  const next = apply(snapshot.state, command, id, version);
  const now = new Date().toISOString();
  const results = await d.batch([
    d
      .prepare(
        "INSERT INTO accounts(owner,version,data,updated_at,last_operation) VALUES(?,?,?,?,?) ON CONFLICT(owner) DO UPDATE SET version=excluded.version,data=excluded.data,updated_at=excluded.updated_at,last_operation=excluded.last_operation WHERE accounts.version=? AND NOT EXISTS(SELECT 1 FROM operations WHERE owner=? AND id=?) RETURNING version",
      )
      .bind(
        user,
        version + 1,
        JSON.stringify(next),
        now,
        id,
        version,
        user,
        id,
      ),
    d
      .prepare(
        "INSERT OR IGNORE INTO operations(owner,id,created_at) SELECT ?,?,? WHERE EXISTS(SELECT 1 FROM accounts WHERE owner=? AND version=? AND last_operation=?)",
      )
      .bind(user, id, now, user, version + 1, id),
  ]);
  if (!results[0].results.length) {
    const replay = await d
      .prepare("SELECT id FROM operations WHERE owner=? AND id=?")
      .bind(user, id)
      .first();
    if (replay) return load(user);
    throw new Error("CONFLICT");
  }
  return { version: version + 1, state: next };
}
