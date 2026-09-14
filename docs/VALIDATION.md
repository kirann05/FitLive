# Validation record

Executed on 2026-09-09. These are development checks, not production health-outcome claims.

| Check | Result |
| --- | --- |
| Shared domain/planning and mocked AI tests | 31 passed, including latest local fixes |
| Web TypeScript and lint | Passed |
| Sites-compatible production build | Passed |
| Local authenticated web API | Passed, including deletion retry and stale-write rejection |
| Java unit/security/PostgreSQL tests | 10 passed against disposable PostgreSQL 17 |
| Packaged Java container HTTP test | Passed: signed accounts, replay, native pairing, concurrent writes, daily policy, deletion, revocation and stale-write rejection |
| Native core executable checks | 6 passed: interval merging, missing-signal encoding, packet identity/date/account persistence |
| iPhone and Watch source against Apple SDKs | Type-check passed |
| Combined Xcode app build | iPhone + embedded Watch simulator build passed, unsigned |
| Native signing/install/HealthKit/Watch hardware | Not yet verified |
| Native icon | Generated and visually inspected |
| Browser interaction/visual QA and WebMCP runtime | Not performed/verified |
| Live USDA/OpenAI | Not configured or measured; mocked AI tests are not live evaluations |
| Hosting | AWS setup being removed at owner request; Render not deployed; shared hosted backend pending |
| Remote GitHub CI | Workflow supplied; verify the run for the published commit |

## Regression found and fixed

The real container HTTP test exposed a conflict response incorrectly becoming 401 during servlet error dispatch. Permitting the internal error dispatcher preserves the intended 409 while normal API requests remain authenticated. The container test then passed. MockMvc alone did not reveal that runtime behavior.

Other checks cover recovery freshness/missing inputs, dietary exclusions, exact portions/pantry deductions, duplicate ingredient rejection, custom schedules/progression, recipes, account transfer, offline workout dates, AI parsing/fallback and deletion tombstones.

## Reproduce

Web: commands in README, then `node apps/web/tests/api.integration.mjs` against the local preview. Java: `mvn -f backend/pom.xml test`; set `FITLIVE_POSTGRES_TEST=true` and disposable `DATABASE_*` values for real PostgreSQL tests. Container: `node tests/backend.integration.mjs` defaults to localhost:58080 and a test-only bridge secret. HTTP fixtures reject non-local hosts and delete disposable test state.

Native: compile `apps/shared/*.swift` and `tests/native-core.swift` with `xcrun swiftc`, then execute the binary. CI also attempts the unsigned combined app build on macOS.

No production SLA, clinical accuracy, AI accuracy, retention outcome or latency percentile is claimed.

## 2026-09-13 — Barcode path and USDA cache

### Automated evidence

69 web tests passed, including existing health replay tests. New cases cover the shared barcode route handler's 401/429/400/404/503 paths, app-wide provider budget, timeout, cache hits, descriptive User-Agent, OFF fixture mapping, null versus recorded zero, kJ conversion, serving units, allergen blocking through the existing policy, confirmed meal attribution, and normalized cross-account cache reuse. Type checking, lint and the production build pass. The existing large-client-chunk build warning remains.

### Live provider reads (not physical camera scans)

Read-only OFF v2 requests used the FitLive User-Agent with TLS verification enabled. The actual records were passed through mapOffFood. No meal was saved during verification.

| Case | Barcode | Observed result |
|---|---|---|
| US product | 0016000275287 | `status: 1`, Cheerios, countries includes United States; per 100 g: 358.974 kcal, 12.821 g protein, 74.359 g carbs, 6.410 g fat, 10.256 g fiber; mapped serving 39 g; source `Open Food Facts · 0016000275287` |
| Incomplete product | 0049000006346 | `status: 1`, Coca cola can cokes LG; fiber absent and mapped to null. Recorded protein/fat zero stayed zero. No grams-based serving was inferred from missing serving fields. |
| Not found | 0051500255002 | `status: 0`, `product not found`; handled as 404 with manual-label fallback |

Additional invalid all-zero control returned status 0 (`no code or invalid code`). An initial Python fetch failed certificate-chain validation; retried using the system curl trust store, without disabling TLS verification. No unsuccessful lookup is described as a successful scan.

### Outstanding proof

Physical camera scanning of three packages, camera permission denial on iPhone/Android, and an authenticated browser confirm-and-log round trip have **not** been verified. The rows above are provider-read/mapper evidence, not camera or hardware acceptance. BarcodeDetector support varies; manual number entry is always available in the signed-in food-add flow. No automatic logging path exists.

The native expansion is stopped at the required signing gate. See RELEASE_STATUS.md for the explicit simulator/hardware ledger. Existing storage/consent/deletion/revocation code was not rebuilt.

Runtime checks: the actual local `/api/foods/barcode` route returned HTTP 401 without a session. Java `DomainEngineTest` also passed. These do not substitute for the outstanding camera, authenticated browser and HealthKit hardware checks.

## 2026-09-14 — Set corrections and HealthKit reader expansion

73 web tests pass. Added coverage for voice weight/repetition corrections, bounds, old-session confirmation, stale revision rejection, edit/delete/undo state, preserved edited metadata, expanded nullable HealthKit fields and summary replay. Existing food and recovery tests remain passing. Type checking and lint pass; the production build retains its previously documented bundle-size warning.

Native reader type-check and combined unsigned iPhone/Watch simulator build pass. Local HealthMath fixtures exercise missing data, steps/energy totals, workout duration, resting HR/HRV means and overlapping sleep intervals. No test fixtures enter HealthKit or the upload path. Java engine regression checks are also run. Physical swipe/hold behavior, Voice recognition accuracy, HealthKit permission behavior, hardware anchor persistence, source reconciliation and offline delivery are not certified by these checks. See RELEASE_STATUS.md and DECISIONS.md for the exact native limitations and source/window rules.
