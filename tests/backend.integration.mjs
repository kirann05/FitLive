import assert from "node:assert/strict";
import { createHmac, createHash, randomUUID } from "node:crypto";
const base = process.env.FITLIVE_JAVA_TEST_URL ?? "http://localhost:58080";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname))
  throw new Error(
    "Only run this destructive fixture against a local test service",
  );
const secret =
  process.env.FITLIVE_TEST_BRIDGE_SECRET ??
  "fixture-bridge-secret-at-least-32-characters";
const owner = "container-" + randomUUID();
async function request(path, { body, token, bridge = false } = {}) {
  const method = body ? "POST" : "GET",
    raw = body ? JSON.stringify(body) : "",
    time = String(Math.floor(Date.now() / 1000));
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = "Bearer " + token;
  if (bridge) {
    headers["X-Fitlive-Owner"] = owner;
    headers["X-Fitlive-Time"] = time;
    headers["X-Fitlive-Signature"] = createHmac("sha256", secret)
      .update(
        [
          method,
          path,
          time,
          owner,
          createHash("sha256").update(raw).digest("hex"),
        ].join("\n"),
      )
      .digest("hex");
  }
  const response = await fetch(base + path, {
    method,
    headers,
    ...(body ? { body: raw } : {}),
  });
  const text = await response.text();
  return { status: response.status, data: text ? JSON.parse(text) : null };
}
assert.equal((await request("/actuator/health")).status, 200);
assert.equal((await request("/api/state")).status, 401);
let snapshot = (await request("/api/state", { bridge: true })).data;
const profile = {
  name: "Container fixture",
  diet: "vegan",
  allergies: [],
  dislikes: [],
  goal: "Maintain fitness",
  days: 3,
  equipment: "Bodyweight",
  protein: 100,
  calories: 2000,
  timezone: "UTC",
  consent: true,
};
const first = {
  id: randomUUID(),
  version: snapshot.version,
  command: { type: "profile", profile },
};
const created = await request("/api/state", { bridge: true, body: first });
assert.equal(created.status, 200);
snapshot = created.data;
assert.equal(
  (await request("/api/state", { bridge: true, body: first })).data.version,
  snapshot.version,
);
const paired = await request("/api/devices", { bridge: true, body: {} });
assert.equal(paired.status, 200);
const token = paired.data.token;
assert.equal(
  (await request("/api/state", { token })).data.state.profile.name,
  profile.name,
);
const results = await Promise.all(
  [1, 2].map((energy) =>
    request("/api/state", {
      token,
      body: {
        id: randomUUID(),
        version: snapshot.version,
        command: {
          type: "checkin",
          energy,
          soreness: 2,
          motivation: 3,
          note: "race fixture",
        },
      },
    }),
  ),
);
assert.deepEqual(results.map((r) => r.status).sort(), [200, 409]);
snapshot = results.find((r) => r.status === 200).data;
assert.equal((await request("/api/daily", { token })).status, 200);
const removed = await request("/api/state", {
  token,
  body: {
    id: randomUUID(),
    version: snapshot.version,
    command: { type: "delete", confirmation: "DELETE" },
  },
});
assert.equal(removed.status, 200);
assert.equal(removed.data.state.checkins.length, 0);
assert.equal((await request("/api/state", { token })).status, 401);
assert.equal(
  (await request("/api/state", { bridge: true, body: first })).status,
  409,
);
console.log(
  "PASS: packaged container health, signed account creation, replay, pairing, concurrent-write conflict, daily policy, deletion, revocation and stale-write rejection.",
);
