import { javaBackend, javaRequest } from "./java-backend";
import { currentUser } from "./auth/session";
import { db } from "./database";
import { generateCoach } from "./ai/runtime";
import { apply, blank, type State } from "./domain";
export { db } from "./database";
export async function owner() {
  const user = await currentUser();
  return user?.userId ?? null;
}
export async function load(user: string) {
  if (javaBackend()) {
    const current = (await javaRequest(user, "/api/state")) as {
      version: number;
      state: State;
    };
    if (current.version === 0) {
      const legacy = await db()
        .prepare("SELECT version,data FROM accounts WHERE owner=?")
        .bind(user)
        .first<{ version: number; data: string }>();
      if (legacy)
        return (await javaRequest(user, "/api/bootstrap", "POST", {
          version: legacy.version,
          state: JSON.parse(legacy.data),
        })) as { version: number; state: State };
    }
    return current;
  }
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
  if (javaBackend()) {
    const snapshot = await load(user);
    const c = command as { type?: string; message?: string };
    const generated =
      c.type === "chat" && c.message
        ? await generateCoach(snapshot.state, c.message)
        : undefined;
    const result = (await javaRequest(user, "/api/state", "POST", {
      id,
      version,
      command,
      generated,
    })) as { version: number; state: State };
    if (c.type === "delete") {
      await db().batch([
        db()
          .prepare(
            "UPDATE accounts SET data=?,version=?,last_operation=?,updated_at=? WHERE owner=?",
          )
          .bind(
            JSON.stringify(result.state),
            result.version,
            id,
            new Date().toISOString(),
            user,
          ),
        db().prepare("DELETE FROM device_tokens WHERE owner=?").bind(user),
        db().prepare("DELETE FROM operations WHERE owner=?").bind(user),
        db().prepare("DELETE FROM auth_sessions WHERE owner=?").bind(user),
      ]);
    }
    return result;
  }
  const d = db();
  const existing = await d
    .prepare("SELECT id FROM operations WHERE owner=? AND id=?")
    .bind(user, id)
    .first();
  if (existing) return load(user);
  const snapshot = await load(user);
  if (snapshot.version !== version) throw new Error("CONFLICT");
  const chat = command as { type?: string; message?: string };
  const generated =
    chat.type === "chat" && typeof chat.message === "string"
      ? await generateCoach(snapshot.state, chat.message)
      : undefined;
  const next = apply(
    snapshot.state,
    command,
    id,
    version,
    new Date(),
    generated,
  );
  if (JSON.stringify(next).length > 2000000)
    throw new Error("Account storage limit reached; export older records.");
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
