# FitLive Readiness Review

**Product & UX review — web app**

| | |
|---|---|
| **Reviewed** | 9 Sep 2026 |
| **Build** | `5862367` (main) |
| **Target** | `http://localhost:5173` |
| **Scope** | Web app only — iOS / watchOS deliberately excluded |

A hands-on pass through every tab of the running web app, in both themes, at desktop and phone widths, in demo mode and from a cold start. Fifteen findings, ordered by how much damage each one does to a first-time user.

| Overall | Blocking | High | Polish |
|---|---|---|---|
| **Strong** | **3** | **5** | **7** |
| The hard part — deterministic engines, explainability, honest data states — is genuinely built. | Issues that strand or mislead a new user on day one. | Contradictions that make working features look broken. | Copy, hierarchy and consistency. |

**The short version:** this does not read like a prototype. The recovery explanation, the refusal to fake integrations, and the confirmation gate on destructive actions are better than most shipped products. What is holding it back is not missing engineering — it is that a new user hits a wall in the first thirty seconds, and the demo data actively argues against the product.

---

## Blocking

*Each of these ends a new user's session. Fix these before anyone else opens the app.*

### 01 · The main button does nothing, and never says why
`Dead end`

From a cold start, Train shows a full session — Goblet squat, Romanian deadlift, Reverse lunge, with loads. **Start session is disabled.** Clicking does nothing. There is no tooltip, no `aria-disabled`, no message. The same gate sits on *Review today's session* on the Today tab, which is the single most prominent button in the app.

A user who has not filled in the profile form sees a complete workout plan and a button that silently refuses. Nothing on screen connects the refusal to the profile form.

```
apps/web/app/fitlive.tsx:773   disabled={!s.onboarded}
apps/web/app/fitlive.tsx:559   disabled={!s.onboarded}
measured: disabled=true, opacity 0.55, cursor not-allowed, title=null
```

**Fix** — Never disable it. Let the click open the profile step it depends on, or keep it enabled and show one line under it: "Set your goal and equipment first — takes about a minute." A disabled control with no cause is the one pattern your own spec's checklist calls out as *no dead controls*.

### 02 · PACE answers a question about a hurt knee with a sleep report
`Safety-adjacent`

I asked: *"My knee hurts badly when I squat. Is it torn? Should I take ibuprofen?"* The reply was the standard recovery paragraph, ending with **"Start with a comfortable load; keep two or more reps in reserve."** It did not decline, did not acknowledge the pain, and closed by describing how to train.

The medical guard exists and is well written — it just never fired. The regex matches `injur` and `medication`, but a person in pain writes "hurts", "torn", "swollen", "sprained", or names the drug: "ibuprofen", "Advil", "painkiller". None of those match, so the question falls through to the catch-all.

```
apps/web/lib/domain.ts:830
  /diagnos|medication|chest pain|treat my|injur/

apps/web/lib/ai/provider.ts:169   (a second, differently-worded copy)
```

**Fix** — Widen the vocabulary to how people actually describe pain and drugs, keep one shared list rather than two copies that can drift, and make the fall-through safe rather than the guard exhaustive. If the message is not confidently matched to training, food or recovery, say so instead of emitting training advice.

### 03 · Every unmatched question returns the identical paragraph
`Feels broken`

The coach routes on keywords, and anything unmatched gets the same recovery briefing. I asked *"What is the capital of France?"* and received a report on my sleep, resting heart rate and HRV. Asking *"Can I skip my workout and drink beer instead?"* returned that same paragraph, word for word.

Only `food|eat|protein|meal|pantry` produces a different answer. Two identical replies in a row is the moment a user decides the assistant is fake — and the reply is *already* a verbatim duplicate of the Why this? modal, so the coach's most common output adds nothing the user has not read.

```
Q: "Why this workout?"         → recovery paragraph
Q: "My knee hurts…"            → recovery paragraph (identical)
Q: "Capital of France?"        → recovery paragraph (identical)
Q: "Skip workout, drink beer?" → recovery paragraph (identical)
Q: "How much protein left?"    → nutrition answer ✓
```

**Fix** — Give the fall-through its own honest reply: "I can only speak to your training, recovery, food and pantry right now — here is what I can see." Then list two or three questions it *can* answer. Being narrow and saying so reads as trustworthy; answering everything with a sleep report reads as broken.

---

## High

*Working features that look wrong, mostly because the data behind them contradicts the words on screen.*

### 04 · The demo makes the product look like it is failing
`Demo quality`

Demo mode is the showcase, and right now it showcases the degraded state. In the sample week: **0 logged days at your protein target**, every pantry item reads **"Not enough consumption history"**, and the grocery list is empty even though Today announces a low item. A visitor concludes the forecasting does not work, when in fact it was never given enough history to run.

Your own spec's demo script promises "Berries: likely low tomorrow · Yogurt: ~2 days". The engine can do that. The fixture just does not feed it.

**Fix** — Seed 28 days of meals and pantry transactions so depletion forecasting, protein streaks and grocery suggestions all have something to chew on. The demo should show the product at its best hour, not its first hour.

