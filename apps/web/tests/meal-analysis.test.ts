import test from "node:test";
import assert from "node:assert/strict";
import {analyzeMeal, mealRequestSchema, mealDraftSchema} from "../lib/ai/meal-analysis.ts";
import {apply, seed} from "../lib/domain.ts";
const item={name:"Cooked rice",grams:100,kcal:130,protein:2.7,carbs:28,fat:0.3,fiber:0.4,vegetarian:true,vegan:true,allergens:[]};
test("meal analysis requires explicit consent and rejects arbitrary image URLs",()=>{
 assert.equal(mealRequestSchema.safeParse({consent:false,description:"rice"}).success,false);
 assert.equal(mealRequestSchema.safeParse({consent:true,description:"rice",image:"https://example.com/image"}).success,false);
 assert.equal(mealDraftSchema.safeParse({items:[{...item,grams:-1}],uncertainty:""}).success,false);
});
test("photo and correction are transmitted together without account data; estimates save atomically",async()=>{
 const draft={items:[item],uncertainty:"Portion estimated."};
 const result=await analyzeMeal({consent:true,description:"rice is 100g",image:"data:image/jpeg;base64,/9j/",draft},"fixture","vision:provider",async(_,init)=>{
  const body=JSON.parse(String(init?.body));
  assert.equal(body.messages[1].content[1].image_url.url,"data:image/jpeg;base64,/9j/");
  assert.match(body.messages[1].content[0].text,/previousDraft/);
  return Response.json({choices:[{message:{content:JSON.stringify(draft)}}]});
 });
 assert.deepEqual(result,draft);
 const state=seed();
 const saved=apply(state,{type:"meal-batch",items:[{grams:100,food:{...item,id:"photo-rice",source:"AI estimate · reviewed"}}]},"fixture",1);
 assert.equal(saved.meals.length,state.meals.length+1);
 assert.match(saved.meals.at(-1)!.food.source,/AI estimate/);
});
test("invalid provider estimates never become a meal draft",async()=>{
 await assert.rejects(analyzeMeal({consent:true,description:"rice"},"fixture","vision",async()=>Response.json({choices:[{message:{content:'{"items":[{"name":"rice"}],"uncertainty":""}'}}]})));
});
