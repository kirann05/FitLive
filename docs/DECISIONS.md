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
