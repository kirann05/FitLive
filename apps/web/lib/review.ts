import { dateKey, totals, type State } from "./domain.ts";
export function weeklyReview(s:State, now=new Date()) {
 const end=dateKey(now,s.profile.timezone);
 const days=Array.from({length:7},(_,i)=>new Date(new Date(end+"T12:00:00Z").getTime()-(6-i)*86400000).toISOString().slice(0,10));
 const priorDays=days.map(d=>new Date(new Date(d+"T12:00:00Z").getTime()-7*86400000).toISOString().slice(0,10));
 const workouts=s.workouts.filter(w=>days.includes(w.date));
 const completedDays=new Set(workouts.filter(w=>w.status==="completed").map(w=>w.date));
 const planned=days.filter(d=>s.program?.weekdays.includes(new Date(d+"T12:00:00Z").getUTCDay()));
 const foodDays=days.filter(d=>s.meals.some(m=>m.date===d));
 const sleep=s.health.filter(h=>days.includes(h.date));
 const priorSleep=s.health.filter(h=>priorDays.includes(h.date));
 const avg=(v:number[])=>v.length?v.reduce((a,b)=>a+b,0)/v.length:null;
 const meanSleep=avg(sleep.map(h=>h.sleep));
 const previousSleep=avg(priorSleep.map(h=>h.sleep));
 const feedback=s.audit.filter(a=>a.feedback&&days.includes(dateKey(new Date(a.at),s.profile.timezone)));
 const sessionTarget=s.program?planned.length:s.profile.days;
 const count=s.program?planned.filter(d=>completedDays.has(d)).length:completedDays.size;
 const suggestions:string[]=[];
 if(count<sessionTarget) suggestions.push("Review whether your training schedule fits the time you have. Keep planned recovery days.");
 if(foodDays.length<7) suggestions.push("Food records are incomplete. Log a typical day before changing your nutrition targets.");
 if(meanSleep!==null&&previousSleep!==null&&sleep.length>=4&&priorSleep.length>=4&&meanSleep<previousSleep-30) suggestions.push("Recorded sleep duration was shorter this week. Review your evening routine and how you feel before adding training demands.");
 if(workouts.filter(w=>w.effort==="Too hard").length>=2) suggestions.push("Two sessions felt too hard. Review the program and leave more effort in reserve; avoid increasing the next load automatically.");
 if(!suggestions.length)suggestions.push("Keep the routine that fits your week. Review the next session’s progression using your saved sets.");
 return {start:days[0],end,days,completed:completedDays.size,planned:sessionTarget,adherence:sessionTarget?Math.min(100,Math.round(count/sessionTarget*100)):null,foodDays:foodDays.length,proteinDays:foodDays.filter(d=>totals(s,d).protein>=s.profile.protein).length,meanSleep:meanSleep===null?null:Math.round(meanSleep),sleepDays:sleep.length,sleepChange:meanSleep!==null&&previousSleep!==null&&sleep.length>=4&&priorSleep.length>=4?Math.round(meanSleep-previousSleep):null,accepted:feedback.filter(a=>a.feedback==="accepted").length,feedback:feedback.length,suggestions};
}
export function parseFoodText(text:string) {
 if(text.length>600) throw new Error("Keep meal descriptions under 600 characters.");
 const parts=text.replace(/\b(?:I ate|I had|for breakfast|for lunch|for dinner)\b/gi,"").split(/,|;|\n|\band\b/i).map(x=>x.trim()).filter(Boolean);
 if(!parts.length || parts.length>8) throw new Error("Describe one to eight foods, separated by commas.");
 return parts.map(part=>{
  const leading=part.match(/^(\d+(?:\.\d+)?)\s*(g|grams?|kg|oz)\s+(.+)$/i);
  const trailing=part.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*(g|grams?|kg|oz)$/i);
  const quantity=leading?Number(leading[1]):trailing?Number(trailing[2]):null;
  const unit=(leading?.[2]??trailing?.[3]??"").toLowerCase();
  const grams=quantity===null?null:Math.round(quantity*(unit==="kg"?1000:unit==="oz"?28.3495:1)*10)/10;
  if(grams!==null&&(grams<1||grams>2000))throw new Error("Use portions between 1 and 2000 grams.");
  return {name:(leading?.[3]??trailing?.[1]??part).trim(),grams};
 });
}
