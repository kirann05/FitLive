import test from "node:test";
import assert from "node:assert/strict";
import {
  seed,
  apply,
  plan,
  recommendation,
  foods,
  totals,
} from "../lib/domain.ts";
import {
  mealCandidates,
  recipeDetails,
  recipes,
  shoppingNeeds,
} from "../lib/planning.ts";
const now = new Date("2026-09-09T15:00:00Z");
test("custom schedules preserve rest days and configured progression", () => {
  let s = seed(now);
  s.workouts = [];
  s.health = [];
  s.checkins = [];
  s = apply(
    s,
    {
      type: "program",
      program: {
        name: "Personal",
        weekdays: [1, 5],
        sessions: [
          {
            name: "Strength",
            exercises: [
              {
                name: "Squat",
                muscle: "Quads",
                sets: 2,
                minReps: 5,
                maxReps: 8,
                load: 25,
                increment: 1,
              },
            ],
          },
        ],
      },
    },
    "p",
    0,
    now,
  );
  assert.equal(recommendation(s, now).target, "Today");
  assert.equal(plan(s, now)[0].reps, "5–8");
  s = apply(
    s,
    {
      type: "workout",
      sets: [1, 2].map(() => ({
        exercise: "Squat",
        muscle: "Quads",
        reps: 8,
        load: 25,
        rpe: 8,
      })),
      effort: "About right",
      status: "completed",
    },
    "w",
    1,
    now,
  );
  assert.equal(plan(s, now)[0].load, 26);
});
test("recipe portions add exact nutrients and deduct pantry atomically", () => {
  const s = seed(now),
    r = recipes(s)[0],
    detail = recipeDetails(s, r),
    before = totals(s, "2026-09-09");
  const next = apply(
    s,
    { type: "log-recipe", id: r.id, deductPantry: false },
    "recipe",
    0,
    now,
  );
  assert.ok(
    Math.abs(
      totals(next, "2026-09-09").protein -
        before.protein -
        detail.total.protein,
    ) < 1e-8,
  );
  const empty = structuredClone(s);
  empty.pantry = [];
  assert.throws(
    () =>
      apply(
        empty,
        { type: "log-recipe", id: r.id, deductPantry: true },
        "bad",
        0,
        now,
      ),
    /pantry/,
  );
  assert.equal(empty.meals.length, s.meals.length);
});
test("recipe dietary exclusions and negative feedback remove candidates", () => {
  const s = seed(now);
  s.profile.diet = "vegan";
  assert.ok(
    mealCandidates(s).every((r) => r.items.every((i) => i.food?.vegan)),
  );
  const candidate = mealCandidates(s)[0];
  assert.ok(candidate);
  const next = apply(
    s,
    { type: "recipe-rating", id: candidate.recipe.id, rating: -1 },
    "r",
    0,
    now,
  );
  assert.ok(
    !mealCandidates(next).some((r) => r.recipe.id === candidate.recipe.id),
  );
});
test("shopping list sums repeated planned portions before subtracting pantry", () => {
  let s = seed(now);
  const recipe = recipes(s)[0];
  s.pantry = [];
  for (const id of ["a", "b"])
    s = apply(
      s,
      { type: "plan-meal", id, recipeId: recipe.id, date: "2026-09-10" },
      id,
      0,
      now,
    );
  assert.equal(
    shoppingNeeds(s, "2026-09-09").find((n) => n.id === recipe.items[0].foodId)
      ?.quantity,
    recipe.items[0].grams * 2,
  );
});
test("invalid calendar dates and duplicate recipe ingredients are rejected", () => {
  assert.throws(() =>
    apply(
      seed(now),
      {
        type: "plan-meal",
        id: "a",
        recipeId: "demo-breakfast-bowl",
        date: "2026-02-30",
      },
      "x",
      0,
      now,
    ),
  );
  assert.throws(() =>
    apply(
      seed(now),
      {
        type: "recipe",
        recipe: {
          id: "r",
          name: "Repeated",
          items: [1, 2].map(() => ({ foodId: foods[0].id, grams: 100 })),
          instructions: "",
          rating: 0,
        },
      },
      "x",
      0,
      now,
    ),
  );
});
test("an offline workout retains its performed date and future dates fail", () => {
  const command = {
    type: "workout",
    date: "2026-09-08",
    sets: [{ exercise: "Squat", muscle: "Quads", load: 20, reps: 10, rpe: 7 }],
    effort: "About right",
    status: "completed",
  };
  assert.equal(
    apply(seed(now), command, "offline", 0, now).workouts.at(-1)?.date,
    "2026-09-08",
  );
  assert.throws(
    () =>
      apply(seed(now), { ...command, date: "2026-09-10" }, "future", 0, now),
    /future/,
  );
});
test("account transfer validates the complete persisted schema", async () => {
  const { validateSnapshot, blank } = await import("../lib/domain.ts");
  assert.deepEqual(validateSnapshot(seed(now)), seed(now));
  assert.deepEqual(validateSnapshot(blank()), blank());
  assert.throws(() =>
    validateSnapshot({ ...seed(now), health: [{ sleep: -1 }] }),
  );
});
