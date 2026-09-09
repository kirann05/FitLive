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
test("a provider answer without any state read uses the rules fallback", async () => {
  const s = seed(now);
  s.preferences!.aiConsent = true;
  const p: AIProvider = { complete: async () => ({ output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify({ summary: "Your plan is ready.", reason: "Follow today's training.", action: "training" }) }] }] }) };
  assert.equal((await runCoach(s, "Help with my plan", p, undefined, now)).status, "fallback");
});
test("nutrition tools use the supplied clock and account timezone", () => {
  const s = seed(now);
  s.profile.timezone = "America/Chicago";
  const meal = s.meals[0];
  assert.ok(meal);
  s.meals = [{ ...meal, date: "2030-01-01" }];
  const result = executeReadTool(s, "get_nutrition_context", {}, new Date("2030-01-02T02:00:00Z")) as { totals: { protein: number } };
  assert.equal(result.totals.protein, meal.food.protein * meal.grams / 100);
});
test("open-weight adapter sends only bounded chat requests and maps tool results",async()=>{
 const {OllamaProvider}=await import("../lib/ai/ollama.ts");
 const provider=new OllamaProvider("http://localhost:11434",async(_url,init)=>{
   const body=JSON.parse(String(init?.body));assert.equal(body.stream,false);assert.equal(body.think,false);assert.equal(body.options.num_ctx,4096);
   return Response.json({message:{tool_calls:[{function:{name:"get_recovery_context",arguments:{}}}]}});
 });
 const result=await provider.complete({model:"fixture",instructions:"Read state",input:[{role:"user",content:"Plan?"}],tools:[{type:"function",name:"get_recovery_context",parameters:{type:"object"}}],tool_choice:"required"});
 assert.equal(result.output[0].type,"function_call");
 assert.throws(()=>new OllamaProvider("http://untrusted.example"));
});

test("Hugging Face preserves tool results and falls back when credits are unavailable", async () => {
  const { HuggingFaceProvider } = await import("../lib/ai/huggingface.ts");
  const s = seed(now);
  s.preferences!.aiConsent = true;
  let count = 0;
  const provider = new HuggingFaceProvider("fixture-token", async (url, init) => {
    assert.equal(url, "https://router.huggingface.co/v1/chat/completions");
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model, "fixture-model:nscale");
    if (++count === 1) return Response.json({ choices: [{ message: { tool_calls: [
      { id: "read1", function: { name: "get_recovery_context", arguments: "{}" } },
    ] } }] });
    assert.ok(body.messages.some((m: {role:string;tool_call_id?:string}) => m.role === "tool" && m.tool_call_id === "read1"));
    assert.equal(body.response_format.type, "json_schema");
    return Response.json({ choices: [{ message: { content: JSON.stringify({ summary: "Use the recorded plan.", reason: "Recovery data is limited.", action: "recovery" }) } }] });
  });
  const result = await runCoach(s, "Why this plan?", provider, "fixture-model:nscale", now);
  assert.equal(result.provider, "huggingface");
  assert.deepEqual(result.tools, ["get_recovery_context"]);
  const unavailable = new HuggingFaceProvider("fixture-token", async () => new Response(null, { status: 402 }));
  assert.equal((await runCoach(s, "Why this plan?", unavailable, "fixture-model:nscale", now)).status, "fallback");
});
