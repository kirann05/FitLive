# Release status

## Delivered web MVP

The working hosted loop is: saved manual/demo health → deterministic recovery → training plan → completed workout → progression and daily next action → confirmed food → pantry deduction → shopping list → feedback audit.

The cloud store uses owner-scoped application state, optimistic concurrency, atomic operation recording and idempotency keys. Demo and real modes are visibly labeled. Switching modes replaces the current dataset only after confirmation; export first. They are not two concurrently retained accounts.

## Still unfinished — do not represent as shipped

- Full native iOS product screens and production onboarding/authentication.
- Device-to-hosted-account HealthKit transport through the private access gateway.
- Real iPhone/Watch compile, signing and device testing; full Xcode is absent here.
- Background/anchored HealthKit sync, deletion reconciliation, source prioritization, activity/weight ingestion.
- WatchConnectivity and durable synced Watch workout logging.
- Complete Java parity with web training/nutrition/coach APIs and deployment of that service.
- Live generative AI, typed model tool orchestration, model routing, photo/text food parsing.
- USDA live integration verification with an owner-provided key.
- Full custom workout-program builder, scheduling by weekday, substitutions, PRs and achievements.
- Multi-day meal planning, recipes, receipt/barcode ingestion and grocery pricing/cart approval.
- Dark theme, push notifications and background reminders.
- Browser interaction/visual QA, native accessibility review and external security review.
- Measured production latency, reliability, AI accuracy, clinical validation or retention claims.

## Release gates

1. Owner supplies deployment/identity configuration for the Java/native path.
2. Build/sign native applications with full Xcode and test on real devices.
3. Establish authenticated native-to-web account linking before claiming Apple Health is connected.
4. Configure and verify USDA; implement generative provider only with explicit data consent.
5. Complete remaining P0 native/AI requirements and cross-platform parity.
6. Exercise the full public-demo definition of done on real data before calling the entire product complete.
