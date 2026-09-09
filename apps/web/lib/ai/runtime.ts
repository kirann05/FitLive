import { javaBackend } from "../java-backend";
import { env } from "cloudflare:workers";
import { OpenAIProvider, runCoach } from "./provider";
import { type State } from "../domain";
export function configuration() {
  const e = env as unknown as {
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    USDA_API_KEY?: string;
  };
  return {
    native: !!javaBackend(),
    ai: !!e.OPENAI_API_KEY,
    food: !!e.USDA_API_KEY,
    model: e.OPENAI_MODEL ?? "gpt-5.6-terra",
  };
}
export async function generateCoach(s: State, message: string) {
  const e = env as unknown as {
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
  };
  return runCoach(
    s,
    message,
    e.OPENAI_API_KEY ? new OpenAIProvider(e.OPENAI_API_KEY) : undefined,
    e.OPENAI_MODEL ?? "gpt-5.6-terra",
  );
}
