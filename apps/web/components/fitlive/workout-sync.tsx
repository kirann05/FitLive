"use client";
import {useCallback,useEffect,useRef,useState} from "react";
import {queuedWorkouts,syncWorkouts} from "@/lib/workout-queue";
export function WorkoutSync({owner,onSynced}:{owner:string;onSynced:()=>void}){
 const [count,setCount]=useState(0),[error,setError]=useState("");const running=useRef(false),callback=useRef(onSynced);useEffect(()=>{callback.current=onSynced;},[onSynced]);
 const sync=useCallback(async()=>{if(running.current)return;running.current=true;try{const list=await queuedWorkouts(owner);setCount(list.length);if(list.length&&navigator.onLine){const result=await syncWorkouts(owner);setCount(result.remaining);setError(result.error??"");if(result.remaining<list.length)callback.current();}}catch{setError("Device storage unavailable. Keep your workout open until it is saved online.");}finally{running.current=false;}},[owner]);
 useEffect(()=>{queueMicrotask(()=>void sync());const timer=setInterval(()=>void sync(),15000);const run=()=>void sync();window.addEventListener("online",run);window.addEventListener("fitlive-workout-queued",run);return()=>{clearInterval(timer);window.removeEventListener("online",run);window.removeEventListener("fitlive-workout-queued",run);};},[sync]);
 if(!count&&!error)return null;
 return <aside className="notice" role="status"><div><strong>{count} workout{count===1?"":"s"} saved on this device</strong><p>{error||"Waiting to sync with your account."}</p></div><button className="secondary" onClick={()=>void sync()}>Retry sync</button><button className="text-button" onClick={async()=>{const blob=new Blob([JSON.stringify(await queuedWorkouts(owner),null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="fitlive-pending-workouts.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}}>Export backup</button></aside>;
}
