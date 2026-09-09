import assert from "node:assert/strict";
const base = process.env.FITLIVE_TEST_URL ?? "http://localhost:5173";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname))
  throw new Error(
    "This destructive fixture test is limited to local previews.",
  );
const signIn = await fetch(base + "/signin-with-chatgpt?return_to=/", {
  redirect: "manual",
});
const cookie = signIn.headers.get("set-cookie")?.split(";")[0];
assert.ok(cookie, "local preview sign-in cookie");
const request = async (path, body, auth = true) => {
  const r = await fetch(base + path, {
    method: body ? "POST" : "GET",
    headers: {
      ...(auth ? { cookie } : {}),
      origin: base,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: r.status, data: await r.json() };
};
assert.equal((await request("/api/state", null, false)).status, 401);
let current = (await request("/api/state")).data;
const command = async (c, id = crypto.randomUUID(), v = current.version) => {
  const result = await request("/api/state", { command: c, id, version: v });
  if (result.status === 200) current = result.data;
  return result;
};
assert.equal((await command({ type: "mode", mode: "demo" })).status, 200);
const initialMeals = current.state.meals.length;
const version = current.version;
const id = crypto.randomUUID();
const food = current.state.meals[0].food;
const cmd = { type: "meal", food, grams: 100 };
assert.equal((await command(cmd, id, version)).status, 200);
assert.equal((await command(cmd, id, version)).status, 200);
assert.equal(
  current.state.meals.length,
  initialMeals + 1,
  "replay must not double-save",
);
assert.equal(
  (
    await command(
      { type: "checkin", energy: 3, soreness: 2, motivation: 4, note: "" },
      crypto.randomUUID(),
      version,
    )
  ).status,
  409,
);
assert.equal(
  (
    await command({
      type: "checkin",
      energy: 7,
      soreness: 2,
      motivation: 4,
      note: "",
    })
  ).status,
  400,
);
assert.equal(
  (
    await command({
      type: "checkin",
      energy: 3,
      soreness: 2,
      motivation: 4,
      note: "Integration fixture",
    })
  ).status,
  200,
);
assert.equal(
  (
    await command({
      type: "workout",
      sets: [1, 2, 3].map(() => ({
        exercise: "Goblet squat",
        muscle: "Quads",
        reps: 12,
        load: 25,
        rpe: 8,
      })),
      effort: "About right",
      status: "completed",
    })
  ).status,
  200,
);
assert.equal((await command({ type: "grocery-generate" })).status, 200);
assert.ok(current.state.grocery.length);
assert.equal(
  (
    await command({
      type: "feedback",
      feedback: "rejected",
      note: "Rest today",
    })
  ).status,
  200,
);
assert.equal(current.state.audit.at(-1).feedback, "rejected");
assert.equal(
  (await request("/api/health/sync", { samples: [] }, false)).status,
  401,
);
const beforeDelete = current.version,
  deletion = crypto.randomUUID();
assert.equal(
  (
    await command(
      { type: "delete", confirmation: "DELETE" },
      deletion,
      beforeDelete,
    )
  ).status,
  200,
);
assert.equal(
  (
    await command(
      { type: "delete", confirmation: "DELETE" },
      deletion,
      beforeDelete,
    )
  ).status,
  200,
);
assert.equal(
  (await command(cmd, id, version)).status,
  409,
  "pre-deletion saves cannot resurrect data",
);
assert.equal(current.state.workouts.length, 0);
assert.equal(current.state.meals.length, 0);
assert.equal(current.state.health.length, 0);
console.log(
  "PASS: sign-in, unauthorized access, cloud save, idempotent replay, conflict rejection, validation, workout, grocery, feedback, device authorization, deletion.",
);
