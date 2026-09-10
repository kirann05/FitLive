# The Ten Out Of Ten Pass

**FitLive · Round two review**

| | |
|---|---|
| **Reviewed** | 10 Sep 2026 |
| **Commit** | `0a7d6f6` |
| **Target** | `http://localhost:5173` (guest / explore mode) |
| **Scope** | Web app — iOS / watchOS excluded |

Four commits landed since the last review and they fixed most of what I flagged. You still feel it is not better, and you are right. The cause is not missing animation, and reaching for motion first would make it worse.

| Substance | Experience | New regressions | Charts shipped |
|---|---|---|---|
| **Much better** | **Roughly flat** | **3** | **0** |
| 876-exercise catalogue, previous-set values, voice, templates, plate maths, unit conversion. Real work, well licensed. | The new power is buried under housekeeping, disclosure triangles and repeated prose. | Introduced by this round, all in the Train tab. | Still no chart anywhere, and `recharts` is still installed and unused. |

---

## Credit first, because this part was done well

I checked the licensing rather than taking it on trust, and this is a better decision than the one I recommended.

You vendored **free-exercise-db** under the **Unlicense**, which is public domain and cleaner than the RepDB option I proposed. You pinned it to a commit hash, took only names and taxonomy, and deliberately excluded the images and instructions, which is exactly where the licensing traps live in this category. You added stable prefixed IDs, so exercise identity now survives renaming, which was the silent data-loss bug from last time. Unknown equipment is labelled unknown rather than guessed.

The set logger now shows **Previous: 55 lb × 8**, voice logging accepts "fifty for eight", effort was demoted to an optional control, and there is a real plate calculator with correct bar weights and plate sets for both units. That is the whole shape of what I proposed, built properly.

---

## So why does it not feel better?

> Because the Train tab now opens with a database maintenance chore, hides its best feature behind a triangle, and states the wrong unit in its header. The power is real. The staging is wrong.

### `NEW` The first thing on Train is a schema migration

"Keep your exercise history together. These names may refer to catalogue exercises. Every original set stays intact; only confirmed identities merge."

That is release-engineering language, placed above the workout. Worse, the suggested match is **Dumbbell row → Dumbbell Raise**, which are unrelated movements, so the user's first act is refereeing a bad guess.

**Fix** — Run this silently where confidence is high, queue the rest in settings, and never let it outrank today's session.

### `NEW` Templates are hidden behind a disclosure triangle

"Start with a ready-made routine" renders as a collapsed `<details>` in plain text. The single highest-leverage feature in the whole redesign is now the least visible element on the page.

**Fix** — A row of tappable cards, shown open, above the fold.

### `NEW` The unit label lies

`fitlive.tsx:766` hardcodes "Loads in kg" while every other line correctly reads `preferences.loadUnit`. On screen right now: "Full gym · Loads in kg", then "50 lb", then "LOAD · lb". Three unit statements, two units, one screen.

**Fix** — One line.

### `CARRIED` The same sentence appears twice

"Start with a comfortable load; keep two or more reps in reserve." sits under exercise 02 and exercise 03 verbatim (`domain.ts:605`). Repeated copy is the fastest way to make a screen feel generated rather than authored.

### `CARRIED` Recent sessions read "3 sets · completed" six times

Six identical rows carrying one bit of information each. This is where a sparkline of session volume belongs.

---

## The honest answer on motion

You asked whether transitions would take this to ten out of ten. Partly, and not first.

Your instinct that polish signals effort is correct. But the reason Apple's fitness UI reads as premium is not animation. It is that three rings tell you your whole day before you have read a word. Screenshot those rings, freeze them, and they still work. Motion amplifies a clear hierarchy; it cannot create one. Animating the Train tab as it stands would produce a text wall that also moves.

There is also a constraint you wrote for yourself. Your master spec, section D7, says **animation should communicate state change rather than decorate**, and section D1 explicitly rejects glowing cards, heavy gradients and glassmorphism everywhere. Holding to that is what will keep this looking like a health product rather than a dashboard demo. Restraint is the aesthetic.

**Sequence that actually gets you to ten:** replace prose with visual state, then let motion explain the changes between states. In that order the motion has something to say.

---

## The two-day problem

You said the data must read clearly even after one or two days of logging. This is the hardest constraint in the whole brief and it drives the design.

Two data points make a line chart look broken. Most fitness apps solve this by hiding charts until enough history exists, which means a new user sees nothing during exactly the week they are deciding whether to keep the app.

> **When data is sparse, the goal supplies the structure.**

A ring is legible on day one because the target draws the whole circle and your one day fills part of it. Apply the same rule everywhere: always render the full seven-day frame, show logged days as filled, unlogged as an empty track. Day one looks intentional instead of broken, and the shape of the week is legible from the first entry.

**Worked example — Protein, at day 2 of logging:**

| Day | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|---|
| Protein (g) | **152** | **138** | — | — | — | — | — |
| vs 145 g target | over | under | not logged | not logged | not logged | not logged | not logged |

Rendered as: seven bar slots always drawn, two filled, five as flat empty track, with a dashed target line at 145 g spanning the full width. Two logged days and it already reads: one day over, one day under, five to go. The dashed target line does the explaining, so no sentence is needed.