### 05 · "Balanced strength rotation" shows one muscle
`Contradiction`

The Training balance panel on Progress renders a single bar: **Quads — 9 sets**. Nothing else. It sits under a program named "Balanced strength rotation", on a day whose session is "Pull & posterior". The panel meant to prove balance is the strongest visible evidence against it.

The cause is in the seed: every historical workout is generated as the same exercise.

```
apps/web/lib/domain.ts:400-402
  sets: [8,10,12].map(reps => ({ exercise:"Goblet squat", muscle:"Quads", … }))
```

**Fix** — Rotate the seeded sessions through the same push/pull/legs split the live program uses. This is a two-line change that fixes the single most damaging screen in the demo.

### 06 · "Choose a program" — while a program is running
`Contradiction`

The consistency panel reads **"430 consistency points · Choose a program to track scheduled-session consistency."** Meanwhile Train clearly shows an active program, three days per week, with today's session laid out. The prompt is asking for something already done.

**Fix** — Gate that sentence on whether a program actually exists, and when one does, replace it with the streak the panel promises: "4 consecutive planned sessions. Rest days keep the count."

### 07 · Carbs and fat are tracked but never targeted
`Half-built`

The Eat tab shows four macro tiles. Protein and Energy have a target and a progress bar. **Carbs and Fat show a number and the words "logged today" with no bar and no target** — they look like the same component with its purpose removed. Fiber, which your spec lists as tracked, appears nowhere.

**Fix** — Either derive carb and fat targets from the calorie and protein numbers you already have, or stop rendering them as macro tiles and move them into the meal detail. Two configured tiles beside two hollow ones reads as unfinished.

### 08 · There is no onboarding, only a settings form
`Cold start`

A new user gets a single modal holding name, goal, diet, equipment, training days, allergies, exclusions, protein target, calorie target, consent, appearance, grocery budget, AI consent, connections and privacy — **one scroll, fifteen-plus decisions, mixed concerns**. Nutrition targets arrive pre-filled at 145 g and 2300 kcal with no explanation of where they came from, and no body weight anywhere to derive them from.

Meanwhile the first prescribed session says **Goblet squat 20 kg** to someone the app has never met. The subtext says "start with a comfortable load", which is right — but the confident number next to it says otherwise.

**Fix** — Split it into a short sequence: goal → equipment and days → diet and allergies → weight, which lets you compute a defensible protein target instead of asserting one. On first session, show a rep range and no load, and let the first logged set calibrate everything after it.

---

## Polish

*Small, cheap, and each one visible on a screen a user will look at.*

### 09 · Groceries ignore the item Today just flagged
`Loop break`

Today says "1 pantry item is running low". Pantry marks Blueberries *Low*. Groceries shows an empty list and asks you to press *Refresh list*. The three screens each hold a piece of one thought and none of them completes it.

**Fix** — Build the list from low stock on read. A manual refresh button is a cache-invalidation detail that leaked into the interface.

### 10 · "Good evening, You."
`Copy`

The blank-workspace default name is the literal string "You", so the greeting reads "Good evening, You." and the avatar shows **Y**.

**Fix** — Drop the name when it is unset — "Good evening." is warm and correct. Use a neutral glyph in the avatar.

### 11 · "1 ingredients to check"
`Copy`

Unpluralised count on the recipe cards in Eat. Elsewhere you pluralise correctly ("1 pantry item is"), so this one is conspicuous.

**Fix** — Reuse the helper already used on the Today pantry notice.

### 12 · Card headings run H3 then H2
`Accessibility`

Inside the recovery card, the title "Recovery context" is an `h3` and the value beneath it — "Reduced" / "Building your baseline" — is an `h2`. A screen-reader user navigating by heading meets the value before the label it belongs to, and the document outline reports several competing H2s per screen.

**Fix** — Keep the card title as the heading and render the big value as styled text, not a heading. Purely a markup change; nothing visual moves.

### 13 · Settings is a kitchen sink
`Information architecture`

Identity, nutrition targets, grocery budget, theme, AI consent, device connections and privacy all live in one modal. These belong to different mental tasks and different frequencies — you set a diet once and check connections when something breaks.

**Fix** — Three groups: *You* (goal, diet, allergies, targets), *Coaching & data* (AI consent, connections, sources), *App* (theme, budget, privacy, export, delete).

### 14 · One marginal contrast case in light mode
`Accessibility`

Body copy in the Today hero measures **4.37:1** against its tinted panel, just under the 4.5 threshold. Dark mode measured clean across the board, with zero failures.

**Fix** — Nudge that one token a step darker. Everything else passed.

### 15 · The learning loop is invisible
`Product`

Feedback is captured — *Works for me* / *I'd change something* — and the audit trail is genuinely recorded. But it is filed at the very bottom of Progress inside collapsed `<details>` rows, and nothing ever tells the user their input changed anything. The closed loop is the entire product thesis, and it is the least visible thing in the interface.

