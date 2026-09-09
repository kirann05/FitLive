import { z } from "zod";
import { allowed, foods, dateKey, type State, type Food } from "./domain.ts";
export type Prescription = {
  name: string;
  muscle: string;
  sets: number;
  minReps: number;
  maxReps: number;
  load: number;
  increment: number;
};
export type Program = {
  name: string;
  weekdays: number[];
  sessions: { name: string; exercises: Prescription[] }[];
};
export type Recipe = {
  id: string;
  name: string;
  items: { foodId: string; grams: number }[];
  instructions: string;
  rating: number;
};
export type PlannedMeal = { id: string; date: string; recipeId: string };
export type Preferences = {
  aiConsent: boolean;
  theme: "light" | "dark";
  weeklyBudget: number;
  notifications: boolean;
};
const prescription = z
  .object({
    name: z.string().min(1).max(100),
    muscle: z.string().min(1).max(40),
    sets: z.number().int().min(1).max(6),
    minReps: z.number().int().min(1).max(30),
    maxReps: z.number().int().min(1).max(30),
    load: z.number().min(0).max(300),
    increment: z.number().min(0.5).max(5),
  })
  .refine((x) => x.maxReps >= x.minReps, "Rep range must be ordered");
export const programSchema = z.object({
  name: z.string().min(1).max(80),
  weekdays: z
    .array(z.number().int().min(0).max(6))
    .min(1)
    .max(7)
    .refine(
      (days) => new Set(days).size === days.length,
      "Choose each weekday once",
    ),
  sessions: z
    .array(
      z.object({
        name: z.string().min(1).max(80),
        exercises: z.array(prescription).min(1).max(10),
      }),
    )
    .min(1)
    .max(7),
});
export const recipeSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  items: z
    .array(
      z.object({
        foodId: z.string().min(1).max(100),
        grams: z.number().min(1).max(2000),
      }),
    )
    .min(1)
    .max(15)
    .refine(
      (items) => new Set(items.map((i) => i.foodId)).size === items.length,
      "Combine duplicate ingredients",
    ),
  instructions: z.string().max(2000),
  rating: z.number().int().min(-1).max(1),
});
export const preferencesSchema = z.object({
  aiConsent: z.boolean(),
  theme: z.enum(["light", "dark"]),
  weeklyBudget: z.number().min(0).max(10000),
  notifications: z.boolean(),
});
export function defaults(): Preferences {
  return {
    aiConsent: false,
    theme: "light",
    weeklyBudget: 100,
    notifications: false,
  };
}
export function foodLibrary(s: State): Food[] {
  const records = [
    ...(s.mode === "demo" ? foods : []),
    ...s.meals.map((m) => m.food),
    ...(s.savedFoods ?? []),
  ];
  return [...new Map(records.map((f) => [f.id, f])).values()];
}
export function recipes(s: State): Recipe[] {
  if (s.recipes?.length) return s.recipes;
  return s.mode === "demo"
    ? [
        {
          id: "demo-breakfast-bowl",
          name: "Yogurt, oats & berries",
          items: [
            { foodId: "sample-yogurt", grams: 200 },
            { foodId: "sample-oats", grams: 50 },
            { foodId: "sample-berries", grams: 80 },
          ],
          instructions:
            "Stir the oats into the yogurt. Add berries, and adjust the portion to your appetite.",
          rating: 0,
        },
        {
          id: "demo-tofu-bowl",
          name: "Tofu & brown rice bowl",
          items: [
            { foodId: "sample-tofu", grams: 180 },
            { foodId: "sample-rice", grams: 150 },
          ],
          instructions:
            "Warm the cooked rice and prepare tofu as preferred. Any oil or sauces should be logged separately.",
          rating: 0,
        },
      ]
    : [];
}
export function recipeDetails(s: State, recipe: Recipe) {
  const library = foodLibrary(s);
  const items = recipe.items.map((i) => ({
    ...i,
    food: library.find((f) => f.id === i.foodId),
  }));
  const valid =
    recipe.rating !== -1 &&
    items.every((i) => i.food && allowed(i.food, s.profile));
  const total = items.reduce(
    (sum, i) => {
      if (i.food)
        for (const k of ["kcal", "protein", "carbs", "fat", "fiber"] as const)
          sum[k] += (i.food[k] * i.grams) / 100;
      return sum;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
  );
  const missing = items.flatMap((i) => {
    const pantry = s.pantry.find(
      (p) =>
        p.unit === "g" && p.name.toLowerCase() === i.food?.name.toLowerCase(),
    );
    const needed = Math.max(0, i.grams - (pantry?.quantity ?? 0));
    return needed
      ? [
          {
            foodId: i.foodId,
            name: i.food?.name ?? "Unavailable food",
            grams: needed,
          },
        ]
      : [];
  });
  return {
    recipe,
    items,
    valid,
    total,
    missing,
    pantryReady: missing.length === 0,
  };
}
export function mealCandidates(s: State) {
  return recipes(s)
    .map((r) => recipeDetails(s, r))
    .filter((r) => r.valid)
    .sort(
      (a, b) =>
        Number(b.pantryReady) - Number(a.pantryReady) ||
        b.recipe.rating - a.recipe.rating ||
        b.total.protein - a.total.protein,
    );
}
export function shoppingNeeds(
  s: State,
  from = dateKey(new Date(), s.profile.timezone),
) {
  const needs = new Map<
    string,
    { id: string; name: string; quantity: number; checked: boolean }
  >();
  for (const p of (s.mealPlans ?? []).filter((p) => p.date >= from)) {
    const recipe = recipes(s).find((r) => r.id === p.recipeId);
    if (!recipe) continue;
    const details = recipeDetails(s, recipe);
    if (!details.valid) continue;
    for (const i of details.items) {
      if (!i.food) continue;
      const old = needs.get(i.foodId);
      needs.set(i.foodId, {
        id: i.foodId,
        name: i.food.name,
        quantity: (old?.quantity ?? 0) + i.grams,
        checked: false,
      });
    }
  }
  return [...needs.values()]
    .map((n) => ({
      ...n,
      quantity: Math.max(
        0,
        n.quantity -
          (s.pantry.find(
            (p) =>
              p.unit === "g" && p.name.toLowerCase() === n.name.toLowerCase(),
          )?.quantity ?? 0),
      ),
    }))
    .filter((n) => n.quantity > 0);
}
export function achievements(s: State) {
  const completed = s.workouts.filter((w) => w.status === "completed");
  const days = new Set(completed.map((w) => w.date));
  return [
    {
      name: "First session",
      earned: completed.length >= 1,
      detail: "Complete a workout at your own pace.",
    },
    {
      name: "A steady rhythm",
      earned: days.size >= 5,
      detail: "Train on five different days.",
    },
    {
      name: "A little context",
      earned: s.checkins.length >= 7,
      detail: "Record seven readiness check-ins.",
    },
    {
      name: "Food awareness",
      earned: new Set(s.meals.map((m) => m.date)).size >= 7,
      detail: "Log food on seven different days.",
    },
  ];
}
export function personalRecords(s: State) {
  const best = new Map<
    string,
    { exercise: string; load: number; reps: number; date: string }
  >();
  for (const w of s.workouts)
    for (const set of w.sets) {
      const old = best.get(set.exercise);
      if (
        !old ||
        set.load > old.load ||
        (set.load === old.load && set.reps > old.reps)
      )
        best.set(set.exercise, {
          exercise: set.exercise,
          load: set.load,
          reps: set.reps,
          date: w.date,
        });
    }
  return [...best.values()];
}
