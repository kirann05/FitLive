/** Browser provider boundary; a future Whisper implementation can implement this contract. */
export type SpeechEngine={lang:string;continuous:boolean;interimResults:boolean;onstart:(()=>void)|null;onresult:((event:{resultIndex:number;results:{length:number;[i:number]:{isFinal:boolean;0:{transcript:string}}}})=>void)|null;onerror:((event:{error:string})=>void)|null;onend:(()=>void)|null;start():void;stop():void;abort():void};
export interface SpeechProvider { available():boolean; create():SpeechEngine; }
function constructor(){const w=window as unknown as {SpeechRecognition?:new()=>SpeechEngine;webkitSpeechRecognition?:new()=>SpeechEngine};return w.SpeechRecognition??w.webkitSpeechRecognition;}
export const browserSpeech:SpeechProvider={available:()=>typeof window!=="undefined"&&!!constructor(),create:()=>{const C=constructor();if(!C)throw new Error("Speech recognition unavailable");return new C();}};
