# FitLive

**What is the next sensible thing I should do?**

FitLive connects sleep and readiness, strength training, meals, pantry stock and feedback into a calm daily planning experience. The interface uses light blue surfaces, restrained typography, and one primary action.

## What you can use now

The hosted web edition supports:

- Private sign-in and cloud-saved personal data.
- Profile, goals, dietary restrictions, allergies and editable nutrition targets.
- Manual health summaries, personal baselines, readiness check-ins and explained recovery context.
- Rotating strength sessions, set/reps/load/RPE logging, a rest timer, device-local workout drafts and cloud completion.
- Deterministic progression from completed sets and perceived effort.
- Confirmed food portions, package-label nutrition, optional USDA lookup, and source-attributed totals.
- Pantry estimates, matched food deductions, low-stock shopping lists and text export.
- Weekly training/nutrition/sleep summaries and a recommendation audit trail.
- A clearly labeled rules-based coach, without pretending an AI provider is connected.
- Data export and deletion.
- Explicit demo mode with sample health and nutrient fixtures.

**This is a usable web MVP, not completion of every item in the master specification.** Native integration and generative AI are explicit release gates below.

## Repository map

| Path | Purpose |
| --- | --- |
| `apps/web` | Hosted React/TypeScript application, cloud API, deterministic engines, migrations and tests |
| `backend` | Java 21 / Spring Boot health-ingestion service with OAuth JWT ownership and PostgreSQL migrations |
| `apps/ios` | SwiftUI HealthKit companion source and XcodeGen project specification |
| `apps/watch` | Explicitly local Watch set-counter source; cloud sync is unfinished |
| `docs` | Architecture, decisions, privacy, API contract, validation, demo and release gaps |
| `.github/workflows` | Web checks and Java authorization tests |

Start with [architecture](docs/ARCHITECTURE.md), [decisions](docs/DECISIONS.md), [validation](docs/VALIDATION.md), and [release status](docs/RELEASE_STATUS.md).

## Hosted web development

Requires Node 22.13+.

```sh
cd apps/web
npm run install:ci
npm run dev
```

The development server prints its local URL. Its local sign-in is a test identity, not production authentication. D1 setup is described in [web setup](docs/WEB_SETUP.md).

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

## Independent Java health service

Requires Docker Compose and an OAuth/OIDC issuer you control.

```sh
cp .env.example .env
# Fill DATABASE_PASSWORD, OIDC_ISSUER and OIDC_AUDIENCE.
docker compose up --build
```

The backend is bound to localhost by default. Deploy behind HTTPS for a device. It is a health-ingestion service, **not a second complete implementation of the web API**, and its PostgreSQL store is not automatically linked to the hosted web store.

```sh
cd backend
mvn test
```

## iPhone / Watch

See [native setup and verification gates](docs/NATIVE_SETUP.md). Full Xcode, signing, HealthKit entitlement and a physical device are required. No native binaries are claimed to have been built or device-tested in this delivery.

## External services

- USDA: configure `USDA_API_KEY` as a server-side hosted secret. Food lookup fails clearly if unavailable; package-label logging still works.
- Generative AI: not connected. The coach is rules-based and states that clearly.
- Groceries: shopping lists only. There is no purchasing endpoint and no automatic spending.
- Apple Health: native implementation source exists; device-to-hosted-account transport and real-data verification remain unfinished.

## Limits that matter

Recovery is a conservative planning heuristic, not a validated medical score. Food values are as reliable as the selected source and confirmed portion. Unknown or incorrectly entered allergens cannot be inferred reliably; check labels. Demo data is never represented as real measurements.

The requested Java/PostgreSQL architecture remains an independent deployment path. The hosted web uses a TypeScript Worker and D1 because the hosting platform cannot execute Java. This is recorded in [ADR-002](docs/DECISIONS.md).
