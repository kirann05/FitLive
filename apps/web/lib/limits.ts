import { db } from "./database";
export async function limit(
  owner: string,
  action: string,
  max: number,
  seconds = 60,
) {
  const now = Math.floor(Date.now() / 1000),
    window = Math.floor(now / seconds);
  const bucket = action + ":" + window;
  const row = await db()
    .prepare(
      "INSERT INTO rate_limits(owner,bucket,count,expires) VALUES(?,?,1,?) ON CONFLICT(owner,bucket) DO UPDATE SET count=count+1 WHERE count<? RETURNING count",
    )
    .bind(owner, bucket, (window + 1) * seconds, max)
    .first();
  await db()
    .prepare("DELETE FROM rate_limits WHERE owner=? AND expires<?")
    .bind(owner, now - 86400)
    .run();
  if (!row) throw new Error("RATE_LIMIT");
}
