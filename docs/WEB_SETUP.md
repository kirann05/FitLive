# Web setup

The hosted source is under `apps/web`. The Sites manifest declares the existing project and logical `DB` D1 binding. Never create another Site for this checkout.

1. Install Node 22.13+ dependencies using `npm run install:ci`.
2. Generate a build with `npm run build`.
3. Apply each local migration once, in order:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_curious_pride.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_flaky_morgan_stark.sql
```

4. Run `npm run dev`; sign in through the local preview.
5. Run the destructive fixture-only API test with `node tests/api.integration.mjs`. It refuses non-local origins and clears only the preview account.

Production migrations are applied by the hosting workflow. Do not modify migrations after publication; append new migrations.

`USDA_API_KEY` is an optional server-side secret. Do not commit it or expose it in a public client variable. Food search uses the [official USDA API](https://fdc.nal.usda.gov/api-guide/). The application can log user-confirmed package-label values without a key.
