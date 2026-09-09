"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: { resultIndex: number; results: { length: number; [index: number]: { isFinal: boolean; 0: { transcript: string } } } }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
export function Dictation({ onText, disabled = false }: { onText: (text: string) => void; disabled?: boolean }) {
  const recognizer = useRef<Recognition | null>(null);
  const callback = useRef(onText);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [listening, setListening] = useState(false);
  const [notice, setNotice] = useState("");
  const [consent, setConsent] = useState(false);
  const [prompt, setPrompt] = useState(false);
  useEffect(() => { callback.current = onText; }, [onText]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); if(recognizer.current){recognizer.current.onend=null;recognizer.current.onresult=null;recognizer.current.onerror=null;recognizer.current.abort();} }, []);
  useEffect(() => { if(disabled) recognizer.current?.stop(); }, [disabled]);
  function start() {
    const browser = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const Constructor = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Constructor) { setNotice("Voice typing isn't supported in this browser. Use your keyboard's dictation or type instead."); return; }
    if(!consent){setPrompt(true);return;}
    setNotice("");
    const recognition = new Constructor(); recognizer.current = recognition;
    recognition.lang = navigator.language || "en-US"; recognition.continuous = false; recognition.interimResults = false;
    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) if(event.results[i].isFinal) callback.current(event.results[i][0].transcript.trim());
    };
    recognition.onerror = event => setNotice(event.error === "not-allowed" ? "Microphone access was denied. Allow it in browser settings or type instead." : event.error === "no-speech" ? "No speech detected. Try again." : "Voice typing stopped. Please retry or type instead.");
    recognition.onend = () => { setListening(false); if(timer.current) clearTimeout(timer.current); recognizer.current=null; };
    try { recognition.start(); setListening(true); timer.current=setTimeout(()=>recognition.stop(),60000); }
    catch { setListening(false); setNotice("Microphone unavailable. Please retry or type instead."); }
  }
  return <div className="dictation"><button type="button" className={`dictation-button${listening ? " listening" : ""}`} disabled={disabled && !listening} aria-label={listening ? "Stop dictation" : "Describe with your voice"} aria-pressed={listening} onClick={() => listening ? recognizer.current?.stop() : start()}>{listening ? <Square size={16}/> : <Mic size={18}/>}<span>{listening ? "Stop" : "Voice"}</span></button>
    {prompt && <div className="voice-notice"><p>Your browser may send audio to its speech service. FitLive receives the text; nothing is submitted automatically.</p><label><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/> Allow browser speech recognition</label><button type="button" className="secondary" disabled={!consent} onClick={()=>{setPrompt(false);start();}}>Start dictation</button><button type="button" className="text-button" onClick={()=>setPrompt(false)}>Cancel</button></div>}
    <span className="sr-only" role="status">{listening ? "Listening. Speak now." : ""}</span>{notice && <p className="voice-notice" role="status">{notice}</p>}
  </div>;
}
