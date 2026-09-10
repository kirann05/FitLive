import {dateKey,totals,type State} from './domain.ts';
export type ChartPoint={date:string;value:number|null};
export function weekDates(state:State,now=new Date()) {const today=dateKey(now,state.profile.timezone);return Array.from({length:7},(_,i)=>{const d=new Date(today+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-6+i);return d.toISOString().slice(0,10);});}
export function proteinSeries(state:State,now=new Date()):ChartPoint[]{return weekDates(state,now).map(date=>({date,value:state.meals.some(m=>m.date===date)?totals(state,date).protein:null}));}
export function sleepSeries(state:State,now=new Date()):ChartPoint[]{return weekDates(state,now).map(date=>({date,value:state.health.find(h=>h.date===date)?.sleep??null}));}
export function sessionSeries(state:State):ChartPoint[]{const sessions=[...state.workouts].sort((a,b)=>a.date.localeCompare(b.date)).slice(-6);return [...sessions.map(w=>({date:w.date,value:w.sets.length})),...Array.from({length:6-sessions.length},(_,i)=>({date:`Next ${i+1}`,value:null}))];}
export function chartCeiling(points:ChartPoint[],target:number|null){return Math.max(1,target??0,...points.map(p=>p.value??0))*1.2;}
