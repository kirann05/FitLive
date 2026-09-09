"use client";
import { useEffect, useRef, useState } from "react";
type GoogleIdentity = { accounts: { id: { initialize(options: {client_id:string;nonce:string;callback:(result:{credential:string})=>void;auto_select:boolean}):void;renderButton(element:HTMLElement,options:Record<string,unknown>):void;disableAutoSelect():void } } };
export default function GoogleSignIn() {
  const button=useRef<HTMLDivElement>(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    let active=true;
    async function start() {
      try {
        const response=await fetch("/api/auth/challenge",{cache:"no-store"});
        const data=await response.json() as {error?:string;nonce:string;clientId:string};
        if(!response.ok) throw new Error(data.error);
        if(!(window as unknown as {google?:GoogleIdentity}).google) await new Promise<void>((resolve,reject)=>{
          const script=document.createElement("script");script.src="https://accounts.google.com/gsi/client";script.async=true;script.onload=()=>resolve();script.onerror=()=>reject(new Error("Google sign-in could not load. Check your connection and reload."));document.head.appendChild(script);
        });
        if(!active || !button.current) return;
        const google=(window as unknown as {google:GoogleIdentity}).google;
        google.accounts.id.initialize({client_id:data.clientId,nonce:data.nonce,auto_select:false,callback:async({credential})=>{
          setLoading(true);setError("");
          try {
            const result=await fetch("/api/auth/google",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({credential})});
            if(!result.ok) throw new Error((await result.json() as {error:string}).error);
            window.location.assign("/");
          } catch(e) {setError(e instanceof Error?e.message:"Sign-in failed. Please reload and retry.");setLoading(false);}
        }});
        google.accounts.id.renderButton(button.current,{type:"standard",theme:"outline",size:"large",text:"continue_with",shape:"pill",width:280});
        setLoading(false);
      } catch(e) {if(active){setError(e instanceof Error?e.message:"Sign-in is unavailable.");setLoading(false);}}
    }
    void start();return()=>{active=false;};
  },[]);
  return <div><div ref={button} aria-label="Continue with Google" />{loading&&<p role="status">Preparing secure sign-in…</p>}{error&&<><p role="alert">{error}</p><button className="secondary" onClick={()=>window.location.reload()}>Try again</button></>}</div>;
}
