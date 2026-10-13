/** Shared-scheduler specular rim; stable accessible labels during short first-hover cipher effect. */
export function initSignalInterface(motion) {
 const stop=[];let active=null,x=50,y=50;
 const hover=e=>{const card=e.target.closest('.glass-card');if(card&&e.pointerType==='mouse'&&!motion.media.matches){active=card;const r=card.getBoundingClientRect();x=(e.clientX-r.left)/r.width*100;y=(e.clientY-r.top)/r.height*100;}};
 document.addEventListener('pointermove',hover,{passive:true});
 document.addEventListener('pointerout',e=>{if(active&&!active.contains(e.relatedTarget)){active.style.removeProperty('--glass-energy');active=null;}});
 const remove=motion.add({visible:()=>!!active&&!motion.media.matches,draw(){if(!active)return;active.style.setProperty('--glass-x',x+'%');active.style.setProperty('--glass-y',y+'%');active.style.setProperty('--glass-energy','1');}});
 const scrambled=new WeakSet();const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 const listener=e=>{const el=e.target.closest('#navLinks a,.project-tag');if(!el||scrambled.has(el)||motion.media.matches||!matchMedia('(hover:hover)').matches)return;const original=el.textContent;scrambled.add(el);el.setAttribute('aria-label',original);const span=document.createElement('span');span.setAttribute('aria-hidden','true');span.textContent=original;el.replaceChildren(span);const start=performance.now();let cancel;
 cancel=motion.add({visible:()=>span.isConnected&&!motion.media.matches,draw(){const progress=Math.min(1,(performance.now()-start)/170);span.textContent=[...original].map((ch,i)=>i<Math.floor(progress*original.length)||ch===' '?ch:letters[Math.floor(Math.random()*letters.length)]).join('');if(progress===1){span.textContent=original;cancel();}}});stop.push(()=>{span.textContent=original;cancel?.();});};
 document.addEventListener('pointerover',listener);motion.media.addEventListener('change',()=>{if(motion.media.matches){stop.splice(0).forEach(fn=>fn());active=null;}});
 return ()=>{document.removeEventListener('pointermove',hover);document.removeEventListener('pointerover',listener);remove();stop.splice(0).forEach(fn=>fn());};
}
