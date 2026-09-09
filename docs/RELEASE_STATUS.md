# Release status

FitLive has a working hosted web application and a tested Java/PostgreSQL account backend. The entire master specification is **not yet production-complete**. This page separates implementation from external verification.

## Implemented

- Private web account, real/demo modes, recovery context, check-ins, workout logging and progression, food-label logging, pantry accounting, groceries, progress and feedback audit.
- Custom programs and weekday schedules, planned rest days, configurable rep ranges/increments, recipes, dietary filtering, meal planning, pantry-aware shopping, achievements and personal records.
- Light default theme and optional dark theme.
- Optional OpenAI Responses adapter with explicit consent, read-only tools, validated structured answers, bounded calls, no provider storage request, and deterministic fallback. No live provider key is configured yet.
- Java/PostgreSQL account API running the same generated policy implementation as the web; signed web bridge, expiring/revocable device credentials, guarded account transfer, transactional replay protection and deletion tombstones.
- Request size/account size bounds and owner-scoped mutation/coach rate limits.
- SwiftUI Today, Train, Eat, Progress and Coach screens; Keychain credentials, protected pending saves and workout drafts; HealthKit summary upload to the shared account.
- Watch workout draft, durable outgoing queue, paired-account binding, phone review, and acknowledgment only after an account save. Source passes the watchOS SDK check; hardware delivery is unverified.

## Required before calling the product production-ready

1. AWS sign-in and account eligibility/credit/budget verification; deploy Java and private PostgreSQL, configure HTTPS and bridge secrets, then verify hosted web ↔ Java ↔ iPhone with the same account.
2. Finish Xcode iOS/watchOS platform downloads, signing team and device setup. Build/install the combined application and test pairing, offline retries, reinstall/account switching, accessibility and Health permissions on real hardware.
3. Compare HealthKit summaries with device records, handle source disagreement, background anchored sync and deleted records. Current sync is foreground and summarizes sleep/RHR/HRV only.
4. Configure USDA/OpenAI secrets and execute live provider checks, adversarial evaluations and failure recovery. Mocked contracts do not establish real model accuracy.
5. Complete native/web feature parity: custom program and recipe editing currently live on the web; native food logging is label-based, native coach is deterministic. Notifications, food photo/barcode/receipt parsing and approved external grocery-cart integration remain unimplemented.
6. Run requested browser interaction/visual QA, native accessibility review, restore drills, load/latency testing and a security review before a broader release.

No App Store/TestFlight submission, AWS provisioning, automatic purchases, clinical validation, production SLA or measured AI accuracy is claimed. AWS resources must not be started on the assumption that a $1 account charge guarantees free hosting.