**Fix** — When a past preference shapes today's plan, say so on the Today card in one line: "Lighter than last Tuesday — you told us that session ran too hard." That single sentence is the difference between a tracker and a coach.

---

## What is genuinely good

*Worth naming, because several of these are harder than the things above and you should not trade them away.*

- **The Why this? modal is the best screen in the app.** Reason codes, confidence band, rule version, baseline window, timestamps, and the exact adjustment ("Two or more signals triggered a conservative 10% load adjustment"). Most products would show a number and a shrug.
- **Nothing is faked.** Connections plainly state Apple Health has sent nothing, USDA is unconfigured, and the coach labels itself rules-based. The chat even appends "no AI provider is connected". This restraint is rare and it is your credibility.
- **The deterministic engine is visibly working.** Reduced recovery dropped prescribed loads exactly 10% — 15 kg to 13.5, 5 to 4.5 — and the reason text matched the arithmetic.
- **Cold start degrades honestly.** With no data the app says "Building your baseline · Low confidence · no wearable-based adjustment is applied" rather than inventing a score.
- **Destructive actions are gated.** Switching workspaces raises a real confirmation naming what will be lost and offering an export first.
- **Dark mode is designed, not inverted.** Distinct surface tints, adjusted accent, and it passed contrast checks everywhere I measured.
- **Mobile is not an afterthought.** The bottom tab bar is thumb-reachable with generous targets; only three controls in the whole app fall under 44 px.

---

## Your ideas, assessed

| Idea | Call | Reasoning |
|---|---|---|
| **Charts on the dashboard** | **Build** | Better founded than you think — `recharts` is already a dependency and imported nowhere, so you ship the cost and get none of the benefit. The data is pre-shaped too: Progress already computes a 7-day array and a per-muscle map, then prints three numbers and discards the structure. |
| **Pie charts** | **Skip** | Wrong tool for every quantity you hold. A pie shows composition of a whole; your macros are progress against a target, where the interesting part is the gap. A pie cannot show "116 g short" — the one number the user needs. Use a stacked bar against a target marker. |
| **A toggle on the dashboard** | **Reshape** | A chart the user must switch on is a chart most users never see. Rather than a toggle, put one chart where each tab's question already lives: sleep-vs-baseline on Today, volume by muscle on Train, protein consistency on Progress. |
| **Protein target front and centre** | **Extend** | It already exists on Today. What is missing is the trend — Progress reports "0 days at target" as a bare number with no sense of direction. Seven bars against a target line answers "am I getting better at this?", which the number cannot. |
| **AI coach tip of the day** | **Build** | Fills a real hole: the coach is entirely reactive today and speaks only when spoken to. The app knows recovery is reduced and protein is 116 g short, and volunteers neither. Three conditions though — generate once per day and cache it, derive it from the deterministic state rather than free prose, and keep a rules-written tip for when no provider is configured, or the best surface in the app goes blank for every unconfigured user. |
| **Show the loop closing** *(mine)* | **Build first** | Finding 15. Every competitor can draw a chart. None of them can say "this is lighter because you told me last Tuesday was too hard." You already capture the feedback and already store the audit — the only missing piece is one sentence on the Today card. Highest differentiation per line of code in this entire review. |

---

## The chart I would draw first

Built from the seven sleep values in your own demo fixture:

| Day | Thu | Fri | Sat | Sun | Mon | Tue | **Wed** |
|---|---|---|---|---|---|---|---|
| Sleep | 7h05m | 7h35m | 7h28m | 7h21m | 7h14m | 7h07m | **5h22m** |

Baseline: **7h08m ± 30m**. Only Wednesday falls below the band.

The current Progress bars carry these same seven numbers but no baseline, so six near-identical bars and one short one all read as "some sleep data". Drawing the personal band is what turns the display into the sentence the app already writes in prose: *"Sleep was more than an hour below your recent baseline."* The chart should say what the copy says.

---

## Suggested order

*Cheapest high-damage fixes first. Roughly a week of evenings to the end of step 5.*

1. **Unblock the new user** — Findings 01 and 08. Nothing else matters if the primary button refuses on day one.
2. **Make the coach honest about its limits** — Findings 02 and 03. Widen the pain and medication vocabulary, share one guard list, and give the fall-through its own reply.
3. **Repair the demo fixture** — Findings 04 and 05. Rotate the seeded muscles and extend the history. Two small changes, and the whole product stops looking like it is failing.
4. **Sweep the contradictions** — Findings 06, 07, 09, 10, 11. All small, all on screens people actually read.
5. **Show the loop closing** — Finding 15. One sentence on the Today card, drawn from the audit trail you already write. This is the differentiator.
6. **Then charts** — Sleep against baseline first, protein consistency second, volume by muscle third. By this point the underlying data is finally worth drawing.

---

### Method

Guest "Explore FitLive" workspace, demo and blank datasets, light and dark themes, 1440×900 and 375×812. Every tab, sub-tab and modal opened; coach probed with five questions including a medical one; contrast, touch targets, heading order and alt text measured in the page. Findings reference build `5862367`. iOS and watchOS deliberately out of scope.
