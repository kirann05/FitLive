import {barcodeGET} from '@/lib/open-food-facts';
import {owner} from '@/lib/storage';
import {limit} from '@/lib/limits';
import {readFoodCache,writeFoodCache} from '@/lib/food-cache';
import type {FoodCandidate} from '@/lib/food-data';
export const GET=(req:Request)=>barcodeGET(req,{owner,limit,fetch,read:code=>readFoodCache<FoodCandidate>('off-v1',code),write:(code,food)=>writeFoodCache('off-v1',code,food,86400)});
