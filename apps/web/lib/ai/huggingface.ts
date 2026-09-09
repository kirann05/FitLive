import type { AIProvider, ModelResponse } from "./provider.ts";

/** Credentials stay server-side; routing is explicitly pinned, never auto-upgraded. */
export class HuggingFaceProvider implements AIProvider {
  readonly providerId = "huggingface" as const;
  private token: string;
  private transport: typeof fetch;
  constructor(token: string, transport: typeof fetch = fetch) {
    this.token = token;
    this.transport = transport;
  }
  async complete(request: Record<string, unknown>): Promise<ModelResponse> {
    const messages: Record<string, unknown>[] = [
      { role: "system", content: request.instructions },
    ];
    for (const item of request.input as Record<string, unknown>[]) {
      if (item.role) messages.push(item);
      else if (item.type === "function_call") messages.push({
        role: "assistant", content: null,
        tool_calls: [{ id: item.call_id, type: "function", function: {
          name: item.name, arguments: item.arguments,
        } }],
      });
      else if (item.type === "function_call_output") messages.push({
        role: "tool", tool_call_id: item.call_id, content: item.output,
      });
      else if (item.type === "message") messages.push({
        role: "assistant", content: (item.content as { text?: string }[])
          .map((part) => part.text ?? "").join(""),
      });
    }
    const format = (request.text as { format: Record<string, unknown> }).format;
    const schema = { name: format.name, strict: format.strict, schema: format.schema };
    const response = await this.transport("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model: request.model, messages, stream: false, temperature: 0.1,
        max_tokens: 600, parallel_tool_calls: false, tool_choice: request.tool_choice,
        tools: (request.tools as Record<string, unknown>[]).map(({ type, ...fn }) => ({ type, function: fn })),
        ...(request.tool_choice !== "required" ? { response_format: { type: "json_schema", json_schema: schema } } : {}),
      }),
    });
    if (!response.ok) throw new Error("Hosted coaching unavailable");
    const data = await response.json() as { choices?: { message?: {
      content?: string; tool_calls?: { id: string; function: { name: string; arguments: string } }[];
    } }[] };
    const answer = data.choices?.[0]?.message;
    if (!answer) throw new Error("Invalid hosted response");
    if (answer.tool_calls?.length) return { output: answer.tool_calls.map((call) => ({
      type: "function_call", call_id: call.id, name: call.function.name, arguments: call.function.arguments,
    })) };
    return { output: [{ type: "message", content: [{ type: "output_text", text: answer.content ?? "" }] }] };
  }
}