**Important colour note.** The bars must be one colour, with the target line carrying the judgement. Colouring "met" bars green and "missed" bars teal fails a colour-blindness check badly. I ran it rather than guessing: the pairing scored ΔE 7.5 for normal vision, where 15 is the floor, so it is hard to distinguish even with full colour vision.

---

## Replace the sentences with state

Concretely, for the Today tab, which currently spends four paragraphs saying what three tiles would show.

**Proposed "at a glance" row:**

| Tile | Value | Bar | Footnote |
|---|---|---|---|
| Recovery | Reduced | 42% | Medium confidence · sleep 1h 46m below |
| Protein | 29 / 145 g | 20% | 116 g to go |
| Energy | 345 / 2300 | 15% | kcal logged today |
| This week | 2 / 3 | 66% | sessions completed |

Same information as the current Today tab, minus roughly sixty words of prose, and readable in about two seconds. Keep exactly one sentence on the page: the reason behind today's recommendation. That sentence is your product. Everything else it currently says can be a number and a bar.

**The training log deserves a shape, not six identical rows.** Working sets per session across the last six sessions runs 9, 9, 12, 12, 15, 15. One line replaces six rows of "3 sets · completed" and answers the question those rows never could, which is whether the trend is going the right way.

---

## The libraries, and what each is actually for

I checked licensing and fit against your stack rather than taking the marketing at face value.

| Library | Verdict | Detail |
|---|---|---|
| **shadcn/ui** | **Already yours** | You have 61 components in `components/ui` plus Radix and Tailwind. Nothing to adopt. This matters because it makes the next row a drop-in rather than a migration. |
| **Bklit UI** | **Adopt** | MIT chart components built directly on shadcn/ui, using Visx and Motion underneath. Installs through the shadcn registry you already use: `npx shadcn@latest add @bklit/line-chart`. Area, bar, line, ring, radar and sankey cover everything on your roadmap. Only their Studio product is proprietary; the components are not. |
| **Motion** | **Adopt, sparingly** | MIT, free, formerly Framer Motion. Hybrid engine using hardware-accelerated browser APIs, and notably smaller than the GSAP equivalents. You will get it transitively through Bklit anyway, so the decision is really about how much you use directly. |
| **recharts** | **Remove** | Still installed, still referenced only by the unused shadcn `chart.tsx` wrapper. Bklit is Visx-based, so keeping recharts means shipping two charting engines to render zero charts today. Delete it in the same commit that adds Bklit. |

### Where motion earns its place

- **The set tick.** The single most repeated action in the app. A short scale-and-settle on the checkmark, the row easing into its logged state, the rest timer sweeping in beneath it. This is state change, which is what your own spec permits.
- **Numbers that count up.** When protein moves from 29 g to 63 g after logging a meal, animate the value and the bar. The user sees their action land, which is the feedback loop the whole product is arguing for.
- **Charts drawing once on entry.** Bars growing from the baseline over roughly 400 ms, staggered by about 40 ms. Bklit ships this. Do it on first paint only, never on every re-render.
- **Shared layout on tab change.** Motion's layout animations let the recovery tile on Today morph into the recovery panel on Progress rather than cutting. This is the effect that reads as expensive.
- **Nowhere else.** No page-load chorus, no parallax, no cards that lift on hover for decoration. Every animation should be answerable with "which state changed?"

One non-negotiable: wrap all of it in `prefers-reduced-motion`. Motion has a hook for this. Your accessibility scores are genuinely good right now and this is the easiest place to lose them.

---

## Order of work

Steps 1 and 2 are hours, not days, and recover most of the felt quality this round lost.

1. **Fix the Train tab's staging** — Move the migration prompt into settings, open the templates as visible cards, and correct the hardcoded kg label at `fitlive.tsx:766`. No new dependencies.
2. **Cut the prose** — De-duplicate the coaching sentence, and reduce Today to one explanatory sentence plus the four glance tiles above.
3. **Add Bklit, remove recharts** — Protein against target first, since it is the number the app talks about most. Then session volume, then sleep against baseline.
4. **Design every chart's sparse state** — Seven-day frame always drawn, unlogged days as empty track. Verify each chart at zero, one and two days of data before shipping it.
5. **Add motion, in the four places listed** — Set tick, counting numbers, chart entry, shared layout between tabs. Reduced-motion honoured throughout.
6. **Then re-run the review** — Contrast, touch targets and heading order, since a chart library and an animation layer are the two things most likely to regress them.

---

### Notes

Reviewed at commit `0a7d6f6` on 10 Sep 2026, against the running app at localhost:5173 in guest mode.

Chart mark colours were validated for colour-vision deficiency and contrast before use; the teal-and-green pairing an earlier draft used failed at ΔE 7.5 and was replaced. Final light-mode marks: `#00699A` data, `#C07A1E` target line, passing all six checks.

**Sources** — [Motion](https://motion.dev/) · [Bklit UI](https://bklit.com/) · [Bklit UI source and licence](https://github.com/bklit/bklit-ui) · [free-exercise-db](https://github.com/yuhonas/free-exercise-db)
