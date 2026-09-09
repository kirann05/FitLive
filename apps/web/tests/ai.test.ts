import test from "node:test";
import assert from "node:assert/strict";
import { seed } from "../lib/domain.ts";
import {
  runCoach,
  executeReadTool,
  OpenAIProvider,
  type AIProvider,
} from "../lib/ai/provider.ts";
const now = new Date("2026-09-09T15:00:00Z");
test("AI never receives health data without explicit consent", async () => {
  const s = seed(now);
  let called = false;
  const p: AIProvider = {
    complete: async () => {
      called = true;
      throw new Error();
    },
  };
  const r = await runCoach(s, "Why this plan?", p, undefined, now);
  assert.equal(called, false);
  assert.equal(r.status, "consent_required");
});
test("tools reject arguments and unknown/write operations", () => {
  const s = seed(now);
  assert.throws(() =>
    executeReadTool(s, "get_training_context", { owner: "other" }),
  );
  assert.throws(() => executeReadTool(s, "purchase", {}));
  assert.throws(() => executeReadTool(s, "execute_sql", {}));
});
test("structured tool calling reads current state and produces a validated answer", async () => {
  const s = seed(now);
  s.preferences!.aiConsent = true;
  let count = 0;
  const p: AIProvider = {
    complete: async (request) => {
      count++;
      assert.equal(request.store, false);
      return count === 1
        ? {
            output: [
              {
                type: "function_call",
                name: "get_recovery_context",
                arguments: "{}",
                call_id: "c1",
              },
            ],
          }
        : {
            output: [
              {
                type: "message",
                content: [
                  {
                    type: "output_text",
                    text: JSON.stringify({
                      summary: "Keep a little in reserve today.",
                      reason:
                        "Several recovery signals support the existing lighter plan.",
                      action: "training",
                    }),
                  },
                ],
              },
            ],
          };
    },
  };
  const r = await runCoach(s, "Why this plan?", p, undefined, now);
  assert.equal(r.provider, "openai");
  assert.deepEqual(r.tools, ["get_recovery_context"]);
  assert.equal(r.action, "training");
});
test("malformed, unavailable, or unsafe model output falls back without data writes", async () => {
  const s = seed(now);
  s.preferences!.aiConsent = true;
  const before = JSON.stringify(s);
  for (const answer of [
    "not JSON",
    JSON.stringify({
      summary: "I purchased your groceries.",
      reason: "Done.",
      action: "none",
    }),
  ]) {
    const p: AIProvider = {
      complete: async () => ({
        output: [
          { type: "message", content: [{ type: "output_text", text: answer }] },
        ],
      }),
    };
    assert.equal(
      (await runCoach(s, "Help with my day", p, undefined, now)).status,
      "fallback",
    );
  }
  assert.equal(JSON.stringify(s), before);
});
test("transport uses server-side authorization and disables response storage", async () => {
  let checked = false;
  const transport: typeof fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    assert.equal(body.store, false);
    assert.ok(
      (init?.headers as Record<string, string>).Authorization.startsWith(
        "Bearer ",
      ),
    );
    checked = true;
    return Response.json({ output: [] });
  };
  await new OpenAIProvider("fixture-not-a-real-key", transport).complete({
    input: [],
  });
  assert.equal(checked, true);
});
