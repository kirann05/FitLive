"use client";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import {
  Activity,
  ArrowUpRight,
  Dumbbell,
  Moon,
  Utensils,
  TrendingUp,
  MessageCircle,
  Heart,
  Settings,
  Sun,
  Plus,
  Check,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Clock,
  Download,
  Leaf,
  ShoppingBasket,
  Info,
  Send,
  CloudOff,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster, toast } from "sonner";
import {
  blank,
  foods,
  allowed,
  recommendation,
  recovery,
  totals,
  plan,
  forecast,
  dateKey,
  sessionName,
  type State,
  type Command,
  type Food,
  type Profile,
  type SetLog,
  type Pantry,
} from "@/lib/domain";
const destinations = [
  { name: "Today", icon: Sun },
  { name: "Train", icon: Dumbbell },
  { name: "Eat", icon: Utensils },
  { name: "Progress", icon: TrendingUp },
  { name: "Coach", icon: MessageCircle },
];
const time = (minutes: number) =>
  `${Math.floor(minutes / 60)}h ${Math.round(minutes % 60)}m`;
const round = (n: number) => Math.round(n);
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
function Empty({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty">
      <Activity />
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="fit-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
function saveFile(name: string, data: string, type = "application/json") {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function Home({ ownerId }: { ownerId: string }) {
  const draftKey = "fitlive-workout-draft:" + ownerId;
  const [s, setS] = useState<State>(blank),
    [version, setVersion] = useState(0),
    [tab, setTab] = useState("Today"),
    [eatTab, setEatTab] = useState("Meals"),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [modal, setModal] = useState(""),
    [offline, setOffline] = useState(false),
    [deleting, setDeleting] = useState(false),
    [modeConfirm, setModeConfirm] = useState<"demo" | "real" | null>(null),
    [draft, setDraft] = useState<SetLog[]>([]),
    [active, setActive] = useState(false),
    [rest, setRest] = useState(0),
    [chat, setChat] = useState(""),
    [foodQuery, setFoodQuery] = useState(""),
    [searching, setSearching] = useState(false),
    [searchResults, setSearchResults] = useState<Food[]>([]),
    [selectedFood, setSelectedFood] = useState<Food | null>(null),
    [foodError, setFoodError] = useState(""),
    [pantryEdit, setPantryEdit] = useState<Pantry | null>(null);
  const pending = useRef<{ key: string; id: string; version: number } | null>(
    null,
  );
  const reload = useCallback(async () => {
    try {
      setError("");
      const r = await fetch("/api/state", { cache: "no-store" });
      const d = (await r.json()) as {
        error: string;
        state: State;
        version: number;
      };
      if (!r.ok) throw new Error(d.error);
      setS(d.state);
      setVersion(d.version);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load your data.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    queueMicrotask(() => void reload());
    const update = () => setOffline(!navigator.onLine);
    queueMicrotask(update);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, [reload]);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(draftKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setDraft(parsed);
            setActive(true);
          }
        }
      } catch {
        /* A corrupted draft does not affect cloud records. */
      }
    });
  }, [draftKey]);
  useEffect(() => {
    if (active) localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [draft, active, draftKey]);
  useEffect(() => {
    if (rest <= 0) return;
    const timer = setInterval(() => setRest((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(timer);
  }, [rest]);
  async function act(command: Command, close = true) {
    if (busy) return false;
    setBusy(true);
    setError("");
    try {
      const key = JSON.stringify(command);
      if (pending.current?.key !== key)
        pending.current = { key, id: crypto.randomUUID(), version };
      const operation = pending.current;
      const r = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: operation.id,
          version: operation.version,
          command,
        }),
      });
      const d = (await r.json()) as {
        error: string;
        state: State;
        version: number;
      };
      if (!r.ok) {
        if (r.status === 409) {
          pending.current = null;
          await reload();
        }
        throw new Error(d.error);
      }
      pending.current = null;
      setS(d.state);
      setVersion(d.version);
      if (close) setModal("");
      toast.success(
        command.type === "delete"
          ? "Your cloud data was deleted."
          : "Saved to your account",
      );
      return true;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Could not save. Please retry.";
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    const context = (
      document as unknown as {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => Promise<void>;
        };
      }
    ).modelContext;
    if (!context) return;
    const controller = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: "get_fitlive_daily_context",
          title: "Read daily context",
          description:
            "Read the saved recovery, nutrition totals and next recommendation. Does not modify health data.",
          inputSchema: {
            type: "object",
            properties: {},
            additionalProperties: false,
          },
          annotations: { readOnlyHint: true, untrustedContentHint: true },
          execute: (input: unknown) => {
            if (
              input === null ||
              typeof input !== "object" ||
              Object.keys(input).length
            )
              throw new Error("Expected an empty object.");
            return {
              mode: s.mode,
              recovery: recovery(s),
              nutrition: totals(s),
              recommendation: recommendation(s),
            };
          },
        },
        { signal: controller.signal },
      ),
    ).catch(() => {});
    return () => controller.abort();
  }, [s]);
  const r = recovery(s),
    rec = recommendation(s),
    t = totals(s),
    day = dateKey(new Date(), s.profile.timezone),
    workout = plan(s),
    low = forecast(s).filter((p) => p.low),
    todayMeals = s.meals.filter((x) => x.date === day),
    todayWorkout = s.workouts.filter((w) => w.date === day);
  const suggestions = foods.filter(
    (f) =>
      allowed(f, s.profile) &&
      s.pantry.some((p) => p.name === f.name && p.quantity > 0),
  );
  function startWorkout() {
    setActive(true);
    setTab("Train");
  }
  async function searchFoods() {
    setSearching(true);
    setFoodError("");
    try {
      const resp = await fetch("/api/foods?q=" + encodeURIComponent(foodQuery));
      const d = (await resp.json()) as { error: string; foods: Food[] };
      if (!resp.ok) throw new Error(d.error);
      setSearchResults(
        d.foods.map((f: Food) => ({
          ...f,
          vegan: false,
          vegetarian: false,
          allergens: [],
        })),
      );
    } catch (e) {
      setFoodError(e instanceof Error ? e.message : "Search unavailable.");
    } finally {
      setSearching(false);
    }
  }
  const showSettings = () => setModal("profile");
  return (
    <main className="shell">
      <Toaster position="bottom-right" />
      <header className="topbar">
        <Link className="brand" href="/">
          <Activity />
          FitLive<span>PERFORMANCE, IN BALANCE</span>
        </Link>
        <div className="row">
          <span className="desktop muted">
            {new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              timeZone: s.profile.timezone,
            }).format(new Date())}
          </span>
          <button
            className="avatar"
            aria-label="Open profile and settings"
            onClick={showSettings}
          >
            {s.profile.name.charAt(0)}
          </button>
        </div>
      </header>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="navigation" aria-label="Main navigation">
          {destinations.map(({ name, icon: Icon }) => (
            <TabsTrigger key={name} value={name}>
              <Icon />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="page">
          {offline && (
            <div className="notice">
              <CloudOff />
              You’re offline. Workout drafts stay on this device until you save
              online.
            </div>
          )}
          {error && (
            <div role="alert" className="notice error">
              <span>{error}</span>
              <button onClick={() => void reload()}>
                <RefreshCw />
                Retry
              </button>
            </div>
          )}
          {loading ? (
            <Empty
              title="Bringing your day together"
              text="Loading your saved plan and recent activity."
            />
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">
                    {tab === "Today"
                      ? "YOUR DAILY COMPASS"
                      : tab === "Train"
                        ? "MOVE WITH INTENTION"
                        : tab === "Eat"
                          ? "FUEL YOUR EVERYDAY"
                          : tab === "Progress"
                            ? "THE BIGGER PICTURE"
                            : "YOUR CONTEXT, CONNECTED"}
                  </p>
                  <h1>
                    {tab === "Today"
                      ? `Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, ${s.profile.name}.`
                      : tab === "Train"
                        ? "Strong, one session at a time."
                        : tab === "Eat"
                          ? "Eat well. Keep it simple."
                          : tab === "Progress"
                            ? "Small steps add up."
                            : "Let’s connect the dots."}
                  </h1>
                  <p>
                    {tab === "Today"
                      ? "A clear next step, with room to listen to yourself."
                      : tab === "Train"
                        ? "A plan that adapts to what you actually do."
                        : tab === "Eat"
                          ? "Your meals, your pantry, your next sensible choice."
                          : tab === "Progress"
                            ? "Look for patterns, not perfect days."
                            : "Grounded in your saved training, recovery and food."}
                  </p>
                </div>
                <button
                  className="chip"
                  onClick={() => setModal("connections")}
                >
                  {s.mode === "demo"
                    ? "Demo · sample data"
                    : "Personal workspace"}
                  <Info size={14} />
                </button>
              </div>
              {!s.onboarded && (
                <section className="welcome panel">
                  <div>
                    <p className="eyebrow">MAKE FITLIVE YOURS</p>
                    <h2>Start with what matters to you.</h2>
                    <p>
                      Set your goals and food preferences, or explore a clearly
                      labeled sample week.
                    </p>
                  </div>
                  <div className="row wrap">
                    <button className="primary" onClick={showSettings}>
                      Set up my profile <ArrowRight />
                    </button>
                    <button
                      className="secondary"
                      disabled={busy}
                      onClick={() => void act({ type: "mode", mode: "demo" })}
                    >
                      Explore demo
                    </button>
                  </div>
                </section>
              )}
              <TabsContent value="Today">
                <div className="today-grid">
                  <article className="next-action">
                    <div className="row spread">
                      <span className="eyebrow">YOUR NEXT SENSIBLE ACTION</span>
                      <Sun />
                    </div>
                    <h2>{rec.title}</h2>
                    <p>{rec.text}</p>
                    <div className="row wrap">
                      <button
                        className="primary"
                        disabled={!s.onboarded}
                        onClick={() =>
                          rec.target === "Today"
                            ? setModal("why")
                            : setTab(rec.target)
                        }
                      >
                        {rec.action}
                        <ArrowUpRight />
                      </button>
                      <button
                        className="text-button"
                        onClick={() => setModal("why")}
                      >
                        Why this?
                      </button>
                    </div>
                    <div className="hero-foot">
                      {todayWorkout.length
                        ? "SESSION RECORDED"
                        : sessionName(s).toUpperCase()}
                      <span>
                        35–45 min ·{" "}
                        {r.band === "Reduced"
                          ? "Adjusted for today"
                          : "Your pace, your effort"}
                      </span>
                    </div>
                  </article>
                  <article className="panel recovery">
                    <div className="row spread">
                      <h3>Recovery context</h3>
                      <Heart />
                    </div>
                    <h2>{!r.latest ? "Building your baseline" : r.band}</h2>
                    <span
                      className={
                        "chip " + (r.band === "Reduced" ? "amber" : "")
                      }
                    >
                      {r.confidence} confidence
                    </span>
                    <p>{r.reasons[0]}</p>
                    <div className="metric-line">
                      <span>
                        <Moon />
                        Sleep
                      </span>
                      <strong>{r.latest ? time(r.latest.sleep) : "—"}</strong>
                    </div>
                    <div className="metric-line">
                      <span>
                        <Heart />
                        Resting heart rate
                      </span>
                      <strong>
                        {r.latest?.rhr ? `${r.latest.rhr} bpm` : "—"}
                      </strong>
                    </div>
                    <p className="muted">
                      {r.latest
                        ? `${r.latest.source} · ${r.days}-day baseline${r.stale ? " · Stale" : ""}`
                        : "Add a check-in or manual health entry to begin."}
                    </p>
                  </article>
                </div>
                <div className="bottom-grid">
                  <article className="panel">
                    <div className="row spread">
                      <p className="eyebrow">FUEL YOUR DAY</p>
                      <Utensils />
                    </div>
                    <h3 className="section-title">
                      {Math.max(0, round(s.profile.protein - t.protein))} g
                      protein to your target
                    </h3>
                    <Progress
                      value={Math.min(
                        100,
                        (t.protein / s.profile.protein) * 100,
                      )}
                      aria-label={`${round(t.protein)} of ${s.profile.protein} grams protein`}
                    />
                    <div className="row spread small-space">
                      <p className="muted">
                        {round(t.protein)} / {s.profile.protein} g
                      </p>
                      <p className="muted">
                        {round(t.kcal)} / {s.profile.calories} kcal
                      </p>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => {
                        setTab("Eat");
                        setModal("meal");
                      }}
                    >
                      Log a meal <ArrowRight />
                    </button>
                  </article>
                  <article className="panel">
                    <div className="row spread">
                      <p className="eyebrow">A MOMENT FOR YOU</p>
                      <Sun />
                    </div>
                    <h3 className="section-title">How are you feeling?</h3>
                    <p>
                      {s.checkins.some((c) => c.date === day)
                        ? "Your check-in is saved. Update it if your day changes."
                        : "Five seconds to bring the numbers into context."}
                    </p>
                    <button
                      className="secondary small-space"
                      onClick={() => setModal("checkin")}
                    >
                      {s.checkins.some((c) => c.date === day)
                        ? "Update check-in"
                        : "Quick check-in"}
                      <Plus />
                    </button>
                  </article>
                </div>
                {low.length > 0 && (
                  <button
                    className="pantry-notice"
                    onClick={() => {
                      setTab("Eat");
                      setEatTab("Pantry");
                    }}
                  >
                    <ShoppingBasket />
                    <span>
                      {low.length} pantry{" "}
                      {low.length === 1 ? "item is" : "items are"} running low.
                      Review quantities before shopping.
                    </span>
                    <ChevronRight />
                  </button>
                )}
                <div className="feedback-row">
                  <span className="muted">Does today’s suggestion fit?</span>
                  <button
                    disabled={busy}
                    onClick={() =>
                      void act({
                        type: "feedback",
                        feedback: "accepted",
                        note: "Fits today",
                      })
                    }
                  >
                    Works for me
                  </button>
                  <button onClick={() => setModal("feedback")}>
                    I’d change something
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="Train">
                <div className="section-bar">
                  <div className="row">
                    <span className="chip">{s.profile.days} days / week</span>
                    <span className="muted">
                      {s.profile.equipment} · Loads in kg
                    </span>
                  </div>
                  <button className="secondary" onClick={showSettings}>
                    Training preferences
                  </button>
                </div>
                <div className="today-grid">
                  <section className="panel">
                    <div className="row spread">
                      <div>
                        <p className="eyebrow">TODAY’S SESSION</p>
                        <h2 className="section-title">{sessionName(s)}</h2>
                      </div>
                      <Dumbbell />
                    </div>
                    <p>
                      {r.band === "Reduced"
                        ? "Suggested loads are 10% lighter today. Keep at least two reps in reserve."
                        : "Build controlled reps. Adjust to a load that feels comfortable."}
                    </p>
                    {workout.map((x, i) => (
                      <div className="exercise" key={x.name}>
                        <span className="exercise-number">0{i + 1}</span>
                        <div>
                          <h3>{x.name}</h3>
                          <p className="muted">
                            {x.sets} × {x.reps} · {x.load} kg · {x.muscle}
                          </p>
                          <p className="muted">{x.reason}</p>
                        </div>
                      </div>
                    ))}
                    <button
                      className="primary"
                      disabled={!s.onboarded}
                      onClick={startWorkout}
                    >
                      {active ? "Continue workout" : "Start session"}
                      <ArrowUpRight />
                    </button>
                  </section>
                  <section className="panel">
                    <p className="eyebrow">YOUR TRAINING LOG</p>
                    <h3 className="section-title">Recent sessions</h3>
                    {s.workouts.length ? (
                      s.workouts
                        .slice(-6)
                        .reverse()
                        .map((w) => (
                          <details className="history" key={w.id}>
                            <summary>
                              {w.date}
                              <span>
                                {w.sets.length} sets · {w.status}
                              </span>
                            </summary>
                            {w.sets.map((x, i) => (
                              <p className="muted" key={i}>
                                {x.exercise}: {x.reps} × {x.load} kg · RPE{" "}
                                {x.rpe}
                              </p>
                            ))}
                          </details>
                        ))
                    ) : (
                      <Empty
                        title="Your first session starts here"
                        text="Saved sets shape your next load recommendation."
                      />
                    )}
                  </section>
                </div>
                {active && (
                  <section className="panel workout-log">
                    <div className="row spread">
                      <div>
                        <p className="eyebrow">LIVE WORKOUT</p>
                        <h2 className="section-title">One set at a time.</h2>
                      </div>
                      <span className="chip">
                        <Clock />
                        {rest > 0
                          ? `${Math.floor(rest / 60)}:${String(rest % 60).padStart(2, "0")} rest`
                          : "Ready when you are"}
                      </span>
                    </div>
                    <SetForm
                      workout={workout}
                      onAdd={(x) => {
                        setDraft([...draft, x]);
                        setRest(90);
                        toast.success("Set added to your device draft");
                      }}
                    />
                    {draft.length > 0 && (
                      <div className="set-table">
                        <div className="set-row table-head">
                          <span>Exercise</span>
                          <span>Reps</span>
                          <span>kg</span>
                          <span>RPE</span>
                          <span />
                        </div>
                        {draft.map((x, i) => (
                          <div className="set-row" key={i}>
                            <span>{x.exercise}</span>
                            <span>{x.reps}</span>
                            <span>{x.load}</span>
                            <span>{x.rpe}</span>
                            <button
                              aria-label={`Remove set ${i + 1}`}
                              onClick={() =>
                                setDraft(draft.filter((_, j) => j !== i))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <form
                      className="row wrap small-space"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const f = new FormData(e.currentTarget);
                        if (
                          await act({
                            type: "workout",
                            sets: draft,
                            effort: f.get("effort") as "About right",
                            status: f.get("status") as "completed",
                          })
                        ) {
                          setDraft([]);
                          setActive(false);
                          localStorage.removeItem(draftKey);
                        }
                      }}
                    >
                      <Field label="How did it feel?">
                        <select name="effort">
                          <option>About right</option>
                          <option>Too hard</option>
                          <option>Too easy</option>
                        </select>
                      </Field>
                      <Field label="Session status">
                        <select name="status">
                          <option value="completed">Completed</option>
                          <option value="partial">Finished early</option>
                        </select>
                      </Field>
                      <button
                        className="primary"
                        disabled={busy || !draft.length || offline}
                      >
                        Save workout <Check />
                      </button>
                    </form>
                    <p className="muted small-space">
                      Sets are a temporary device draft until you save.
                      Reloading restores your draft.
                    </p>
                  </section>
                )}
              </TabsContent>
              <TabsContent value="Eat">
                <div className="macro-grid">
                  {[
                    ["Protein", t.protein, s.profile.protein, "g"],
                    ["Energy", t.kcal, s.profile.calories, "kcal"],
                    ["Carbs", t.carbs, 0, "g"],
                    ["Fat", t.fat, 0, "g"],
                  ].map(([name, value, target, unit]) => (
                    <article className="panel macro" key={String(name)}>
                      <p>{name}</p>
                      <h2>
                        {round(Number(value))}
                        <small> {unit}</small>
                      </h2>
                      {Number(target) > 0 ? (
                        <>
                          <Progress
                            value={Math.min(
                              100,
                              (Number(value) / Number(target)) * 100,
                            )}
                            aria-label={`${name}: ${round(Number(value))} of ${target} ${unit}`}
                          />
                          <p className="muted">
                            of {target} {unit}
                          </p>
                        </>
                      ) : (
                        <p className="muted">logged today</p>
                      )}
                    </article>
                  ))}
                </div>
                <Tabs value={eatTab} onValueChange={setEatTab}>
                  <div className="section-bar">
                    <TabsList>
                      <TabsTrigger value="Meals">Meals</TabsTrigger>
                      <TabsTrigger value="Pantry">Pantry</TabsTrigger>
                      <TabsTrigger value="Groceries">Groceries</TabsTrigger>
                    </TabsList>
                    <button
                      className="secondary"
                      onClick={() => {
                        if (eatTab === "Meals") setModal("meal");
                        else if (eatTab === "Pantry") {
                          setPantryEdit(null);
                          setModal("pantry");
                        } else void act({ type: "grocery-generate" });
                      }}
                    >
                      <Plus />
                      {eatTab === "Meals"
                        ? "Log food"
                        : eatTab === "Pantry"
                          ? "Add item"
                          : "Refresh list"}
                    </button>
                  </div>
                  <TabsContent value="Meals">
                    <div className="bottom-grid">
                      <section className="panel">
                        <p className="eyebrow">ON YOUR PLATE</p>
                        <h3 className="section-title">Today’s food log</h3>
                        {todayMeals.length ? (
                          todayMeals.map((m) => (
                            <div className="food-row" key={m.id}>
                              <div className="food-icon">
                                <Utensils />
                              </div>
                              <div>
                                <h3>{m.food.name}</h3>
                                <p className="muted">
                                  {m.grams} g ·{" "}
                                  {round((m.food.kcal * m.grams) / 100)} kcal ·{" "}
                                  {round((m.food.protein * m.grams) / 100)} g
                                  protein
                                </p>
                                <p className="muted">{m.food.source}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <Empty
                            title="A fresh page for today"
                            text="Log a confirmed portion to begin. Nutrition estimates stay tied to their source."
                          />
                        )}
                      </section>
                      <section className="panel soft">
                        <p className="eyebrow">FROM YOUR PANTRY</p>
                        <h3 className="section-title">
                          Work with what you have.
                        </h3>
                        <p>
                          Suggestions respect your saved diet, allergies and
                          exclusions.
                        </p>
                        {s.mode === "demo" && suggestions.length ? (
                          suggestions.slice(0, 3).map((f) => (
                            <button
                              className="suggestion"
                              key={f.id}
                              onClick={() => {
                                setSelectedFood(f);
                                setModal("portion");
                              }}
                            >
                              <Leaf />
                              <span>
                                {f.name}
                                <small>Confirm your portion</small>
                              </span>
                              <Plus />
                            </button>
                          ))
                        ) : (
                          <p className="small-space">
                            {s.mode === "real"
                              ? "Choose a verified food record or package label, then link the matching pantry item when logging."
                              : "No matching pantry foods. Add ingredients that fit your preferences."}
                          </p>
                        )}
                      </section>
                    </div>
                  </TabsContent>
                  <TabsContent value="Pantry">
                    <section className="panel">
                      <h3>Your kitchen, with a little context.</h3>
                      <p className="small-space">
                        Quantities are estimates. Confirm them when you open a
                        package or before shopping.
                      </p>
                      {s.pantry.length ? (
                        forecast(s).map((p) => (
                          <div className="inventory-row" key={p.id}>
                            <Leaf />
                            <div>
                              <h3>{p.name}</h3>
                              <p className="muted">
                                {p.confidence} confidence ·{" "}
                                {p.days === null
                                  ? "Not enough consumption history"
                                  : `About ${p.days} days at recent use`}
                              </p>
                            </div>
                            <strong>
                              ~{round(p.quantity)} {p.unit}
                            </strong>
                            {p.low && <span className="chip amber">Low</span>}
                            <button
                              className="text-button"
                              onClick={() => {
                                setPantryEdit(p);
                                setModal("pantry");
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        ))
                      ) : (
                        <Empty
                          title="What’s in your kitchen?"
                          text="Add a few staples. Matched food logs can deduct their confirmed portions."
                        />
                      )}
                    </section>
                  </TabsContent>
                  <TabsContent value="Groceries">
                    <section className="panel">
                      <div className="row spread">
                        <div>
                          <h3>Your next shopping list</h3>
                          <p>
                            Based on low pantry stock. Review quantities and
                            labels before buying.
                          </p>
                        </div>
                        <span className="chip">List only · No purchases</span>
                      </div>
                      {s.grocery.length ? (
                        s.grocery.map((g) => (
                          <div className="inventory-row" key={g.id}>
                            <Checkbox
                              id={g.id}
                              checked={g.checked}
                              disabled={busy}
                              onCheckedChange={(v) =>
                                void act(
                                  {
                                    type: "grocery-check",
                                    id: g.id,
                                    checked: v === true,
                                  },
                                  false,
                                )
                              }
                            />
                            <label
                              htmlFor={g.id}
                              className={g.checked ? "checked" : ""}
                            >
                              {g.name}
                            </label>
                            <span>
                              {g.quantity}{" "}
                              {s.pantry.find((p) => p.id === g.id)?.unit ?? "g"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <Empty
                          title="Keep shopping intentional"
                          text="Refresh the list to include low-stock items. An empty list means nothing is flagged yet."
                        />
                      )}
                      <button
                        className="secondary"
                        disabled={!s.grocery.length}
                        onClick={() =>
                          saveFile(
                            "fitlive-shopping-list.txt",
                            s.grocery
                              .map(
                                (x) =>
                                  `${x.checked ? "[x]" : "[ ]"} ${x.name}: ${x.quantity} ${s.pantry.find((p) => p.id === x.id)?.unit ?? "g"}`,
                              )
                              .join("\n"),
                            "text/plain",
                          )
                        }
                      >
                        <Download />
                        Export shopping list
                      </button>
                    </section>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value="Progress">
                <ProgressView state={s} />
                <section className="panel small-space">
                  <h3>Why your plan changed</h3>
                  <p className="small-space">
                    A record of recommendations and your feedback.
                  </p>
                  {s.audit.length ? (
                    s.audit
                      .slice(-10)
                      .reverse()
                      .map((a) => (
                        <details className="history" key={a.id + a.at}>
                          <summary>
                            {a.text}
                            <span>
                              {a.feedback ?? a.confidence + " confidence"}
                            </span>
                          </summary>
                          <p className="muted">
                            {new Date(a.at).toLocaleString()} · State version{" "}
                            {a.version} · Rules v1
                          </p>
                          <p>
                            {a.rules.length
                              ? a.rules.join(" · ")
                              : "No adjustment rule triggered."}
                          </p>
                          {a.note && <p>{a.note}</p>}
                        </details>
                      ))
                  ) : (
                    <Empty
                      title="Your decisions leave a useful trail"
                      text="Check in, save a workout or log a meal to record the next recommendation."
                    />
                  )}
                </section>
              </TabsContent>
              <TabsContent value="Coach">
                <section className="coach panel">
                  <div className="row spread">
                    <div className="row">
                      <MessageCircle />
                      <h3>Your daily coach</h3>
                    </div>
                    <span className="chip">Rules-based · No AI connected</span>
                  </div>
                  <p className="muted small-space">
                    Reads your current state. It cannot diagnose, purchase
                    groceries, or change your data through conversation.
                  </p>
                  <div className="conversation" aria-live="polite">
                    {!s.messages.length ? (
                      <Empty
                        title="Less guesswork. More context."
                        text="Ask why today’s plan changed or what’s available in your pantry."
                      />
                    ) : (
                      s.messages.map((m, i) => (
                        <div className={`message ${m.role}`} key={i}>
                          <span className="eyebrow">
                            {m.role === "user" ? "YOU" : "FITLIVE"}
                          </span>
                          <p>{m.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="row wrap">
                    {[
                      "Why this workout?",
                      "What can I eat?",
                      "What about groceries?",
                    ].map((q) => (
                      <button
                        className="suggested-question"
                        disabled={busy}
                        key={q}
                        onClick={() =>
                          void act({ type: "chat", message: q }, false)
                        }
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <form
                    className="chat-input"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (await act({ type: "chat", message: chat }, false))
                        setChat("");
                    }}
                  >
                    <input
                      aria-label="Message your coach"
                      placeholder="Ask about your day…"
                      value={chat}
                      maxLength={1000}
                      onChange={(e) => setChat(e.target.value)}
                    />
                    <button
                      className="primary"
                      aria-label="Send message"
                      disabled={busy || !chat.trim()}
                    >
                      <Send />
                    </button>
                  </form>
                </section>
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
      <footer>
        <Activity size={16} />
        FitLive<span>Small decisions. A stronger everyday.</span>
        <button className="text-button" onClick={() => setModal("privacy")}>
          <ShieldCheck />
          Privacy
        </button>
        <button
          className="text-button"
          aria-label="Settings"
          onClick={showSettings}
        >
          <Settings />
        </button>
      </footer>
      <Modal
        open={modal === "why"}
        onClose={() => setModal("")}
        title="Why this recommendation?"
        description="Context, not a medical recovery score."
      >
        <span className="chip">{r.confidence} confidence · Rules v1</span>
        {r.reasons.map((x) => (
          <p key={x} className="reason">
            <Info />
            {x}
          </p>
        ))}
        <p>
          {r.band === "Reduced"
            ? "Two or more signals triggered a conservative 10% load adjustment."
            : "A single sleep or HRV reading does not trigger a large training change."}
        </p>
        <p className="muted">
          Baseline: {r.days} prior days. Latest sample:{" "}
          {r.latest?.sampleAt
            ? new Date(r.latest.sampleAt).toLocaleString()
            : "None"}
          . Last sync:{" "}
          {r.latest?.syncAt
            ? new Date(r.latest.syncAt).toLocaleString()
            : "None"}
          .
        </p>
      </Modal>
      <Modal
        open={modal === "profile"}
        onClose={() => setModal("")}
        title={
          s.onboarded
            ? "Your profile & preferences"
            : "A good plan starts with you"
        }
        description="You can change these anytime. Targets are editable planning values, not medical prescriptions."
      >
        <ProfileForm
          profile={s.profile}
          busy={busy}
          onSave={(p) =>
            void act({
              type: "profile",
              profile: p as Extract<Command, { type: "profile" }>["profile"],
            })
          }
        />
        <div className="row wrap">
          <button
            className="text-button"
            onClick={() => setModal("connections")}
          >
            Connections
          </button>
          <button className="text-button" onClick={() => setModal("privacy")}>
            Privacy & data
          </button>
        </div>
      </Modal>
      <Modal
        open={modal === "checkin"}
        onClose={() => setModal("")}
        title="A quick check-in"
        description="Your own experience helps put wearable signals in perspective."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            void act({
              type: "checkin",
              energy: Number(f.get("energy")),
              soreness: Number(f.get("soreness")),
              motivation: Number(f.get("motivation")),
              note: String(f.get("note")),
            });
          }}
        >
          {["energy", "soreness", "motivation"].map((k) => (
            <Field
              key={k}
              label={`${k.charAt(0).toUpperCase() + k.slice(1)} · 1 low, 5 high`}
            >
              <input
                type="range"
                name={k}
                min="1"
                max="5"
                step="1"
                defaultValue={
                  s.checkins.find((c) => c.date === day)?.[k as "energy"] ?? 3
                }
              />
              <div className="range-labels">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </Field>
          ))}
          <Field label="Anything else? (optional)">
            <textarea
              name="note"
              maxLength={500}
              placeholder="How today feels…"
            />
          </Field>
          <button className="primary" disabled={busy}>
            Save check-in <Check />
          </button>
        </form>
      </Modal>
      <Modal
        open={modal === "feedback"}
        onClose={() => setModal("")}
        title="Make the plan fit your day"
        description="Your response is saved with this recommendation."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            void act({
              type: "feedback",
              feedback: f.get("choice") as "modified",
              note: String(f.get("note")),
            });
          }}
        >
          <Field label="Your choice">
            <select name="choice">
              <option value="modified">I’ll adapt it</option>
              <option value="rejected">Skip this recommendation</option>
            </select>
          </Field>
          <Field label="What would you change?">
            <textarea name="note" maxLength={500} required />
          </Field>
          <button className="primary" disabled={busy}>
            Save feedback
          </button>
        </form>
      </Modal>
      <Modal
        open={modal === "meal"}
        onClose={() => setModal("")}
        title="Log food, without the guesswork"
        description="Find a food, then confirm the portion and dietary details before saving."
      >
        <div className="search-row">
          <input
            aria-label="Search foods"
            placeholder="Try oats, yogurt, tofu…"
            value={foodQuery}
            onChange={(e) => setFoodQuery(e.target.value)}
          />
          <button
            className="secondary"
            disabled={searching || !foodQuery.trim()}
            onClick={() => void searchFoods()}
          >
            {searching ? "Searching…" : "Search USDA"}
          </button>
        </div>
        {foodError && (
          <p role="alert" className="error-text">
            {foodError}
          </p>
        )}
        {(searchResults.length
          ? searchResults
          : s.mode === "demo"
            ? foods.filter(
                (f) =>
                  allowed(f, s.profile) &&
                  f.name.toLowerCase().includes(foodQuery.toLowerCase()),
              )
            : []
        ).map((f) => (
          <button
            className="suggestion"
            key={f.id}
            onClick={() => {
              setSelectedFood(f);
              setModal("portion");
            }}
          >
            <Utensils />
            <span>
              {f.name}
              <small>{f.source}</small>
            </span>
            <Plus />
          </button>
        ))}
        <button
          className="secondary"
          onClick={() => {
            setSelectedFood(null);
            setModal("portion");
          }}
        >
          Enter a package label
        </button>
        <p className="muted">
          Demo foods use sample nutrient fixtures. Real logs require a verified
          record or your confirmed label.
        </p>
      </Modal>
      <Modal
        open={modal === "portion"}
        onClose={() => setModal("")}
        title="Confirm your food"
        description="Nutrients are per 100 g. Check the product label for ingredients and allergens."
      >
        <MealForm
          food={selectedFood}
          state={s}
          busy={busy}
          onSave={(c) => void act(c)}
        />
      </Modal>
      <Modal
        open={modal === "pantry"}
        onClose={() => setModal("")}
        title={pantryEdit ? "Update pantry item" : "Add to your pantry"}
        description="An honest estimate is more useful than false precision."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            void act({
              type: "pantry",
              id: pantryEdit?.id ?? crypto.randomUUID(),
              name: String(f.get("name")),
              quantity: Number(f.get("quantity")),
              unit: f.get("unit") as "g",
              confidence: f.get("confidence") as "high",
            });
          }}
        >
          <Field label="Food name">
            <input
              name="name"
              required
              maxLength={100}
              defaultValue={pantryEdit?.name}
            />
          </Field>
          <div className="form-grid">
            <Field label="Estimated quantity">
              <input
                name="quantity"
                type="number"
                min="0"
                max="100000"
                step="0.1"
                required
                defaultValue={pantryEdit?.quantity}
              />
            </Field>
            <Field label="Unit">
              <select name="unit" defaultValue={pantryEdit?.unit ?? "g"}>
                <option>g</option>
                <option>ml</option>
                <option>servings</option>
              </select>
            </Field>
          </div>
          <Field label="Confidence">
            <select
              name="confidence"
              defaultValue={pantryEdit?.confidence ?? "medium"}
            >
              <option value="high">High · Just checked</option>
              <option value="medium">Medium · Best estimate</option>
              <option value="low">Low · Needs checking</option>
            </select>
          </Field>
          <button className="primary" disabled={busy}>
            Save item
          </button>
          {pantryEdit && (
            <button
              type="button"
              className="text-button danger"
              disabled={busy}
              onClick={() =>
                void act({ type: "pantry-delete", id: pantryEdit.id })
              }
            >
              Remove item
            </button>
          )}
        </form>
      </Modal>
      <Modal
        open={modal === "connections"}
        onClose={() => setModal("")}
        title="Connections & data sources"
        description="Only active connections are shown as connected."
      >
        <div className="connection">
          <Heart />
          <div>
            <h3>Apple Health</h3>
            <p>
              Not connected. Requires the native iPhone companion, device
              permission and backend setup.
            </p>
          </div>
        </div>
        <div className="connection">
          <Utensils />
          <div>
            <h3>USDA FoodData Central</h3>
            <p>
              Live search requires a server-side API key. Package-label logging
              works without one.
            </p>
          </div>
        </div>
        <button className="secondary" onClick={() => setModal("health")}>
          Add manual health entry
        </button>
        <div className="connection">
          <Activity />
          <div>
            <h3>
              {s.mode === "demo"
                ? "Demo data is active"
                : "Your real workspace is active"}
            </h3>
            <p>
              Switching clears the current dataset. Export it first if you want
              to keep a copy.
            </p>
          </div>
        </div>
        <button
          className="secondary"
          onClick={() => setModeConfirm(s.mode === "demo" ? "real" : "demo")}
        >
          Switch to {s.mode === "demo" ? "real workspace" : "demo data"}
        </button>
      </Modal>
      <Modal
        open={modal === "health"}
        onClose={() => setModal("")}
        title="Add health context"
        description="Manual daily summary. Use the same source consistently; this does not connect Apple Health."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const selected = String(f.get("date"));
            void act({
              type: "health",
              samples: [
                {
                  id: crypto.randomUUID(),
                  date: selected,
                  sleep: Number(f.get("sleep")),
                  rhr: f.get("rhr") ? Number(f.get("rhr")) : null,
                  hrv: f.get("hrv") ? Number(f.get("hrv")) : null,
                  source: "manual",
                  sampleAt: new Date().toISOString(),
                  syncAt: new Date().toISOString(),
                },
              ],
            });
          }}
        >
          <Field label="Date">
            <input
              type="date"
              name="date"
              required
              max={day}
              defaultValue={day}
            />
          </Field>
          <Field label="Total sleep (minutes)">
            <input type="number" name="sleep" min="0" max="1440" required />
          </Field>
          <div className="form-grid">
            <Field label="Resting heart rate (optional)">
              <input type="number" name="rhr" min="20" max="250" />
            </Field>
            <Field label="HRV, ms (optional)">
              <input type="number" name="hrv" min="0" max="500" />
            </Field>
          </div>
          <button className="primary" disabled={busy}>
            Save health entry
          </button>
        </form>
      </Modal>
      <Modal
        open={modal === "privacy"}
        onClose={() => setModal("")}
        title="Your data, your control"
        description="Health and food data belong to you."
      >
        <p>
          Your hosted workspace saves data in your authenticated account.
          Workout drafts stay temporarily on this device. No advertising,
          analytics trackers or automatic grocery purchases are included.
        </p>
        <p>
          USDA searches send the food search text, not your health history. The
          rules-based coach runs without sending health data to a model
          provider.
        </p>
        <button
          className="secondary"
          onClick={() =>
            saveFile("fitlive-data.json", JSON.stringify(s, null, 2))
          }
        >
          <Download />
          Export my data
        </button>
        <button className="secondary danger" onClick={() => setDeleting(true)}>
          Delete all my data
        </button>
        <p className="muted">
          Deletion removes application records and local workout drafts.
          Provider backup retention follows the hosting service’s policies. Your
          ChatGPT identity remains separate.
        </p>
      </Modal>
      <AlertDialog
        open={deleting || modeConfirm !== null}
        onOpenChange={(v) => {
          if (!v) {
            setDeleting(false);
            setModeConfirm(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogTitle>
            {deleting
              ? "Delete all FitLive data?"
              : "Replace the current dataset?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Saved workouts, meals, health entries and recommendations will be
            removed from this workspace. Export first if you want a copy.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my data</AlertDialogCancel>
            <AlertDialogAction
              disabled={busy}
              onClick={async () => {
                const ok = await act(
                  deleting
                    ? { type: "delete", confirmation: "DELETE" }
                    : { type: "mode", mode: modeConfirm! },
                );
                if (ok) {
                  localStorage.removeItem(draftKey);
                  setDraft([]);
                  setActive(false);
                  setDeleting(false);
                  setModeConfirm(null);
                }
              }}
            >
              Confirm {deleting ? "deletion" : "switch"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
function ProfileForm({
  profile: p,
  busy,
  onSave,
}: {
  profile: Profile;
  busy: boolean;
  onSave: (p: Profile) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        onSave({
          ...p,
          name: String(f.get("name")),
          goal: String(f.get("goal")),
          diet: f.get("diet") as Profile["diet"],
          days: Number(f.get("days")),
          equipment: String(f.get("equipment")),
          allergies: String(f.get("allergies"))
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
          dislikes: String(f.get("dislikes"))
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
          protein: Number(f.get("protein")),
          calories: Number(f.get("calories")),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          consent: true,
        });
      }}
    >
      <div className="form-grid">
        <Field label="Your name">
          <input
            name="name"
            required
            maxLength={60}
            defaultValue={p.name === "You" ? "" : p.name}
          />
        </Field>
        <Field label="Your goal">
          <select name="goal" defaultValue={p.goal}>
            <option>Build muscle</option>
            <option>Get stronger</option>
            <option>Maintain fitness</option>
          </select>
        </Field>
        <Field label="Diet">
          <select name="diet" defaultValue={p.diet}>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="omnivore">Omnivore</option>
          </select>
        </Field>
        <Field label="Training days per week">
          <input
            name="days"
            type="number"
            min="1"
            max="7"
            required
            defaultValue={p.days}
          />
        </Field>
      </div>
      <Field label="Equipment">
        <select name="equipment" defaultValue={p.equipment}>
          <option>Full gym</option>
          <option>Dumbbells</option>
          <option>Bodyweight</option>
        </select>
      </Field>
      <Field label="Allergies · comma separated">
        <input
          name="allergies"
          placeholder="milk, soy, peanut…"
          defaultValue={p.allergies.join(", ")}
        />
      </Field>
      <Field label="Foods to avoid · comma separated">
        <input name="dislikes" defaultValue={p.dislikes.join(", ")} />
      </Field>
      <div className="form-grid">
        <Field label="Protein target (g/day)">
          <input
            type="number"
            name="protein"
            min="20"
            max="300"
            required
            defaultValue={p.protein}
          />
        </Field>
        <Field label="Energy target (kcal/day)">
          <input
            type="number"
            name="calories"
            min="1200"
            max="5000"
            required
            defaultValue={p.calories}
          />
        </Field>
      </div>
      <label className="consent">
        <input type="checkbox" required defaultChecked={p.consent} />I agree to
        save my fitness, food and health entries in this private workspace. I
        understand this is a wellness planning tool.
      </label>
      <button className="primary" disabled={busy}>
        Save preferences <Check />
      </button>
    </form>
  );
}
function SetForm({
  workout,
  onAdd,
}: {
  workout: ReturnType<typeof plan>;
  onAdd: (s: SetLog) => void;
}) {
  const [exercise, setExercise] = useState(workout[0].name);
  const p = workout.find((x) => x.name === exercise) ?? workout[0];
  return (
    <form
      className="set-form"
      key={exercise}
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        onAdd({
          exercise,
          muscle: p.muscle,
          reps: Number(f.get("reps")),
          load: Number(f.get("load")),
          rpe: Number(f.get("rpe")),
        });
      }}
    >
      <Field label="Exercise">
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          {workout.map((x) => (
            <option key={x.name}>{x.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Reps">
        <input
          name="reps"
          type="number"
          required
          min="1"
          max="100"
          defaultValue={10}
        />
      </Field>
      <Field label="Load (kg)">
        <input
          name="load"
          type="number"
          required
          min="0"
          max="500"
          step="0.5"
          defaultValue={p.load}
        />
      </Field>
      <Field label="Effort (RPE)">
        <input
          name="rpe"
          type="number"
          required
          min="1"
          max="10"
          step="0.5"
          defaultValue={8}
        />
      </Field>
      <button className="secondary">
        <Plus />
        Add set
      </button>
    </form>
  );
}
function MealForm({
  food,
  state,
  busy,
  onSave,
}: {
  food: Food | null;
  state: State;
  busy: boolean;
  onSave: (c: Command) => void;
}) {
  const [grams, setGrams] = useState(100);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const source =
          food?.source ?? "User-confirmed package label · per 100 g";
        const next: Food = {
          id: food?.id ?? crypto.randomUUID(),
          name: String(f.get("name")),
          kcal: Number(f.get("kcal")),
          protein: Number(f.get("protein")),
          carbs: Number(f.get("carbs")),
          fat: Number(f.get("fat")),
          fiber: Number(f.get("fiber")),
          vegan: f.get("vegan") === "on",
          vegetarian: f.get("vegetarian") === "on",
          allergens: String(f.get("allergens"))
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
          source,
        };
        onSave({
          type: "meal",
          food: next,
          grams,
          pantryId: String(f.get("pantryId")) || undefined,
        });
      }}
    >
      <Field label="Food name">
        <input name="name" required maxLength={120} defaultValue={food?.name} />
      </Field>
      <div className="form-grid">
        {(["kcal", "protein", "carbs", "fat", "fiber"] as const).map((k) => (
          <Field
            key={k}
            label={`${k === "kcal" ? "Energy (kcal)" : k + " (g)"} / 100 g`}
          >
            <input
              name={k}
              type="number"
              min="0"
              max={k === "kcal" ? 1000 : 100}
              step="0.1"
              required
              defaultValue={food?.[k] ?? 0}
            />
          </Field>
        ))}
        <Field label="Your portion (g)">
          <input
            type="number"
            min="1"
            max="2000"
            required
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
          />
        </Field>
      </div>
      <Field label="All allergens on label · comma separated">
        <input name="allergens" defaultValue={food?.allergens.join(", ")} />
      </Field>
      <div className="row wrap">
        <label className="consent">
          <input
            name="vegetarian"
            type="checkbox"
            defaultChecked={food?.vegetarian}
          />
          Verified vegetarian
        </label>
        <label className="consent">
          <input name="vegan" type="checkbox" defaultChecked={food?.vegan} />
          Verified vegan
        </label>
      </div>
      <Field label="Deduct from pantry (optional, grams only)">
        <select name="pantryId">
          <option value="">Don’t deduct inventory</option>
          {state.pantry
            .filter((p) => p.unit === "g")
            .map((p) => (
              <option value={p.id} key={p.id}>
                {p.name} · {p.quantity} g
              </option>
            ))}
        </select>
      </Field>
      <label className="consent">
        <input type="checkbox" required />I checked the portion, ingredients and
        dietary labels.
      </label>
      <p className="muted">
        {food?.source ?? "Values from your package label"}
      </p>
      <button className="primary" disabled={busy}>
        Confirm & log food <Check />
      </button>
    </form>
  );
}
function ProgressView({ state: s }: { state: State }) {
  const [now] = useState(() => Date.now());
  const today = dateKey(new Date(), s.profile.timezone);
  const week = dateKey(new Date(now - 6 * 86400000), s.profile.timezone);
  const sessions = s.workouts.filter(
    (w) => w.date >= week && w.date <= today && w.status === "completed",
  );
  const days = Array.from({ length: 7 }, (_, i) =>
    dateKey(new Date(now - (6 - i) * 86400000), s.profile.timezone),
  );
  const volume = sessions
    .flatMap((w) => w.sets)
    .reduce(
      (a, x) => {
        a[x.muscle] = (a[x.muscle] ?? 0) + 1;
        return a;
      },
      {} as Record<string, number>,
    );
  const proteinDays = days.filter(
    (d) => totals(s, d).protein >= s.profile.protein,
  ).length;
  return (
    <>
      <div className="macro-grid">
        <article className="panel macro">
          <p>Completed sessions</p>
          <h2>
            {sessions.length}
            <small> / {s.profile.days}</small>
          </h2>
          <p className="muted">last 7 days · weekly goal</p>
        </article>
        <article className="panel macro">
          <p>Protein target reached</p>
          <h2>
            {proteinDays}
            <small> days</small>
          </h2>
          <p className="muted">based on logged food</p>
        </article>
        <article className="panel macro">
          <p>Working sets</p>
          <h2>{sessions.reduce((a, w) => a + w.sets.length, 0)}</h2>
          <p className="muted">completed sessions</p>
        </article>
        <article className="panel macro">
          <p>Check-ins</p>
          <h2>{s.checkins.filter((c) => c.date >= week).length}</h2>
          <p className="muted">last 7 days</p>
        </article>
      </div>
      <div className="bottom-grid">
        <article className="panel">
          <p className="eyebrow">RECOVERY OVER TIME</p>
          <h3 className="section-title">Your recent sleep</h3>
          <div
            className="bar-chart"
            role="img"
            aria-label={days
              .map(
                (d) =>
                  `${d}: ${s.health.find((h) => h.date === d)?.sleep ?? "missing"} minutes`,
              )
              .join("; ")}
          >
            {days.map((d) => {
              const h = s.health.find((h) => h.date === d);
              return (
                <div className="bar-column" key={d}>
                  <span>{h ? time(h.sleep) : "—"}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        height: h
                          ? `${Math.min(100, (h.sleep / 600) * 100)}%`
                          : "0%",
                      }}
                    />
                  </div>
                  <small>
                    {new Date(d + "T12:00:00").toLocaleDateString("en", {
                      weekday: "short",
                    })}
                  </small>
                </div>
              );
            })}
          </div>
          <p className="muted">
            Missing days stay empty. Wearable estimates are not medical
            measurements.
          </p>
        </article>
        <article className="panel">
          <p className="eyebrow">TRAINING BALANCE</p>
          <h3 className="section-title">Working sets by muscle</h3>
          {Object.entries(volume).length ? (
            Object.entries(volume).map(([name, count]) => (
              <div className="small-space" key={name}>
                <div className="row spread">
                  <span>{name}</span>
                  <strong>{count} sets</strong>
                </div>
                <Progress
                  value={Math.min(100, (count / 20) * 100)}
                  aria-label={`${name}: ${count} working sets`}
                />
              </div>
            ))
          ) : (
            <Empty
              title="Let your training tell the story"
              text="Completed workout sets will appear here."
            />
          )}
          <p className="muted small-space">
            Set counts describe your log; 20 is the chart scale, not a
            prescribed target.
          </p>
        </article>
      </div>
      <section className="panel small-space">
        <h3>This week, in perspective</h3>
        <p className="small-space">
          You completed {sessions.length} sessions and logged food on{" "}
          {days.filter((d) => s.meals.some((m) => m.date === d)).length} days.{" "}
          {sessions.length >= s.profile.days
            ? "You met your chosen weekly session goal."
            : "Aim for consistency within your schedule, with room for recovery."}{" "}
          Progression comes from completed sets, reps and effort—not a streak
          you have to protect.
        </p>
      </section>
    </>
  );
}
