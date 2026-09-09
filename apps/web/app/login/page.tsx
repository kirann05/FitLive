import Image from "next/image";
import { redirect } from "next/navigation";
import { authConfig, currentUser } from "@/lib/auth/session";
import GoogleSignIn from "./google-sign-in";
export const dynamic="force-dynamic";
export default async function Login() {
  if(await currentUser()) redirect("/");
  const config=authConfig();
  return <main className="login-page"><section className="login-panel"><Image src="/favicon.svg" width={48} height={48} alt="" unoptimized /><h1>Welcome to FitLive</h1><p>Your training, meals and daily plan, together.</p>{config.mode==="google"?<GoogleSignIn/>:<a className="primary" href="/signin-with-chatgpt?return_to=%2F" target="_top">Continue with ChatGPT</a>}<p className="muted">You choose what to track. Health data and AI coaching require your consent, and you can export or delete your saved data.</p></section></main>;
}
