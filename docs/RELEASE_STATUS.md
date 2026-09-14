# Release status

FitLive has a working hosted web application and a tested Java/PostgreSQL account backend. The entire master specification is **not yet production-complete**. This page separates implementation from external verification.

See [the specification readiness audit](READINESS_AUDIT.md) for the current feature-by-feature gaps and ten-user launch decision. Deployment is paused following the owner’s switch to Render; the AWS setup is being removed.

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

1. Complete the selected Render hosting setup, deploy Java and durable PostgreSQL, configure HTTPS and bridge secrets, then verify hosted web ↔ Java ↔ iPhone with the same account. Public onboarding and the requested Google login remain incomplete.
2. The combined iPhone/Watch simulator build passes. Finish signing team and physical-device setup. Install the combined application and test pairing, offline retries, reinstall/account switching, accessibility and Health permissions on real hardware.
3. Compare HealthKit summaries with device records, handle source disagreement, background anchored sync and deleted records. Current sync is foreground and summarizes sleep/RHR/HRV only.
4. Configure USDA/OpenAI secrets and execute live provider checks, adversarial evaluations and failure recovery. Mocked contracts do not establish real model accuracy.
5. Complete native/web feature parity: custom program and recipe editing currently live on the web; native food logging is label-based, native coach is deterministic. Notifications, food photo/barcode/receipt parsing and approved external grocery-cart integration remain unimplemented.
6. Run requested browser interaction/visual QA, native accessibility review, restore drills, load/latency testing and a security review before a broader release.

No App Store/TestFlight submission, completed shared-backend deployment, automatic purchases, clinical validation, production SLA or measured AI accuracy is claimed. AWS resources were started within verified free-plan credits and are now being removed after the hosting-provider change.

## 2026-09-13 — Native reader expansion: blocked, not implemented

This dated ledger takes precedence over older general readiness statements above for this request.

| Check | Simulator | Physical iPhone |
|---|---|---|
| Existing sleep/RHR/HRV reader | Prior unsigned build only; not a hardware result | Not verified in this task |
| Xcode / signing gate | Full Xcode selected | Zero valid code-signing identities, confirmed outside sandbox |
| HealthKit entitlement | Present in source | Signed provisioning entitlement not verified |
| Steps, active energy, workouts, body mass | Not expanded | Blocked |
| Persisted anchors / deletion recomputation | Not implemented | Kill/relaunch not tested |
| Sleep / heart-rate background delivery | Not implemented | Morning delivery not tested |
| Partial permission comparison across 3 days | No simulated samples introduced | Not performed |
| Airplane-mode queue drain | Existing queue left unchanged | Not performed |

To unblock: select an Apple Developer team for FitLive in Xcode, obtain a valid development signing certificate/provisioning profile with HealthKit, and connect/unlock a trusted physical iPhone. Health values must not be pasted into chat or logs. Hardware acceptance remains required; the existing permission-denied wording is unchanged.

## 2026-09-14 — Code-only native expansion (supersedes signing stop for implementation)

**Written, unverified on device.** Added steps, active energy, workouts and body mass; individual HealthKit type requests; protected persisted anchors/raw cache; deterministic changed-day summaries; deletion staleness; nullable sleep; and readable-type metadata. Existing upload queue and storage privacy controls are reused.

| Verification | Result |
|---|---|
| Reader type check against iPhone Simulator SDK | Passed |
| Combined iPhone/Watch unsigned simulator build | Passed with destination-based SDK selection |
| Initial explicit `-sdk iphonesimulator` combined build | Failed because that override applied the iPhone SDK to Watch assets; corrected destination-based build passed |
| Local arithmetic fixtures | Passed, synthetic test inputs only; no HealthKit reads or uploads |
| Physical iPhone install / per-type consent | Not performed |
| Three-day comparison with Health | Not performed |
| Hardware anchor persistence / deletion / airplane-mode retry | Not performed |
| Background morning delivery | Not implemented in this pass |

The card displays received data types, not inferred permission grants. Web gesture behavior still needs touch-device acceptance testing. Signing and physical-device tests remain release requirements; an unsigned build is not an installation or HealthKit test.
