import type { AIProvider, ModelResponse } from "./provider.ts";
/** Local or self-hosted open-weight models. Only server configuration selects the endpoint. */
export class OllamaProvider implements AIProvider {
  readonly providerId = "ollama" as const;
  private baseUrl: string;
  private transport: typeof fetch;
  constructor(baseUrl: string, transport: typeof fetch = fetch) {
    this.baseUrl=baseUrl; this.transport=transport;
    const url = new URL(baseUrl);
    if (url.username || url.password || url.search || url.hash || (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)))) throw new Error("Use HTTPS or a local Ollama endpoint");
  }
  async complete(request: Record<string, unknown>): Promise<ModelResponse> {
    const messages: Record<string, unknown>[] = [{role:"system",content:request.instructions}];
    const names = new Map<string,string>();
    for(const item of request.input as Record<string,unknown>[]) {
      if(item.role) messages.push(item);
      else if(item.type === "function_call") {
        names.set(String(item.call_id),String(item.name));
        messages.push({role:"assistant",content:"",tool_calls:[{function:{name:item.name,arguments:JSON.parse(String(item.arguments))}}]});
      } else if(item.type === "function_call_output") messages.push({role:"tool",tool_name:names.get(String(item.call_id)),content:item.output});
      else if(item.type === "message") messages.push({role:"assistant",content:(item.content as {text?:string}[]).map(x=>x.text??"").join("")});
    }
    const response = await this.transport(new URL("api/chat",this.baseUrl.replace(/\/?$/,"/")),{
      method:"POST",headers:{"Content-Type":"application/json"},signal:AbortSignal.timeout(90000),
      body:JSON.stringify({model:request.model,messages,tools:(request.tools as Record<string,unknown>[]).map(({type,...fn})=>({type,function:fn})),stream:false,think:false,keep_alive:"2m",options:{temperature:0.1,num_ctx:4096,num_predict:900},...(request.tool_choice!=="required"?{format:(request.text as {format:{schema:unknown}}).format.schema}:{})}),
    });
    if(!response.ok) throw new Error("Open model unavailable");
    const data=await response.json() as {message?:{content?:string;tool_calls?:{function:{name:string;arguments:unknown}}[]}};
    if(!data.message) throw new Error("Invalid model response");
    if(data.message.tool_calls?.length) return {output:data.message.tool_calls.map(t=>({type:"function_call",name:t.function.name,arguments:JSON.stringify(t.function.arguments),call_id:crypto.randomUUID()}))};
    return {output:[{type:"message",content:[{type:"output_text",text:data.message.content??""}]}]};
  }
}
