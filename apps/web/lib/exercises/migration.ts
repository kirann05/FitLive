import type {State} from "../domain.ts";
import {catalogue,exerciseMatches,normalizeExercise,type Exercise} from "./catalogue.ts";
export type ExerciseMatch={legacyId:string;name:string;candidateId:string;score:number};
/** Pure, repeatable migration: original names, loads, dates and set counts remain untouched. */
export function migrateExercises(input:State):State {
 const s=structuredClone(input);s.customExercises??=[];s.exerciseMatches??=[];
 const seen=new Map<string,string>();
 function identify(name:string,muscle:string){const key=normalizeExercise(name);if(seen.has(key))return seen.get(key)!;
  const existing=s.customExercises!.find(x=>normalizeExercise(x.name)===key);if(existing){seen.set(key,existing.id);return existing.id;}
  const matches=exerciseMatches(name);const best=matches[0];
  if(best&&best.score>=.9&&(!matches[1]||best.score>matches[1].score)){seen.set(key,best.exercise.id);return best.exercise.id;}
  const id="custom:"+key.replace(/ /g,"-");
  const custom:Exercise={id,name,aliases:[],primaryMuscles:[muscle||"Other"],secondaryMuscles:[],equipment:"unknown",minReps:8,maxReps:12,increment:2.5,modality:"strength"};
  s.customExercises!.push(custom);seen.set(key,id);
  if(best)s.exerciseMatches!.push({legacyId:id,name,candidateId:best.exercise.id,score:best.score});return id;
 }
 for(const w of s.workouts)for(const set of w.sets)if(!set.exerciseId)set.exerciseId=identify(set.exercise,set.muscle);
 for(const session of s.program?.sessions??[])for(const e of session.exercises)if(!e.exerciseId)e.exerciseId=identify(e.name,e.muscle);
 s.exerciseCatalogueVersion=1;return s;
}
export function confirmExerciseMatch(s:State,legacyId:string,targetId:string){const target=[...catalogue,...(s.customExercises??[])].find(x=>x.id===targetId);if(!target)throw new Error("Exercise not found");if(!s.exerciseMatches?.some(x=>x.legacyId===legacyId))throw new Error("Match already reviewed");for(const w of s.workouts)for(const set of w.sets)if(set.exerciseId===legacyId)set.exerciseId=targetId;for(const session of s.program?.sessions??[])for(const e of session.exercises)if(e.exerciseId===legacyId)e.exerciseId=targetId;s.exerciseMatches=s.exerciseMatches.filter(x=>x.legacyId!==legacyId);}
