import { z } from "zod";
import { allowed, type State } from "./domain.ts";
import { foodLibrary } from "./planning.ts";
export const cartItemsSchema=z.array(z.object({foodId:z.string().min(1).max(100),grams:z.number().min(1).max(100000),estimateCents:z.number().int().min(0).max(1000000)})).min(1).max(40);
export const cartSchema=z.object({id:z.string(),createdAt:z.string().datetime(),items:cartItemsSchema,policy:z.string(),status:z.enum(["draft","approved"]),approvedAt:z.string().datetime().optional()});
export type Cart=z.infer<typeof cartSchema>;
export function cartPolicy(s:State){return JSON.stringify({diet:s.profile.diet,allergies:s.profile.allergies,dislikes:s.profile.dislikes,budget:s.preferences?.weeklyBudget??100});}
export function checkCart(s:State,items:z.infer<typeof cartItemsSchema>){
 const library=foodLibrary(s), issues:string[]=[];
 if(new Set(items.map(i=>i.foodId)).size!==items.length)issues.push("Combine duplicate foods before review.");
 for(const item of items){const food=library.find(f=>f.id===item.foodId);if(!food||!allowed(food,s.profile)||(s.mode==="real"&&food.source.startsWith("Demo")))issues.push("A food is missing or conflicts with your dietary restrictions.");}
 const total=items.reduce((a,i)=>a+i.estimateCents,0),budget=Math.round((s.preferences?.weeklyBudget??100)*100);
 if(total>budget)issues.push("The estimated total exceeds your weekly budget.");
 return {total,budget,issues};
}
