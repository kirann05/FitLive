import {toKg,type LoadUnit} from "./load-units.ts";
const words:Record<string,number>={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90};
export function spokenNumber(value:string):number|null{const s=value.trim().toLowerCase();if(/^\d+(\.\d+)?$/.test(s))return Number(s);const parts=s.replace(/-/g," ").split(/\s+/).filter(x=>x!=="and");if(parts.some(x=>!(x in words)&&x!=="hundred"))return null;if(parts.length===3&&(words[parts[0]]??10)<10&&(words[parts[1]]??0)>=20&&(words[parts[2]]??10)<10)return words[parts[0]]*100+words[parts[1]]+words[parts[2]];let sum=0;for(const p of parts)sum=p==="hundred"?sum*100:sum+words[p];return sum;}
export function parseSetSpeech(text:string,unit:LoadUnit):{kind:"set";kg:number;reps:number}|{kind:"repeat"|"done"|"skip"}|null{
 const s=text.toLowerCase().replace(/[.,!?]$/g,"").trim();if(s==="same again")return {kind:"repeat"};if(s==="done")return {kind:"done"};if(s==="skip this set")return {kind:"skip"};
 const match=s.match(/^(.+?)\s+(?:(pounds?|lbs?|kilos?|kilograms?|kg)\s+)?(?:for|by|x|×)\s+(.+)$/);if(!match)return null;
 const load=spokenNumber(match[1]),reps=spokenNumber(match[3]);if(load===null||reps===null||!Number.isInteger(reps)||reps<1||reps>100)return null;const selected=match[2]?/pound|lb/.test(match[2])?"lb":"kg":unit;const kg=toKg(load,selected);if(kg<.5||kg>500)return null;return {kind:"set",kg,reps};
}
