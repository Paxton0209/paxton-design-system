// Home content and destinations are from the original portfolio's 05-company-drawer.js.
// This isolated component example uses the library dialog; production motion stays in the original site.
const filters=[...document.querySelectorAll('[data-filter]')];
for(const button of filters){
 button.addEventListener('click',()=>{
  for(const item of filters)item.setAttribute('aria-pressed',String(item===button));
  for(const card of document.querySelectorAll('[data-category]'))card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;
 });
 button.addEventListener('keydown',event=>{
  const i=filters.indexOf(button),next=event.key==='ArrowRight'?(i+1)%filters.length:event.key==='ArrowLeft'?(i+filters.length-1)%filters.length:event.key==='Home'?0:event.key==='End'?filters.length-1:-1;
  if(next>=0){event.preventDefault();filters[next].focus();}
 });
}
const experiences={
 luxoft:{name:'Luxoft',slugs:['toyota-lexus'],detail:'Designed 3D cockpit proofs of concept and maintained HMI design-system components for production vehicles.'},
 jiyue:{name:'Jiyue',slugs:['driving-states','ai-voice','system-motion'],detail:'Designed driving-state and ADAS visualization, led the voice assistant’s visual identity, and maintained shared system motion.'},
 apollo:{name:'Baidu Apollo',slugs:['cadillac-maps'],detail:'Designed production map interfaces for Cadillac, Buick and Chevrolet. Built Cadillac and Buick component libraries and refined interaction details with developers.'}
};
const dialog=document.querySelector('#portfolio-drawer'),content=document.querySelector('#drawer-content'),title=document.querySelector('#drawer-title');
let trigger,previousOverflow;
function element(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function link(text,href){const a=element('a',text,'ds-link');a.href=href;return a;}
function close(){if(history.state?.portfolioOverlay)history.back();else dialog.close();}
function open(button){
 trigger=button;content.replaceChildren();
 const key=button.dataset.company;
 if(key==='contact'){
  title.textContent='Let’s talk';
  content.append(element('p','Paxton Yao, HMI Designer'),element('p','peixinyao0209@gmail.com','contact-address'));
  const actions=element('div','','contact-actions'),copy=element('button','Copy','ds-btn'),status=element('p','','copy-status');
  copy.type='button';status.setAttribute('role','status');
  copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('peixinyao0209@gmail.com');status.textContent='Copied';}catch{status.textContent='Couldn’t copy. Select the email instead.';}});
  actions.append(copy,link('Email','mailto:peixinyao0209@gmail.com'));content.append(actions,status);
  const list=element('div','','drawer-links');
  for(const [name,url] of [['LinkedIn','https://www.linkedin.com/in/paxton-yao-8080443a2/'],['RedNote','https://www.xiaohongshu.com/user/profile/59618b7c82ec3953470d5cca'],['YouTube','https://www.youtube.com/@PeixinYao-0209'],['GitHub','https://github.com/Paxton0209']])list.append(link(name,url));
  content.append(list);
 }else{
  const company=experiences[key];title.textContent=company.name;content.append(element('p',company.detail));
  const list=element('div','','drawer-links');
  for(const slug of company.slugs){const card=document.querySelector(`.project-grid a[href$="/work/${slug}/"]`);list.append(link(card.querySelector('.ds-card__title').textContent,card.href));}
  content.append(list);
 }
 previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';button.setAttribute('aria-expanded','true');
 history.pushState({...history.state,portfolioOverlay:true},'',location.href);dialog.showModal();dialog.querySelector('[data-close]').focus();
}
for(const button of document.querySelectorAll('[data-company]'))button.addEventListener('click',event=>{event.preventDefault();open(button);});
dialog.querySelector('[data-close]').addEventListener('click',close);
dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))close();});
dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;trigger?.setAttribute('aria-expanded','false');trigger?.focus({preventScroll:true});});
window.addEventListener('popstate',()=>{if(dialog.open&&!history.state?.portfolioOverlay)dialog.close();});
dialog.addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const controls=[...dialog.querySelectorAll('button:not(:disabled),a[href]')],first=controls[0],last=controls.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
