#!/usr/bin/env node
// Key page check: measures the visible gaps listed in a key page spec and
// fails when any gap drifts from the approved value (default tolerance 1px).
// Usage: node checks/keypage.mjs --spec keypages/drivescene.json --url http://127.0.0.1:8000/studio/ui-draft/ [--out DIR]
import fs from 'node:fs/promises';
import path from 'node:path';
let chromium;
try{({chromium}=await import('playwright'));}catch{({chromium}=await import(process.env.DS_PLAYWRIGHT||'playwright'));}
const argv=process.argv.slice(2);let specPath='',url='',out='';
for(let i=0;i<argv.length;i++){const a=argv[i];if(a==='--spec')specPath=argv[++i];else if(a==='--url')url=argv[++i];else if(a==='--out')out=argv[++i];else throw Error(`Unknown option ${a}`);}
if(!specPath)throw Error('Usage: node keypage.mjs --spec FILE [--url URL] [--out DIR]');
const spec=JSON.parse(await fs.readFile(specPath,'utf8'));url=url||spec.url;
if(!url)throw Error('No url: pass --url or set "url" in the spec');
let executablePath=process.env.DS_BROWSER_EXECUTABLE;
if(!executablePath&&process.platform==='darwin')try{await fs.access('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');executablePath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';}catch{}
const launchArgs=process.env.DS_BROWSER_ARGS!==undefined?process.env.DS_BROWSER_ARGS.split(/\s+/).filter(Boolean):process.platform==='linux'?['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:[];
const browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{}),args:launchArgs});
// "A|text" = first element matching A whose text starts with text; "X >> Y" = Y inside X.
const finder=`(sel)=>{const one=(root,s)=>{const [css,txt]=s.split('|');const all=[...root.querySelectorAll(css.trim())].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0});return txt===undefined?all[0]:all.find(e=>(e.innerText||e.textContent||'').trim().startsWith(txt.trim()))};
 let el=document;for(const part of sel.split('>>')){el=one(el,part);if(!el)return null;}const b=el.getBoundingClientRect();return {top:b.top,bottom:b.bottom,left:b.left,right:b.right}}`;
const tol=spec.tolerance??1,rows=[];let failures=0;
for(const vp of spec.viewports)for(const theme of spec.themes||['light','dark']){
 const ctx=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.mobile,hasTouch:!!vp.mobile});
 if(spec.themeInit)await ctx.addInitScript(spec.themeInit.replaceAll('{theme}',theme));
 const page=await ctx.newPage();await page.goto(url,{waitUntil:'load'});
 if(spec.waitFor)await page.waitForSelector(spec.waitFor,{timeout:spec.waitTimeout||60000}).catch(()=>{});
 await page.waitForTimeout(spec.settle||1500);
 for(const g of spec.gaps){const expect=g.expect[vp.name];if(expect===undefined)continue;
  const a=await page.evaluate(`(${finder})(${JSON.stringify(g.from)})`),b=await page.evaluate(`(${finder})(${JSON.stringify(g.to)})`);
  const axis=g.axis||'y';let value=null;if(a&&b)value=Math.round((axis==='y'?b.top-a.bottom:b.left-a.right)*10)/10;
  const ok=value!==null&&Math.abs(value-expect)<=tol;if(!ok)failures++;
  rows.push({viewport:vp.name,theme,name:g.name,expect,value,ok});}
 if(out){await fs.mkdir(out,{recursive:true});await page.screenshot({path:path.join(out,`${vp.name}-${theme}.png`),animations:'disabled',timeout:120000});}
 await ctx.close();}
await browser.close();
for(const r of rows)console.log(`${r.ok?'ok  ':'FAIL'} ${r.viewport}/${r.theme} ${r.name}: expect ${r.expect}, got ${r.value??'missing'}`);
console.log(`${rows.length} gaps checked; ${failures} failures`);
if(out)await fs.writeFile(path.join(out,'keypage.json'),JSON.stringify({spec:specPath,url,rows},null,1));
process.exitCode=failures?1:0;
