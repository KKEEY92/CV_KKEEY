import { FIELD } from './field.js';
/** Two explicit half-float passes; stable particle state remains exclusively on GPU. */
export function createSimulation(T, renderer, seedData, grid) {
 const gl=renderer.getContext();
 if(!gl.getExtension('EXT_color_buffer_float')) return null;
 const target=()=>new T.WebGLRenderTarget(grid,grid,{type:T.HalfFloatType,format:T.RGBAFormat,minFilter:T.NearestFilter,magFilter:T.NearestFilter,depthBuffer:false,stencilBuffer:false});
 let posA=target(),posB=target(),velA=target(),velB=target();
 const all=[posA,posB,velA,velB];
 for(const rt of all){renderer.setRenderTarget(rt);if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE){renderer.setRenderTarget(null);all.forEach(x=>x.dispose());return null;}}
 const seed=new T.DataTexture(seedData,grid,grid,T.RGBAFormat,T.FloatType);seed.needsUpdate=true;seed.minFilter=seed.magFilter=T.NearestFilter;
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-1,1,1,-1,0,1),quad=new T.Mesh(new T.PlaneGeometry(2,2));scene.add(quad);
 const vertex=`varying vec2 uvState;void main(){uvState=uv;gl_Position=vec4(position.xy,0.,1.);}`;
 const u={pos:{value:null},vel:{value:null},seed:{value:seed},dt:{value:1/60},time:{value:0},pointer:{value:new T.Vector3(9,9,0)},strength:{value:0},activeCount:{value:36000},gridSize:{value:grid},pointerVelocity:{value:new T.Vector3()},ripples:{value:Array.from({length:8},()=>new T.Vector3(0,0,-99))}};
 const initMat=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:`varying vec2 uvState;uniform sampler2D seed;void main(){gl_FragColor=texture2D(seed,uvState);}`,uniforms:u,depthTest:false,depthWrite:false});
 const clearMat=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:`void main(){gl_FragColor=vec4(0.);}`,depthTest:false,depthWrite:false});
 const velMat=new T.ShaderMaterial({vertexShader:vertex,uniforms:u,depthTest:false,depthWrite:false,fragmentShader:`
 varying vec2 uvState;uniform sampler2D pos,vel,seed;uniform float dt,time,strength,activeCount,gridSize;uniform vec3 pointer,pointerVelocity,ripples[8];
 ${FIELD}
 void main(){float index=floor(uvState.x*gridSize)+floor(uvState.y*gridSize)*gridSize;if(index>=activeCount){gl_FragColor=vec4(0.);return;}vec3 p=texture2D(pos,uvState).xyz,v=texture2D(vel,uvState).xyz,rest=texture2D(seed,uvState).xyz;
 vec3 delta=pointer-p;float field=exp(-dot(delta,delta)*2.2)*strength;
 float angle=atan(p.y/1.10,p.x);float tube=length(rest.xy/vec2(1.,1.10))-1.10;vec3 tether=vec3(cos(angle)*(1.10+tube),sin(angle)*(1.10+tube)*1.10,rest.z);vec3 circulation=vec3(-p.y/1.10,p.x*1.10,0.)*.48;
 vec3 a=(curlField(p,time)*.35+circulation-v)*1.9+(tether-p)*3.8+delta*field*7.+pointerVelocity*field*.30-v*1.2;
 for(int i=0;i<8;i++){float age=time-ripples[i].z;if(age>=0.&&age<6.){vec2 d=p.xy-ripples[i].xy;float front=length(d)-age*.65; a.xy+=normalize(d+vec2(.001))*sin(front*13.)*exp(-front*front*3.2)*exp(-age*.65)*2.8;}}
 v+=clamp(a,vec3(-10.),vec3(10.))*dt;v=clamp(v,vec3(-2.),vec3(2.));gl_FragColor=vec4(v,0.);}`});
 const posMat=new T.ShaderMaterial({vertexShader:vertex,uniforms:u,depthTest:false,depthWrite:false,fragmentShader:`varying vec2 uvState;uniform sampler2D pos,vel,seed;uniform float dt;void main(){vec4 p=texture2D(pos,uvState);p.xyz+=texture2D(vel,uvState).xyz*dt;if(length(p.xyz)>5.)p=texture2D(seed,uvState);gl_FragColor=p;}`});
 function pass(mat,rt){quad.material=mat;renderer.setRenderTarget(rt);renderer.render(scene,camera);}
 function reset(){pass(initMat,posA);pass(initMat,posB);pass(clearMat,velA);pass(clearMat,velB);renderer.setRenderTarget(null);}
 reset();let steps=0;
 return { uniforms:u,get texture(){return posA.texture;},get previousTexture(){return posB.texture;},get steps(){return steps;},bytes:grid*grid*8*4,reset,
 step(dt,time){u.dt.value=dt;u.time.value=time;u.pos.value=posA.texture;u.vel.value=velA.texture;pass(velMat,velB);u.vel.value=velB.texture;pass(posMat,posB);[velA,velB]=[velB,velA];[posA,posB]=[posB,posA];renderer.setRenderTarget(null);steps++;},
 dispose(){all.forEach(x=>x.dispose());seed.dispose();quad.geometry.dispose();[initMat,clearMat,velMat,posMat].forEach(x=>x.dispose());}};
}
