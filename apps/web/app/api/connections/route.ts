import { owner } from "@/lib/storage";
import { configuration } from "@/lib/ai/runtime";
export async function GET() {
  if (!(await owner()))
    return Response.json({ error: "Sign in required." }, { status: 401 });
  return Response.json(configuration(), {
    headers: { "Cache-Control": "no-store" },
  });
}
