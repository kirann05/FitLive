# Privacy and data handling

The hosted edition derives ownership from platform-verified identity. Keep it behind the Sites authentication gateway. Java accepts signed server requests or expiring device credentials; optional OIDC checks issuer and audience. Neither path accepts an editable client owner ID.

Profile/consent, health summaries, check-ins, workouts, food logs, pantry, meal plans, messages and recommendation history are account data. Tokens are hashed server-side and stored in iPhone Keychain. Health payloads and credentials must not appear in application logs.

Export returns current owned domain state. Delete removes domain records, operation history and device credentials; a blank account/version tombstone and deletion operation remain to block stale writes. Rate-limit metadata contains owner/bucket/count/expiry, not health payloads; expired buckets are cleaned on subsequent account requests. Deletion also clears the legacy D1 copy after Java cutover. Provider backups follow their retention policies; this implementation does not promise instantaneous backup purge or delete the sign-in provider account.

The browser keeps an account-scoped local workout draft. Native pending requests, workout drafts and Watch queues are device-local protected files; credentials are in Keychain. Web account deletion does not remotely erase offline device files. Disconnect/revoke the native credential and clear local drafts on each device when removing local copies. Account linking prevents pending Watch sessions being sent into a different paired account.

Food search sends the search query to USDA. Optional AI requires explicit account consent before sending a question and limited computed recovery/training/nutrition context to OpenAI. The provider request uses `store:false`; that flag is not a guarantee of zero provider abuse-monitoring retention. Revoking consent prevents new model requests. No configured key means deterministic guidance only. No analytics tracker, advertising or automatic commerce checkout is installed.

Native privacy manifests declare app-only UserDefaults access and account-linked health, fitness, identifier and user-content data for app functionality. Review App Store privacy answers against the final deployed behavior before submission.

Recovery is a wellness planning heuristic, not a diagnosis or validated medical score. This describes implemented data handling, not legal certification. A broader launch needs the owner’s privacy policy, retention/backup practices and applicable consumer-health review.
