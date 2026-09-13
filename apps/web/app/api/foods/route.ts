import {readFoodCache,writeFoodCache,normalizedFoodQuery} from "@/lib/food-cache";
import type {FoodCandidate} from "@/lib/food-data";
import { mapUsdaFood } from "@/lib/food-data";
import { limit } from "@/lib/limits";
import { env } from "cloudflare:workers";
import { owner } from "@/lib/storage";
export async function GET(req: Request) {
  const user = await owner();
  if (!user)
    return Response.json({ error: "Sign in required." }, { status: 401 });
  try {
    await limit(user, "food-search", 30);
  } catch {
    return Response.json(
      { error: "Food search limit reached. Please retry in a minute." },
      { status: 429 },
    );
  }
  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q || q.length > 100)
    return Response.json({ error: "Enter a food name." }, { status: 400 });
  const key = (env as unknown as { USDA_API_KEY?: string }).USDA_API_KEY;
  if (!key)
    return Response.json(
      {
        error:
          "USDA search is not connected yet. Use a confirmed package label, or explore demo foods.",
      },
      { status: 503 },
    );
  try {
    const cacheKey=normalizedFoodQuery(q);
    const cached=await readFoodCache<FoodCandidate[]>("usda-v1",cacheKey);
    if(cached)return Response.json({foods:cached},{headers:{"Cache-Control":"private, max-age=300"}});
    const r = await fetch(
      "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" +
        encodeURIComponent(key),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          pageSize: 8,
          dataType: ["Foundation", "SR Legacy", "Branded"],
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!r.ok) throw new Error();
    const result = (await r.json()) as {
      foods: {
        fdcId: number;
        description: string;
        ingredients?: string;
        foodNutrients: { nutrientId: number; value: number }[];
      }[];
    };
    const foods=result.foods.map(mapUsdaFood);
    await writeFoodCache("usda-v1",cacheKey,foods,3600);
    return Response.json(
      {
        foods,
      },
      { headers: { "Cache-Control": "private, max-age=300" } },
    );
  } catch {
    return Response.json(
      { error: "Food search is unavailable. Your saved meals are unaffected." },
      { status: 503 },
    );
  }
}
