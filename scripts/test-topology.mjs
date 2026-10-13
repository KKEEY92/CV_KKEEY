import assert from 'node:assert/strict';
import { createTopology } from '../js/signal/topology.js';
import { Vector3 } from '../js/vendor/three.module.min.js';

globalThis.window=globalThis;
globalThis.scrollY=0;
globalThis.ResizeObserver=class {observe(){} disconnect(){}};
globalThis.MutationObserver=class {observe(){} disconnect(){}};
const box=(x,y,width,height)=>({getBoundingClientRect:()=>({left:x,top:y-scrollY,right:x+width,bottom:y+height-scrollY,width,height})});
const cards=Array.from({length:5},(_,i)=>Object.assign(box(20,1100+i*450,350,400),{dataset:{projectId:String(i)}}));
const hero=box(0,0,390,1000),host=box(0,600,390,400),projects=box(0,1000,390,2800);
const canvas={getBoundingClientRect:()=>({left:0,top:76,right:390,bottom:844,width:390,height:768})};
globalThis.document={getElementById:id=>id==='projects'?projects:{},querySelectorAll:()=>cards};
const make=()=>createTopology({Vector3},{fov:42,position:{z:6},zoom:1.1,aspect:390/768},canvas,hero,host);

const t=make();const start=t.update(1/60);
for(const offset of [300,700,1100,1700,2400,900,0]){
 scrollY=offset;const pose=t.update(1/60);
 assert.deepEqual(pose.ids,start.ids,'routes must not change when cards leave the viewport');
 assert(pose.morph>=0&&pose.morph<=1);
 assert(t.targets.every(v=>Number.isFinite(v.x)&&Number.isFinite(v.y)));
 assert([...t.widths].every(w=>w>0));
}
scrollY=0;const slow=make(),fast=make();slow.update(0);fast.update(0);scrollY=900;
const first=fast.update(1/60);assert(first.morph>0&&first.morph<.3,'scroll jump must ease into morph');
for(let i=1;i<60;i++)fast.update(1/60);
for(let i=0;i<30;i++)slow.update(1/30);
assert(Math.abs(fast.update(0).morph-slow.update(0).morph)<1e-7,'smoothing must be frame-rate independent');
assert.equal(slow.update(0,true).morph,1,'static mode must immediately adopt target pose');
const old=document.querySelectorAll;document.querySelectorAll=()=>[];scrollY=0;const empty=make();assert.equal(empty.update(1/60).anchors,0);assert([...empty.widths].every(w=>w===0));document.querySelectorAll=old;
t.dispose();slow.dispose();fast.dispose();empty.dispose();
console.log('PASS: stable card routes, finite anchors, bounded and frame-independent smoothing, static and empty states');
