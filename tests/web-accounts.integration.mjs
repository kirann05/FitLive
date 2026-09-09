import assert from 'node:assert/strict';
import {randomBytes,createHash} from 'node:crypto';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
const base=process.env.FITLIVE_TEST_URL??'http://localhost:5173';
if(!['localhost','127.0.0.1'].includes(new URL(base).hostname))throw new Error('Local fixture accounts only');
const web=resolve('apps/web'),scratch=mkdtempSync(join(tmpdir(),'fitlive-accounts-'));
const sessions=Array.from({length:10}).map(()=>({token:randomBytes(32).toString('hex'),owner:'google:fixture-'+crypto.randomUUID()}));
function sql(text){const path=join(scratch,'fixture.sql');writeFileSync(path,text,{mode:0o600});execFileSync(process.execPath,['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','d1','execute','DB','--local','--config','dist/server/wrangler.json','--persist-to','.wrangler/state','--file',path],{cwd:web,stdio:'pipe',env:process.env});}
async function request(session,path,body,origin=base){const r=await fetch(base+path,{method:body?'POST':'GET',headers:{...(session?{cookie:'fitlive_session='+session.token}:{}),origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const raw=await r.text();let data;try{data=JSON.parse(raw);}catch{data={error:raw};}return {status:r.status,data};}
try{
 sql(sessions.map(s=>`INSERT INTO auth_sessions(hash,owner,email,name,expires) VALUES('${createHash('sha256').update(s.token).digest('hex')}','${s.owner}','fixture@example.invalid','Fixture',${Math.floor(Date.now()/1000)+600});`).join('\n'));
 assert.equal((await request(null,'/api/state')).status,401);
 let a=(await request(sessions[0],'/api/state')).data;
 const id=crypto.randomUUID(),command={type:'checkin',energy:3,soreness:2,motivation:4,note:'fixture-only'};
 const saved=await request(sessions[0],'/api/state',{id,version:a.version,command});assert.equal(saved.status,200);a=saved.data;
 const replay=await request(sessions[0],'/api/state',{id,version:0,command});assert.equal(replay.status,200);assert.equal(replay.data.state.checkins.length,1);
 const b=await request(sessions[1],'/api/state');assert.equal(b.status,200);assert.equal(b.data.state.checkins.length,0);
 assert.equal((await request(sessions[0],'/api/state',{id:crypto.randomUUID(),version:a.version,command},'https://other.example')).status,403);
 const writes=await Promise.all([3,4].map(energy=>request(sessions[0],'/api/state',{id:crypto.randomUUID(),version:a.version,command:{...command,energy}})));assert.deepEqual(writes.map(x=>x.status).sort(),[200,409]);
 const simultaneous=await Promise.all(sessions.slice(1).map(session=>request(session,'/api/state',{id:crypto.randomUUID(),version:0,command})));assert.ok(simultaneous.every(r=>r.status===200&&r.data.state.checkins.length===1));
 assert.equal((await request(sessions[0],'/api/auth/logout',{})).status,200);
 assert.equal((await request(sessions[0],'/api/state')).status,401);
 console.log('PASS: ten concurrent fixture accounts, account isolation, anonymous rejection, duplicate save, cross-origin rejection, concurrent conflict, logout revocation.');
}finally{
 sql(sessions.map(s=>['auth_sessions','accounts','operations','rate_limits','device_tokens'].map(t=>`DELETE FROM ${t} WHERE owner='${s.owner}';`).join('\n')).join('\n'));
 rmSync(scratch,{recursive:true,force:true});
}
