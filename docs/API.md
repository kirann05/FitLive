# API contract

## Hosted browser API

All state operations require platform-authenticated identity; anonymous requests return 401. Same-origin mutation checks reject foreign origins. Do not accept client-supplied identity.

- `GET /api/state` → `{version,state}`.
- `POST /api/state` → `{id: UUID, version: integer, command: ...}`. Returns a new snapshot. Supported commands are defined by `commandSchema` in `apps/web/lib/domain.ts`.
- `GET /api/foods?q=...` → USDA search candidates; 503 when unavailable/unconfigured.
- `POST /api/devices` → one-time raw device credential; invalidates previous token. Owner-only, same-origin.
- `DELETE /api/devices` → revokes device credentials.
- `POST /api/health/sync` → `{samples:[DailySummary...]}`, requires hashed owner-linked bearer credential and consented real mode. Gateway-level native authentication is not yet verified.

Invalid input → 400; foreign origin → 403; stale version → 409; oversized payload → 413; storage/provider failures → recoverable failure. No purchase endpoint exists.

## Java native ingestion API

OAuth JWT issuer and audience configured via environment. Identity comes from `sub`.

- `POST /api/health/sync`: `{samples:[{id,date,sleep,rhr,hrv,source,sampleAt,syncAt}]}`; maximum 100 per batch.
- `GET /api/health/export`: owned health records.
- `DELETE /api/health`: owned health deletion.
- `GET /actuator/health`: public health/readiness without sensitive details.

The Java service currently ingests health only. It is not contract-equivalent to the complete hosted browser API.
