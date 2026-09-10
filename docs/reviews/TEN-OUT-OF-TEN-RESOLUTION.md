# Round two: decisions and implementation

The supplied review is retained unchanged alongside this response. Its observations are review input, not evidence of current test results.

## Applied

- Exercise name cleanup moved from Train to a collapsed settings section. Candidate matches now require a compatible primary muscle; historical set names, weights and reps are preserved.
- Routine cards are visible and horizontally scrollable on narrow screens. They are hidden during an active workout so logging stays the priority.
- Training headers use the selected load unit. Repeated exercise coaching reasons render once per distinct reason.
- Today begins with recovery, protein, energy and completed-session tiles. Missing food records show a dash, rather than claiming no intake. One recommendation explains today's next action; meal and check-in controls remain direct.
- Protein and sleep use seven fixed slots. Recent session set counts use six slots. Missing entries remain distinct from recorded zero. A dashed, labeled target or baseline spans the chart; its scale expands for values above target.
- Chart values and dates are readable without hover. Each column is keyboard/touch selectable, with an exact-value announcement. Marks use one color. Dark mode has separate contrast-friendly colors.
- Value updates, bars, saved-set confirmation and timer entry use short state animations, all respecting reduced motion.
- Removed unused Recharts and its unused wrapper (35 packages removed).

## Deliberate departures

Recovery is categorical, not a percentage: FitLive does not calculate a validated recovery score. Its tile exposes data freshness and baseline coverage. Sleep gets a baseline only after seven prior nights; no population target is fabricated. Food references use the current editable target and describe logged meals only.

Bklit chart components are MIT licensed (https://github.com/bklit/bklit-ui), but the required fixed-slot charts need neither Visx nor another animation dependency. Purpose-built CSS charts keep exact labels and empty states under direct control. Browser-native animation is sufficient here. Motion's accessibility guidance (https://motion.dev/docs/react-accessibility) informs respecting reduced motion; Motion is not installed.

Shared recovery-panel morphing was not added: the daily summary and historical sleep chart convey different information. Animating one into the other would imply equivalence. Tabs retain their predictable navigation.

## Verification and limits

Automated tests cover zero/one/two logged days, recorded zero versus missing, values beyond target, session frames and exercise-match safety. Type checking, lint, web build and shared Java engine tests are run for this change. No physical-device, screen-reader, color-vision simulation or complete browser acceptance certification is claimed. Remaining training feature limits are in ../TRAINING-STATUS.md. Deployment and native development remain deferred.
