import FitLive from "./fitlive";
import { requireChatGPTUser } from "./chatgpt-auth";
export const dynamic = "force-dynamic";
export default async function Page() {
  const user = await requireChatGPTUser("/");
  return <FitLive ownerId={user.userId} />;
}
