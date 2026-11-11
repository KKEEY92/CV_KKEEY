/** Local UI regression checks. No real form transport or provider calls. */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=process.cwd(), main=fs.existsSync('agent-os.html');
const base=main?'3ce81a414cd342f1451a3c100eb1c45b18fa7f21':'87d604f5b26b51ee6ceb61df31c22c8cf9d086d3';
const out=path.resolve(process.env.QA_OUT||'output/playwright/architecture');fs.mkdirSync(out,{recursive:true});
const results=[];
async function check(name,fn){try{const details=await fn();results.push({name,status:'PASS',details});}catch(e){results.push({name,status:'FAIL',details:e.message});}console.log(results.at(-1).status,name);}
await check('protected runtime and design files match baseline',async()=>{
 const files=execFileSync('git',['ls-files','js','css/style.css','css/fonts.css','assets']).toString().trim().split('\n').filter(f=>!['js/data.js','js/agent-os-content.js','js/engineering-cases.js'].includes(f));
 for(const f of files)assert.ok(fs.readFileSync(f).equals(execFileSync('git',['show',`${base}:${f}`],{maxBuffer:64*1024*1024})),f);
 return `${files.length} runtime/design/asset files unchanged`;
});
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.pdf':'application/pdf','.json':'application/json'};
const server=http.createServer((req,res)=>{try{const url=new URL(req.url,'http://localhost');const f=path.resolve(root,'.'+(url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname)));if(!f.startsWith(root+path.sep))throw Error('path');res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.statusCode=404;res.end('Not found');}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
const pages=main?['index.html','agent-os.html']:['index.html'];
const errors=[],bad=[];
async function context(options={}){
 const c=await browser.newContext(options);
 await c.route('**/*',r=>{const u=r.request().url();return u.startsWith(origin)||u.startsWith('data:')?r.continue():r.abort();});
 c.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)bad.push(r.url());});});
 return c;
}
function overflow(page){return page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));}
for(const file of pages){
 await check(`${file}: five languages × three widths × themes/palettes`,async()=>{
  let combinations=0;
  const c=await context({reducedMotion:'reduce'});const p=await c.newPage();
  for(const language of ['de','en','fr','uk','pl']){
   await p.goto(origin+'/'+file);
   await p.evaluate(l=>localStorage.setItem(document.getElementById('overviewGrid')?'kkit_lang':'kk_lang',l),language);await p.reload();
   await p.waitForFunction(l=>document.documentElement.lang===l,language);
   if(file==='index.html'&&main){await p.locator('[data-case-select="3"]').click();assert.equal(await p.locator('#engineering-contextnexus').getAttribute('lang'),language);}
   if(file==='index.html'&&!main)assert.equal(await p.locator('.engineering-context-link a').getAttribute('href'),'https://kkeey.dev/#engineering-contextnexus');
   if(file==='agent-os.html'){
    const text=await p.locator('#system-boundaries').innerText();for(const term of ['Agent OS','ContextNexus','Bridge M4','Aria','Claire','Persona OS','Job-Scout','69'])assert.ok(text.includes(term),term);
    assert.equal(await p.locator('.os-department').count(),7);
   }
   for(const width of [390,768,1440]){
    await p.setViewportSize({width,height:900});
    for(let theme=0;theme<2;theme++){
     for(let accent=0;accent<2;accent++){
      const m=await overflow(p);assert.ok(m.scroll<=m.width,JSON.stringify({file,language,theme,accent,...m}));
      assert.ok(await p.locator('footer').isVisible());
      combinations++;
      await p.locator('#colorToggle').click();
     }
     await p.locator('#darkToggle').click();
    }
   }
  }
  await c.close();return `${combinations} combinations; content present, footer reachable, no horizontal overflow`;
 });
}
await check('main case navigation or compact IT link, keyboard and deep links',async()=>{
 const c=await context({reducedMotion:'reduce',viewport:{width:390,height:844}}),p=await c.newPage();
 await p.goto(origin+(main?'/#engineering-contextnexus':'/'));
 if(main){
  assert.ok(await p.locator('#engineering-contextnexus').isVisible());
  assert.equal(await p.locator('[data-case-select]').count(),4);
  for(let i=0;i<3;i++){await p.locator(`[data-case-select="${i}"]`).click();assert.equal(await p.locator('[data-case-panel]:visible').count(),1);assert.ok((await p.locator('[data-case-panel]:visible .case-note').innerText()).trim());}
  await p.locator('[data-case-select="3"]').focus();await p.keyboard.press('Enter');
  const summaries=p.locator('#engineering-contextnexus summary');
  await summaries.nth(0).focus();await p.keyboard.press('Enter');
  await summaries.nth(1).focus();await p.keyboard.press('Space');
  assert.equal(await p.locator('#engineering-contextnexus details[open]').count(),2);
  assert.equal(await summaries.nth(1).evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  await p.screenshot({path:path.join(out,'context-mobile-keyboard.png')});
 }else{assert.equal(await p.locator('.engineering-teaser').count(),3);assert.equal(await p.locator('.engineering-context-link a').count(),1);}
 await p.locator('#hamburger').click();assert.equal(await p.locator('#hamburger').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('#hamburger').getAttribute('aria-expanded'),'false');
 await c.close();return 'case selection/deep-link contract, native disclosures and Escape menu verified';
});
if(main)await check('touch disclosure interaction and seven department controls',async()=>{
 const c=await context({hasTouch:true,isMobile:true,viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await c.newPage();
 await p.goto(origin+'/#engineering-contextnexus');await p.locator('#engineering-contextnexus summary').nth(2).tap();assert.ok(await p.locator('#engineering-contextnexus details').nth(2).evaluate(e=>e.open));
 await p.goto(origin+'/agent-os.html');
 for(let i=0;i<7;i++){const b=p.locator('.os-department').nth(i);await b.tap();assert.equal(await b.getAttribute('aria-pressed'),'true');assert.ok((await p.locator('#os-agent-list').innerText()).trim());}
 await p.locator('.os-department').nth(0).focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.os-department[aria-pressed="true"]').count(),1);
 await c.close();return 'emulated touch only; physical iPhone remains a separate acceptance';
});
await check('static fallback, local resources, anchors and meaningful markup',async()=>{
 const c=await context({javaScriptEnabled:false}),p=await c.newPage();let count=0;
 for(const file of pages){
  await p.goto(origin+'/'+file);
  const refs=await p.locator('a[href],script[src],link[rel="stylesheet"],img[src]').evaluateAll(es=>es.map(e=>e.getAttribute('href')||e.getAttribute('src')).filter(Boolean));
  for(const ref of refs){if(/^[a-z][a-z\d+.-]*:/i.test(ref)||ref.startsWith('//'))continue;const u=new URL(ref,origin+'/'+file);const r=await p.request.get(u.href);assert.ok(r.ok(),ref);if(u.hash&&u.hash!=='#'){const body=await r.text();assert.ok(body.includes(`id="${decodeURIComponent(u.hash.slice(1))}"`),ref);}count++;}
  const ids=await p.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size);
  if(file==='index.html'&&main){assert.equal(await p.locator('#engineering-contextnexus details').count(),4);await p.locator('#engineering-contextnexus summary').first().click();assert.ok(await p.locator('#engineering-contextnexus details').first().evaluate(e=>e.open));}
  if(file==='agent-os.html')assert.ok((await p.locator('#system-boundaries').innerText()).includes('Job-Scout'));
 }
 await c.close();return `${count} local links/resources checked; native fallback works without JS`;
});
await check('WebGL unavailable and screenshots across sizes',async()=>{
 const c=await context({reducedMotion:'reduce'});
 await c.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.includes('webgl')?null:get.call(this,type,...args);};});
 const p=await c.newPage();for(const file of pages){await p.goto(origin+'/'+file);for(const width of [390,768,1440]){await p.setViewportSize({width,height:900});if(main&&file==='index.html')await p.locator('[data-case-select="3"]').click();const target=file==='agent-os.html'?'#system-boundaries':'#engineering';await p.locator(target).scrollIntoViewIfNeeded();assert.ok((await overflow(p)).scroll<=width);await p.screenshot({path:path.join(out,`${file}-${width}-fallback.png`)});}}
 if(main){await p.goto(origin+'/');assert.equal(await p.locator('#signal-field').getAttribute('data-render'),'fallback');}
 await c.close();return 'semantic content/navigation retained without WebGL; screenshots saved';
});
await check('axe WCAG 2.2 AA on touched content, themes and palettes',async()=>{
 const {default:AxeBuilder}=await import(process.env.AXE_MODULE||'@axe-core/playwright');let violations=[];
 const c=await context({reducedMotion:'reduce',viewport:{width:1440,height:1000}}),p=await c.newPage();
 for(const file of pages){await p.goto(origin+'/'+file);if(main&&file==='index.html')await p.locator('[data-case-select="3"]').click();for(let theme=0;theme<2;theme++){for(let accent=0;accent<2;accent++){
  await p.waitForTimeout(600); // Let the existing theme transition settle before contrast measurement.
  const scopes=file==='agent-os.html'?['#system-boundaries','.os-hero']:['#engineering'];
  const builder=new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']);for(const s of scopes)builder.include(s);
  const a=await builder.analyze();violations.push(...a.violations.map(v=>({file,theme,accent,id:v.id,nodes:v.nodes.map(n=>n.target)})));
  await p.locator('#colorToggle').click();}await p.locator('#darkToggle').click();}}
 fs.writeFileSync(path.join(out,'axe.json'),JSON.stringify(violations,null,2));await c.close();assert.equal(violations.length,0,JSON.stringify(violations));return 'zero violations in automated touched-content scope';
});
await check('console and local response errors',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);return 'zero page errors / local HTTP errors; all external requests blocked';});
const version=browser.version();await browser.close();await new Promise(r=>server.close(r));
fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({environment:{browser:version,platform:process.platform,architecture:process.arch,physicalIPhone:'NOT RUN',screenReader:'NOT RUN'},results},null,2));
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
