#!/usr/bin/env node
// Diff-aware check-ui: reports only the problems a change ADDS.
// Each changed file is inspected twice — at the base ref and at HEAD — and an
// error counts as new when its rule + message + line text occurs more often at
// HEAD than at base. Existing key-page values that predate the design system
// therefore do not fail a PR, but any new raw value, colour or middle dot does.
//
// Usage (from the product repo root):
//   node design-system/checks/check-changed.mjs --base origin/main [--config FILE] [path ...]
// Paths limit which changed files are checked (default: whole repo).
// Generated files (*.bundle.js, *.min.js) and the design-system/ submodule are skipped.
import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {inspect,tokenNames} from './check-ui.mjs';

const here=path.dirname(fileURLToPath(import.meta.url));
const args=process.argv.slice(2);let base='',configPath=path.join(here,'ds-check.json');const scopes=[];
for(let i=0;i<args.length;i++){const a=args[i];if(a==='--base')base=args[++i];else if(a==='--config')configPath=path.resolve(args[++i]);else scopes.push(a);}
if(!base){console.error('Usage: node check-changed.mjs --base REF [--config FILE] [path ...]');process.exit(2);}

const git=(...a)=>execFileSync('git',a,{encoding:'utf8',maxBuffer:256*1024*1024,stdio:['ignore','pipe','pipe']});
const config=JSON.parse(await fs.readFile(configPath,'utf8'));
const tokens=new Set(tokenNames(JSON.parse(await fs.readFile(path.resolve(path.dirname(configPath),config.tokens||'../tokens/tokens.json'),'utf8'))));
const ignore=config.ignore||[];
const mergeBase=git('merge-base',base,'HEAD').trim();
const changed=git('diff','--name-only','--diff-filter=ACMR',`${mergeBase}...HEAD`,'--',...(scopes.length?scopes:['.'])).split('\n').filter(Boolean)
 .filter(f=>/\.(css|html?|m?js|jsx|tsx?)$/i.test(f))
 .filter(f=>!/\.(bundle|min)\.js$/i.test(f))
 .filter(f=>!f.split('/').some(part=>ignore.includes(part)))
 .filter(f=>!ignore.some(x=>f===x||f.startsWith(x.replace(/\/$/,'')+'/')))
 .filter(f=>!f.startsWith('design-system/'));

const key=(e,src)=>`${e.rule}\u0000${e.message}\u0000${(src.split('\n')[e.line-1]||'').trim()}`;
const added=[],exceptions=[];
for(const file of changed){
 const head=await fs.readFile(file,'utf8');
 let old='';try{old=git('show',`${mergeBase}:${file}`);}catch{/* new file */}
 const now=inspect(head,file,tokens,config),before=inspect(old,file,tokens,config);
 const budget=new Map();for(const e of before.errors){const k=key(e,old);budget.set(k,(budget.get(k)||0)+1);}
 for(const e of now.errors){const k=key(e,head),left=budget.get(k)||0;if(left>0)budget.set(k,left-1);else added.push(e);}
 const oldReasons=new Set(before.exceptions.map(x=>x.reason));
 for(const x of now.exceptions)if(!oldReasons.has(x.reason))exceptions.push(x);
}
for(const x of added)console.log(`${x.file}:${x.line}:${x.column} ${x.rule} ${x.message}`);
for(const x of exceptions)console.log(`${x.file}:${x.line}:1 ds-allow (new) ${x.reason}`);
console.log(`Checked ${changed.length} changed files against ${base}; ${added.length} new errors; ${exceptions.length} new ds-allow exceptions`);
if(process.env.GITHUB_STEP_SUMMARY){
 const rows=added.map(x=>`| \`${x.file}:${x.line}\` | ${x.rule} | ${x.message} |`).join('\n');
 const allow=exceptions.map(x=>`- \`${x.file}:${x.line}\` ${x.reason}`).join('\n');
 await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,`### check-ui（仅本次改动）\n\n${changed.length} 个改动文件，${added.length} 处新增问题，${exceptions.length} 处新增 ds-allow。\n\n${rows?`| 位置 | 规则 | 说明 |\n| --- | --- | --- |\n${rows}\n\n`:''}${allow?`新增 ds-allow（请作者核对理由）：\n\n${allow}\n`:''}`);
}
process.exitCode=added.length?1:0;
