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
    return Response.json(
      {
        foods: result.foods.map((f) => {
          const n = (id: number) =>
            f.foodNutrients.find((x) => x.nutrientId === id)?.value ?? 0;
          return {
            id: String(f.fdcId),
            name: f.description,
            kcal: n(1008),
            protein: n(1003),
            carbs: n(1005),
            fat: n(1004),
            fiber: n(1079),
            ingredients: f.ingredients ?? "Not supplied by source",
            source: `USDA FoodData Central #${f.fdcId}`,
            requiresDietConfirmation: true,
          };
        }),
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
