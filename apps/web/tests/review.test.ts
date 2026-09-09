import test from "node:test";
import assert from "node:assert/strict";
import { seed, blank, apply, foods } from "../lib/domain.ts";
import { parseFoodText, weeklyReview } from "../lib/review.ts";
import { checkCart } from "../lib/grocery.ts";
const now=new Date("2026-09-09T15:00:00Z");
test("meal text keeps unknown portions unresolved and converts explicit units",()=>{
 assert.deepEqual(parseFoodText("I ate 0.15 kg tofu, rice 100g and berries"),[{name:"tofu",grams:150},{name:"rice",grams:100},{name:"berries",grams:null}]);
 assert.throws(()=>parseFoodText("5kg rice"));
});
test("multi-food confirmation commits all items or none when a dietary check fails",()=>{
 const s=seed(now);s.profile.diet="vegan";
 const before=JSON.stringify(s),valid=foods.find(f=>f.vegan)!;
 assert.throws(()=>apply(s,{type:"meal-batch",items:[{food:valid,grams:100},{food:{...valid,id:"label-milk",name:"milk",vegan:false,vegetarian:true,source:"Confirmed label"},grams:50}]},"batch",1,now));
 assert.equal(JSON.stringify(s),before);
 const saved=apply(s,{type:"meal-batch",items:[{food:valid,grams:100},{food:valid,grams:50}]},"batch",1,now);
 assert.equal(saved.meals.length,s.meals.length+2);
 assert.equal(new Set(saved.meals.slice(-2).map(m=>m.id)).size,2);
});
test("cart approval rejects budget violations and preference changes",()=>{
 let s=seed(now);const food=foods.find(f=>f.vegan)!;
 s.preferences!.weeklyBudget=1;
 s=apply(s,{type:"cart-preview",items:[{foodId:food.id,grams:500,estimateCents:200}]},"quote",0,now);
 assert.throws(()=>apply(s,{type:"cart-approve",id:"quote"},"approve",1,now),/budget/);
 s.preferences!.weeklyBudget=10;
 assert.throws(()=>apply(s,{type:"cart-approve",id:"quote"},"approve",1,now),/changed/);
 s=apply(s,{type:"cart-preview",items:[{foodId:food.id,grams:500,estimateCents:200}]},"quote2",2,now);
 const saved=apply(s,{type:"cart-approve",id:"quote2"},"approve2",3,now);
 assert.equal(saved.cart?.status,"approved");assert.equal(checkCart(saved,saved.cart!.items).total,200);
});
test("weekly review preserves missing data and counts sessions by day",()=>{
 const s=blank();s.profile.timezone="America/Chicago";
 const r=weeklyReview(s,now);assert.equal(r.sleepDays,0);assert.equal(r.meanSleep,null);assert.equal(r.foodDays,0);assert.equal(r.sleepChange,null);
 s.workouts=[{id:"a",date:"2026-09-09",sets:[],status:"completed",effort:"About right"},{id:"b",date:"2026-09-09",sets:[],status:"completed",effort:"About right"}];
 assert.equal(weeklyReview(s,now).completed,1);
});
test("USDA missing nutrients remain unknown rather than becoming invented zeroes",async()=>{
 const {mapUsdaFood}=await import("../lib/food-data.ts");
 const f=mapUsdaFood({fdcId:1,description:"Fixture",foodNutrients:[{nutrientId:1003,value:12}]});
 assert.equal(f.protein,12);assert.equal(f.kcal,null);assert.equal(f.fiber,null);
});
test("planned rest days preserve training consistency and body trends need sufficient data",async()=>{
 const {habitSummary,bodyTrend}=await import("../lib/habits.ts");const s=seed(now);
 s.program={name:"Twice weekly",weekdays:[1,3],sessions:[{name:"A",exercises:[{name:"Squat",muscle:"Quads",sets:3,minReps:8,maxReps:12,load:10,increment:1}]}]};
 s.workouts=[{id:"mon",date:"2026-09-07",sets:[],effort:"About right",status:"completed"}];
 assert.equal(habitSummary(s,now).streak,1);
 assert.equal(bodyTrend([{date:"2026-09-09",kg:70,note:""}],now).change,null);
 assert.throws(()=>apply(s,{type:"body-entry",entry:{date:"2030-01-01",kg:70,note:""}},"future",1,now),/future/);
});
