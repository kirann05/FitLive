# FitLive specification and ten-user readiness audit

Reviewed 2026-09-09 against `docs/MASTER_SPEC.md`, implementation, validation records and current deployment work. The originally supplied Desktop path is no longer present; this audit uses the preserved specification in the repository. Document directives are treated as product requirements, not independent authorization.

**Decision: not ready for ten independent users to onboard and use the promised complete product.** The current release is a private working web application with partially integrated native/backend components. It is not a completed market launch or a verified end-to-end beta. Moving hosting providers alone will not resolve these gaps.

## Access, deployment and repository

- The hosted web release uses platform-provided ChatGPT sign-in and private owner access. Direct Google OAuth and a public ten-user onboarding journey are not implemented/verified.
- The hosted web currently persists through D1. The Java/PostgreSQL API passes local integration checks but has not been connected to the hosted site and real iPhone as one verified account.
- The owner selected Render instead of AWS. AWS stack deletion was requested and was still in progress at audit time. Render deployment has not started. No claim of completed AWS cleanup is made.
- GitHub main at audit start was `fa920b2711656d231157895f1f4ea16f4f32e3f6`. It contains the source for the current hosted web release and native/backend projects. The latest local date/AI grounding fixes and AWS preparation were not yet committed or deployed. Credentials, user data, cloud resources and Apple signing identities do not belong in GitHub.
- iPhone plus embedded Watch simulator build passed. Signing identity, connected physical device, installation, HealthKit comparison and Watch delivery remain unverified. No TestFlight/App Store distribution exists.

## Feature coverage

“Implemented” below means code exists with the evidence described. It does not mean the whole public production journey has passed.

| Specification area | Present | Gap before the promised experience is complete |
| --- | --- | --- |
| Account and onboarding (C2/E1/6) | Private authenticated web account; goals, diet, allergies, equipment, targets, timezone and consent | Public signup/access; requested Google login; complete guided native onboarding; training experience, daily time windows and duration coverage |
| Today / daily decision (A1/C2/7) | State-based primary action, reasons, freshness, check-in, recovery and nutrition context | Real device-to-cloud input and live AI orchestration are not verified; complete cross-domain outcome adaptation is absent |
| Health ingestion (H1/7/10) | Native authorization and foreground sleep/RHR/HRV summaries; overlap merging; replay tests | No real-device end-to-end test; no background anchored sync/deletion reconciliation/source priority; steps, active energy, heart rate, imported workouts and weight are not in the current native reader |
| Recovery (H2/7/10) | Personal lookback baseline, seven-day minimum, check-in, stale/missing handling, reasons and bounded load reduction | Current output is Normal/Reduced and Low/Medium confidence, not the full three-band/three-confidence specification; separate 7/28-day baselines and richer recovery inputs are incomplete; no measured real-data validation |
| Training (H4/7/11) | Programs, weekday schedules, set/reps/load/RPE, history, deterministic progression, return-after-break reduction, rest timers and web muscle-volume summary | Full exercise replacement/preference loop, detailed per-set metadata and complete native parity are incomplete; real offline/device sessions remain unverified |
| Nutrition (H5/7/12) | Confirmed-label food entry, portions, macro/fiber arithmetic, diet/allergy checks, targets, saved recipes and planned meals | USDA adapter is not configured/live-tested; natural-language candidate extraction/confirmation is absent; body-based adaptive target setting is incomplete |
| Pantry and meals (H6/13) | Manual quantities/confidence, meal deductions, basic consumption-rate depletion estimates, pantry-aware recipe scoring and combined shopping needs | Receipt/barcode/order ingestion absent; richer forecast calibration and learned consumption/portion preferences absent |
| AI coach (G5–G7/7/8/19) | Optional provider abstraction, three read tools, structured output checks, consent, timeout/call bounds and rules fallback | No live provider key/evaluation; native coach remains rules-based; task-based model routing, schedule-changing conversation, natural-language food tools and weekly AI review are incomplete |
| Evidence and audit (H7/8/17) | Deterministic reason codes, state versions, feedback audit and provider metadata in coach results | No complete evidence retrieval/citation system or per-recommendation provenance/outcome contract across all paths; live adversarial evaluation absent |
| Learning loop (A1/6) | Workout history affects progression; rejection affects today's action; favorites/exclusions and consumption history affect some suggestions | No complete longitudinal outcome-learning loop for tolerance, satiety, timing, food/exercise weights or measured recommendation improvement |
| Progress / weekly review (C2/E3/6) | Recent workout/health/nutrition summaries, muscle-volume context, records and achievements | Full weekly review with suggested next-week changes, body trends, richer multi-week analytics and native parity incomplete |
| Gamification (14) | Basic achievements and records | Full XP event model and healthy/rest-preserving streak system incomplete |
| Watch (C3/E2) | Planned-session display, set entry, durable queue, account-bound phone review and acknowledgment path | No hardware verification; complete recovery glance/readiness/rest-timer experience not established; offline/restart/account-switch behavior requires real paired-device testing |
| Grocery P1 demo (13/35) | Shopping list and planned ingredient aggregation | No provider abstraction/sandbox cart, price/budget/substitution enforcement or executable cart approval flow. A saved weekly budget preference is not budget enforcement |
| Grocery P2 / future roadmap | No purchase endpoint, so current app cannot place an order | Live checkout, other wearables, Android, restaurant/calendar/household/collaboration features are deferred by the spec itself; these are not month-one release blockers |
| Offline/errors (I) | Protected native drafts/pending operations; retained operation IDs; transactional replay/conflict handling; AI fallback; stale-data UI | Real hardware/background/reinstall/conflict recovery and browser user journeys not exercised end to end |
| Privacy/security (J/22) | Consent, authorization tests, secret separation, bounded requests, export/delete, token revocation, Keychain | Production deployment review, cross-user isolation validation under public auth, restore/retention drills, dependency/security and privacy reviews remain |
| Design/accessibility (D/E) | Light default, optional dark, five primary areas and reusable controls | No complete browser interaction/visual QA, VoiceOver/Dynamic Type review or all-state/device accessibility verification |
| Operations (K/L/N/23/24) | Local tests, migrations, CI workflow, health endpoint and repository documentation | No verified deployed shared backend, remote CI result, production telemetry/alerts, load/latency/cost benchmarks, restore/rollback drill or crash-rate measurement |

