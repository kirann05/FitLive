# Decisions

## ADR-001 — Modular monolith
- Original assumption: Java 21 and PostgreSQL modular monolith.
- Decision: Keep the independently deployable backend as a modular monolith. No queues, separate agent services or caching infrastructure.
- Reason: A single transactional boundary and versioned deterministic policy are easier to audit.
- Trade-off: Horizontal scaling is deferred until measured demand.
- Date: 2026-09-08.

## ADR-002 — Hosted web runtime
- Original assumption: All web traffic uses a separately deployed Spring Boot backend.
- Decision: The immediately hosted personal web edition uses a Worker-compatible TypeScript API and D1 persistence; independent Java/PostgreSQL hosting is documented separately.
- Reason: Sites cannot execute a JVM. This makes the personal web experience usable without first buying/configuring another hosting provider.
- Trade-off: Deployment implementations require contract parity. Native production deployment and real hardware verification remain explicit release gates.
- Date: 2026-09-08.

## ADR-003 — Light appearance first
- Original assumption: Intentional light and dark palettes.
- Decision: Default to the light appearance requested by the owner; retain an optional intentional dark appearance only if fully implemented.
- Reason: The owner explicitly prioritized a minimal, light app.
- Trade-off: Dark appearance is secondary to the functional loop.
- Date: 2026-09-08.

## ADR-004 — No invented live connections
- Original assumption: USDA, model and commerce providers configured at launch.
- Decision: External providers remain opt-in with server-side credentials. Clearly labeled sample data and deterministic coaching work without credentials. Commerce starts as a shopping list with no purchasing endpoint.
- Reason: Missing provider credentials must not cause fabricated results or unauthorized purchases.
- Trade-off: Live food search and generative conversation require provider setup.
- Date: 2026-09-08.

## ADR-005 — One policy implementation across runtimes
- Decision: Bundle the TypeScript policy with esbuild and execute it in restricted GraalJS in Java. Keep the generated resource committed and parity-checked in CI.
- Reason: Native and web load/protein/recovery calculations must not diverge across hand-maintained implementations.
- Trade-off: Graal adds memory/startup cost; contexts are isolated per invocation. Benchmark under deployment load before scaling.
- Date: 2026-09-09.

## ADR-006 — Signed bridge and account transfer
- Decision: Platform identity is asserted only by the hosted server using an HMAC-protected request. Native pairing creates an expiring token for that exact Java owner. The browser never receives the bridge secret.
- Reason: A private Sites gateway is not an iPhone API credential. An independently hosted HTTPS Java API provides an authenticated mobile transport.
- Trade-off: Backend cutover needs a validated bootstrap and careful legacy-store retirement; switching a configuration value back is not a data rollback.
- Date: 2026-09-09.

## 2026-09-13 — Barcode lookup alongside USDA

OFF candidates reuse FoodCandidate and MealForm; the existing meal command remains the only save path. The product endpoint uses the supported v2 schema for the explicit `status: 0/1` contract and stable allergen-tag fields; v3 migration is a future adapter change. Missing nutrient values remain null, and source allergens plus traces require confirmation. Known liquid servings do not silently convert ml to grams. Provenance remains attached to the saved food.

Cloudflare's server Cache API shares public candidate results across accounts within a data center: normalized USDA queries for one hour, found OFF products for 24 hours. It is best-effort, evictable and not globally replicated; misses safely call the provider. No health data or account identifiers are cached. Per-user limits run before cache access. The existing D1 limiter also enforces an app-wide OFF outbound budget of six requests per fixed minute (at most twelve in a rolling minute), below the documented fifteen product reads/minute/IP. Provider budget exhaustion returns 503, not a false not-found. No provider write calls occur.

## 2026-09-13 — HealthKit expansion paused at signing gate

Read H1, I1–I3, K1 and the existing iOS/shared reader, summary math, wire model and settings. Full Xcode is installed, and the HealthKit entitlement exists. The signing identity check, repeated outside the sandbox, reports zero valid identities. The user explicitly requires stopping when signing is unavailable. No native reader, permission UI, encrypted storage, consent, tombstone, revocation or replay implementation was changed. No source-priority rule is claimed as implemented. A deterministic per-type source selection rule must be settled and tested against physical Health data when signing is available.
