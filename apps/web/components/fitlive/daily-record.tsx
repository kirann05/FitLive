"use client";
import { useState } from "react";
import { dateKey, totals, type State } from "@/lib/domain";
export function DailyRecord({state}:{state:State}) {
  const today=dateKey(new Date(),state.profile.timezone);
  const [selected,setSelected]=useState(today);
  const days=Array.from({length:7},(_,i)=>{const d=new Date(today+"T12:00:00Z");d.setUTCDate(d.getUTCDate()-6+i);return d.toISOString().slice(0,10);});
  const day=days.includes(selected)?selected:today;
  const meals=state.meals.filter(x=>x.date===day);
  const workouts=state.workouts.filter(x=>x.date===day);
  const check=state.checkins.some(x=>x.date===day);
  const nutrition=totals(state,day);
  const recorded=days.filter(d=>state.meals.some(x=>x.date===d)||state.workouts.some(x=>x.date===d)||state.checkins.some(x=>x.date===d)).length;
  return <section className="panel daily-record"><div className="row spread"><div><p className="eyebrow">YOUR FIRST STEPS COUNT</p><h3>Seven days, one clear view</h3></div><span className="chip">{recorded} day{recorded===1?"":"s"} recorded</span></div><p className="muted">Choose a day to see what you logged. A blank day means no record, not zero effort.</p>
  <div className="day-picker" aria-label="Choose a day">
    {days.map(d=>{const food=state.meals.some(x=>x.date===d),training=state.workouts.some(x=>x.date===d),checkin=state.checkins.some(x=>x.date===d);const label=new Date(d+"T12:00:00Z").toLocaleDateString(undefined,{weekday:"short",timeZone:"UTC"});return <button type="button" key={d} aria-pressed={day===d} aria-label={`${d}: ${food?"food logged, ":""}${training?"workout logged, ":""}${checkin?"check-in logged":""}${!food&&!training&&!checkin?"no records":""}`} onClick={()=>setSelected(d)}><span>{label}</span><strong>{Number(d.slice(-2))}</strong><span className="record-mark">{food||training||checkin?"Logged":"—"}</span></button>;})}
  </div><div className="daily-numbers" aria-live="polite"><article><span>Meals logged</span><strong>{meals.length||"—"}</strong><small>{meals.length?`${Math.round(nutrition.kcal)} kcal logged`:"No food records"}</small></article><article><span>Protein logged</span><strong>{meals.length?`${Math.round(nutrition.protein)} g`:"—"}</strong><small>{meals.length?"From recorded meals only":"Log a meal to begin"}</small></article><article><span>Training</span><strong>{workouts.length||"—"}</strong><small>{workouts.length?`${workouts.filter(x=>x.status==="completed").length} completed · ${workouts.filter(x=>x.status==="partial").length} partial`:"No workout recorded"}</small></article><article><span>Check-in</span><strong>{check?"Done":"—"}</strong><small>{check?"Your context is recorded":"No check-in recorded"}</small></article></div>
  {meals.length>0&&<div className="daily-foods"><h4>On your plate · {day}</h4>{meals.map(m=><div className="row spread" key={m.id}><span>{m.food.name}</span><span>{m.grams} g · {Math.round(m.food.kcal*m.grams/100)} kcal</span></div>)}</div>}
  <p className="muted">{recorded<3?"A day or two is a useful start. Longer-term patterns need more records.":"Review the weekly summary below for patterns and recording coverage."}</p></section>;
}
