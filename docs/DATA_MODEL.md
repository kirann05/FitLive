# Data model

Both stores persist an owner-scoped, bounded account JSON document and monotonically increasing version. State includes profile, health, check-ins, workouts/sets, source-attributed meals, pantry, grocery list, recommendation audit, messages, custom program, confirmed food library, recipes, planned meals, preferences and consent history.

D1 tables: `accounts`, `operations`, `device_tokens`, `rate_limits`. Migrations in `apps/web/drizzle` are append-only after publication.

PostgreSQL tables: `accounts`, `operations`, `device_tokens`, `request_limits`, plus the independent raw `health_samples` ingestion table. Flyway migrations are in `backend/src/main/resources/db/migration`.

`operations` suppresses repeated owner/request IDs. The web retains an operation after uncertain network failure; native stores it in a protected pending file. A failed compare-and-swap returns 409. Deletion keeps a blank version tombstone so delayed pre-deletion writes cannot recreate private records.

`device_tokens` stores SHA-256 hashes and expiry. Creating a token revokes the previous one. The bridge owner is prefixed `platform:` in Java; native tokens resolve to that exact owner. Optional OIDC subjects are a separate identity path unless explicitly linked by a future migration.

The bridge-only bootstrap validates the full snapshot and inserts only when the destination account does not exist. It preserves the version, preventing old lower-version commands from being accepted. It does not overwrite a nonempty destination or silently resolve conflicts between independently populated accounts.

Account data is limited to 2 MB. Operation history and rate metadata need a deliberate retention/compaction policy for a large-scale rollout. Do not prune replay records independently of version/tombstone semantics.
