# AI and policy evaluation

The shipped coach is deterministic and explicitly identifies itself as rules-based. There is no live model adapter or model-routing claim. Its inputs are the same saved state used by Today, training and food totals.

Domain tests cover hard diet constraints, stale/missing recovery data, progression, pantry accounting, rejection feedback, unauthorized commerce text and invalid numerical input. These validate policy behavior, not an LLM's structured-output reliability.

Before adding a model provider: define a read-only tool registry, an explicit data-consent control, a provider-neutral interface, structured output validation, bounded retries and a rules-based fallback. The model must never own nutrition arithmetic, allergy bypasses, load increments, direct database access or purchase execution. Add adversarial and medical-scope fixtures and measure results before making any accuracy claim.
