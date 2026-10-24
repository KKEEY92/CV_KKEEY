/** Dependency-free integration checks. DOM shim, not a browser/layout/axe substitute. */
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const results=[];
const page=fs.readFileSync('agent-os.html','utf8');
const languages=['de','en','fr','uk','pl'];
class Element extends EventTarget {
  constructor(id='') { super(); this.id=id; this.attrs={}; this.dataset={}; this.textContent=''; this._html=''; this.clientWidth=1198; this.content=''; const names=new Set(); this.classList={toggle:(n,force)=>{const on=force??!names.has(n);on?names.add(n):names.delete(n);return on;},contains:n=>names.has(n),remove:n=>names.delete(n),add:n=>names.add(n)}; }
  setAttribute(key,value){this.attrs[key]=String(value);}
  getAttribute(key){return this.attrs[key];}
  removeAttribute(key){delete this.attrs[key];}
  set innerHTML(value){this._html=value;}
  get innerHTML(){return this._html;}
  focus(){document.activeElement=this;this.dispatchEvent(new Event('focus'));}
  click(){this.dispatchEvent(new Event('click'));}
}
const ids=new Map([...page.matchAll(/\bid="([^"]+)"/g)].map(match=>[match[1],new Element(match[1])]));
for(const id of ['os-roster-title','os-roster-sub','os-agent-list']) ids.set(id,new Element(id));
const root=new Element();
const nav=new Element();
const meta=new Map();
const translations=[...page.matchAll(/data-os="([^"]+)"/g)].map(match=>{const e=new Element();e.dataset.os=match[1];return e;});
const navLinks=Array.from({length:6},()=>new Element());
let departments=[];
const diagram=ids.get('os-diagram');
Object.defineProperty(diagram,'innerHTML',{get(){return this._html;},set(value){this._html=value;departments=[...value.matchAll(/data-department="(\d+)" aria-pressed="(true|false)"/g)].map(match=>{const e=new Element();e.dataset.department=match[1];e.setAttribute('aria-pressed',match[2]);return e;});}});
diagram.querySelectorAll=()=>departments;
diagram.querySelector=selector=>departments.find(e=>selector.includes(`"${e.dataset.department}"`));
const document=new EventTarget();
document.documentElement=root;
document.hidden=false;
document.activeElement=null;
document.getElementById=id=>ids.get(id)||null;
document.querySelector=selector=>{if(selector==='.nav')return nav;if(selector.startsWith('meta[')){if(!meta.has(selector))meta.set(selector,new Element());return meta.get(selector);}return null;};
document.querySelectorAll=selector=>selector==='[data-os]'?translations:selector==='#navLinks a'?navLinks:selector==='.os-department'?departments:[];
const storage=new Map();
const media=new EventTarget();media.matches=true;
let resize;
const window=new EventTarget();
window.document=document;window.scrollY=0;
const sandbox=Object.assign(window,{window,document,Event,EventTarget,localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value))},matchMedia:()=>media,IntersectionObserver:class{observe(){}},ResizeObserver:class{constructor(callback){resize=callback;}observe(){}},setTimeout:()=>0,clearTimeout(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},console});
const context=vm.createContext(sandbox);
for(const file of ['js/data.js','js/motion.js','js/main.js','js/agent-os-content.js','js/agent-os.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
document.dispatchEvent(new Event('DOMContentLoaded'));
const data=window.KK_AGENT_OS;
function translationsComplete(value,path='content') {
  if(Array.isArray(value))value.forEach((item,i)=>translationsComplete(item,`${path}[${i}]`));
  else if(value&&typeof value==='object') {
    if('de' in value) for(const language of languages)assert.ok(typeof value[language]==='string'&&value[language].trim(),`${path}.${language} missing`);
    else Object.entries(value).forEach(([key,item])=>translationsComplete(item,`${path}.${key}`));
  }
}
translationsComplete(data);
assert.equal(data.departments.length,7);
assert.equal(data.principles.length,6);
assert.equal(data.cases.length,3);
assert.deepEqual(Array.from(data.departments,d=>d.agents.length),[7,5,4,6,4,6,2]);
const projectIndex=window.KK_DATA.projects.findIndex(project=>project.id==='kkeey-agent-os');
assert.ok(projectIndex>0);
assert.equal(window.KK_DATA.projects[projectIndex-1].id,'it-praxis-johanniter');
assert.equal(window.KK_DATA.projects[projectIndex].links[0].href,'agent-os.html');
translationsComplete(window.KK_DATA.projects[projectIndex]);
results.push('All five translations complete; department rosters, principles, cases and project insertion match specification.');
fs.mkdirSync('/private/tmp/agent-os-qa',{recursive:true});
for(const width of [286,356,568,600,601,736,998,1198]) {
  diagram.clientWidth=width;resize([{contentRect:{width}}]);
  for(const language of languages) {
    vm.runInContext(`lang='${language}'; render();`,context);
    assert.equal(root.lang,language);
    assert.equal(ids.get('langToggle').textContent,language.toUpperCase());
    assert.ok(translations.every(element=>element.textContent.trim()));
    assert.equal(departments.length,7);
    const xml=diagram.innerHTML;
    assert.ok(xml.includes('Kevin Kuck')&&xml.includes('Obsidian Vault'));
    assert.equal((xml.match(/<foreignObject /g)||[]).length,23);
    fs.writeFileSync(`/private/tmp/agent-os-qa/diagram-${width}-${language}.svg`,xml);
    for(let i=0;i<7;i++) {
      departments[i].click();
      assert.equal(ids.get('os-roster-title').textContent,data.departments[i].name);
      assert.equal((ids.get('os-agent-list').innerHTML.match(/<li>/g)||[]).length,data.departments[i].agents.length);
      assert.equal(departments.filter(button=>button.getAttribute('aria-pressed')==='true').length,1);
    }
    departments[0].dispatchEvent(new Event('focus'));
    assert.equal(ids.get('os-roster-title').textContent,'Career Ops');
    const hover=new Event('pointerenter');hover.pointerType='mouse';departments[1].dispatchEvent(hover);
    assert.equal(ids.get('os-roster-title').textContent,'Life Ops');
  }
}
results.push('40 width/language render combinations; SVG and XHTML exported for strict XML validation.');
results.push('Selection, focus and mouse hover update all seven rosters and pressed states.');
vm.runInContext("lang='de';render();",context);
for(const language of ['en','fr','uk','pl','de']) {
  ids.get('langToggle').click();
  assert.equal(root.lang,language);
  assert.equal(storage.get('kk_lang'),language);
}
const priorTheme=root.getAttribute('data-theme');ids.get('darkToggle').click();assert.notEqual(root.getAttribute('data-theme'),priorTheme);ids.get('darkToggle').click();assert.equal(root.getAttribute('data-theme'),priorTheme);
const priorPalette=root.getAttribute('data-color-theme');ids.get('colorToggle').click();assert.notEqual(root.getAttribute('data-color-theme'),priorPalette);
assert.ok(root.classList.contains('os-motion-paused'));
media.matches=false;media.dispatchEvent(new Event('change'));assert.ok(!root.classList.contains('os-motion-paused'));
ids.get('motionToggle').click();assert.ok(root.classList.contains('os-motion-paused'));
ids.get('hamburger').click();assert.equal(ids.get('hamburger').getAttribute('aria-expanded'),'true');
const escapeEvent=new Event('keydown');escapeEvent.key='Escape';document.dispatchEvent(escapeEvent);assert.equal(ids.get('hamburger').getAttribute('aria-expanded'),'false');
results.push('Shared language cycle/persistence, theme and palette controls, motion preference/pause and menu Escape integration pass.');
const original=execFileSync('git',['show','7657c70:js/data.js']);
const current=fs.readFileSync('js/data.js');
assert.ok(current.length>original.length);
const marker=Buffer.from("    {\n      id: 'claire-v25-native-audio',");
const before=original.indexOf(marker);const after=current.indexOf(marker);
assert.ok(before>0&&after>before);
assert.ok(current.subarray(0,before).equals(original.subarray(0,before)));
assert.ok(current.subarray(after).equals(original.subarray(before)));
results.push(`data.js insertion only: ${original.length} -> ${current.length} bytes; original prefix/suffix byte-identical.`);
console.log(JSON.stringify({scope:'Node VM integration with DOM shim; no browser layout assertions',results},null,2));
