import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPair, SignJWT, createLocalJWKSet, exportJWK } from "jose";
import { verifyGoogleToken, tokenHash, randomToken, cookieValue } from "../lib/auth/google.ts";
const {privateKey,publicKey}=await generateKeyPair("RS256");
const jwk=await exportJWK(publicKey);jwk.kid="fixture";
const keys=createLocalJWKSet({keys:[jwk]});
async function token(overrides:Record<string,unknown>={}) {
 return new SignJWT({sub:"12345",email:"test@example.com",email_verified:true,name:"Test",nonce:"test-nonce",...overrides}).setProtectedHeader({alg:"RS256",kid:"fixture"}).setIssuer("https://accounts.google.com").setAudience("test-client").setIssuedAt().setExpirationTime("5m").sign(privateKey);
}
test("Google identity is verified and keyed by subject, never email",async()=>{
 const user=await verifyGoogleToken(await token(),"test-client","test-nonce",keys);
 assert.equal(user.owner,"google:12345");
 assert.equal((await verifyGoogleToken(await token({email:"new@example.com"}),"test-client","test-nonce",keys)).owner,user.owner);
});
test("Google verification rejects wrong audience, nonce, unverified email and signature",async()=>{
 const signed=await token();
 await assert.rejects(verifyGoogleToken(signed,"other-client","test-nonce",keys));
 await assert.rejects(verifyGoogleToken(signed,"test-client","other-nonce",keys));
 await assert.rejects(verifyGoogleToken(await token({email_verified:false}),"test-client","test-nonce",keys));
 const parts=signed.split(".");parts[2]=(parts[2][0]==="A"?"B":"A")+parts[2].slice(1);
 await assert.rejects(verifyGoogleToken(parts.join("."),"test-client","test-nonce",keys));
});
test("session credentials are random and only hashes are used for storage",async()=>{
 const first=randomToken(),second=randomToken();assert.notEqual(first,second);assert.equal(first.length,64);assert.notEqual(await tokenHash(first),first);
 assert.equal(cookieValue("fitlive_session=a; fitlive_session=b","fitlive_session"),null);
 assert.equal(cookieValue("other=x; fitlive_session=abc","fitlive_session"),"abc");
});
