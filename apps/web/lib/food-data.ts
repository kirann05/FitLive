import type { Food } from "./domain.ts";
export type FoodCandidate=Omit<Food,"kcal"|"protein"|"carbs"|"fat"|"fiber"> & {kcal:number|null;protein:number|null;carbs:number|null;fat:number|null;fiber:number|null;ingredients?:string;brand?:string;servingSize?:string;servingGrams?:number|null;labelNote?:string};
export function mapUsdaFood(f:{fdcId:number;description:string;ingredients?:string;foodNutrients:{nutrientId:number;value:number;unitName?:string}[]}):FoodCandidate {
 const n=(id:number)=>{const value=f.foodNutrients.find(x=>x.nutrientId===id)?.value;return typeof value==="number"&&Number.isFinite(value)&&value>=0?value:null;};
 return {id:String(f.fdcId),name:f.description.slice(0,120),kcal:n(1008)??n(2048)??n(2047),protein:n(1003),carbs:n(1005),fat:n(1004),fiber:n(1079),ingredients:f.ingredients??"Not supplied by source",source:`USDA FoodData Central #${f.fdcId}`,vegan:false,vegetarian:false,allergens:[]};
}
