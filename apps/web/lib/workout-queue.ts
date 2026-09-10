import type {Command,State} from "./domain.ts";
export type QueuedWorkout={key:string;owner:string;id:string;version:number;mode:State["mode"];command:Extract<Command,{type:"workout"}>;createdAt:number};
function database():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const request=indexedDB.open("fitlive-workout-queue",1);request.onupgradeneeded=()=>request.result.createObjectStore("workouts",{keyPath:"key"});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(new Error("Device storage unavailable"));});}
async function transaction<T>(mode:IDBTransactionMode,action:(store:IDBObjectStore)=>IDBRequest<T>):Promise<T>{const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction("workouts",mode),request=action(tx.objectStore("workouts"));let result:T;request.onsuccess=()=>{result=request.result;};tx.oncomplete=()=>{db.close();resolve(result);};tx.onerror=()=>{db.close();reject(new Error("Device queue could not be saved"));};tx.onabort=tx.onerror;});}
export async function enqueueWorkout(entry:QueuedWorkout){await transaction("readwrite",s=>s.put(entry));}
export async function queuedWorkouts(owner:string){return (await transaction("readonly",s=>s.getAll()) as QueuedWorkout[]).filter(x=>x.owner===owner).sort((a,b)=>a.createdAt-b.createdAt);}
export async function removeQueuedWorkout(key:string){await transaction("readwrite",s=>s.delete(key));}
export async function clearQueuedWorkouts(owner:string){for(const entry of await queuedWorkouts(owner))await removeQueuedWorkout(entry.key);}
export async function syncWorkouts(owner:string):Promise<{remaining:number;error?:string}>{
 const entries=await queuedWorkouts(owner);
 for(const entry of entries){try{
  const response=await fetch("/api/state",{cache:"no-store"});if(!response.ok)throw new Error("Sign in to sync your saved workout.");
  const current=await response.json() as {ownerId:string;version:number;state:State};
  if(current.ownerId!==owner)throw new Error("Sign in to the account that recorded this workout.");
  if(current.state.workouts.some(w=>w.id===entry.id)){await removeQueuedWorkout(entry.key);continue;}
  if(current.version<entry.version||current.state.mode!==entry.mode||!current.state.onboarded)throw new Error("Your workspace changed. Your device workout is preserved for review; it was not added automatically.");
  const saved=await fetch("/api/state",{method:"POST",headers:{"Content-Type":"application/json","X-FitLive-Owner":owner},body:JSON.stringify({id:entry.id,version:current.version,command:entry.command})});
  if(!saved.ok)throw new Error(saved.status===409?"Your account changed during sync. We’ll retry.":"Workout is saved on this device; sync will retry.");
  await removeQueuedWorkout(entry.key);
 }catch(e){return {remaining:(await queuedWorkouts(owner)).length,error:e instanceof Error?e.message:"Sync will retry when connected."};}}
 return {remaining:0};
}
