# Privacy and data handling

The hosted edition requires sign-in. Server APIs derive the owner from platform-verified identity and never accept an owner identifier from the client. The deployment must stay behind the Sites authentication gateway; do not expose the Worker directly and trust arbitrary identity headers.

Health summaries, profiles, food logs, pantry records, messages and recommendation history are persisted in the account record. Operation IDs support replay protection. Device tokens, where enabled, are stored only as SHA-256 hashes with expiry. No health payload is intentionally logged.

Export returns the current owned application state. Delete removes the account record, operation history, and device-token records. The UI also clears the local workout draft. Deletion does not delete the identity-provider account or override provider backup retention. No cloud backup purge guarantee is made.

Temporary workout drafts are stored in browser local storage so an interrupted session can resume. Do not use a shared browser profile for private workout drafts. Draft keys are scoped to the authenticated account.

Food search sends the food query to USDA. It does not send health history. No model provider receives data in the current release. No analytics trackers, advertisements, or commerce checkout are installed.

This is a wellness planning product. Recovery bands are heuristic context and are not diagnoses or medically validated scores. Review product privacy terms and applicable consumer-health obligations before a public multiuser launch; this document is an implementation description, not legal certification.
