# Validation record

Executed locally on 2026-09-08/09. These are development checks, not production health-outcome claims.

| Check | Result |
| --- | --- |
| Deterministic domain tests | 16 passed |
| Web TypeScript check | Passed |
| Web lint | Passed |
| Hosted-compatible production build | Passed; rerun before publication |
| Local authenticated API integration | Passed |
| Java controller/security tests | 4 passed |
| Swift source syntax parse | Passed for iOS and Watch sources |
| Full native compilation / device testing | Blocked: full Xcode and device setup unavailable |
| Browser interaction / visual QA | Not performed |
| WebMCP runtime validation | Not performed: no supported validation context established |
| Live USDA provider check | Not performed: owner key not configured |
| Live AI | Not implemented / not claimed |
| GitHub-hosted CI | Workflow supplied; remote run result not yet verified |

## Domain scenarios

Multiple recovery signals vs one bad night; stale data; cold start; missing HRV; vegan/allergy/exclusion rules; macro arithmetic; pantry deduction; insufficient and mismatched pantry inventory; rejection of demo values in real mode; double progression; health replay; recommendation rejection; uncertain depletion; forbidden purchases; deletion; numeric validation.

## API integration

Local preview sign-in; anonymous 401; cloud mutation and readback; replay does not double-save; stale version 409; invalid check-in 400; workout completion; grocery generation; feedback persistence; unauthorized native upload rejection; deletion clears workouts, meals and health.

The test runs only against localhost and a disposable local identity. It does not mutate production account data.

## Java security

Anonymous read rejected; query-string owner cannot override verified JWT subject; malformed batch rejected; deletion scoped to caller. PostgreSQL ingestion replay is implemented but has not been exercised against a live PostgreSQL instance in this delivery.

No 99.9% reliability, latency, clinical recovery accuracy, or AI accuracy statistic is claimed.
