/** KKEEY Agent Core. Original shaders, immutable deterministic seeds, one Points draw. */
const host = document.getElementById('signal-field');
const hero = document.getElementById('hero');
const motion = window.KK_MOTION;
let visible = true, started = false;
const observer = new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  if (visible && !started) { started = true; init().catch(err => { host.dataset.render = 'fallback'; console.warn('Signal Field fallback:', err.message); }); }
  motion.refresh();
}, { threshold: 0.01 });
observer.observe(host);
async function init() {
  // A CSS poster is always present; the heavy dependency loads after semantic content.
  const THREE = await import('./vendor/three.module.min.js');
  const canvas = host.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  renderer.debug.onShaderError = () => { host.dataset.render = 'fallback'; lost = true; motion.refresh(); };
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
  camera.position.z = 5.8;
  const seeds = new Float32Array(60000 * 3);
  let random = 92;
  const next = () => { random = (1664525 * random + 1013904223) >>> 0; return random / 4294967296; };
  for (let i = 0; i < seeds.length; i++) seeds[i] = next();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(seeds, 3));
  const rippleSlots = Array.from({length: 8}, () => new THREE.Vector3(0, 0, -99));
  let lastRipple = -99;
  const uniforms = {
    time: { value: 0 }, scroll: { value: 0 }, pointer: { value: new THREE.Vector2(9, 9) },
    ripples: { value: rippleSlots }, dpr: { value: 1 },
    warm: { value: new THREE.Color() }, cool: { value: new THREE.Color() }, light: { value: 0 }
  };
  const material = new THREE.ShaderMaterial({ uniforms, transparent: true, depthWrite: false,
    blending: THREE.NormalBlending,
    vertexShader: `
      uniform float time,scroll,dpr; uniform vec2 pointer; uniform vec3 ripples[8];
      varying float vTone,vGlow,vAlpha;
      void main(){
        vec3 s=position; float a=s.x*6.2831853; float z=s.y*2.-1.;
        float ring=sqrt(max(0.,1.-z*z));
        float shape=1.+.20*sin(3.*a+z*4.+time*.15)+.13*cos(a*2.-z*5.);
        float radius=shape*(.60+.40*pow(s.z,.3));
        vec3 p=vec3(cos(a)*ring*radius,sin(a)*ring*radius,z*radius);
        p.x+=.18*sin(z*3.+time*.18); p.y*=1.25; p.z*=.72;
        p*=1.-scroll*.20;
        float rotation=time*.07; mat2 rot=mat2(cos(rotation),-sin(rotation),sin(rotation),cos(rotation)); p.xz=rot*p.xz;
        vec2 delta=p.xy-pointer; float dist=length(delta); float force=exp(-dist*dist*3.);
        p.xy+=delta/max(dist,.01)*force*.16;
        float ripple=0.;
        for(int i=0;i<8;i++){
          float age=time-ripples[i].z;
          if(age>=0. && age<6.){
            float wd=length(p.xy-ripples[i].xy);
            float front=wd-age*.65;
            // A travelling ring plus trailing crests; new impulses never reset old ones.
            float envelope=exp(-front*front*3.2)*exp(-age*.62);
            ripple+=sin(front*13.)*envelope*.17;
          }
        }
        ripple=clamp(ripple,-.36,.36);
        p+=normalize(p+vec3(.001))*ripple;
        p.y+=sin(time*.28+a*4.)*.035;
        vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv;
        gl_PointSize=clamp((1.7+s.z*1.6)*dpr*3.8/-mv.z,1.,6.);
        vTone=smoothstep(-.8,.8,p.x+sin(a*2.)*.35); vGlow=clamp(force+abs(ripple)*2.,0.,1.); vAlpha=.35+s.z*.5;
      }`,
    fragmentShader: `
      uniform vec3 warm,cool; uniform float light; varying float vTone,vGlow,vAlpha;
      void main(){ float r=length(gl_PointCoord-.5)*2.; if(r>1.)discard;
        vec3 col=mix(warm,cool,vTone); col=mix(col,vec3(1.),vGlow*.45*(1.-light));
        gl_FragColor=vec4(col,(1.-smoothstep(.25,1.,r))*vAlpha*(.85+light*.15));
      }`
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false; scene.add(points);
  const levels = [16000, 36000, 60000];
  let level = matchMedia('(max-width: 768px)').matches ? 0 : 1;
  let lost = false, samples = [], sampleTime = 0, lastChange = 0, lastPaint = -1;
  function resize() {
    const {width,height} = canvas.getBoundingClientRect();
    camera.zoom = matchMedia('(max-width: 768px)').matches ? 1.36 : 1.30;
    const ratio = Math.min(devicePixelRatio || 1, level === 0 ? 1.25 : 1.75);
    renderer.setPixelRatio(ratio); renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height,1); camera.updateProjectionMatrix(); uniforms.dpr.value = ratio;
    geometry.setDrawRange(0, motion.media.matches ? 16000 : levels[level]);
    host.dataset.quality = ['low','medium','high'][level]; motion.refresh();
  }
  function theme() {
    const css = getComputedStyle(document.documentElement);
    uniforms.warm.value.set(css.getPropertyValue('--accent-1').trim());
    uniforms.cool.value.set(css.getPropertyValue('--accent-2').trim());
    uniforms.light.value = document.documentElement.dataset.theme === 'light' ? 1 : 0;
    motion.refresh();
  }
  function coords(event, target) {
    const rect = canvas.getBoundingClientRect();
    const planeHeight = 2 * Math.tan(42 * Math.PI / 360) * camera.position.z / camera.zoom;
    target.set(((event.clientX-rect.left)/rect.width-.5)*planeHeight*camera.aspect,
      (.5-(event.clientY-rect.top)/rect.height)*planeHeight);
  }
  hero.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' && matchMedia('(hover: hover)').matches && !motion.media.matches) coords(e, uniforms.pointer.value); }, {passive:true});
  hero.addEventListener('pointerleave', () => uniforms.pointer.value.set(9,9));
  function emitRipple(event) {
    if (motion.media.matches || event.target.closest('a,button,input,textarea')) return;
    const now = uniforms.time.value;
    const inputTime = performance.now() / 1000;
    if (inputTime-lastRipple < .09) return;
    // Reuse only expired slots: even rapid clicks cannot cut off a live ripple.
    const slot = rippleSlots.find(ripple => now-ripple.z >= 6);
    if (!slot) return;
    const origin = new THREE.Vector2(); coords(event, origin);
    slot.set(origin.x, origin.y, now); lastRipple = inputTime;
  }
  let touchStart = null;
  hero.addEventListener('click', event => {
    if (matchMedia('(hover: hover)').matches) emitRipple(event);
  });
  hero.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    touchStart = {id:event.pointerId,x:event.clientX,y:event.clientY,at:performance.now(),scroll:window.scrollY};
  }, {passive:true});
  hero.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerId !== touchStart.id) return;
    const tap = Math.hypot(event.clientX-touchStart.x,event.clientY-touchStart.y)<10 &&
      performance.now()-touchStart.at<600 && Math.abs(window.scrollY-touchStart.scroll)<5;
    touchStart=null;
    if(tap) emitRipple(event);
  }, {passive:true});
  hero.addEventListener('pointercancel', () => {touchStart=null;}, {passive:true});
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; host.dataset.render = 'fallback'; motion.refresh(); });
  canvas.addEventListener('webglcontextrestored', () => { lost = false; resize(); theme(); });
  new ResizeObserver(resize).observe(host);
  new MutationObserver(theme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-color-theme']});
  motion.media.addEventListener('change',resize);
  theme(); resize();
  motion.add({visible: () => visible && !lost, draw(time,dt) {
    // Limit low quality to 30fps, while sampling the shared scheduler's frame interval.
    if (dt > 0) { samples.push(dt); sampleTime += dt; }
    if (sampleTime > 2200 && time-lastChange>5) {
      const avg = samples.reduce((a,b)=>a+b,0)/samples.length;
      const nextLevel = avg > 24 ? Math.max(0,level-1) : avg < 18 && host.clientWidth > 768 ? Math.min(2,level+1) : level;
      samples=[]; sampleTime=0;
      if(nextLevel!==level){level=nextLevel;lastChange=time;resize();}
    }
    if(dt && level===0 && time-lastPaint<1/30) return;
    lastPaint=time; uniforms.time.value=time;
    const rect=hero.getBoundingClientRect(); uniforms.scroll.value=motion.media.matches?0:Math.max(0,Math.min(1,-rect.top/rect.height));
    renderer.render(scene,camera);
    if(!lost) host.dataset.render='webgl';
  }});
}
