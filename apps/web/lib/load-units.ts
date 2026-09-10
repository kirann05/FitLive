export type LoadUnit="kg"|"lb";
export const kgToLb=(kg:number)=>kg*2.2046226218;
export const toKg=(value:number,unit:LoadUnit)=>unit==="lb"?value/2.2046226218:value;
export function loadStep(unit:LoadUnit,equipment="dumbbell"){return unit==="lb"?5:equipment==="dumbbell"?2:2.5;}
export function displayLoad(kg:number,unit:LoadUnit){return unit==="lb"?Math.round(kgToLb(kg)/5)*5:Math.round(kg*100)/100;}
export function plateBreakdown(load:number,unit:LoadUnit){const bar=unit==="lb"?45:20,plates=unit==="lb"?[45,25,10,5,2.5]:[20,15,10,5,2.5,1.25];let remaining=(load-bar)/2;const result:{plate:number;count:number}[]=[];if(remaining<0)return {bar,result,remaining};for(const plate of plates){const count=Math.floor((remaining+.00001)/plate);if(count){result.push({plate,count});remaining-=count*plate;}}return {bar,result,remaining};}
