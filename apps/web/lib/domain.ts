import { bodyEntrySchema, type BodyEntry } from "./habits.ts";
import { cartItemsSchema, cartSchema, cartPolicy, checkCart, type Cart } from "./grocery.ts";
import { z } from "zod";
import type { CoachResult } from "./ai/provider";
import {
  programSchema,
  recipeSchema,
  preferencesSchema,
  defaults,
  recipes,
  foodLibrary,
  recipeDetails,
  shoppingNeeds,
  type Program,
  type Recipe,
  type PlannedMeal,
  type Preferences,
} from "./planning.ts";
export type Health = {
  id: string;
  date: string;
  sleep: number;
  rhr: number | null;
  hrv: number | null;
  source: "demo" | "manual" | "HealthKit";
  sampleAt: string;
  syncAt: string;
};
export type Profile = {
  name: string;
  diet: "omnivore" | "vegetarian" | "vegan";
  allergies: string[];
  dislikes: string[];
  goal: string;
  days: number;
  equipment: string;
  protein: number;
  calories: number;
  timezone: string;
  consent: boolean;
};
export type SetLog = {
  exercise: string;
  reps: number;
  load: number;
  rpe: number;
  muscle: string;
};
export type Workout = {
  id: string;
  date: string;
  sets: SetLog[];
  effort: string;
  status: "completed" | "partial";
};
export type Food = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vegan: boolean;
  vegetarian: boolean;
  allergens: string[];
  source: string;
};
export type Meal = {
  id: string;
  date: string;
  food: Food;
  grams: number;
  pantryId?: string;
};
export type Pantry = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  confirmed: string;
  confidence: "high" | "medium" | "low";
};
export type Audit = {
  id: string;
  at: string;
  version: number;
  rules: string[];
  text: string;
  confidence: string;
  feedback?: string;
  note?: string;
};
export type State = {
  mode: "demo" | "real";
  profile: Profile;
  health: Health[];
  checkins: {
    date: string;
    energy: number;
    soreness: number;
    motivation: number;
    note: string;
  }[];
  workouts: Workout[];
  meals: Meal[];
  pantry: Pantry[];
  audit: Audit[];
  grocery: { id: string; name: string; quantity: number; checked: boolean }[];
  messages: {
    role: "user" | "assistant";
    text: string;
    provider?: string;
    model?: string | null;
    tools?: string[];
    status?: string;
    action?: string;
  }[];
  onboarded: boolean;
  program?: Program;
  cart?: Cart;
  bodyEntries?: BodyEntry[];
  savedFoods?: Food[];
  recipes?: Recipe[];
  mealPlans?: PlannedMeal[];
  preferences?: Preferences;
  consentHistory?: { at: string; ai: boolean }[];
};
export const foodSchema = z.object({
  id: z.string().max(100),
  name: z.string().min(1).max(120),
  kcal: z.number().min(0).max(1000),
  protein: z.number().min(0).max(100),
  carbs: z.number().min(0).max(100),
  fat: z.number().min(0).max(100),
  fiber: z.number().min(0).max(100),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  allergens: z.array(z.string().max(40)).max(30),
  source: z.string().max(180),
});
const num = (min: number, max: number) => z.number().finite().min(min).max(max);
const text = z.string().max(500);
const calendarDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const d = new Date(value + "T12:00:00Z");
    return (
      Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value
    );
  }, "Use a valid calendar date");
