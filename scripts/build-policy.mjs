// Keep Java and the web on the exact same policy implementation.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(
  new URL("../apps/web/package.json", import.meta.url),
);
const { build } = require("esbuild");
await build({
  entryPoints: [
    fileURLToPath(new URL("../apps/web/lib/domain.ts", import.meta.url)),
  ],
  bundle: true,
  format: "iife",
  globalName: "FitLiveDomain",
  target: "es2022",
  outfile: fileURLToPath(
    new URL("../backend/src/main/resources/engine/domain.js", import.meta.url),
  ),
});
