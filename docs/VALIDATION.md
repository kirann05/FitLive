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
