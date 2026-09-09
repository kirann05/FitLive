import FitLive from "./fitlive";
import { redirect } from "next/navigation";
import { authConfig, currentUser } from "@/lib/auth/session";
export const dynamic = "force-dynamic";
export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return <FitLive ownerId={user.userId} authMode={authConfig().mode} />;
}
