const fs=require('node:fs');
const path=require('node:path');
process.chdir(__dirname);
const F=JSON.parse(fs.readFileSync('figures.json','utf8'));
const css=fs.readFileSync('base.css','utf8');const V5=fs.readFileSync('v5.css','utf8');const IDS=process.env.IDS;
const NODOT=h=>h.replace(/#D9D9D6/g,'#DCDCDC').replace(/#E6E6E3/g,'#E8E8E8').replace(/rgba\(20,20,19,/g,'rgba(0,0,0,').replace('Screenshot · phone or desktop','Phone or desktop screenshot').replace('Required · generated and read aloud','Required, generated and read aloud').replace('Optional · asks for what is missing','Optional, asks for what is missing').replace(/>([^<]*?) · ([^<]*?)</g,'>$1, $2<').replace('left:32px;top:200px;"><span class="s-mono">Request','left:92px;top:200px;transform:translateX(-50%)"><span class="s-mono">Request').replace('left:184px;top:200px;"><span class="s-mono">Simo asks','left:236px;top:200px;transform:translateX(-50%)"><span class="s-mono">Simo asks').replace('left:320px;top:200px;"><span class="s-mono">Answer with hints','left:400px;top:200px;transform:translateX(-50%)"><span class="s-mono">Answer with hints');
const ids0=['heat','voice','production','poc','flywheel','signals','domain','anatomy','reach','precision','life','need','grow','cells'];const ids=IDS?IDS.split(','):ids0;
for(const id of ids){if(!Object.hasOwn(F,id))throw new Error('Unknown figure: '+id)}
const page=theme=>`<!doctype html><html data-theme="${theme}"><meta charset=utf-8><style>${css}
body{margin:0;background:${theme=='dark'?'#000':'#fff'};padding:20px;display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}
.box .vfig .f-plate{width:640px!important;height:360px!important;min-height:0!important;max-height:none!important;box-sizing:border-box!important;margin:0!important;padding:0 64px!important;overflow:hidden;position:relative}
.box .vfig .f-plate>.f-head,.box .vfig .s-cap,.box .vfig .f-sentence,.box .vfig .f-plate>.f-tag{display:none!important}
.box .vfig #poc .f-hero{height:116px}

html[data-theme="dark"] .vfig .s-stage{background:#111111;box-shadow:inset 0 0 0 1px rgba(255,255,255,.07)}
html[data-theme="dark"] .vfig .s-tag,html[data-theme="dark"] .vfig .s-chip{background:#1A1A1A;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 1px 2px rgba(0,0,0,.3)}
html[data-theme="dark"] .vfig .s-lift{background:#1A1A1A;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 12px 24px -10px rgba(0,0,0,.5)}
html[data-theme="dark"] .vfig .s-rest{background:rgba(255,255,255,.04);box-shadow:0 0 0 1px rgba(255,255,255,.06)}
html[data-theme="dark"] .vfig .s-slot{outline-color:rgba(255,255,255,.22)}
html[data-theme="dark"] .vfig .s-vline{border-left-color:rgba(255,255,255,.28)}
html[data-theme="dark"] .vfig .s-line{background:rgba(255,255,255,.16)}
html[data-theme="dark"] .vfig .s-node{background:rgba(255,255,255,.35)}
html[data-theme="dark"] .vfig .s-bar{background:#2E2E2E}
html[data-theme="dark"] .vfig .s-row{border-bottom-color:rgba(255,255,255,.07)}

html[data-theme="dark"] .vfig{
 --fig-plate:#0A0A0A; --fig-card:#111111; --fig-ph:#1F1F1F; --fig-ph-2:#1A1A1A; --fig-tag-bg:#1F1F1F;
 --fig-tile:linear-gradient(180deg,#161616,#121212); --fig-tile-flat:#141414;
 --fig-raise:0 0 0 1px rgba(255,255,255,.09),0 1px 2px rgba(0,0,0,.4);
 --fig-outline:inset 0 0 0 1px rgba(255,255,255,.09); --fig-outline-strong:inset 0 0 0 1px rgba(255,255,255,.14);
 --fig-ink:#EDEDED; --fig-on-ink:#0A0A0A; --fig-on-ink-2:#454545; --fig-text:#EDEDED; --fig-text-2:#A0A0A0; --fig-text-3:#878787; --fig-text-ph:#6E6E6E;
 --fig-connector:#6E6E6E; --fig-frame:#7D7D7D; --fig-ring:237,237,237;
 --fig-heat-0:#1F1F1F; --fig-heat-1:#2E2E2E; --fig-heat-2:#454545; --fig-heat-3:#878787; --fig-heat-4:#EDEDED;
 --ds-ink:#EDEDED; --ds-grey:#A0A0A0; --ds-grey-on-surface:#A0A0A0; --ds-line:rgba(255,255,255,.09); --ds-canvas:#000; --ds-surface:rgba(255,255,255,.06);
}
/* Historical compatibility rules; current v5 values follow below. */
html .vfig{--fig-mass:#C4C3BE;--fig-lift:#FFFFFF;--fig-lift-shadow:0 0 0 1.5px var(--fig-ink),0 10px 24px -12px rgba(20,20,19,.28),0 2px 4px rgba(20,20,19,.06);
 --fig-heat-3:#55544F;--fig-heat-4:#2A2A28}
html[data-theme="dark"] .vfig{--fig-mass:#3A3A3A;--fig-lift:#1C1C1C;--fig-lift-shadow:0 0 0 1.5px #D4D4D4,0 10px 24px -12px rgba(0,0,0,.7);
 --fig-tile-flat:#161616;--fig-tile:linear-gradient(180deg,#1A1A1A,#151515);--fig-ph:#2A2A2A;--fig-ph-2:#222222;--fig-card:#131313;
 --fig-heat-0:#1C1C1C;--fig-heat-1:#2B2B2B;--fig-heat-2:#555555;--fig-heat-3:#8F8F8F;--fig-heat-4:#C8C8C8;--fig-ink:#E6E6E6}
.vfig .f-level.f-emph{background:var(--fig-lift);color:var(--fig-text);box-shadow:var(--fig-lift-shadow)}
.vfig .f-level.f-emph .f-lv,.vfig .f-level.f-emph p{color:var(--fig-text-2)}
.vfig .f-emph .f-sq i{background:var(--fig-ink)} .vfig .f-emph .f-sq i.off{background:var(--fig-heat-0);opacity:1}
.vfig .f-emph .f-foot i.bar{background:var(--fig-heat-1)!important} .vfig .f-emph .f-foot i.bar::before{background:var(--fig-ink)!important}
.vfig .f-emph .f-foot i.card{background:var(--fig-ph-2)!important}
.vfig .f-fill{background:var(--fig-mass)}
.vfig #reach .f-heat__row i.l4{background:#6E6E6E} html[data-theme="dark"] .vfig #reach .f-heat__row i.l4{background:#9A9A9A}
.vfig #n-need .scr .ct,.vfig #n-grow .scr .ct{background:var(--fig-mass)}

${V5}
.mv{position:absolute;left:64px;top:0;width:512px;transform-origin:0 0}
</style><body>`+ids.map(id=>`<div class="box" id="b-${id}"><div class="vfig" data-vfig="${id}">${theme=='dark'&&['life','precision'].includes(id)?NODOT(F[id].replace(/rgba\(20,20,19,/g,'rgba(237,237,237,').replace(/#D9D9D6/g,'#2E2E2E').replace(/#E6E6E3/g,'#292929')):NODOT(F[id])}</div></div>`).join('')+`
<script>
const MAXW=560,MAXH=300;
for(const pl of document.querySelectorAll('.f-plate')){
 pl.style.height='';
 pl.querySelectorAll(':scope>.f-head,:scope>.f-tag,.s-cap,.f-sentence').forEach(e=>e.remove());
 const mv=document.createElement('div');mv.className='mv';while(pl.firstChild)mv.appendChild(pl.firstChild);pl.appendChild(mv);
 const P=pl.getBoundingClientRect();let l=1e9,t=1e9,r=-1e9,b=-1e9;
 mv.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);if(cs.display=='none'||cs.visibility=='hidden')return;const q=e.getBoundingClientRect();if(!q.width||!q.height)return;
  if(e.matches('svg'))return;
  if(e.children.length&&cs.backgroundColor=='rgba(0, 0, 0, 0)'&&cs.boxShadow=='none'&&cs.borderStyle=='none'&&!e.matches('svg'))return; // pure layout boxes
  l=Math.min(l,q.left);t=Math.min(t,q.top);r=Math.max(r,q.right);b=Math.max(b,q.bottom)});
 const w=r-l,h=b-t,sc=Math.min(1,MAXW/w,MAXH/h);
 const cx=(l+r)/2-P.left-64,cy=(t+b)/2-P.top;   // in mv coords (mv at left 64, top 0)
 const tx=320-64-cx*sc, ty=180-cy*sc;
 mv.style.transform='translate('+Math.round(tx*2)/2+'px,'+Math.round(ty*2)/2+'px) scale('+sc+')';
 pl.dataset.fit=[w.toFixed(0),h.toFixed(0),sc.toFixed(3)].join(',');
}
</script></body></html>`;
const P=process.env.PFX||'';fs.writeFileSync(P+'light.html',page('light'));fs.writeFileSync(P+'dark.html',page('dark'));
