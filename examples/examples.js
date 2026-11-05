import {showToast} from '../components/components.js';
const theme=document.querySelector('#theme');
theme?.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';theme.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} theme`);});
for(const b of document.querySelectorAll('[data-close]'))b.addEventListener('click',()=>b.closest('dialog').close());
for(const tab of document.querySelectorAll('[data-filter]')){
 const update=()=>{const panel=document.querySelector('#projects');panel.hidden=false;panel.setAttribute('aria-labelledby',tab.id);for(const card of panel.querySelectorAll('[data-category]'))card.hidden=tab.dataset.filter!=='all'&&card.dataset.category!==tab.dataset.filter;};
 tab.addEventListener('click',update);tab.addEventListener('keydown',()=>queueMicrotask(()=>{const active=document.querySelector('[data-filter][aria-selected=true]');if(active===tab)update();else active?.click();}));
}
for(const card of document.querySelectorAll('[data-project]'))card.addEventListener('click',event=>{event.preventDefault();const dialog=document.querySelector('.project-dialog');dialog.querySelector('#project-title').textContent=card.querySelector('.ds-card__title').textContent;const image=dialog.querySelector('img');image.src=card.querySelector('img').src;image.alt=card.querySelector('.ds-card__title').textContent;dialog.showModal();dialog.querySelector('button').focus();dialog.addEventListener('close',()=>card.focus(),{once:true});});
const chooseScene=value=>{for(const row of document.querySelectorAll('[data-scene]')){if(row.dataset.scene===value)row.setAttribute('aria-current','page');else row.removeAttribute('aria-current');}document.querySelector('#scene-heading').textContent=value;document.querySelector('.canvas').setAttribute('aria-label',`${value} scene preview placeholder`);};
for(const row of document.querySelectorAll('[data-scene]'))row.addEventListener('click',()=>chooseScene(row.dataset.scene));
for(const item of document.querySelectorAll('.scene-picker [role=option]'))item.addEventListener('click',()=>chooseScene(item.textContent.trim()));
const vehicleDialog=document.querySelector('#vehicle-dialog');document.querySelector('#vehicle-card')?.addEventListener('click',()=>{vehicleDialog.showModal();vehicleDialog.querySelector('button').focus();});
vehicleDialog?.addEventListener('close',()=>document.querySelector('#vehicle-card').focus());
const chooseVehicle=value=>{document.querySelector('#vehicle-card .ds-card__title').textContent=value;const picker=document.querySelector('.vehicle-picker');picker.querySelector('[data-value]').textContent=value;for(const option of picker.querySelectorAll('[role=option]'))option.setAttribute('aria-selected',String(option.textContent.trim()===value));};
for(const item of document.querySelectorAll('[data-vehicle]'))item.addEventListener('click',()=>{chooseVehicle(item.dataset.vehicle);vehicleDialog.close();});
for(const item of document.querySelectorAll('.vehicle-picker [role=option]'))item.addEventListener('click',()=>chooseVehicle(item.textContent.trim()));
document.querySelector('#assist')?.addEventListener('click',e=>{const button=e.currentTarget,on=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(on));button.textContent=on?'Stop driving assist':'Driving assist';});
document.querySelector('#export')?.addEventListener('click',()=>{
 const values=[...document.querySelectorAll('.settings .ds-select [data-value]')].map(e=>e.textContent),format=values[0],size=values[1].split(' × ').map(Number),theme=document.documentElement.dataset.theme;
 const state={scene:document.querySelector('#scene-heading').textContent,theme,size,vehicle:document.querySelector('#vehicle-card .ds-card__title').textContent,layers:[...document.querySelectorAll('[role=switch]')].map(el=>({name:document.getElementById(el.getAttribute('aria-labelledby')).textContent,enabled:el.getAttribute('aria-checked')==='true'})),options:[...document.querySelectorAll('[role=radiogroup]')].map(el=>({name:el.getAttribute('aria-label'),value:el.querySelector('[aria-checked=true]').getAttribute('aria-label')||el.querySelector('[aria-checked=true]').textContent}))};
 const save=blob=>{const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='scene-example.'+format.toLowerCase();a.click();URL.revokeObjectURL(url);showToast('Exported');};
 const fill=getComputedStyle(document.querySelector('.canvas')).backgroundColor;
 if(format==='JSON')save(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));
 else if(format==='SVG')save(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 ${size[0]} ${size[1]}"><title>Scene preview placeholder</title><rect width="100%" height="100%" fill="${fill}"/></svg>`],{type:'image/svg+xml'}));
 else {const canvas=document.createElement('canvas');canvas.width=size[0];canvas.height=size[1];const ctx=canvas.getContext('2d');ctx.fillStyle=fill;ctx.fillRect(0,0,...size);canvas.toBlob(save,'image/png');}
});
