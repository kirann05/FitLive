# Data model

## Hosted web

- `accounts`: verified owner key, optimistic version, serialized domain state, latest operation ID, update timestamp.
- `operations`: composite owner/request ID for replay suppression, creation timestamp.
- `device_tokens`: hashed token, owner and expiry. Native transport through the private gateway remains a release gate.

The state contains profile/consent, health summaries, daily check-ins, completed/partial workouts and sets, meals with nutrient provenance, pantry estimates, shopping items, coach messages and recommendation audit entries.

Mutation is a compare-and-swap update plus operation insertion in one D1 batch. Concurrent stale writes receive 409. Retrying an already applied operation returns the current snapshot. The client retains an operation key after network failure.

The MVP stores account state as one JSON document. This simplifies transactional consistency but is not intended for unlimited longitudinal volume. Normalize high-volume records and implement bounded history retention before large-scale beta. No performance benchmark is claimed.

## Java

`health_samples`: owner, source ID, day, canonical JSON summary and received timestamp. Owner/source ID is unique. Conflicting replays return 409; identical replays do not insert. Every query scopes to the verified JWT subject.
