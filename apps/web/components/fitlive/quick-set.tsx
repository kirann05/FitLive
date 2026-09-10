"use client";
import {ExercisePicker} from "./exercise-picker";
import {Dictation} from "./dictation";
import {parseSetSpeech} from "@/lib/gym-speech";
import {useState} from "react";
import {Check,Minus,Plus} from "lucide-react";
import {catalogue,sameExercise} from "@/lib/exercises/catalogue";
import {displayLoad,loadStep,toKg,plateBreakdown} from "@/lib/load-units";
import {recordTrainingMetric} from "@/lib/training-metrics";
import type {State,SetLog,Command,plan} from "@/lib/domain";
export function QuickSet({workout,state,draft,owner,onAdd,act}:{workout:ReturnType<typeof plan>;state:State;draft:SetLog[];owner:string;onAdd:(set:SetLog)=>void;act:(c:Command,close?:boolean)=>Promise<boolean>}){
 const [selected,setSelected]=useState<ReturnType<typeof plan>[number]|null>(null);
 const exercise=selected??workout[0];
 const count=exercise?draft.filter(x=>sameExercise(x,exercise.name,exercise.exerciseId)).length:0;
 return <section className="quick-set"><span className="eyebrow">Choose your exercise</span><ExercisePicker state={state} value={exercise?.name??""} act={act} onSelect={e=>setSelected(workout.find(x=>x.exerciseId===e.id)??{exerciseId:e.id,name:e.name,muscle:e.primaryMuscles[0],sets:3,reps:`${e.minReps}–${e.maxReps}`,load:0,base:0,reason:"Choose a comfortable starting load."})}/>{exercise&&<SetRow key={`${exercise.exerciseId??exercise.name}:${count}`} exercise={exercise} number={count+1} state={state} owner={owner} onAdd={onAdd}/>}</section>;
}

function SetRow({exercise,number,state,owner,onAdd}:{exercise:ReturnType<typeof plan>[number];number:number;state:State;owner:string;onAdd:(set:SetLog)=>void}){
 const unit=state.preferences?.loadUnit??"kg";const requestedId=exercise.exerciseId;
 const entry=[...(state.customExercises??[]),...catalogue].find(e=>e.id===requestedId||e.name.toLowerCase()===exercise.name.toLowerCase());
 const id=entry?.id;
 const last=[...state.workouts].sort((a,b)=>b.date.localeCompare(a.date)).find(w=>w.sets.some(s=>sameExercise(s,exercise.name,id)))?.sets.filter(s=>sameExercise(s,exercise.name,id))??[];
 const previous=last[number-1]??last.at(-1);const bodyweight=entry?entry.equipment==="bodyweight":state.profile.equipment==="Bodyweight";
 const [load,setLoad]=useState<number|null>(previous?.load??(bodyweight?0:null)),[reps,setReps]=useState(previous?.reps??10),[rpe,setRpe]=useState<number|undefined>(),[editing,setEditing]=useState<"load"|"reps"|null>(null),[typed,setTyped]=useState(false),[voice,setVoice]=useState(false),[voiceNote,setVoiceNote]=useState(""),[taps,setTaps]=useState(0),[started]=useState(()=>performance.now());
 const step=loadStep(unit,entry?.equipment),shown=load===null?null:displayLoad(load,unit);
 function changeLoad(delta:number){setTaps(taps+1);setLoad(Math.min(500,Math.max(.5,toKg(Math.max(step,(shown??0)+delta),unit))));}
 const plates=shown===null?null:plateBreakdown(shown,unit);
 return <div><div className="previous-set"><span>Set {number}</span><span>Previous: {previous?`${bodyweight?"Bodyweight":`${displayLoad(previous.load,unit)} ${unit}`} × ${previous.reps}`:"Your first recorded set"}</span></div><div className="quick-set-controls">
 {!bodyweight&&<div><span className="eyebrow">LOAD · {unit}</span><div className="stepper"><button type="button" aria-label="Decrease load" onClick={()=>changeLoad(-step)} disabled={load===null}><Minus/></button>{editing==="load"?<input autoFocus aria-label={`Load in ${unit}`} inputMode="decimal" type="number" min={.5} max={unit==="kg"?500:1100} value={shown??""} onChange={e=>{setTyped(true);const n=Number(e.target.value);setLoad(n>0?Math.min(500,toKg(n,unit)):null);}} onBlur={()=>setEditing(null)}/>:<button type="button" className="stepper-value" onClick={()=>{setTaps(taps+1);setEditing("load");}}>{shown??"Set load"}</button>}<button type="button" aria-label="Increase load" onClick={()=>changeLoad(step)}><Plus/></button></div></div>}
 <div><span className="eyebrow">REPS</span><div className="stepper"><button type="button" aria-label="Decrease reps" disabled={reps<=1} onClick={()=>{setTaps(taps+1);setReps(Math.max(1,reps-1));}}><Minus/></button>{editing==="reps"?<input autoFocus aria-label="Reps" inputMode="numeric" type="number" min={1} max={100} value={reps} onChange={e=>{setTyped(true);setReps(Math.max(1,Math.min(100,Math.trunc(Number(e.target.value))||1)));}} onBlur={()=>setEditing(null)}/>:<button type="button" className="stepper-value" onClick={()=>{setTaps(taps+1);setEditing("reps");}}>{reps}</button>}<button type="button" aria-label="Increase reps" disabled={reps>=100} onClick={()=>{setTaps(taps+1);setReps(Math.min(100,reps+1));}}><Plus/></button></div></div>
 <button type="button" className="primary log-set" disabled={load===null} onClick={()=>{recordTrainingMetric(owner,{kind:"set",taps:taps+1,typed,elapsedMs:performance.now()-started,source:voice?"voice":"manual"});onAdd({exercise:exercise.name,...(id?{exerciseId:id}:{}),muscle:exercise.muscle,load:load!,reps,...(rpe?{rpe}:{})});navigator.vibrate?.(20);}}><Check/> Log set</button></div>
 <div className="row wrap small-space"><Dictation onText={text=>{const parsed=parseSetSpeech(text,unit);setVoice(true);if(parsed?.kind==="set"){setLoad(parsed.kg);setReps(parsed.reps);setVoiceNote("Voice filled this set. Review it, then tap Log set.");}else if(parsed?.kind==="repeat"){if(previous){setLoad(previous.load);setReps(previous.reps);setVoiceNote("Previous set restored. Tap Log set when ready.");}else setVoiceNote("No previous set to repeat. Use the controls above.");}else setVoiceNote("I didn’t get a complete load and reps. Try ‘fifty for eight’, or use the controls above.");}}/><span className="muted">Try “fifty for eight”</span></div>{voiceNote&&<p role="status">{voiceNote}</p>}
 <details className="small-space"><summary>Optional effort & plate guide</summary><label className="field">Effort (RPE) · optional<select value={rpe??""} onChange={e=>{setTaps(taps+1);setRpe(e.target.value?Number(e.target.value):undefined);}}><option value="">Not recorded</option>{[5,6,7,8,9,10].map(x=><option key={x} value={x}>{x}</option>)}</select></label>{entry?.equipment==="barbell"&&plates&&<p>With a {plates.bar} {unit} bar: {plates.remaining<0?"load is below bar weight":plates.result.map(p=>`${p.count} × ${p.plate} ${unit}`).join(" + ")||"empty bar"} per side. {plates.remaining>0?`${plates.remaining.toFixed(2)} ${unit} per side cannot be matched by this standard plate set.`:""}</p>}</details>
 </div>;
}
