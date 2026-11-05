#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const colors=new Set(('aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgrey darkgreen darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray grey green greenyellow honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgrey lightgreen lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen').split(' '));
const blank=s=>s.replace(/[^\n]/g,' ');
export function tokenNames(obj,prefix=[]){return Object.entries(obj).flatMap(([key,value])=>key.startsWith('$')?[]:value&&typeof value==='object'&&'$value'in value?['--ds-'+[...prefix,key].join('-')]:value&&typeof value==='object'?tokenNames(value,[...prefix,key]):[]);}
export function inspect(source,file,tokens,config={}){
 const errors=[],exceptions=[],lines=source.split('\n'),allows=new Map();
 for(const m of source.matchAll(/\/\*\s*ds-allow:\s*([^*]+)\*\//g)){const line=source.slice(0,m.index).split('\n').length;allows.set(line,m[1].trim());exceptions.push({file,line,reason:m[1].trim()});}
 const emit=(index,rule,message)=>{const before=source.slice(0,index),line=before.split('\n').length,column=index-(before.lastIndexOf('\n')+1)+1;if(allows.has(line)||allows.has(line-1))return;errors.push({file,line,column,rule,message});};
 const css=(text,offset=0)=>{
  const clean=text.replace(/\/\*[\s\S]*?\*\//g,blank).replace(/url\([^)]*\)/gi,blank);
  for(const u of text.replace(/\/\*[\s\S]*?\*\//g,blank).matchAll(/url\(\s*["']?data:image\/svg\+xml[^)]*\)/gi))for(const c of u[0].matchAll(/(?:%23|#)[\da-f]{3,8}\b|\b(?:rgb|rgba)\s*\(/gi))emit(offset+u.index+c.index,'color-literal','Color inside a data-URI SVG; use mask + currentColor');
  for(const m of clean.matchAll(/#[\da-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(/gi))emit(offset+m.index,'color-literal','Use a color token');
  for(const m of clean.matchAll(/(-?(?:\d*\.)?\d+)px\b/g)){
   const value=Number(m[1]),start=Math.max(clean.lastIndexOf(';',m.index),clean.lastIndexOf('{',m.index))+1,decl=clean.slice(start,m.index);
   const stroke=/^\s*(?:border(?:-(?:top|right|bottom|left))?(?:-width)?|outline(?:-width)?|stroke-width|box-shadow|text-decoration-thickness)\s*:/.test(decl);
   if(value===0||(stroke&&[1,1.5,2].includes(value))||(config.allowPx||[]).includes(Math.abs(value)))continue;
   emit(offset+m.index,'raw-length',`Unapproved length ${m[0]}`);
  }
  for(const m of clean.matchAll(/(?:linear|radial|conic)-gradient\s*\(|backdrop-filter\s*:|inset\s+0(?:px)?\s+1px\s+0(?:px)?\b/gi))emit(offset+m.index,'banned','Forbidden surface treatment');
  for(const m of clean.matchAll(/var\(\s*(--ds-[\w-]+)/g))if(!tokens.has(m[1]))emit(offset+m.index,'tokens-only',`Unknown token ${m[1]}`);
  for(const m of clean.matchAll(/([\w-]+)\s*:\s*([^;{}]+)(?=;|})/g)){
   const prop=m[1].toLowerCase(),value=m[2].trim().replace(/\s*!important$/,'');const stripped=value.replace(/var\([^)]*\)/g,'').replace(/(['"])(?:\\.|(?!\1).)*?\1/g,'');
   if(/^(?:color|background(?:-color)?|border(?:-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|box-shadow|text-shadow|fill|stroke|--[\w-]+)$/.test(prop)){
    for(const word of stripped.matchAll(/\b[a-z]+\b/gi))if(colors.has(word[0].toLowerCase()))emit(offset+m.index+m[0].indexOf(m[2])+word.index,'color-literal',`Named color ${word[0]}`);
   }
   if(/^border(?:-(?:top-left|top-right|bottom-left|bottom-right))?-radius$/.test(prop)&&! /^(?:var\(--ds-radius-[\w-]+\)|0|50%|inherit)(?:\s+(?:var\(--ds-radius-[\w-]+\)|0|50%|inherit))*$/.test(value))emit(offset+m.index,'radius','Use a radius token, 0, 50% or inherit');
   if(['font','font-size','font-weight'].includes(prop)&&!/^var\(--ds-text-[\w-]+\)$/.test(value)&&!(['400','500'].includes(value)&&prop==='font-weight'))emit(offset+m.index,'font','Use a text token or weight 400/500');
   if(prop==='letter-spacing'&&/^-/.test(value))emit(offset+m.index,'tracking','Letter spacing is 0 (SPEC §5); no negative tracking');
   if(/^(transition|animation)(?:-duration|-delay)?$/.test(prop))for(const duration of value.matchAll(/(?<![\w-])(?:\d*\.)?\d+m?s\b/g))if(duration[0]!=='0s')emit(offset+m.index,'duration','Use a motion token for time');
  }
 };
 const ext=path.extname(file).toLowerCase();
 if(ext==='.css')css(source);
 const js=(text,offset)=>{const lex=/\/\*[^]*?\*\/|\/\/[^\n]*|(['"`])(?:\\[^]|(?!\1)[^\\])*?\1/g;for(const m of text.matchAll(lex)){if(m[0].startsWith('/'))continue;for(const dot of m[0].matchAll(/·/g))emit(offset+m.index+dot.index,'middle-dot','Do not use a middle dot in UI strings');}};
 if(['.js','.mjs','.jsx','.ts','.tsx'].includes(ext))js(source,0);
 if(['.html','.htm'].includes(ext)){
  for(const m of source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi))css(m[1],m.index+m[0].indexOf(m[1]));
  for(const m of source.matchAll(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/gi))css(m[2]+'}',m.index+m[0].indexOf(m[2]));
  for(const m of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))js(m[1],m.index+m[0].indexOf(m[1]));
  const text=source.replace(/<!--[^]*?-->|<(style|script)\b[^>]*>[^]*?<\/\1>/gi,blank).replace(/<[^>]*>/g,blank);
  for(const m of text.matchAll(/·|&middot;|&#183;|&#x0*b7;/gi))emit(m.index,'middle-dot','Do not use a middle dot in HTML text');
 }
 return {errors,exceptions};
}
export async function run(args){
 let configPath=path.join(here,'ds-check.json');const inputs=[];for(let i=0;i<args.length;i++)if(args[i]==='--config')configPath=path.resolve(args[++i]);else inputs.push(args[i]);if(!inputs.length)throw Error('Usage: node check-ui.mjs <files or directories...> [--config ds-check.json]');
 const config=JSON.parse(await fs.readFile(configPath,'utf8')),base=path.dirname(configPath),tokenPath=path.resolve(base,config.tokens||'../tokens/tokens.json'),tokens=new Set(tokenNames(JSON.parse(await fs.readFile(tokenPath,'utf8'))));
 const files=[];async function walk(p){const full=path.resolve(p);if((config.ignore||[]).some(x=>full.split(path.sep).includes(x)||full===path.resolve(base,x)||full.startsWith(path.resolve(base,x)+path.sep)))return;const stat=await fs.stat(full);if(stat.isDirectory()){for(const f of await fs.readdir(full))await walk(path.join(full,f));}else if(/\.(css|html?|m?js|jsx|tsx?)$/.test(full))files.push(full);}
 for(const p of inputs)await walk(p);const result={files:files.length,errors:[],exceptions:[]};for(const f of [...new Set(files)]){const r=inspect(await fs.readFile(f,'utf8'),f,tokens,config);result.errors.push(...r.errors);result.exceptions.push(...r.exceptions);}
 for(const x of result.errors)console.log(`${x.file}:${x.line}:${x.column} ${x.rule} ${x.message}`);
 for(const x of result.exceptions)console.log(`${x.file}:${x.line}:1 ds-allow ${x.reason}`);
 console.log(`Checked ${result.files} files; ${result.errors.length} errors; ${result.exceptions.length} exceptions`);return result;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))try{const result=await run(process.argv.slice(2));process.exitCode=result.errors.length?1:0;}catch(e){console.error(e.message);process.exitCode=1;}
