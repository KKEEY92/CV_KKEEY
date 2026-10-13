/** Layout reads only on invalidation. Scroll projects cached document anchors into camera space. */
export function createTopology(T,camera,canvas,hero,host) {
 let cards=[],origin=null,heroBottom=0,projectTop=0,dirty=true,morph=0;
 const observer=new ResizeObserver(()=>dirty=true);observer.observe(hero);observer.observe(document.getElementById('projects'));observer.observe(host);
 const mutations=new MutationObserver(()=>dirty=true);mutations.observe(document.getElementById('projContainer'),{childList:true});
 document.fonts?.ready.then(()=>dirty=true);
 const targets=Array.from({length:8},()=>new T.Vector3());
 const widths=new Float32Array(8);
 function world(x,y,rect,z=0){const h=2*Math.tan(camera.fov*Math.PI/360)*(camera.position.z-z)/camera.zoom;return new T.Vector3(((x-rect.left)/rect.width-.5)*h*camera.aspect,(.5-(y-rect.top)/rect.height)*h,z);}
 function measure(){cards=[...document.querySelectorAll('#projContainer .project-card')].map(el=>{const r=el.getBoundingClientRect();return {id:el.dataset.projectId,x:r.left+r.width/2,y:r.top+window.scrollY+4,width:r.width};});const r=host.getBoundingClientRect();origin={x:r.left+r.width/2,y:r.top+window.scrollY+r.height*.48};heroBottom=hero.getBoundingClientRect().bottom+scrollY;projectTop=document.getElementById('projects').getBoundingClientRect().top+scrollY;dirty=false;}
 return {targets,widths,world,update(dt=0,staticMode=false){if(dirty)measure();const rect=canvas.getBoundingClientRect();const targetMorph=Math.max(0,Math.min(1,(scrollY-heroBottom*.25)/Math.max(200,projectTop-heroBottom*.25-100)));if(staticMode)morph=targetMorph;else morph+=(targetMorph-morph)*(1-Math.exp(-12*Math.max(0,Math.min(.1,dt))));const rootY=(1-morph)*(origin.y-scrollY)+morph*(rect.top+rect.height*.23);const core=world(origin.x,rootY,rect);
 // Stable document-order routes: viewport boundaries never reassign a particle's card.
 const chosen=cards.slice(0,8);for(let i=0;i<8;i++){const c=chosen[i%Math.max(1,chosen.length)];targets[i].copy(c?world(c.x,c.y-scrollY,rect,.02):core);widths[i]=c?Math.abs(world(c.x+c.width/2,c.y-scrollY,rect,.02).x-world(c.x-c.width/2,c.y-scrollY,rect,.02).x):0;}
 return {core,morph,anchors:chosen.length,ids:chosen.map(c=>c.id)};},dispose(){observer.disconnect();mutations.disconnect();}};
}
