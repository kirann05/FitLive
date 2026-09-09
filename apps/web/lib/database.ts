import { env } from "cloudflare:workers";
export function db() {
  const database = (env as unknown as { DB?: D1Database }).DB;
  if (!database) throw new Error("Cloud storage is not configured.");
  return database;
}
