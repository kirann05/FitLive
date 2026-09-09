import {seed} from '../apps/web/lib/domain.ts';
import {runCoach} from '../apps/web/lib/ai/provider.ts';
import {OllamaProvider} from '../apps/web/lib/ai/ollama.ts';
const now=new Date('2026-09-09T15:00:00Z');const state=seed(now);state.preferences.aiConsent=true;
const started=Date.now();const result=await runCoach(state,'Why is today’s workout lighter? Explain using my recorded state.',new OllamaProvider('http://127.0.0.1:11434'),'qwen3.5:4b',now);
console.log(JSON.stringify({elapsedMs:Date.now()-started,...result}));
if(result.provider!=='ollama'||result.status!=='ready')process.exitCode=1;
