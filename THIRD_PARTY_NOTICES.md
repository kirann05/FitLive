# Third-party notices

The hosted web build starts from the bundled Sites/Vinext starter. Retained build plugin attribution and MIT license are in `apps/web/build/sites-vite-plugin.ts` and `apps/web/build/sites-vite-plugin.LICENSE`.

React, Vinext, Vite, Shadcn/Radix components, Lucide icons, Zod, Drizzle, Spring Boot and related dependencies retain their upstream licenses through package metadata. No code was copied from the reference fitness repositories listed in the master specification.

Demo nutrient values are explicitly sample fixtures and must not be described as a current verified USDA dataset. Live records, when configured, cite USDA FoodData Central. USDA's [API guide](https://fdc.nal.usda.gov/api-guide/) describes its data licensing and attribution.

## Shared policy runtime

Java embeds GraalVM Polyglot / GraalJS Community 24.2.2 from Maven Central. These dependencies retain their upstream licenses/notices in the resolved distribution; see [GraalJS](https://github.com/oracle/graaljs) and [embedding documentation](https://www.graalvm.org/jdk21/reference-manual/embed-languages/). The committed policy bundle includes Zod (MIT); its original license is preserved in [docs/licenses/ZOD.txt](docs/licenses/ZOD.txt). Xcode projects are generated with XcodeGen (MIT), not copied application code. The waveform icon is original repository code.

## Open Food Facts

Barcode product records are from [Open Food Facts](https://world.openfoodfacts.org/), whose database is licensed under [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/) and individual contents under the [Database Contents License](https://opendatacommons.org/licenses/dbcl/1-0/). FitLive preserves and displays `Open Food Facts · <barcode>` in confirmed meals and exports. Public use and redistribution must retain attribution; publicly used adapted databases trigger ODbL share-alike and access obligations. Review those obligations before distributing a combined/derived database. Provider caches remain separate by namespace; no OFF images are downloaded or redistributed.

Records are community supplied, not a guarantee of label accuracy. Users confirm the package and portion before logging. See [OFF API guidelines](https://openfoodfacts.github.io/openfoodfacts-server/api/) and [terms of reuse](https://world.openfoodfacts.org/terms-of-use).
