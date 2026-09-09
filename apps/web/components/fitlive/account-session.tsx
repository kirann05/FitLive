"use client";
import { useState } from "react";
export function AccountSession({mode}:{mode:"google"|"platform"}) {
  const [error,setError]=useState("");const [busy,setBusy]=useState(false);
  async function logout(){
    setBusy(true);setError("");
    try {
      const r=await fetch("/api/auth/logout",{method:"POST"});
      if(!r.ok) throw new Error();
      window.location.assign("/login");
    } catch {setError("Could not sign out. Please retry.");setBusy(false);}
  }
  return <div className="account-session">{mode==="platform"?<a href="/signout-with-chatgpt?return_to=%2Flogin" target="_top">Sign out</a>:<button className="secondary" disabled={busy} onClick={()=>void logout()}>{busy?"Signing out…":"Sign out"}</button>}{error&&<p role="alert">{error}</p>}</div>;
}
