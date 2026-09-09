# FitLive hosted web

This folder contains the hosted React/TypeScript application and its server API.

The repository root README and `docs/` explain the product, setup, architecture, measured checks and unfinished native/AI work. This is the complete source of the currently hosted web MVP.

```sh
npm run install:ci
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

Local cloud-schema setup is documented in `../../docs/WEB_SETUP.md`. Production migrations are managed through Sites. Keep the existing `.openai/hosting.json` project identity.
