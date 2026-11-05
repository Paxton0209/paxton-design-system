// Generates tokens.css from tokens.json. No dependencies: node build-tokens.mjs
import {readFileSync,writeFileSync} from 'node:fs';
const dir=new URL('.',import.meta.url);
const t=JSON.parse(readFileSync(new URL('tokens.json',dir),'utf8'));
const light=[],dark=[];
const walk=(node,path)=>{
 for(const [k,v] of Object.entries(node)){
  if(k.startsWith('$'))continue;
  if(v&&typeof v==='object'&&'$value' in v){
   const name='--ds-'+[...path,k].join('-');
   let val=v.$value;
   if(v.$type==='typography')val=`${val.fontWeight} ${val.fontSize}/${val.lineHeight} var(--ds-font-family)`;
   else if(v.$type==='cubicBezier')val=`cubic-bezier(${val.join(',')})`;
   light.push(`  ${name}:${val};`);
   if(v.$extensions?.dark!==undefined)dark.push(`  ${name}:${v.$extensions.dark};`);
  }else if(v&&typeof v==='object')walk(v,[...path,k]);
 }
};
walk(t,[]);
const compat=[
 '  /* v1 names kept as aliases so existing pages keep working */',
 '  --ds-canvas:var(--ds-color-canvas);--ds-surface:var(--ds-color-track);--ds-ink:var(--ds-color-text-1);',
 '  --ds-grey:var(--ds-color-text-2);--ds-grey-on-surface:var(--ds-color-text-2);--ds-line:var(--ds-color-line);',
 '  --ds-font:var(--ds-font-family);--ds-w-regular:400;--ds-w-medium:500;',
 '  --ds-text-h1:var(--ds-text-heading);--ds-text-h2:var(--ds-text-title);',
];
const css=`/* GENERATED from tokens.json by build-tokens.mjs. Do not edit by hand. */
/* :root is the default; any element with data-theme switches its subtree. */
:root,[data-theme=light]{
${light.join('\n')}
  color-scheme:light;
}
/* Aliases resolve per element, so every themed subtree re-declares them. */
:root,[data-theme]{
${compat.join('\n')}
}
[data-theme=dark]{
${dark.join('\n')}
  color-scheme:dark;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme]){
${dark.map(l=>'  '+l).join('\n')}
    color-scheme:dark;
  }
}
`;
writeFileSync(new URL('tokens.css',dir),css);
console.log(`tokens.css: ${light.length} tokens, ${dark.length} dark overrides`);
