# AI and policy evaluation

The optional provider calls OpenAI Responses with `store:false`, server-held credentials and a configured model (`OPENAI_MODEL`, default `gpt-5.6-terra`). The account must explicitly consent before a request is sent. Tool context is limited to recovery, training and nutrition; no tool writes data or places orders.

The adapter validates zero-argument read tools and structured answer JSON, limits three rounds/six calls, applies per-request timeouts, and falls back to deterministic guidance on invalid output or provider failure. Scope-sensitive medical/commerce requests are handled deterministically. Model summaries are explanations; deterministic rules remain authoritative for numbers and hard dietary constraints. Regex filtering is a supplemental guard, not a security/medical accuracy guarantee.

Five mocked-provider tests verify consent gating, the read-only registry, tool round-trip/structured output, malformed-response fallback, and transport authentication/storage parameters. Domain tests separately cover calculations and policy. The native Java coach currently uses deterministic guidance; the hosted web can invoke the configured provider before a signed Java mutation.

**Live model calls, latency, accuracy and adversarial pass rates remain unmeasured.** Before enabling for a wider audience, run representative queries for stale/missing data, dietary exclusions, invented metrics, tool injection, medical symptoms, purchases, malformed output, provider timeout/rate limits and consent revocation. Record model/version, fixture, expected tool/action, observed output and failure class. Never report mocked-contract success as real model accuracy.

References: [Function calling](https://developers.openai.com/api/docs/guides/function-calling), [Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
