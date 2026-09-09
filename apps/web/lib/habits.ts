import { z } from "zod";
import { dateKey, type State } from "./domain.ts";
export const bodyEntrySchema=z.object({date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(d=>{const t=new Date(d+"T12:00:00Z");return Number.isFinite(t.getTime())&&t.toISOString().slice(0,10)===d;}),kg:z.number().min(25).max(350),note:z.string().max(300)});
export type BodyEntry=z.infer<typeof bodyEntrySchema>;
export function habitSummary(s:State,now=new Date()){
 const today=dateKey(now,s.profile.timezone),completed=new Set(s.workouts.filter(w=>w.status==="completed").map(w=>w.date));
 const checks=new Set(s.checkins.map(c=>c.date)),foodDays=new Set(s.meals.map(m=>m.date));
 let streak=0;
 if(s.program){for(let i=0;i<365;i++){const day=new Date(new Date(today+"T12:00:00Z").getTime()-i*86400000).toISOString().slice(0,10);const scheduled=s.program.weekdays.includes(new Date(day+"T12:00:00Z").getUTCDay());if(!scheduled)continue;if(completed.has(day))streak++;else if(i>0)break;}}
 const adherenceDays=s.program?[...completed].filter(d=>s.program!.weekdays.includes(new Date(d+"T12:00:00Z").getUTCDay())).length:completed.size;
 return {streak:s.program?streak:null,points:adherenceDays*20+checks.size*5+foodDays.size*5};
}
export function bodyTrend(entries:BodyEntry[],now=new Date(),timezone="UTC"){
 const today=dateKey(now,timezone),start=new Date(new Date(today+"T12:00:00Z").getTime()-6*86400000).toISOString().slice(0,10),previous=new Date(new Date(today+"T12:00:00Z").getTime()-13*86400000).toISOString().slice(0,10);
 const current=entries.filter(e=>e.date>=start&&e.date<=today),prior=entries.filter(e=>e.date>=previous&&e.date<start);
 const avg=(a:BodyEntry[])=>a.reduce((sum,e)=>sum+e.kg,0)/a.length;
 return {average:current.length?avg(current):null,change:current.length>=3&&prior.length>=3?avg(current)-avg(prior):null,count:current.length};
}
