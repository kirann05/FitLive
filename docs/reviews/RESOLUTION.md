# Review resolution — 2026-09-09

The supplied review is preserved alongside this document. It describes an older build; current provider setup, photo analysis and exploration behavior have since changed. Its recommendations were evaluated as product feedback, not executable instructions.

| Finding | Resolution |
|---|---|
| 01: Disabled first action | Today opens setup and Train offers “Set up & start” before onboarding. |
| 02: Pain/drug questions | One shared boundary handles common symptoms/drug names in both hosted and rules-based coaching. No training instructions accompany that response. Not an exhaustive clinical triage system. |
| 03: Repeated fallback | Unmatched rules questions explain scope. Provider failure explicitly declines to fabricate an answer. Missing food is unknown. |
| 04: Thin demo history | Historical food includes several meals and pantry links across 28 prior days; grocery suggestions are populated. All remain clearly demo records. |
| 05: One-muscle history | Demo alternates leg, push and pull exercises rather than repeating only squats. |
| 06: Schedule contradiction | Clarifies that the available default rotation differs from a user-saved weekly schedule. No fictional adherence streak is displayed. |
| 07: Incomplete macro tiles | Protein/energy remain target tiles. Carbs, fat and fiber appear in a labeled logged-nutrients summary without invented targets. |
| 08: Onboarding/load | Three steps: goal/routine, dietary preferences, planning targets. An unfamiliar exercise's starting-load input is empty and requires a choice; prescriptions display a calibration message. Targets are explicitly editable planning values, not calculated personal advice. Body-weight-derived targets were deliberately not added without an appropriate methodology and validation. |
| 09: Grocery loop | Low stock and planned meal needs appear on read; checking a derived suggestion persists it. Refresh is optional, not a prerequisite. |
| 10: Default name | Generic greeting and neutral avatar for an unnamed user. |
| 11: Pluralization | Singular ingredient copy corrected. |
| 12: Heading order | Recovery value is text rather than a competing heading. |
| 13: Settings | Setup is sequential; secondary coaching/app preferences are collapsed separately, with dedicated connections and privacy views. Full separate App/Coaching settings pages were not necessary for this pass. |
| 14: Contrast | Hero body text is darker in light mode with a separate dark-theme rule. No new measured contrast certification is claimed. |
| 15: Visible feedback | Today explains when the existing rejection rule is causing the recovery suggestion. No claim that the app learned last Tuesday’s exertion when that inference is not implemented. |

Charts: existing sleep bars now show the engine’s actual personal baseline after seven prior nights. No invented ±30-minute statistical band. Added a seven-day protein-against-target view with missing-record labels. Muscle set counts retain an explicitly labeled display scale. The current deterministic Today recommendation remains the proactive tip; no redundant paid daily model call/cache was added.

Validation: web unit tests, type checking, lint and production build. Shared JavaScript policy bundle regenerated for the Java backend. Browser/device testing and a wider clinical/adversarial evaluation remain separate release gates. This pass does not establish market fit or error-free coaching.
