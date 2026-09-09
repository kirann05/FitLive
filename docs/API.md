# API contract

## Hosted browser routes

Platform-authenticated identity is required; foreign-origin mutations are rejected. All responses with private state use no-store caching.

| Route | Behavior |
| --- | --- |
| `GET /api/state` | `{version,state}` from D1 or configured Java account |
| `POST /api/state` | `{id:UUID,version:integer,command}`; atomic shared-policy mutation |
| `GET /api/connections` | Configuration booleans/model name; never secret values |
| `GET /api/foods?q=...` | USDA candidates; clear failure if unconfigured |
| `POST /api/devices` | Create one-time device credential, invalidating previous token |
| `DELETE /api/devices` | Revoke native credentials |
| `POST /api/health/sync` | Legacy D1 ingestion route; private Sites gateway can block native callers |

Supported commands are defined by `commandSchema` in `apps/web/lib/domain.ts`. They cover profile, check-in, health, workout, program, confirmed food/meal, pantry, recipes/plans, groceries, preferences, feedback, coach, demo/real mode and deletion. There is no purchase command.

400 invalid input; 401 sign-in required; 403 origin/role failure; 409 stale version/policy conflict; 413 size bounds; 429 rate limit; 503 temporary storage/provider failure. Client retries retain the operation ID and version.

## Java shared account routes

`GET /api/state`, `POST /api/state` and `GET /api/daily` serve native and signed web requests. The daily route computes recovery, plan and recommendation with the shared policy. `POST /api/bootstrap` accepts a validated `{version,state}` only from the signed bridge and only initializes an absent account.

`POST /api/devices` and `DELETE /api/devices` are bridge-only. Pairing requires a consented real workspace. A `Bearer flv_...` credential maps directly to that workspace and expires after 90 days. The iPhone uses the origin plus `/api/state`; do not paste the private Sites URL as the native backend.

The signed web bridge covers method, path, timestamp, owner and body SHA-256 using HMAC-SHA256. It is checked within 60 seconds. The `generated` coach result is honored only for bridge-authenticated mutations; native chat falls back to deterministic guidance.

The independent raw health ingestion endpoints remain `POST /api/health/sync`, `GET /api/health/export`, `DELETE /api/health`. Current native account sync uses the shared `health` command instead. `GET /actuator/health` is public without sensitive details.
