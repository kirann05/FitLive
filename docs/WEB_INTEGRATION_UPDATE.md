# Local web integration update — 2026-09-09

This update supersedes older integration-status statements in the readiness audit. It is a local development milestone, not a production release. Deployment and physical iPhone/Watch integration remain deferred.

- Google login: user confirmed successful local sign-in. Sessions use hashed random tokens, single-use login challenges, expiry and logout revocation.
- Ten disposable accounts: concurrent saves, account isolation, duplicate operations, write conflicts, anonymous rejection, cross-origin rejection and logout checks passed. This is not production load testing.
- USDA: personal key stored only in ignored local environment; verified search mapping preserves missing nutrients instead of inventing zeroes.
- Coaching: Ollama produced one grounded fixture answer in approximately 58.5 seconds. Hugging Face adapter added with consent enforcement, bounded read-only tools, validated structured output and failure fallback. Live Hugging Face fictional-data check passed in 3.1 seconds with training and recovery tool reads. This is one connectivity/grounding check, not a broad accuracy evaluation. Nscale requires auto tool choice; FitLive still rejects answers without a successful state read.
- Hosted trial candidate: Qwen/Qwen3-4B-Instruct-2507:nscale. Public router lists tool and structured-output support. Free account credits are limited; this is not unlimited free hosting. No paid credits or billing changes authorized.
- Consent off sends no context to a model provider. Basic rules-based coaching remains; true browser/on-device model inference for other users is not implemented. A server's local Ollama is not a remote user's device.
- Added basic natural meal draft confirmation, weekly review, body journal, habit summaries, and explicit grocery sandbox approval. Sandbox never purchases groceries.

Private setup: add HF_TOKEN to apps/web/.env.local, then set AI_PROVIDER=huggingface and restart local development. Never commit this file. The Hugging Face plugin connection does not supply an application token. Preserve OLLAMA settings to allow an explicit later switch back.

Remaining release gates include live hosted-coach evaluation, genuinely on-device inference for opt-out users, full specification reconciliation, physical native integrations, deployment/security/restore checks and user acceptance testing. No claim of market fit is made.

Sources: https://huggingface.co/docs/inference-providers/en/pricing and https://huggingface.co/docs/inference-providers/en/hub-api

## Photo meal journal

Eat supports mobile camera capture, upload and description-only analysis. Photos are resized/re-encoded to JPEG in the browser, removing metadata. FitLive does not store photos. Each analysis requires consent to send photo/description to Hugging Face and its provider; no other account health context is sent. Limits: five analyses/minute and thirty/day/account.

Qwen3-VL generates validated nutrition estimates. Review portions, correct the draft in plain English, remove items and save one atomic batch. Estimates remain labeled in food provenance. Photos cannot establish exact portions or allergy safety. Manual entry remains available. Drafts survive request/save failures in the open page, not reloads.

Live description fixture (rice, tomato dal, paneer) returned three items in 19.9 seconds and preserved the two specified 100 g portions. Camera hardware and actual-photo recognition accuracy are not verified. Automated tests cover consent, image payload, correction context, invalid responses and atomic estimated-meal saving.

## Meal composer and voice input

Meal entry now uses compact camera/upload choices and a shared text/voice composer. Coach also supports voice-to-text. Dictation uses the browser SpeechRecognition API where available, with explicit speech-service consent, permission/error handling, a one-minute limit and cleanup on unmount. Text is editable and never submitted automatically. Browser speech services may process audio remotely; this is not an on-device guarantee. Unsupported browsers retain typed entry and show guidance. Actual microphone hardware/recognition accuracy is not verified. Type checking, lint and production build passed; no browser visual testing was performed.
