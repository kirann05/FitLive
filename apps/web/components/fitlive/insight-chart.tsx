"use client";
import {useId,useState} from 'react';
import {chartCeiling,type ChartPoint} from '@/lib/chart-data';
/** Seven fixed slots preserve missing records; exact values remain available without hover. */
export function InsightChart({title,points,unit,target=null,targetLabel='Current target'}:{title:string;points:ChartPoint[];unit:string;target?:number|null;targetLabel?:string}){
 const id=useId();const [selected,setSelected]=useState<number|null>(null);const ceiling=chartCeiling(points,target);const chosen=selected===null?null:points[selected];
 const label=(date:string)=>date.startsWith('Next')?date:new Date(date+'T12:00:00Z').toLocaleDateString(undefined,{weekday:'short',timeZone:'UTC'});
 return <figure className="insight-chart" aria-labelledby={id}><figcaption id={id}>{title}</figcaption><div className="chart-legend"><span><i/> Recorded {unit}</span>{target!==null&&<span><i className="target-key"/>{targetLabel}: {Math.round(target)} {unit}</span>}</div><div className="chart-plot">
 {target!==null&&<div className="chart-target" aria-hidden="true" style={{bottom:`${28+target/ceiling*140}px`}}/>}
 <div className="chart-slots">{points.map((p,i)=><button key={`${p.date}-${i}`} type="button" className="chart-slot" aria-pressed={selected===i} aria-label={`${p.date}: ${p.value===null?'No record':`${Math.round(p.value)} ${unit}`}`} onClick={()=>setSelected(i)}><span className="chart-value">{p.value===null?'—':Math.round(p.value)}</span><span className="chart-bar-space"><span className={`chart-bar ${p.value===null?'unlogged':''}`} style={{height:p.value===null?'3px':`${Math.max(1,p.value/ceiling*100)}%`,animationDelay:`${i*40}ms`}}/></span><span className="chart-day">{label(p.date)}</span></button>)}</div></div><p className="chart-detail" role="status">{chosen?`${chosen.date} · ${chosen.value===null?'No record':`${Math.round(chosen.value)} ${unit} recorded`}`:'Tap a day for details · — means no record'}</p></figure>;
}
