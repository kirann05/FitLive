# Local web integration update — 2026-09-09

This update supersedes older integration-status statements in the readiness audit. It is a local development milestone, not a production release. Deployment and physical iPhone/Watch integration remain deferred.

- Google login: user confirmed successful local sign-in. Sessions use hashed random tokens, single-use login challenges, expiry and logout revocation.
- Ten disposable accounts: concurrent saves, account isolation, duplicate operations, write conflicts, anonymous rejection, cross-origin rejection and logout checks passed. This is not production load testing.
- USDA: personal key stored only in ignored local environment; verified search mapping preserves missing nutrients instead of inventing zeroes.
- Coaching: Ollama produced one grounded fixture answer in approximately 58.5 seconds. Hugging Face adapter added with consent enforcement, bounded read-only tools, validated structured output and failure fallback. Hosted inference awaits a private application token and live evaluation.
- Hosted trial candidate: Qwen/Qwen3-4B-Instruct-2507:nscale. Public router lists tool and structured-output support. Free account credits are limited; this is not unlimited free hosting. No paid credits or billing changes authorized.
- Consent off sends no context to a model provider. Basic rules-based coaching remains; true browser/on-device model inference for other users is not implemented. A server's local Ollama is not a remote user's device.
- Added basic natural meal draft confirmation, weekly review, body journal, habit summaries, and explicit grocery sandbox approval. Sandbox never purchases groceries.

Private setup: add HF_TOKEN to apps/web/.env.local, then set AI_PROVIDER=huggingface and restart local development. Never commit this file. The Hugging Face plugin connection does not supply an application token. Preserve OLLAMA settings to allow an explicit later switch back.

Remaining release gates include live hosted-coach evaluation, genuinely on-device inference for opt-out users, full specification reconciliation, physical native integrations, deployment/security/restore checks and user acceptance testing. No claim of market fit is made.

Sources: https://huggingface.co/docs/inference-providers/en/pricing and https://huggingface.co/docs/inference-providers/en/hub-api