## Section 35: nineteen explicit definition-of-done checks

| # | Requirement | Assessment |
| --- | --- | --- |
| 1 | Real builder Apple Health sync | Not verified; blocking |
| 2 | Idempotent, tested sync | Local replay/merge tests pass; actual hardware sequence not verified |
| 3 | Plan, execute, save strength workout | Web/local API implementation; physical device path pending |
| 4 | Deterministic next-session progression | Implemented and unit-tested |
| 5 | Recovery from real baseline + check-in | Engine implemented; real baseline end-to-end pending |
| 6 | Natural food logging and confirmation | Manual labels implemented; natural-language flow missing |
| 7 | Verified food grounding | Confirmed labels supported; USDA live integration pending |
| 8 | Pantry-aware meal generation | Structured recipe candidates implemented; complete live AI food flow pending |
| 9 | Coherent Today recommendation | Rules-based implementation; real integrated journey pending |
| 10 | Understandable Why | Implemented reasons; user comprehension not measured |
| 11 | Persisted recommendation feedback | Implemented and locally tested |
| 12 | Weekly review with real trends | Partial summaries; full review and real longitudinal data pending |
| 13 | Forecast/list/cart demo with approval | Forecast/list only; sandbox cart/approval missing |
| 14 | Tested diet/allergy hard constraints | Local tests pass; full release coverage and live food/AI cases pending |
| 15 | No unauthorized commerce | No commerce execution exists; future approval engine not implemented |
| 16 | Delete/disconnect | Web/API implementation and local tests; complete deployed/native lifecycle pending |
| 17 | Basic logs/metrics | Health checks/local logs; specified production instrumentation incomplete |
| 18 | Architecture and measured benchmarks | Architecture documented; target latency/AI/sync benchmarks unmeasured |
| 19 | Deployed and recorded demo | Private web deployed; full integrated demo and recording absent |

## Evidence available today

31 shared-domain/planning/mock-provider tests pass after the latest local fixes; web TypeScript/lint pass. Ten Java tests pass against disposable PostgreSQL. The prior packaged-container HTTP checks pass. Six native-core checks pass. The combined iPhone/Watch simulator build passes. These checks do not establish live AI accuracy, HealthKit correctness on actual devices, production capacity, public onboarding or product-market fit.

## Ten users tomorrow: release decision

Do not invite ten independent users with a promise that Google login, automatic Watch tracking and live AI already work. The owner can use the present private web features and manual/demo flows. A supervised demonstration is possible; a self-service complete-product beta is not ready.

Before a ten-user beta:

1. Complete public identity/onboarding and test two independent accounts, recovery, logout and isolation.
2. Connect one durable hosted backend/database to web and phone; verify migration, saves, retries, deletion and restore.
3. Install a signed native build and compare real Health data through Watch/phone/backend/web, including denied/partial permissions and offline recovery.
4. Configure and evaluate live food and AI providers; complete the P0 natural-language food flow and publish an honest supported-feature scope.
5. Complete the remaining agreed P0 gaps or obtain explicit scope changes recorded in DECISIONS; optional P2 features need not delay beta.
6. Run complete new-user journeys, accessibility/security review and a measured ten-account concurrency test with backups and error reporting.
7. Dogfood the loop before inviting beta users, then measure return usage, recommendation usefulness, retention and support burden.

Technical beta readiness can be demonstrated by tests and successful user journeys. Product-market fit requires evidence from actual users; neither attractive screens nor deployment proves it. Sections 26 and 28 explicitly call for 10–25 beta users and retention validation rather than assuming market fit.
