# PACE reliability review

The supplied Claude artifact remains unread: the URL requires sign-in. This review is based on FitLive source and small independent evaluations, not that artifact.

Implemented a versioned behavior contract in apps/web/lib/ai/pace-prompt.ts. It requires relevant answers, clarification, scope boundaries, recorded versus estimated facts, no invented actions, and no unsupported claims of causality. Provider failure now explicitly reports inability to answer instead of substituting a recovery template.

Nutrition tools report log coverage and estimate provenance. Empty meal history returns null totals, not zero intake. A live test initially caught Qwen describing missing logs as zero eaten; the tool representation and output guard were corrected. These are safeguards, not a guarantee against hallucinations.

Keep Qwen3-4B-Instruct-2507 as the measured low-cost baseline. A fitness fine-tune must outperform it on a held-out FitLive evaluation set before adoption. Require a suitable license, training-data provenance, tool/structured-output compatibility and documented safety/quality results. Do not train on user health conversations without separate explicit authorization. No fine-tuning or new provider was enabled.

Next evaluation set: missing/stale data, estimated meals, ambiguous follow-ups, mixed-topic questions, prompt injection, contradictions, allergies, medical boundaries, unsupported actions and provider failures. Measure unsupported claims, relevant answers, useful abstentions and latency separately. A generic model benchmark is not evidence of product safety or market readiness.

Sources: https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507 and https://huggingface.co/docs/hub/model-cards