export const commandSchema = z.discriminatedUnion("type", [
  z.object({type:z.literal("body-entry"),entry:bodyEntrySchema}),
  z.object({type:z.literal("body-delete"),date:calendarDate}),
  z.object({type:z.literal("cart-preview"),items:cartItemsSchema}),
  z.object({type:z.literal("cart-approve"),id:z.string()}),
  z.object({type:z.literal("meal-batch"),items:z.array(z.object({food:foodSchema,grams:num(1,2000)})).min(1).max(8)}),
  z.object({ type: z.literal("program"), program: programSchema }),
  z.object({ type: z.literal("preferences"), preferences: preferencesSchema }),
  z.object({ type: z.literal("save-food"), food: foodSchema }),
  z.object({ type: z.literal("recipe"), recipe: recipeSchema }),
  z.object({
    type: z.literal("recipe-rating"),
    id: z.string(),
    rating: z.number().int().min(-1).max(1),
  }),
  z.object({
    type: z.literal("plan-meal"),
    id: z.string(),
    recipeId: z.string(),
    date: calendarDate,
  }),
  z.object({ type: z.literal("unplan-meal"), id: z.string() }),
  z.object({
    type: z.literal("log-recipe"),
    id: z.string(),
    deductPantry: z.boolean(),
  }),
  z.object({
    type: z.literal("profile"),
    profile: z.object({
      name: z.string().min(1).max(60),
      diet: z.enum(["omnivore", "vegetarian", "vegan"]),
      allergies: z.array(z.string().min(1).max(40)).max(30),
      dislikes: z.array(z.string().max(60)).max(40),
      goal: z.enum(["Build muscle", "Get stronger", "Maintain fitness"]),
      days: num(1, 7).int(),
      equipment: z.enum(["Full gym", "Dumbbells", "Bodyweight"]),
      protein: num(20, 300),
      calories: num(1200, 5000),
      timezone: z.string().max(80),
      consent: z.literal(true),
    }),
  }),
  z.object({
    type: z.literal("checkin"),
    energy: num(1, 5).int(),
    soreness: num(1, 5).int(),
    motivation: num(1, 5).int(),
    note: text,
  }),
  z.object({
    type: z.literal("workout"),
    date: calendarDate.optional(),
    sets: z
      .array(
        z.object({
          exercise: z.string().min(1).max(100),
          muscle: z.string().max(50),
          reps: num(1, 100).int(),
          load: num(0, 500),
          rpe: num(1, 10),
        }),
      )
      .min(1)
      .max(80),
    effort: z.enum(["About right", "Too hard", "Too easy"]),
    status: z.enum(["completed", "partial"]),
  }),
  z.object({
    type: z.literal("meal"),
    food: foodSchema,
    grams: num(1, 2000),
    pantryId: z.string().optional(),
  }),
  z.object({
    type: z.literal("pantry"),
    id: z.string().max(100),
    name: z.string().min(1).max(100),
    quantity: num(0, 100000),
    unit: z.enum(["g", "ml", "servings"]),
    confidence: z.enum(["high", "medium", "low"]),
  }),
  z.object({ type: z.literal("pantry-delete"), id: z.string() }),
  z.object({
    type: z.literal("feedback"),
    feedback: z.enum(["accepted", "modified", "rejected"]),
    note: text,
  }),
  z.object({
    type: z.literal("health"),
    samples: z
      .array(
        z.object({
          id: z.string().min(1).max(120),
          date: calendarDate,
          sleep: num(0, 1440),
          rhr: num(20, 250).nullable(),
          hrv: num(0, 500).nullable(),
          source: z.enum(["manual", "HealthKit"]),
          sampleAt: z.string().datetime(),
          syncAt: z.string().datetime(),
        }),
      )
      .min(1)
      .max(100),
  }),
  z.object({ type: z.literal("grocery-generate") }),
  z.object({
    type: z.literal("grocery-check"),
    id: z.string(),
    checked: z.boolean(),
  }),
  z.object({ type: z.literal("mode"), mode: z.enum(["demo", "real"]) }),
  z.object({ type: z.literal("delete"), confirmation: z.literal("DELETE") }),
  z.object({ type: z.literal("chat"), message: z.string().min(1).max(1000) }),
]);
export type Command = z.infer<typeof commandSchema>;
export const dateKey = (now = new Date(), tz = "America/Chicago") =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
export function blank(): State {
  return {
    mode: "real",
    profile: {
      name: "You",
      diet: "vegetarian",
      allergies: [],
      dislikes: [],
      goal: "Build muscle",
      days: 3,
      equipment: "Full gym",
      protein: 145,
      calories: 2300,
      timezone: "America/Chicago",
      consent: false,
    },
    health: [],
    checkins: [],
    workouts: [],
    meals: [],
    pantry: [],
    audit: [],
    grocery: [],
    messages: [],
    onboarded: false,
    preferences: defaults(),
    recipes: [],
    savedFoods: [],
    mealPlans: [],
    consentHistory: [],
  };
}
export const foods: Food[] = [
  {
    id: "sample-yogurt",
    name: "Plain Greek yogurt",
    kcal: 59,
    protein: 10.3,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    vegan: false,
    vegetarian: true,
    allergens: ["milk"],
    source: "Demo nutrient fixture · per 100 g",
  },
  {
    id: "sample-oats",
    name: "Rolled oats, dry",
    kcal: 379,
    protein: 13.2,
    carbs: 67.7,
    fat: 6.5,
    fiber: 10.1,
    vegan: true,
    vegetarian: true,
    allergens: ["oats", "gluten"],
    source: "Demo nutrient fixture · per 100 g",
  },
  {
    id: "sample-tofu",
    name: "Firm tofu",
    kcal: 144,
    protein: 17.3,
    carbs: 2.8,
    fat: 8.7,
    fiber: 2.3,
    vegan: true,
    vegetarian: true,
    allergens: ["soy"],
    source: "Demo nutrient fixture · per 100 g",
  },
  {
    id: "sample-rice",
    name: "Brown rice, cooked",
    kcal: 123,
    protein: 2.7,
    carbs: 25.6,
    fat: 1,
    fiber: 1.6,
    vegan: true,
    vegetarian: true,
    allergens: [],
    source: "Demo nutrient fixture · per 100 g",
  },
  {
    id: "sample-berries",
    name: "Blueberries",
    kcal: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    fiber: 2.4,
    vegan: true,
    vegetarian: true,
    allergens: [],
    source: "Demo nutrient fixture · per 100 g",
  },
];
export function seed(now = new Date()): State {
  const s = blank();
  s.mode = "demo";
  s.profile = { ...s.profile, name: "Kiran", consent: true };
  s.onboarded = true;
  for (let i = 28; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const date = dateKey(d);
    s.health.push({
      id: `demo-${date}`,
      date,
      sleep: i === 0 ? 322 : 420 + ((i * 7) % 37),
      rhr: i === 0 ? 64 : 57 + (i % 3),
      hrv: i === 0 ? 37 : 47 + (i % 8),
      source: "demo",
      sampleAt: d.toISOString(),
      syncAt: d.toISOString(),
    });
    if (i > 0 && i % 2 === 0) {
      s.workouts.push({
        id: `demo-w-${i}`,
        date,
        status: "completed",
        effort: "About right",
        sets: [8, 10, 12].map((reps) => ({
          exercise: "Goblet squat",
          muscle: "Quads",
          reps,
          load: 20 + (28 - i) * 0.25,
          rpe: 8,
        })),
      });
    }
    if (i > 0) {
      s.meals.push({ id: `demo-m-${i}`, date, food: foods[2], grams: 200 });
    }
  }
  s.checkins = [
    { date: dateKey(now), energy: 2, soreness: 3, motivation: 3, note: "" },
  ];
  s.pantry = [
    {
      id: "p-yogurt",
      name: "Plain Greek yogurt",
      quantity: 300,
      unit: "g",
      confidence: "high",
      confirmed: now.toISOString(),
    },
    {
      id: "p-oats",
      name: "Rolled oats, dry",
      quantity: 600,
      unit: "g",
      confidence: "medium",
      confirmed: now.toISOString(),
    },
    {
      id: "p-tofu",
      name: "Firm tofu",
      quantity: 400,
      unit: "g",
      confidence: "high",
      confirmed: now.toISOString(),
    },
    {
      id: "p-berries",
      name: "Blueberries",
      quantity: 80,
      unit: "g",
      confidence: "medium",
      confirmed: now.toISOString(),
    },
  ];
  s.meals.push(
    { id: "demo-breakfast", date: dateKey(now), food: foods[0], grams: 200 },
    { id: "demo-oats", date: dateKey(now), food: foods[1], grams: 60 },
  );
  return s;
}
const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
export function recovery(s: State, now = new Date()) {
  const day = dateKey(now, s.profile.timezone);
  const h = s.health
    .filter((h) => h.date <= day)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const history = s.health.filter(
    (x) =>
      h &&
      x.date < h.date &&
      x.date >=
        dateKey(
          new Date(new Date(h.date + "T12:00:00Z").getTime() - 28 * 86400000),
          "UTC",
        ),
  );
  const baseline = {
    sleep: mean(history.map((x) => x.sleep)),
    rhr: mean(history.flatMap((x) => (x.rhr === null ? [] : [x.rhr]))),
    hrv: mean(history.flatMap((x) => (x.hrv === null ? [] : [x.hrv]))),
  };
  const check = s.checkins.find((x) => x.date === day);
  const stale =
    !h ||
    now.getTime() - Date.parse(h.sampleAt) > 36 * 3600000 ||
    h.date !== day;
  const rules: string[] = [];
  const reasons: string[] = [];
  if (h && !stale && history.length >= 7) {
    if (baseline.sleep !== null && h.sleep < baseline.sleep - 60) {
      rules.push("SLEEP_BELOW_BASELINE");
      reasons.push("Sleep was more than an hour below your recent baseline.");
    }
    if (h.rhr !== null && baseline.rhr !== null && h.rhr > baseline.rhr + 5) {
      rules.push("RHR_ABOVE_BASELINE");
      reasons.push("Resting heart rate was above your recent range.");
    }
    if (h.hrv !== null && baseline.hrv !== null && h.hrv < baseline.hrv * 0.8) {
      rules.push("HRV_BELOW_BASELINE");
      reasons.push("HRV was lower than your recent average.");
    }
  }
  if (check && (check.energy <= 2 || check.soreness >= 4)) {
    rules.push("SUBJECTIVE_FATIGUE");
    reasons.push("Your check-in suggests leaving a little more in reserve.");
  }
  const reduced = rules.length >= 2;
  const confidence =
    stale || history.length < 7
      ? "Low"
      : history.length >= 21 && h?.hrv !== null && check
        ? "Medium"
        : "Low";
  if (stale)
    reasons.push(
      "Current health data is missing or stale; no wearable-based adjustment is applied.",
    );
  if (history.length < 7)
    reasons.push(
      "At least seven prior days are needed for a personal baseline.",
    );
  if (!reasons.length)
    reasons.push(
      "Available signals do not justify changing your planned intensity.",
    );
  return {
    band: reduced ? "Reduced" : "Normal",
    confidence,
    reasons,
    rules,
    baseline,
    days: history.length,
    latest: h,
    stale,
    adjustment: reduced ? 0.9 : 1,
    avoidFailure: reduced,
  };
}
export function allowed(food: Food, p: Profile) {
  const norm = (x: string) => x.toLowerCase().trim();
  const aliases: Record<string, string> = {
    dairy: "milk",
    soya: "soy",
    peanuts: "peanut",
    eggs: "egg",
    nuts: "tree nut",
  };
  const normalize = (x: string) => aliases[norm(x)] ?? norm(x);
  if (
    (p.diet === "vegan" && !food.vegan) ||
    (p.diet === "vegetarian" && !food.vegetarian)
  )
    return false;
  return (
    !p.allergies.some(
      (a) =>
        food.allergens.some((x) => normalize(x) === normalize(a)) ||
        norm(food.name).includes(norm(a)),
    ) && !p.dislikes.some((a) => norm(a) && norm(food.name).includes(norm(a)))
  );
}
export function totals(
  s: State,
  day = dateKey(new Date(), s.profile.timezone),
) {
  return s.meals
    .filter((m) => m.date === day)
    .reduce(
      (a, m) => {
        for (const k of ["kcal", "protein", "carbs", "fat", "fiber"] as const)
          a[k] += (m.food[k] * m.grams) / 100;
        return a;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    );
}
export function progression(
  s: State,
  exercise: string,
  base = 20,
  now = new Date(),
) {
  const recent = s.workouts
    .filter((w) => w.sets.some((x) => x.exercise === exercise))
    .sort((a, b) => b.date.localeCompare(a.date));
  const last = recent[0];
  if (!last)
    return {
      load: base,
      reason:
        "Start with a comfortable load; keep two or more reps in reserve.",
    };
  const sets = last.sets.filter((x) => x.exercise === exercise);
  const load = Math.max(...sets.map((x) => x.load));
  if (now.getTime() - Date.parse(last.date + "T12:00:00Z") > 14 * 86400000)
    return {
      load: Math.round(load * 0.9 * 2) / 2,
      reason:
        "After a break of over two weeks, start lighter and rebuild gradually.",
    };
  if (
    last.effort === "Too hard" ||
    (recent.length >= 2 &&
      recent
        .slice(0, 2)
        .every((w) =>
          w.sets.filter((x) => x.exercise === exercise).some((x) => x.reps < 8),
        ))
  )
    return {
      load: Math.round(load * 0.9 * 2) / 2,
      reason:
        "Recent difficulty suggests a small reduction before progressing.",
    };
  if (
    last.status === "completed" &&
    sets.length >= 3 &&
    sets.every((x) => x.reps >= 12 && x.rpe <= 8)
  )
    return {
      load: load + 2.5,
      reason:
        "All three working sets reached 12 reps at RPE 8 or less. Add 2.5 kg.",
    };
  return {
    load,
    reason: "Keep the load and build toward three sets of 12 controlled reps.",
  };
}
export function sessionName(s: State) {
  if (s.program?.sessions.length)
    return s.program.sessions[
      s.workouts.filter((w) => w.status === "completed").length %
        s.program.sessions.length
    ].name;
  return ["Legs & core", "Push & shoulders", "Pull & posterior"][
    s.workouts.filter((w) => w.status === "completed").length % 3
  ];
}
export function plan(s: State, now = new Date()) {
  if (s.program?.sessions.length) {
    const session =
      s.program.sessions[
        s.workouts.filter((w) => w.status === "completed").length %
          s.program.sessions.length
      ];
    const recoveryContext = recovery(s, now);
    return session.exercises.map((x) => {
      const previous = [...s.workouts]
        .sort((a, b) => b.date.localeCompare(a.date))
        .find(
          (w) =>
            w.status === "completed" &&
            w.sets.some((a) => a.exercise === x.name),
        );
      const sets = previous?.sets.filter((a) => a.exercise === x.name) ?? [];
      const lastLoad = sets.length
        ? Math.max(...sets.map((a) => a.load))
        : x.load;
      const advance =
        sets.length >= x.sets &&
        sets.every((a) => a.reps >= x.maxReps && a.rpe <= 8);
      const returning =
        previous &&
        now.getTime() - Date.parse(previous.date + "T12:00:00Z") >
          14 * 86400000;
      const hard = previous?.effort === "Too hard" || returning;
      const load = hard
        ? lastLoad * 0.9
        : advance
          ? lastLoad + x.increment
          : lastLoad;
      return {
        name: x.name,
        muscle: x.muscle,
        base: x.load,
        sets: x.sets,
        reps: `${x.minReps}–${x.maxReps}`,
        load: Math.round(load * recoveryContext.adjustment * 2) / 2,
        reason: returning
          ? "After a break of over two weeks, rebuild with a lighter load."
          : hard
            ? "Last session felt too hard; rebuild with a lighter load."
            : advance
              ? "Your completed sets earned the configured increment."
              : "Build toward the top of your chosen rep range.",
      };
    });
  }
  const r = recovery(s, now),
    body = s.profile.equipment === "Bodyweight";
  const rotation =
    s.workouts.filter((w) => w.status === "completed").length % 3;
  const routines = [
    [
      {
        name: body ? "Bodyweight squat" : "Goblet squat",
        muscle: "Quads",
        base: 20,
      },
      {
        name: body ? "Glute bridge" : "Romanian deadlift",
        muscle: "Hamstrings",
        base: 30,
      },
      { name: "Reverse lunge", muscle: "Quads", base: 10 },
    ],
    [
      {
        name: body ? "Push-up" : "Dumbbell floor press",
        muscle: "Chest",
        base: 15,
      },
      {
        name: body ? "Pike push-up" : "Dumbbell shoulder press",
        muscle: "Shoulders",
        base: 10,
      },
      {
        name: body ? "Close-grip push-up" : "Triceps extension",
        muscle: "Triceps",
        base: 7.5,
      },
    ],
    [
      {
        name: body ? "Prone Y raise" : "Dumbbell row",
        muscle: "Back",
        base: 15,
      },
      {
        name: body ? "Bird dog" : "Dumbbell reverse fly",
        muscle: "Back",
        base: 5,
      },
      {
        name: body ? "Glute bridge" : "Dumbbell curl",
        muscle: body ? "Glutes" : "Biceps",
        base: 10,
      },
    ],
  ];
  return routines[rotation].map((x) => {
    const p = progression(s, x.name, body ? 0 : x.base, now);
    return {
      ...x,
      ...p,
      load: body ? 0 : Math.round(p.load * r.adjustment * 2) / 2,
      sets: 3,
      reps: "8–12",
    };
  });
}
export function forecast(s: State, now = new Date()) {
  return s.pantry.map((p) => {
    const since = dateKey(
      new Date(now.getTime() - 7 * 86400000),
      s.profile.timezone,
    );
    const used = s.meals
      .filter((m) => m.pantryId === p.id && m.date >= since)
      .reduce((a, m) => a + m.grams, 0);
    const rate = p.unit === "g" && used > 0 ? used / 7 : null;
    return {
      ...p,
      days: rate ? Math.floor(p.quantity / rate) : null,
      low:
        p.quantity === 0 ||
        (rate !== null && p.quantity / rate < 3) ||
        (p.unit === "g" && p.quantity < 150),
      rate,
    };
  });
}
export function scheduledToday(s: State, now = new Date()) {
  if (!s.program) return true;
  const weekday = new Date(
    dateKey(now, s.profile.timezone) + "T12:00:00Z",
  ).getUTCDay();
  return s.program.weekdays.includes(weekday);
}
export function recommendation(s: State, now = new Date()) {
  const r = recovery(s, now),
    day = dateKey(now, s.profile.timezone);
  const done = s.workouts.some(
    (w) => w.date === day && w.status === "completed",
  );
  const rejected =
    [...s.audit]
      .reverse()
      .find(
        (a) =>
          a.feedback && dateKey(new Date(a.at), s.profile.timezone) === day,
      )?.feedback === "rejected";
  return {
    title:
      !done && !scheduledToday(s, now)
        ? "A planned day to recover."
        : done
          ? "You put in the work. Now refuel."
          : rejected
            ? "Make today a recovery day."
            : r.band === "Reduced"
              ? "Keep your rhythm. Ease the intensity."
              : "A steady day to build on.",
    action:
      !done && !scheduledToday(s, now)
        ? "Review your recovery"
        : done
          ? "Plan your next meal"
          : rejected
            ? "Review your recovery"
            : "Review today’s session",
    target: done
      ? "Eat"
      : rejected || !scheduledToday(s, now)
        ? "Today"
        : "Train",
    text:
      !done && !scheduledToday(s, now)
        ? "Your schedule has a rest day today. Keep movement comfortable; your next session stays ready in Train."
        : done
          ? `${Math.max(0, Math.round(s.profile.protein - totals(s, day).protein))} g of your protein target remains. Choose a meal that fits your appetite and preferences.`
          : rejected
            ? "You chose to skip the recommendation. Your feedback is saved; take a comfortable recovery day."
            : r.band === "Reduced"
              ? "Several signals suggest easing the load. Keep today’s session controlled, with a little more in reserve."
              : "Follow the plan at a comfortable effort. Your own readiness matters as much as the numbers.",
    ...r,
  };
}
export function coach(s: State, message: string, now = new Date()) {
  const m = message.toLowerCase();
  if (/diagnos|medication|chest pain|treat my|injur/.test(m))
    return "I can help with training and nutrition planning, but cannot diagnose or treat symptoms. Pause exercise if you feel unwell and seek appropriate professional care.";
  if (/buy|purchase|checkout|order groceries/.test(m))
    return "I can prepare a shopping list in Eat → Groceries. FitLive does not place orders or spend money.";
  if (/food|eat|protein|meal|pantry/.test(m)) {
    const t = totals(s, dateKey(now, s.profile.timezone));
    const candidates = foods.filter(
      (f) =>
        allowed(f, s.profile) &&
        s.pantry.some((p) => p.name === f.name && p.quantity > 0),
    );
    return `You have logged ${Math.round(t.protein)} g protein against your ${s.profile.protein} g target today. ${candidates.length ? "Your pantry includes " + candidates.map((x) => x.name.toLowerCase()).join(", ") + ". Review portions in Eat before logging." : "Add pantry items or search a verified food record in Eat."} ${s.mode === "demo" ? "These are demo nutrient fixtures." : ""}`;
  }
  const r = recovery(s, now);
  return `Recovery context is ${r.band.toLowerCase()}, with ${r.confidence.toLowerCase()} confidence. ${r.reasons.join(" ")} ${plan(s, now)[0].reason} This response uses your saved state and versioned rules; no AI provider is connected.`;
}
export function apply(
  state: State,
  input: unknown,
  id: string,
  version: number,
  now = new Date(),
  generated?: CoachResult,
): State {
  const c = commandSchema.parse(input);
  if (c.type === "delete") return blank();
  if (c.type === "mode") return c.mode === "demo" ? seed(now) : blank();
  const s = structuredClone(state),
    day = dateKey(now, s.profile.timezone);
  switch (c.type) {
    case "body-entry":
      if(c.entry.date>day)throw new Error("Measurement date cannot be in the future.");
      s.bodyEntries=[...(s.bodyEntries??[]).filter(e=>e.date!==c.entry.date),c.entry];
      break;
    case "body-delete":
      s.bodyEntries=(s.bodyEntries??[]).filter(e=>e.date!==c.date);
      break;
    case "cart-preview":
      s.cart={id,createdAt:now.toISOString(),items:c.items,policy:cartPolicy(s),status:"draft"};
      break;
    case "cart-approve": {
      if(!s.cart||s.cart.id!==c.id||s.cart.policy!==cartPolicy(s))throw new Error("Cart changed. Prepare a new review.");
      const check=checkCart(s,s.cart.items);
      if(check.issues.length)throw new Error(check.issues.join(" "));
      s.cart={...s.cart,status:"approved",approvedAt:now.toISOString()};
      break;
    }
    case "meal-batch":
      for (const [i,item] of c.items.entries()) {
        const updated=apply(s,{type:"meal",...item},id+":"+i,version,now);
        s.meals=updated.meals;
      }
      break;
    case "program":
      s.program = c.program;
      s.profile.days = new Set(c.program.weekdays).size;
      break;
    case "preferences":
      s.preferences = c.preferences;
      s.consentHistory = [
        ...(s.consentHistory ?? []),
        { at: now.toISOString(), ai: c.preferences.aiConsent },
      ];
      break;
    case "save-food":
      if (!allowed(c.food, s.profile))
        throw new Error("This food conflicts with your dietary restrictions.");
      s.savedFoods = [
        ...(s.savedFoods ?? []).filter((f) => f.id !== c.food.id),
        c.food,
      ];
      break;
    case "recipe": {
      const library = foodLibrary(s);
      if (
        !c.recipe.items.every((i) =>
          library.some((f) => f.id === i.foodId && allowed(f, s.profile)),
        )
      )
        throw new Error(
          "Recipe conflicts with your dietary restrictions or contains an unavailable food.",
        );
      s.recipes = [...recipes(s).filter((r) => r.id !== c.recipe.id), c.recipe];
      break;
    }
    case "recipe-rating":
      s.recipes = recipes(s).map((r) =>
        r.id === c.id ? { ...r, rating: c.rating } : r,
      );
      break;
    case "plan-meal": {
      const recipe = recipes(s).find((r) => r.id === c.recipeId);
      if (!recipe || !recipeDetails(s, recipe).valid)
        throw new Error("Recipe conflicts with your dietary restrictions.");
      s.mealPlans = [
        ...(s.mealPlans ?? []).filter((p) => p.id !== c.id),
        { id: c.id, date: c.date, recipeId: c.recipeId },
      ];
      break;
    }
    case "unplan-meal":
      s.mealPlans = (s.mealPlans ?? []).filter((p) => p.id !== c.id);
      break;
    case "log-recipe": {
      const recipe = recipes(s).find((r) => r.id === c.id);
      if (!recipe) throw new Error("Recipe not found.");
      const details = recipeDetails(s, recipe);
      if (!details.valid)
        throw new Error("Recipe conflicts with dietary restrictions.");
      for (const [i, item] of details.items.entries()) {
        const food = item.food!;
        if (s.mode === "real" && food.source.startsWith("Demo"))
          throw new Error("Use a verified food record.");
        const pantry = s.pantry.find(
          (p) =>
            p.unit === "g" && p.name.toLowerCase() === food.name.toLowerCase(),
        );
        if (c.deductPantry) {
          if (!pantry || pantry.quantity < item.grams)
            throw new Error("Confirm sufficient pantry quantity first.");
          pantry.quantity -= item.grams;
          pantry.confidence = "medium";
        }
        s.meals.push({
          id: id + ":" + i,
          date: day,
          food,
          grams: item.grams,
          ...(c.deductPantry ? { pantryId: pantry!.id } : {}),
        });
      }
      break;
    }

    case "profile":
      new Intl.DateTimeFormat("en", { timeZone: c.profile.timezone });
      s.profile = c.profile;
      s.onboarded = true;
      break;
    case "checkin":
      s.checkins = s.checkins.filter((x) => x.date !== day);
      s.checkins.push({ date: day, ...c });
      break;
    case "workout":
      if (c.date && c.date > day)
        throw new Error("Workout date cannot be in the future.");
      s.workouts.push({
        id,
        date: c.date ?? day,
        sets: c.sets,
        effort: c.effort,
        status: c.status,
      });
      break;
    case "meal":
      if (c.food.id.startsWith("sample-")) {
        const canonical = foods.find((f) => f.id === c.food.id);
        if (!canonical) throw new Error("Use a verified food record.");
        c.food = canonical;
      }
      if (!allowed(c.food, s.profile))
        throw new Error("This food conflicts with your dietary restrictions.");
      if (s.mode === "real" && c.food.source.startsWith("Demo"))
        throw new Error(
          "Use a verified food record or a confirmed package label in real mode.",
        );
      if (c.pantryId) {
        const p = s.pantry.find((x) => x.id === c.pantryId);
        if (!p || p.unit !== "g" || p.quantity < c.grams)
          throw new Error("Confirm sufficient pantry quantity in grams first.");
        if (p.name.toLowerCase() !== c.food.name.toLowerCase())
          throw new Error("Choose the matching pantry food.");
        p.quantity -= c.grams;
        p.confidence = "medium";
      }
      s.meals.push({
        id,
        date: day,
        food: c.food,
        grams: c.grams,
        pantryId: c.pantryId,
      });
      break;
    case "pantry":
      s.pantry = s.pantry.filter((x) => x.id !== c.id);
      s.pantry.push({ ...c, confirmed: now.toISOString() });
      break;
    case "pantry-delete":
      s.pantry = s.pantry.filter((x) => x.id !== c.id);
      break;
    case "health":
      for (const sample of c.samples) {
        if (sample.date > day || Date.parse(sample.sampleAt) > now.getTime() + 300000)
          throw new Error("Health samples cannot be in the future.");
        const old = s.health.find((x) => x.id === sample.id);
        if (
          old &&
          JSON.stringify({ ...old, syncAt: "" }) !==
            JSON.stringify({ ...sample, syncAt: "" })
        )
          throw new Error("Conflicting health sample identifier.");
        if (!old) {
          s.health = s.health.filter((x) => x.date !== sample.date);
          s.health.push({ ...sample, syncAt: now.toISOString() });
        }
      }
      break;
    case "feedback": {
      const r = recommendation(s, now);
      s.audit.push({
        id,
        at: now.toISOString(),
        version,
        rules: r.rules,
        text: r.title,
        confidence: r.confidence,
        feedback: c.feedback,
        note: c.note,
      });
      break;
    }
    case "grocery-generate":
      s.grocery = forecast(s, now)
        .filter((p) => p.low)
        .map((p) => ({
          id: p.id,
          name: p.name,
          quantity: p.unit === "g" ? 500 : 1,
          checked: false,
        }));
      for (const need of shoppingNeeds(s, day)) {
        const item = s.grocery.find(
          (g) => g.name.toLowerCase() === need.name.toLowerCase(),
        );
        if (item) item.quantity = Math.max(item.quantity, need.quantity);
        else s.grocery.push(need);
      }
      break;
    case "grocery-check": {
      const item = s.grocery.find((x) => x.id === c.id);
      if (!item) throw new Error("Shopping item not found.");
      item.checked = c.checked;
      break;
    }
    case "chat":
      s.messages.push(
        { role: "user", text: c.message },
        {
          role: "assistant",
          text: generated?.text ?? coach(s, c.message, now),
          ...(generated
            ? {
                provider: generated.provider,
                model: generated.model,
                tools: generated.tools,
                status: generated.status,
                action: generated.action,
              }
            : { provider: "rules" }),
        },
      );
      break;
  }
  if (!["feedback", "chat", "grocery-check"].includes(c.type)) {
    const r = recommendation(s, now);
    s.audit.push({
      id,
      at: now.toISOString(),
      version: version + 1,
      rules: r.rules,
      text: r.title,
      confidence: r.confidence,
    });
  }
  return s;
}

/** Validate a trusted account transfer before changing storage providers. */
export function validateSnapshot(value: unknown): State {
  const s = z
    .object({
      mode: z.enum(["demo", "real"]),
      profile: z.object({
        name: z.string(),
        diet: z.enum(["omnivore", "vegetarian", "vegan"]),
        allergies: z.array(z.string()),
        dislikes: z.array(z.string()),
        goal: z.string(),
        days: num(1, 7),
        equipment: z.string(),
        protein: num(20, 300),
        calories: num(1200, 5000),
        timezone: z.string(),
        consent: z.boolean(),
      }),
      health: z.array(
        z.object({
          id: z.string(),
          date: calendarDate,
          sleep: num(0, 1440),
          rhr: num(20, 250).nullable(),
          hrv: num(0, 500).nullable(),
          source: z.enum(["demo", "manual", "HealthKit"]),
          sampleAt: z.string().datetime(),
          syncAt: z.string().datetime(),
        }),
      ),
      checkins: z.array(
        z.object({
          date: calendarDate,
          energy: num(1, 5),
          soreness: num(1, 5),
          motivation: num(1, 5),
          note: z.string(),
        }),
      ),
      workouts: z.array(
        z.object({
          id: z.string(),
          date: calendarDate,
          sets: z.array(
            z.object({
              exercise: z.string(),
              muscle: z.string(),
              reps: num(1, 100),
              load: num(0, 500),
              rpe: num(1, 10),
            }),
          ),
          effort: z.string(),
          status: z.enum(["completed", "partial"]),
        }),
      ),
      meals: z.array(
        z.object({
          id: z.string(),
          date: calendarDate,
          food: foodSchema,
          grams: num(1, 2000),
          pantryId: z.string().optional(),
        }),
      ),
      pantry: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          quantity: num(0, 100000),
          unit: z.string(),
          confirmed: z.string(),
          confidence: z.enum(["high", "medium", "low"]),
        }),
      ),
      audit: z.array(
        z.object({
          id: z.string(),
          at: z.string().datetime(),
          version: z.number(),
          rules: z.array(z.string()),
          text: z.string(),
          confidence: z.string(),
          feedback: z.string().optional(),
          note: z.string().optional(),
        }),
      ),
      grocery: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          quantity: z.number(),
          checked: z.boolean(),
        }),
      ),
      messages: z.array(
        z.object({
          role: z.enum(["user", "assistant"]),
          text: z.string(),
          provider: z.string().optional(),
          model: z.string().nullable().optional(),
          tools: z.array(z.string()).optional(),
          status: z.string().optional(),
          action: z.string().optional(),
        }),
      ),
      onboarded: z.boolean(),
      program: programSchema.optional(),
      cart: cartSchema.optional(),
      bodyEntries: z.array(bodyEntrySchema).optional(),
      savedFoods: z.array(foodSchema).optional(),
      recipes: z.array(recipeSchema).optional(),
      mealPlans: z
        .array(
          z.object({
            id: z.string(),
            date: calendarDate,
            recipeId: z.string(),
          }),
        )
        .optional(),
      preferences: preferencesSchema.optional(),
      consentHistory: z
        .array(z.object({ at: z.string(), ai: z.boolean() }))
        .optional(),
    })
    .parse(value);
  dateKey(new Date(), s.profile.timezone);
  return s;
}
