import { FIELD } from './signal/field.js';
import { createSimulation } from './signal/simulation.js';
import { createTopology } from './signal/topology.js';
import { initSignalInterface } from './signal/interface.js';
/** Neural Topology: actual half-float GPU state, differentiable curl noise, semantic DOM anchors. */
const host=document.getElementById('signal-field'),hero=document.getElementById('hero'),scope=document.getElementById('signal-scope');
const canvas=document.querySelector('.signal-canvas'),motion=window.KK_MOTION,hud=document.getElementById('signal-telemetry');
let visible=true,started=false;
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!started){started=true;init().catch(error=>{host.dataset.render='fallback';hud.textContent='STATE: FALLBACK';console.warn('Signal fallback',error.message);});}motion.refresh();},{threshold:.001});observer.observe(scope);
async function init(){
 const T=await import('./vendor/three.module.min.js');
 const renderer=new T.WebGLRenderer({canvas,alpha:true,premultipliedAlpha:false,antialias:false,powerPreference:'low-power'});
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(42,1,.1,30);camera.position.z=6;
 const grid=innerWidth<=768?128:256,capacity=grid*grid,rest=new Float32Array(capacity*3),seedAttr=new Float32Array(capacity*3),stateUV=new Float32Array(capacity*2),state=new Float32Array(capacity*4);
 let rng=92;const random=()=>{rng=(1664525*rng+1013904223)>>>0;return rng/4294967296;};
 for(let i=0;i<capacity;i++){const a=random(),b=random(),c=random(),theta=a*Math.PI*2,phi=(Math.floor(b*18)/18+.012*Math.sin(a*31))*Math.PI*2;const radius=1.10+(.27+.10*c)*Math.cos(phi+Math.sin(theta*2)*.35);const p=[Math.cos(theta)*radius+.11*Math.sin(theta*3),Math.sin(theta)*radius*1.10,.40*Math.sin(phi)+.13*Math.sin(theta*2)];for(let j=0;j<3;j++){rest[i*3+j]=p[j];state[i*4+j]=p[j];seedAttr[i*3+j]=[a,b,c][j];}state[i*4+3]=a;stateUV[i*2]=(i%grid+.5)/grid;stateUV[i*2+1]=(Math.floor(i/grid)+.5)/grid;}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(rest,3));geometry.setAttribute('aSeed',new T.BufferAttribute(seedAttr,3));geometry.setAttribute('aStateUV',new T.BufferAttribute(stateUV,2));
 const topology=createTopology(T,camera,canvas,hero,host),ripples=Array.from({length:8},()=>new T.Vector3(0,0,-99));
 let simulation=null,lost=false,failed=false,simTime=0,accumulator=0,level=innerWidth<=768?0:1,frameSamples=[],sampleTime=0,lastQuality=0,lastHUD=-99,lastRipple=-99;
 const u={time:{value:0},state:{value:null},previousState:{value:null},stateBlend:{value:1},useSimulation:{value:0},morph:{value:0},core:{value:new T.Vector3()},targets:{value:topology.targets},targetWidths:{value:topology.widths},anchorCount:{value:0},pointer:{value:new T.Vector3(9,9,0)},pointerStrength:{value:0},ripples:{value:ripples},dpr:{value:1},pointLimit:{value:8},warm:{value:new T.Color()},cool:{value:new T.Color()},light:{value:0},glowPass:{value:0},focus:{value:6}};
 const material=new T.ShaderMaterial({uniforms:u,transparent:true,depthWrite:false,depthTest:false,blending:T.NormalBlending,toneMapped:false,vertexShader:`
 attribute vec3 aSeed;attribute vec2 aStateUV;
 uniform float time,useSimulation,morph,anchorCount,dpr,pointLimit,focus,pointerStrength,stateBlend;uniform sampler2D state,previousState;uniform float targetWidths[8];
 uniform vec3 core,targets[8],pointer,ripples[8];varying float tone,energy,alpha,blur;
 ${FIELD}
 vec3 bezier(vec3 a,vec3 b,vec3 c,vec3 d,float t){float q=1.-t;return q*q*q*a+3.*q*q*t*b+3.*q*t*t*c+t*t*t*d;}
 void main(){vec3 p=position;if(useSimulation>.5)p=mix(texture2D(previousState,aStateUV).xyz,texture2D(state,aStateUV).xyz,stateBlend);else p+=curlField(p,time)*.08;
 float angle=time*.055;mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));p.xz=rot*p.xz;
 float wave=0.;for(int i=0;i<8;i++){float age=time-ripples[i].z;if(age>=0.&&age<6.){float front=length(p.xy-ripples[i].xy)-age*.65;wave+=sin(front*13.)*exp(-front*front*3.2)*exp(-age*.65)*.12;}}
 p+=normalize(p+vec3(.001))*clamp(wave,-.3,.3);
 float force=exp(-dot(pointer-p,pointer-p)*2.)*pointerStrength;
 vec3 world=p+core;float route=step(.53,aSeed.z);int targetIndex=int(mod(floor(aSeed.y*8.),max(1.,anchorCount)));vec3 end=targets[targetIndex];end.x+=(aSeed.z-.5)*targetWidths[targetIndex]*.72;float pathT=fract(aSeed.x+time*.075);
 vec3 path=bezier(core+vec3(.1,-.3,0),core+(end-core)*.35+vec3(0.,.10,.2),end-(end-core)*.22+vec3(0.,.15,.1),end,pathT);
 path.xy+=(vec2(sin(pathT*12.+aSeed.y*15.),cos(pathT*10.+time*.3))*.05+vec2(sin(aSeed.z*53.),cos(aSeed.y*31.))*.075)*sin(pathT*3.14159);
 float blend=smoothstep(.05,.95,morph)*route;world=mix(world,path,blend);
 world.z+=morph*(1.-route)*aSeed.y*.5;
 vec4 mv=modelViewMatrix*vec4(world,1.);gl_Position=projectionMatrix*mv;
 float depth=-mv.z;blur=clamp(abs(depth-focus)/1.2,0.,1.);float base=1.5+aSeed.z*1.7;float bokeh=mix(1.,2.6,blur*step(.92,aSeed.y));
 gl_PointSize=clamp(base*dpr*5.8/max(depth,.1)*bokeh,1.,pointLimit);
 tone=smoothstep(-.30,.30,p.x);energy=clamp(abs(wave)*5.+force*.5+(exp(-dot(p-vec3(.85,.75,0),p-vec3(.85,.75,0))*9.)+exp(-dot(p-vec3(-.8,-.8,0),p-vec3(-.8,-.8,0))*9.))*.9,0.,1.);
 alpha=(.42+aSeed.z*.36)/(bokeh*bokeh);alpha*=mix(1.,.16,morph*(1.-route));alpha*=mix(1.,smoothstep(0.,.10,pathT)*(1.-smoothstep(.88,1.,pathT)),blend);}
 `,fragmentShader:`uniform vec3 warm,cool;uniform float light,glowPass;varying float tone,energy,alpha,blur;
 void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;float disk=1.-smoothstep(mix(.5,.06,blur),1.,r);
 vec3 col=mix(warm,cool,tone);col=mix(col,vec3(.8,.98,1.),energy*.85*(1.-light));
 float opacity=disk*alpha*(.9+energy*.4);if(glowPass>.5){float hot=smoothstep(.45,.9,energy);if(hot<.005)discard;col=mix(col,vec3(1.),hot*.45);opacity*=hot*.75;}gl_FragColor=vec4(col,opacity);
 #include <colorspace_fragment>
 }`});
 const points=new T.Points(geometry,material);points.frustumCulled=false;scene.add(points);
 const glowUniforms={...u,glowPass:{value:1}};const glowMaterial=material.clone();glowMaterial.uniforms=glowUniforms;glowMaterial.blending=T.AdditiveBlending;const glowPoints=new T.Points(geometry,glowMaterial);glowPoints.frustumCulled=false;scene.add(glowPoints);
 renderer.debug.onShaderError=()=>{failed=true;host.dataset.render='fallback';motion.refresh();};
 function makeSimulation(){simulation?.dispose();simulation=null;try{simulation=createSimulation(T,renderer,state,grid);}catch(error){console.warn('Simulation unavailable; curl deformation fallback',error.message);}u.useSimulation.value=simulation?1:0;if(simulation){simulation.uniforms.ripples.value=ripples;u.state.value=simulation.texture;u.previousState.value=simulation.previousTexture;}host.dataset.mode=simulation?'curl-sim':'curl-deform';}
 makeSimulation();
 const targetPointer=new T.Vector3(9,9,0),springPointer=new T.Vector3(9,9,0),pointerVelocity=new T.Vector3();let pointerInside=false,pointerActive=0,lastInput=null;
 function pointerLocal(event,out){const rect=canvas.getBoundingClientRect();out.copy(topology.world(event.clientX,event.clientY,rect)).sub(u.core.value);}
 hero.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||motion.media.matches)return;pointerLocal(e,targetPointer);if(!pointerInside){springPointer.copy(targetPointer);pointerVelocity.set(0,0,0);}pointerInside=true;},{passive:true});
 hero.addEventListener('pointerleave',()=>{pointerInside=false;});
 function emit(e){if(motion.media.matches||e.target.closest('a,button,input,textarea'))return;const inputTime=performance.now()/1000;if(inputTime-lastRipple<.09)return;const slot=ripples.find(v=>simTime-v.z>=6);if(!slot)return;const p=new T.Vector3();pointerLocal(e,p);slot.set(p.x,p.y,simTime);lastRipple=inputTime;}
 hero.addEventListener('click',e=>{if(matchMedia('(hover:hover)').matches)emit(e);});
 hero.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')lastInput={id:e.pointerId,x:e.clientX,y:e.clientY,t:performance.now(),scroll:scrollY};},{passive:true});
 hero.addEventListener('pointerup',e=>{if(lastInput?.id!==e.pointerId)return;const tap=Math.hypot(e.clientX-lastInput.x,e.clientY-lastInput.y)<10&&performance.now()-lastInput.t<600&&Math.abs(scrollY-lastInput.scroll)<5;lastInput=null;if(tap)emit(e);},{passive:true});hero.addEventListener('pointercancel',()=>lastInput=null,{passive:true});
 const counts=[16000,36000,60000];
 function resize(){const r=canvas.getBoundingClientRect();const ratio=Math.min(devicePixelRatio||1,[1,1.25,1.5][level]);renderer.setPixelRatio(ratio);renderer.setSize(r.width,r.height,false);camera.aspect=r.width/Math.max(1,r.height);camera.zoom=innerWidth<=768?1.10:1.05;camera.updateProjectionMatrix();u.dpr.value=ratio;u.pointLimit.value=[6,8,12][level];geometry.setDrawRange(0,Math.min(capacity,motion.media.matches?16000:counts[level]));if(simulation)simulation.uniforms.activeCount.value=geometry.drawRange.count;glowPoints.visible=!u.light.value&&level>0;host.dataset.quality=['low','medium','high'][level];motion.refresh();}
 function theme(){const css=getComputedStyle(document.documentElement);u.warm.value.set(css.getPropertyValue('--accent-1').trim());u.cool.value.set(css.getPropertyValue('--accent-2').trim());u.light.value=document.documentElement.dataset.theme==='light'?1:0;glowPoints.visible=!u.light.value&&level>0;motion.refresh();}
 new ResizeObserver(resize).observe(canvas.parentElement);new MutationObserver(theme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-color-theme']});
 motion.media.addEventListener('change',()=>{accumulator=0;pointerInside=false;resize();});document.addEventListener('visibilitychange',()=>{accumulator=0;});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;host.dataset.render='fallback';hud.textContent='STATE: CONTEXT LOST';motion.refresh();});
 canvas.addEventListener('webglcontextrestored',()=>{lost=false;failed=false;simTime=0;accumulator=0;ripples.forEach(v=>v.set(0,0,-99));makeSimulation();resize();theme();});
 initSignalInterface(motion);theme();resize();
 motion.add({visible:()=>visible&&!lost&&!failed,draw(time,dt){
 const pose=topology.update(dt/1000,motion.media.matches);u.core.value.copy(pose.core);u.morph.value=matchMedia('(prefers-reduced-motion:reduce)').matches?0:pose.morph;u.anchorCount.value=pose.anchors;
 if(dt>0){frameSamples.push(dt);sampleTime+=dt;if(sampleTime>3000&&time-lastQuality>6){const sorted=[...frameSamples].sort((a,b)=>a-b),p95=sorted[Math.floor(sorted.length*.95)];const next=p95>32?Math.max(0,level-1):p95<19&&innerWidth>1100?Math.min(2,level+1):level;frameSamples=[];sampleTime=0;if(next!==level){level=next;lastQuality=time;resize();}}}
 if(dt&&!motion.media.matches){const fixed=level===0?1/30:1/60;accumulator=Math.min(accumulator+dt/1000,fixed*2);let steps=0;while(accumulator>=fixed&&steps<2){
 const d=targetPointer.clone().sub(springPointer);if(pointerInside){pointerVelocity.addScaledVector(d,144*fixed);pointerVelocity.multiplyScalar(Math.exp(-21.6*fixed));springPointer.addScaledVector(pointerVelocity,fixed);}pointerActive+=(Number(pointerInside)-pointerActive)*(1-Math.exp(-6*fixed));
 u.pointer.value.copy(springPointer);u.pointerStrength.value=pointerActive;
 if(simulation){simulation.uniforms.pointer.value.copy(springPointer);simulation.uniforms.pointerVelocity.value.copy(pointerVelocity).clampLength(0,3);simulation.uniforms.strength.value=pointerActive;simulation.step(fixed,simTime);}simTime+=fixed;accumulator-=fixed;steps++;}}
 u.time.value=simTime+accumulator;if(simulation){u.state.value=simulation.texture;u.previousState.value=simulation.previousTexture;u.stateBlend.value=Math.min(1,accumulator/(level===0?1/30:1/60));}renderer.setRenderTarget(null);renderer.render(scene,camera);host.dataset.render='webgl';
 if(time-lastHUD>.5||dt===0){lastHUD=time;host.dataset.stateGrid=String(grid);const stateLabel=matchMedia('(prefers-reduced-motion:reduce)').matches?'STATIC':motion.media.matches?'PAUSED':'RUNNING';hud.textContent=`SIM: ${simulation?'CURL_SIM':'CURL_DEFORM'} · PTS: ${Math.round(geometry.drawRange.count/1000)}K · ${stateLabel}`;host.dataset.anchors=String(pose.anchors);host.dataset.steps=String(simulation?.steps||0);host.dataset.stateBytes=String(simulation?.bytes||0);}
 }});
}
