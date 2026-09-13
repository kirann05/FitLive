import type {FoodCandidate} from './food-data.ts';
import {z} from 'zod';
const productSchema=z.object({product_name:z.string().optional(),product_name_en:z.string().optional(),brands:z.string().optional(),serving_size:z.string().optional(),serving_quantity:z.unknown().optional(),serving_quantity_unit:z.string().optional(),ingredients_text:z.string().optional(),ingredients_text_en:z.string().optional(),allergens_tags:z.array(z.string()).optional(),traces_tags:z.array(z.string()).optional(),nutriments:z.record(z.unknown()).optional()});
export function normalizeBarcode(code:string):string|null{const clean=code.trim().replace(/[\s-]/g,'');return /^(?:\d{8}|\d{12}|\d{13}|\d{14})$/.test(clean)?clean:null;}
function number(value:unknown):number|null{if(typeof value!=='number'&&!(typeof value==='string'&&value.trim()!==''))return null;const n=Number(value);return Number.isFinite(n)&&n>=0?n:null;}
const allergens:Record<string,string>={milk:'milk',eggs:'egg',peanuts:'peanut',nuts:'tree nut',soybeans:'soy',soy:'soy',fish:'fish',crustaceans:'shellfish',molluscs:'shellfish',gluten:'gluten',wheat:'wheat',sesame:'sesame',celery:'celery',mustard:'mustard',lupin:'lupin','sulphur-dioxide-and-sulphites':'sulphites'};
export function mapOffFood(product:unknown,barcode:string):FoodCandidate{
 const p=productSchema.parse(product),n=p.nutriments??{};
 const tags=[...(p.allergens_tags??[]),...(p.traces_tags??[])].flatMap(tag=>{const raw=tag.replace(/^[a-z]{2}:/,'');const value=allergens[raw]??raw.replace(/-/g,' ');return raw==='gluten'?[value,'wheat']: [value];});
 // OFF per-100 values for liquids may be per 100 ml. Never silently treat ml as grams.
 const liquid=p.serving_quantity_unit==='ml'||/\bml\b/i.test(p.serving_size??'');
 const nutrient=(key:string)=>liquid?null:number(n[key+'_100g']);
 const kcal=nutrient('energy-kcal');const kj=nutrient('energy-kj')??nutrient('energy');
 const grams=p.serving_quantity_unit==='g'?number(p.serving_quantity):/^\s*(\d+(?:\.\d+)?)\s*g\b/i.exec(p.serving_size??'')?.[1];
 return {id:`off:${barcode}`,name:(p.product_name_en||p.product_name||`Packaged food ${barcode}`).slice(0,120),brand:p.brands?.slice(0,160),servingSize:p.serving_size?.slice(0,160),servingGrams:number(grams),ingredients:p.ingredients_text_en||p.ingredients_text||'Not supplied by source',kcal:kcal??(kj===null?null:kj/4.184),protein:nutrient('proteins'),carbs:nutrient('carbohydrates'),fat:nutrient('fat'),fiber:nutrient('fiber'),allergens:[...new Set(tags)],vegan:false,vegetarian:false,source:`Open Food Facts · ${barcode}`,labelNote:liquid?'Source serving is in ml. Confirm nutrient values per 100 g from the package; FitLive does not assume liquid density.':undefined};
}
export type BarcodeDependencies={owner:()=>Promise<string|null>;limit:(user:string,action:string,max:number,seconds?:number)=>Promise<void>;read:(code:string)=>Promise<FoodCandidate|null>;write:(code:string,food:FoodCandidate)=>Promise<void>;fetch:typeof fetch};
export async function barcodeGET(req:Request,d:BarcodeDependencies){
 const user=await d.owner();if(!user)return Response.json({error:'Sign in required.'},{status:401});
 try{await d.limit(user,'food-barcode',20);}catch{return Response.json({error:'Barcode lookup limit reached. Please retry in a minute.'},{status:429});}
 const code=normalizeBarcode(new URL(req.url).searchParams.get('code')??'');if(!code)return Response.json({error:'Enter an 8, 12, 13 or 14 digit package barcode.'},{status:400});
 try{
  const cached=await d.read(code);if(cached)return Response.json({food:cached});
  // Six outbound requests per fixed minute caps a rolling minute at twelve,
  // below OFF's documented 15 product reads/minute/IP. Shared across accounts.
  await d.limit('provider:open-food-facts','product-lookup',6);
  const response=await d.fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=code,product_name,product_name_en,brands,nutriments,serving_size,serving_quantity,serving_quantity_unit,ingredients_text,ingredients_text_en,allergens_tags,traces_tags`,{headers:{'User-Agent':'FitLive/0.1 (https://github.com/kirann05/FitLive)','Accept':'application/json'},signal:AbortSignal.timeout(8000)});
  if(response.status===404)return Response.json({error:'No product found. You can enter the package label instead.'},{status:404});
  if(!response.ok)throw new Error('Provider unavailable');
  const body=await response.json() as {status?:number;product?:unknown};
  if(body.status===0)return Response.json({error:'No product found. You can enter the package label instead.'},{status:404});
  if(body.status!==1||!body.product)throw new Error('Invalid provider response');
  const food=mapOffFood(body.product,code);await d.write(code,food);return Response.json({food});
 }catch{return Response.json({error:'Barcode lookup is temporarily unavailable. Enter the package label or retry shortly.'},{status:503});}
}
