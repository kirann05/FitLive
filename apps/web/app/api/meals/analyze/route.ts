import { env } from "cloudflare:workers";
import { owner } from "@/lib/storage";
import { limit } from "@/lib/limits";
import { analyzeMeal, mealRequestSchema } from "@/lib/ai/meal-analysis";
export async function POST(req: Request) {
  const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const user = await owner();
  if (!user) return reply({ error: "Please sign in." }, 401);
  if (req.headers.get("origin") !== new URL(req.url).origin) return reply({ error: "Invalid request origin." }, 403);
  if (Number(req.headers.get("content-length") ?? 0) > 1900000) return reply({ error: "Photo is too large." }, 413);
  const reader = req.body?.getReader();
  if (!reader) return reply({ error: "Add a photo or description." }, 400);
  let raw = "", bytes = 0;
  const decoder = new TextDecoder();
  while (true) {
    const chunk = await reader.read(); if (chunk.done) break;
    bytes += chunk.value.byteLength;
    if (bytes > 1900000) { await reader.cancel(); return reply({ error: "Photo is too large." }, 413); }
    raw += decoder.decode(chunk.value, { stream: true });
  }
  raw += decoder.decode();
  let input;
  try { input = mealRequestSchema.parse(JSON.parse(raw)); }
  catch { return reply({ error: "Add a valid photo or description and allow photo analysis." }, 400); }
  try { await limit(user, "meal-analysis", 5); await limit(user, "meal-analysis-day", 30, 86400); }
  catch { return reply({ error: "Analysis limit reached. Please try later or use manual entry." }, 429); }
  const e = env as unknown as { HF_TOKEN?: string; HF_VISION_MODEL?: string };
  if (!e.HF_TOKEN) return reply({ error: "Photo analysis is not connected. Manual food entry is still available." }, 503);
  try {
    const draft = await analyzeMeal(input, e.HF_TOKEN, e.HF_VISION_MODEL ?? "Qwen/Qwen3-VL-30B-A3B-Instruct:novita");
    return reply(draft);
  } catch { return reply({ error: "We couldn't analyze this meal. Your draft is preserved. Try a clearer photo or add details; manual entry is also available." }, 503); }
}
