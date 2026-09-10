"use client";
import { useState } from "react";
import {
  Plus,
  Check,
  CalendarDays,
  BookOpen,
  Star,
  Trophy,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { type State, type Command, plan, dateKey } from "@/lib/domain";
import {
  foodLibrary,
  mealCandidates,
  recipes,
  recipeDetails,
  personalRecords,
  achievements,
  defaults,
  type Program,
  type Recipe,
  type Prescription,
} from "@/lib/planning";
type Props = {
  state: State;
  busy: boolean;
  act: (c: Command, close?: boolean) => Promise<boolean>;
};
const newExercise = (): Prescription => ({
  name: "New exercise",
  muscle: "Quads",
  sets: 3,
  minReps: 8,
  maxReps: 12,
  load: 10,
  increment: 2.5,
});
export function ProgramEditor({ state, busy, act }: Props) {
  const [open, setOpen] = useState(false),
    [program, setProgram] = useState<Program>({
      name: "My strength plan",
      weekdays: [1, 3, 5],
      sessions: [{ name: "Full body", exercises: [newExercise()] }],
    }),
    [session, setSession] = useState(0);
  function edit() {
    setProgram(
      state.program ?? {
        name: "My strength plan",
        weekdays: [1, 3, 5].slice(0, state.profile.days),
        sessions: [
          {
            name: "My session",
            exercises: plan(state).map((x) => ({
              name: x.name,
              muscle: x.muscle,
              sets: x.sets,
              minReps: 8,
              maxReps: 12,
              load: x.load,
              increment: 2.5,
            })),
          },
        ],
      },
    );
    setSession(0);
    setOpen(true);
  }
  function updateExercise(
    i: number,
    key: keyof Prescription,
    value: string | number,
  ) {
    setProgram((p) => ({
      ...p,
      sessions: p.sessions.map((s, j) =>
        j === session
          ? {
              ...s,
              exercises: s.exercises.map((x, k) =>
                k === i ? { ...x, [key]: value } : x,
              ),
            }
          : s,
      ),
    }));
  }
  return (
    <>
      <div className="section-bar">
        <div className="row">
          <CalendarDays />
          <span>{state.program?.name ?? "Balanced strength rotation"}</span>
        </div>
        <button className="secondary" onClick={edit}>
          Edit program & schedule
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fit-dialog program-dialog">
          <DialogTitle>Your program, your schedule</DialogTitle>
          <DialogDescription>
            Choose sensible starting loads. Adjust them to your experience and
            available equipment.
          </DialogDescription>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (await act({ type: "program", program }, false))
                setOpen(false);
            }}
          >
            <label className="field">
              Program name
              <input
                required
                maxLength={80}
                value={program.name}
                onChange={(e) =>
                  setProgram({ ...program, name: e.target.value })
                }
              />
            </label>
            <div className="weekday-picker">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                <label key={d}>
                  <Checkbox
                    checked={program.weekdays.includes(i)}
                    onCheckedChange={(v) =>
                      setProgram({
                        ...program,
                        weekdays: v
                          ? [...new Set([...program.weekdays, i])]
                          : program.weekdays.filter((x) => x !== i),
                      })
                    }
                  />
                  {d}
                </label>
              ))}
            </div>
            <label className="field">
              Session
              <select
                value={session}
                onChange={(e) => setSession(Number(e.target.value))}
              >
                {program.sessions.map((s, i) => (
                  <option key={i} value={i}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Session name
              <input
                required
                value={program.sessions[session].name}
                onChange={(e) =>
                  setProgram({
                    ...program,
                    sessions: program.sessions.map((s, i) =>
                      i === session ? { ...s, name: e.target.value } : s,
                    ),
                  })
                }
              />
            </label>
            {program.sessions[session].exercises.map((x, i) => (
              <div className="program-exercise" key={i}>
                <div className="form-grid">
                  <label className="field">
                    Exercise
                    <input
                      required
                      value={x.name}
                      onChange={(e) =>
                        updateExercise(i, "name", e.target.value)
                      }
                    />
                  </label>
                  <label className="field">
                    Muscle group
                    <select
                      value={x.muscle}
                      onChange={(e) =>
                        updateExercise(i, "muscle", e.target.value)
                      }
                    >
                      {[
                        "Quads",
                        "Hamstrings",
                        "Glutes",
                        "Back",
                        "Chest",
                        "Shoulders",
                        "Biceps",
                        "Triceps",
                        "Core",
                        "Calves",
                      ].map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="prescription-grid">
                  {(
                    [
                      { key: "sets", label: "Sets", min: 1, max: 6 },
                      { key: "minReps", label: "Min reps", min: 1, max: 30 },
                      {
                        key: "maxReps",
                        label: "Max reps",
                        min: x.minReps,
                        max: 30,
                      },
                      { key: "load", label: "kg", min: 0, max: 300 },
                      { key: "increment", label: "Step, kg", min: 0.5, max: 5 },
                    ] as const
                  ).map((f) => (
                    <label className="field" key={f.key}>
                      {f.label}
                      <input
                        type="number"
                        required
                        min={f.min}
                        max={f.max}
                        step={
                          f.key === "load" || f.key === "increment" ? 0.5 : 1
                        }
                        value={x[f.key]}
                        onChange={(e) =>
                          updateExercise(i, f.key, Number(e.target.value))
                        }
                      />
                    </label>
                  ))}
                </div>
                <button
                  className="text-button danger"
                  type="button"
                  disabled={program.sessions[session].exercises.length <= 1}
                  onClick={() =>
                    setProgram({
                      ...program,
                      sessions: program.sessions.map((s, j) =>
                        j === session
                          ? {
                              ...s,
                              exercises: s.exercises.filter((_, k) => i !== k),
                            }
                          : s,
                      ),
                    })
                  }
                >
                  <Trash2 />
                  Remove exercise
                </button>
              </div>
            ))}
            <div className="row wrap">
              <button
                className="secondary"
                type="button"
                disabled={program.sessions[session].exercises.length >= 10}
                onClick={() =>
                  setProgram({
                    ...program,
                    sessions: program.sessions.map((s, i) =>
                      i === session
                        ? { ...s, exercises: [...s.exercises, newExercise()] }
                        : s,
                    ),
                  })
                }
              >
                <Plus />
                Exercise
              </button>
              <button
                className="secondary"
                type="button"
                disabled={program.sessions.length >= 7}
                onClick={() => {
                  setProgram({
                    ...program,
                    sessions: [
                      ...program.sessions,
                      {
                        name: `Session ${program.sessions.length + 1}`,
                        exercises: [newExercise()],
                      },
                    ],
                  });
                  setSession(program.sessions.length);
                }}
              >
                <Plus />
                Session
              </button>
              <button
                className="primary"
                disabled={busy || !program.weekdays.length}
              >
                Save program <Check />
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function MealPlanner({ state, busy, act }: Props) {
  const [open, setOpen] = useState(false),
    [selected, setSelected] = useState<Recipe | null>(null),
    [name, setName] = useState(""),
    [items, setItems] = useState<{ foodId: string; grams: number }[]>([]),
    [instructions, setInstructions] = useState(""),
    [planDate, setPlanDate] = useState(
      dateKey(new Date(), state.profile.timezone),
    ),
    [confirm, setConfirm] = useState<Recipe | null>(null);
  const library = foodLibrary(state);
  const candidates = mealCandidates(state);
  return (
    <section className="panel small-space">
      <div className="row spread">
        <div>
          <p className="eyebrow">MEALS THAT FIT YOUR DAY</p>
          <h3 className="section-title">Your personal recipe book</h3>
        </div>
        <button
          className="secondary"
          onClick={() => {
            setName("");
            setItems(
              library.length ? [{ foodId: library[0].id, grams: 100 }] : [],
            );
            setInstructions("");
            setOpen(true);
          }}
        >
          <Plus />
          Create recipe
        </button>
      </div>
      {!candidates.length && (
        <p>
          Build a recipe from foods you’ve already confirmed. Log a package
          label or verified food first to add it to your library.
        </p>
      )}
      <div className="recipe-grid">
        {candidates.map((d) => (
          <article className="recipe-card" key={d.recipe.id}>
            <BookOpen />
            <h3>{d.recipe.name}</h3>
            <p>
              {Math.round(d.total.protein)} g protein ·{" "}
              {Math.round(d.total.kcal)} kcal
            </p>
            <span className={"chip " + (d.pantryReady ? "" : "amber")}>
              {d.pantryReady
                ? "Ready from your pantry"
                : `${d.missing.length} ingredient${d.missing.length === 1 ? "" : "s"} to check`}
            </span>
            <div className="row wrap small-space">
              <button
                className="text-button"
                onClick={() => setSelected(d.recipe)}
              >
                View & plan
              </button>
              <button
                className="text-button"
                onClick={() => setConfirm(d.recipe)}
              >
                Log this meal
              </button>
            </div>
          </article>
        ))}
      </div>
      {(state.mealPlans ?? []).length > 0 && (
        <div className="small-space">
          <h3>Upcoming meals</h3>
          {state.mealPlans!.map((p) => (
            <div className="inventory-row" key={p.id}>
              <CalendarDays />
              <span>{p.date}</span>
              <div>
                {recipes(state).find((r) => r.id === p.recipeId)?.name ??
                  "Recipe unavailable"}
              </div>
              <button
                className="text-button danger"
                disabled={busy}
                onClick={() =>
                  void act({ type: "unplan-meal", id: p.id }, false)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fit-dialog">
          <DialogTitle>Create a recipe</DialogTitle>
          <DialogDescription>
            Nutrients come from your confirmed foods, not estimates invented by
            a model.
          </DialogDescription>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                await act(
                  {
                    type: "recipe",
                    recipe: {
                      id: crypto.randomUUID(),
                      name,
                      items,
                      instructions,
                      rating: 0,
                    },
                  },
                  false,
                )
              )
                setOpen(false);
            }}
          >
            <label className="field">
              Recipe name
              <input
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {items.map((item, i) => (
              <div className="recipe-item" key={i}>
                <label className="field">
                  Food
                  <select
                    value={item.foodId}
                    onChange={(e) =>
                      setItems(
                        items.map((x, j) =>
                          i === j ? { ...x, foodId: e.target.value } : x,
                        ),
                      )
                    }
                  >
                    {library.map((f) => (
                      <option value={f.id} key={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  Grams
                  <input
                    required
                    type="number"
                    min="1"
                    max="2000"
                    value={item.grams}
                    onChange={(e) =>
                      setItems(
                        items.map((x, j) =>
                          i === j ? { ...x, grams: Number(e.target.value) } : x,
                        ),
                      )
                    }
                  />
                </label>
                <button
                  type="button"
                  className="text-button danger"
                  aria-label="Remove ingredient"
                  onClick={() => setItems(items.filter((_, j) => i !== j))}
                >
                  <Trash2 />
                </button>
              </div>
            ))}
            <button
              className="secondary"
              type="button"
              disabled={!library.length || items.length >= 15}
              onClick={() =>
                setItems([...items, { foodId: library[0].id, grams: 100 }])
              }
            >
              <Plus />
              Ingredient
            </button>
            <label className="field small-space">
              Preparation
              <textarea
                value={instructions}
                maxLength={2000}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </label>
            <button className="primary" disabled={busy || !items.length}>
              Save recipe
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={selected !== null}
        onOpenChange={(v) => !v && setSelected(null)}
      >
        <DialogContent className="fit-dialog">
          <DialogTitle>{selected?.name}</DialogTitle>
          <DialogDescription>
            Check ingredients and portions against your own needs.
          </DialogDescription>
          {selected && (
            <>
              {recipeDetails(state, selected).items.map((i, n) => (
                <p key={n}>
                  {i.food?.name} · {i.grams} g
                </p>
              ))}
              <p>{selected.instructions}</p>
              <label className="field">
                Plan for
                <input
                  type="date"
                  min={dateKey(new Date(), state.profile.timezone)}
                  value={planDate}
                  onChange={(e) => setPlanDate(e.target.value)}
                />
              </label>
              <button
                className="primary"
                disabled={busy}
                onClick={async () => {
                  if (
                    await act(
                      {
                        type: "plan-meal",
                        id: crypto.randomUUID(),
                        recipeId: selected.id,
                        date: planDate,
                      },
                      false,
                    )
                  )
                    setSelected(null);
                }}
              >
                Add to meal plan
              </button>
              <div className="row wrap">
                <button
                  className="text-button"
                  disabled={busy}
                  onClick={() =>
                    void act(
                      { type: "recipe-rating", id: selected.id, rating: 1 },
                      false,
                    )
                  }
                >
                  <Star />
                  More like this
                </button>
                <button
                  className="text-button danger"
                  disabled={busy}
                  onClick={async () => {
                    if (
                      await act(
                        { type: "recipe-rating", id: selected.id, rating: -1 },
                        false,
                      )
                    )
                      setSelected(null);
                  }}
                >
                  Don’t recommend again
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={confirm !== null}
        onOpenChange={(v) => !v && setConfirm(null)}
      >
        <DialogContent className="fit-dialog">
          <DialogTitle>Log {confirm?.name}?</DialogTitle>
          <DialogDescription>
            Confirm these are the portions you ate. All ingredients are saved
            together.
          </DialogDescription>
          {confirm && (
            <>
              {recipeDetails(state, confirm).items.map((i, n) => (
                <p key={n}>
                  {i.food?.name} · {i.grams} g
                </p>
              ))}
              <button
                className="primary"
                disabled={busy}
                onClick={async () => {
                  if (
                    await act(
                      {
                        type: "log-recipe",
                        id: confirm.id,
                        deductPantry: recipeDetails(state, confirm).pantryReady,
                      },
                      false,
                    )
                  )
                    setConfirm(null);
                }}
              >
                Confirm meal{" "}
                {recipeDetails(state, confirm).pantryReady
                  ? "& deduct pantry"
                  : ""}
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
export function Milestones({ state }: { state: State }) {
  return (
    <section className="panel small-space">
      <div className="row">
        <Trophy />
        <h3>Recognize the consistency</h3>
      </div>
      <div className="achievement-grid">
        {achievements(state).map((a) => (
          <div
            key={a.name}
            className={a.earned ? "achievement earned" : "achievement"}
          >
            <span>{a.earned ? "Earned" : "In progress"}</span>
            <h3>{a.name}</h3>
            <p>{a.detail}</p>
          </div>
        ))}
      </div>
      <h3 className="small-space">Your recorded bests</h3>
      {personalRecords(state).map((p) => (
        <div className="metric-line" key={p.exercise}>
          <span>{p.exercise}</span>
          <strong>
            {p.load} kg × {p.reps}
          </strong>
          <small>{p.date}</small>
        </div>
      ))}
    </section>
  );
}
export function ProductPreferences({ state, busy, act }: Props) {
  const p = state.preferences ?? defaults();
  return (
    <div className="small-space">
      <h3>Appearance & coaching</h3>
      <form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);void act({type:"preferences",preferences:{...p,weeklyBudget:Number(f.get("budget"))}},false);}}>
        <label className="field">Weekly grocery budget ($)<input name="budget" type="number" min={0} max={10000} step="0.01" required defaultValue={p.weeklyBudget}/></label>
        <button className="secondary" disabled={busy}>Save budget</button>
      </form>
      <label className="field small-space">
        Appearance
        <select
          value={p.theme}
          disabled={busy}
          onChange={(e) =>
            void act(
              {
                type: "preferences",
                preferences: {
                  ...p,
                  theme: e.target.value as "light" | "dark",
                },
              },
              false,
            )
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className="consent">
        <Checkbox
          checked={p.aiConsent}
          disabled={busy}
          onCheckedChange={(v) =>
            void act(
              {
                type: "preferences",
                preferences: { ...p, aiConsent: v === true },
              },
              false,
            )
          }
        />
        Allow the configured AI provider (including Hugging Face and its inference
        provider when enabled) to receive my relevant daily health summary,
        training and nutrition context when I ask a question.
      </label>
      <p className="muted">
        Off by default. You can revoke consent anytime. Provider setup is
        separate; core logging works without AI. With consent off, no context is
        sent to an AI provider. Basic coaching remains available; this is not
        an on-device language model.
      </p>
    </div>
  );
}
export function DevicePairing({ configured }: { configured: boolean }) {
  const [credential, setCredential] = useState<{
      token: string;
      endpoint: string;
      expires: string;
    } | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function pair() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const d = (await r.json()) as {
        token: string;
        endpoint: string;
        expires: string;
        error?: string;
      };
      if (!r.ok) throw new Error(d.error ?? "Could not pair this device.");
      setCredential(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not pair.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="panel">
      <h3>Connect your iPhone</h3>
      <p className="small-space">
        {configured
          ? "Create a private pairing credential, then enter it in the native FitLive app. Creating a new credential revokes the previous one."
          : "Native account linking becomes available when the Java backend is configured."}
      </p>
      {error && <p role="alert">{error}</p>}
      {credential && (
        <>
          <label className="field small-space">
            Server address
            <input readOnly value={credential.endpoint} />
          </label>
          <label className="field">
            Private pairing token
            <input type="password" readOnly value={credential.token} />
          </label>
          <button
            className="secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(credential.token);
              } catch {
                setError(
                  "Clipboard unavailable. Select and copy the token field.",
                );
              }
            }}
          >
            Copy pairing token
          </button>
          <p className="muted small-space">
            Shown only now. Expires{" "}
            {new Date(credential.expires).toLocaleDateString()}.
          </p>
        </>
      )}
      <div className="row wrap small-space">
        <button
          className="secondary"
          disabled={!configured || busy}
          onClick={() => void pair()}
        >
          Create pairing credential
        </button>
        <button
          className="text-button danger"
          disabled={!configured || busy}
          onClick={async () => {
            const r = await fetch("/api/devices", { method: "DELETE" });
            if (r.ok) {
              setCredential(null);
              setError("Device access revoked.");
            } else setError("Could not revoke; please retry.");
          }}
        >
          Revoke device access
        </button>
      </div>
    </section>
  );
}
