"use client";
import {useEffect,useRef,useState} from "react";
import {Mic,Square,LoaderCircle} from "lucide-react";
import {browserSpeech,type SpeechEngine} from "@/lib/speech-provider";
export function Dictation({onText,disabled=false}:{onText:(text:string)=>void;disabled?:boolean}){
 const recognition=useRef<SpeechEngine|null>(null),callback=useRef(onText),stopMeter=useRef<()=>void>(()=>{}),generation=useRef(0);
 const [supported,setSupported]=useState(false),[phase,setPhase]=useState<"idle"|"permission"|"listening"|"processing">("idle"),[consent,setConsent]=useState(false),[prompt,setPrompt]=useState(false),[notice,setNotice]=useState(""),[transcript,setTranscript]=useState(""),[levels,setLevels]=useState([0,0,0,0,0,0,0]),[elapsed,setElapsed]=useState(0);
 useEffect(()=>{callback.current=onText;},[onText]);
 useEffect(()=>{const lifetime=generation;queueMicrotask(()=>setSupported(browserSpeech.available()));return()=>{lifetime.current++;stopMeter.current();if(recognition.current){recognition.current.onend=null;recognition.current.onresult=null;recognition.current.onerror=null;recognition.current.abort();}};},[]);
 useEffect(()=>{if(disabled){recognition.current?.stop();stopMeter.current();}},[disabled]);
 async function start(){
  if(!consent){setPrompt(true);return;}if(phase!=="idle")return;
  const attempt=++generation.current;setPhase("permission");setNotice("");setTranscript("");setElapsed(0);
  try{
   const stream=await navigator.mediaDevices.getUserMedia({audio:true});
   if(generation.current!==attempt){stream.getTracks().forEach(t=>t.stop());return;}
   stopMeter.current=()=>stream.getTracks().forEach(t=>t.stop());
   const context=new AudioContext();stopMeter.current=()=>{stream.getTracks().forEach(t=>t.stop());void context.close();};await context.resume();if(generation.current!==attempt){stopMeter.current();return;}const analyser=context.createAnalyser();analyser.fftSize=256;context.createMediaStreamSource(stream).connect(analyser);
   const samples=new Uint8Array(analyser.fftSize);let frame=0,closed=false,lastPaint=0,started=Date.now(),lastVoice=started,heard=false,gotFinal=false;
   const engine=browserSpeech.create();recognition.current=engine;engine.lang=navigator.language||"en-US";engine.continuous=false;engine.interimResults=true;
   const timeout=setTimeout(()=>engine.stop(),60000);
   stopMeter.current=()=>{if(closed)return;closed=true;clearTimeout(timeout);cancelAnimationFrame(frame);stream.getTracks().forEach(t=>t.stop());void context.close();};
   function meter(){if(closed)return;analyser.getByteTimeDomainData(samples);const bins=Array.from({length:7},(_,i)=>{const part=samples.slice(i*36,i*36+36);return Math.sqrt(part.reduce((sum,v)=>sum+((v-128)/128)**2,0)/part.length);});const loud=Math.max(...bins);if(loud>.025){heard=true;lastVoice=Date.now();}if(heard&&Date.now()-lastVoice>1500){engine.stop();return;}if(Date.now()-lastPaint>80){setLevels(bins);setElapsed(Math.floor((Date.now()-started)/1000));lastPaint=Date.now();}frame=requestAnimationFrame(meter);}
   engine.onstart=()=>{started=Date.now();setPhase("listening");frame=requestAnimationFrame(meter);};
   engine.onresult=e=>{let interim="";for(let i=e.resultIndex;i<e.results.length;i++){const text=e.results[i][0].transcript.trim();if(e.results[i].isFinal){gotFinal=true;callback.current(text);setNotice("Transcript added. Review it before submitting.");}else interim+=text+" ";}setTranscript(interim.trim());};
   engine.onerror=e=>{setNotice(e.error==="not-allowed"?"Microphone permission was denied. Enable it in your browser settings, or keep typing.":e.error==="no-speech"?"Didn’t catch that. Try again, or type instead.":"Voice input stopped. Retry or use the text controls.");stopMeter.current();setPhase("idle");};
   engine.onend=()=>{stopMeter.current();recognition.current=null;setPhase("idle");setTranscript("");if(!gotFinal)setNotice(previous=>previous||"Didn’t catch that. Try again, or type instead.");};
   engine.start();
  }catch{stopMeter.current();setPhase("idle");setNotice("Microphone unavailable or permission denied. You can keep typing; voice is optional.");}
 }
 if(!supported)return null;
 const active=phase!=="idle";
 return <div className="dictation"><button type="button" className={`dictation-button${active?" listening":""}`} disabled={disabled||phase==="permission"} aria-pressed={active} aria-label={active?"Stop voice input":"Use voice input"} onClick={()=>{if(active){setPhase("processing");recognition.current?.stop();}else void start();}}>{phase==="permission"||phase==="processing"?<LoaderCircle size={18}/>:active?<Square size={16}/>:<Mic size={18}/>}<span>{phase==="permission"?"Connecting…":phase==="processing"?"Finishing…":active?"Stop":"Voice"}</span></button>
 {active&&<div className="voice-live" role="status"><span>{phase==="listening"?`Listening · ${elapsed}s`:phase==="permission"?"Waiting for microphone access…":"Finishing transcript…"}</span><div className="voice-levels" aria-hidden="true">{levels.map((v,i)=><i key={i} style={{height:`${Math.min(36,4+v*160)}px`,opacity:Math.min(1,.35+v*4)}}/>)}</div>{transcript&&<p>{transcript}</p>}</div>}
 {prompt&&<div className="voice-notice"><p>Your browser may send audio to its speech service. FitLive uses the microphone level to show that it hears you; it does not store the audio.</p><label><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/> Allow browser speech recognition</label><button type="button" className="secondary" disabled={!consent} onClick={()=>{setPrompt(false);void start();}}>Start listening</button><button type="button" className="text-button" onClick={()=>setPrompt(false)}>Keep typing</button></div>}
 {notice&&<p className="voice-feedback" role="status">{notice}</p>}
 </div>;
}
