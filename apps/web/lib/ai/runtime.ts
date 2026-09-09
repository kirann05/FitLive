import { javaBackend } from "../java-backend";
import { env } from "cloudflare:workers";
import { OpenAIProvider, runCoach } from "./provider";
import { HuggingFaceProvider } from "./huggingface";
import { OllamaProvider } from "./ollama";
import { type State } from "../domain";
type Settings={HF_TOKEN?:string;HF_MODEL?:string;AI_PROVIDER?:string;OLLAMA_BASE_URL?:string;OLLAMA_MODEL?:string;OPENAI_API_KEY?:string;OPENAI_MODEL?:string;USDA_API_KEY?:string};
export function configuration(){
  const e=env as unknown as Settings, local=e.AI_PROVIDER==="ollama";
  if(e.AI_PROVIDER==="huggingface") return {native:!!javaBackend(),ai:!!e.HF_TOKEN,food:!!e.USDA_API_KEY,provider:"huggingface",model:e.HF_MODEL??"Qwen/Qwen3-4B-Instruct-2507:nscale",foodLimited:e.USDA_API_KEY==="DEMO_KEY"};
  return {native:!!javaBackend(),ai:local?!!e.OLLAMA_BASE_URL:!!e.OPENAI_API_KEY,food:!!e.USDA_API_KEY,provider:local?"ollama":"openai",model:local?(e.OLLAMA_MODEL??"qwen3.5:4b"):(e.OPENAI_MODEL??"gpt-5.6-terra"),foodLimited:e.USDA_API_KEY==="DEMO_KEY"};
}
export async function generateCoach(s:State,message:string){
 const e=env as unknown as Settings,c=configuration();
 return runCoach(s,message,c.provider==="huggingface"?(e.HF_TOKEN?new HuggingFaceProvider(e.HF_TOKEN):undefined):c.provider==="ollama"?(e.OLLAMA_BASE_URL?new OllamaProvider(e.OLLAMA_BASE_URL):undefined):(e.OPENAI_API_KEY?new OpenAIProvider(e.OPENAI_API_KEY):undefined),c.model);
}
