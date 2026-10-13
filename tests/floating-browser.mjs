import '../scripts/windows-path-compat.mjs';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import http from 'node:http';
const server=http.createServer((req,res)=>{const file=path.resolve('dist','.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':new URL(req.url,'http://localhost').pathname));if(!file.startsWith(path.resolve('dist')+path.sep)){res.writeHead(403);res.end();return;}try{res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[],errors=[];fs.mkdirSync('test-results',{recursive:true});
async function check(name,fn){await fn();results.push(name);console.log('PASS '+name);}
try{for(const mode of ['static','offline']){
 const context=await browser.newContext({viewport:{width:1440,height:900},serviceWorkers:'block',acceptDownloads:true});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 if(mode==='offline'){await context.setOffline(true);await page.goto(pathToFileURL(path.resolve('offline/Grammar-Teaching-Studio.html')).href);}else await page.goto(origin);
 await page.getByLabel('Open teaching studio').click();await page.locator('main h1').waitFor();
 await check(mode+': two independent bars retain feature selection and keyboard focus',async()=>{
  await page.getByRole('tab',{name:'Compare',exact:true}).click();await page.getByLabel('Minimise grammar feature bar').click();assert.equal(await page.getByLabel('Expand grammar feature bar').evaluate(e=>e===document.activeElement),true);assert.equal(await page.locator('.feature-expanded').evaluate(e=>e.inert),true);await page.getByLabel('Minimise teaching control bar').click();assert.equal(await page.locator('.control-expanded').evaluate(e=>e.inert),true);
  await page.getByLabel('Expand grammar feature bar').focus();await page.keyboard.press('Space');assert.equal(await page.getByRole('tab',{name:'Compare',exact:true}).getAttribute('aria-selected'),'true');assert.equal(await page.locator('.control-expanded').evaluate(e=>e.inert),true);await page.getByLabel('Expand teaching control bar').click();await page.getByRole('tab',{name:'Demonstrate',exact:true}).click();
 });
 await check(mode+': pen and highlighter genuinely draw with exclusive interaction modes',async()=>{
  await page.getByLabel('Draw annotations').click();assert.equal(await page.getByLabel('Draw annotations').getAttribute('aria-pressed'),'true');const box=await page.locator('.whiteboard').boundingBox();assert(box.y+170<(await page.locator('.teaching-canvas').boundingBox()).y+(await page.locator('.teaching-canvas').boundingBox()).height);
  for(const [button,y]of [[null,100],['Highlight annotations',130]]){if(button)await page.getByLabel(button).click();await page.mouse.move(box.x+80,box.y+y);await page.mouse.down();await page.mouse.move(box.x+330,box.y+y,{steps:8});await page.mouse.up();}
  assert.equal(await page.locator('.whiteboard polyline').count(),2);assert.equal(await page.locator('[data-ink=highlight]').getAttribute('opacity'),'0.4');assert.equal(await page.getByLabel('Draw annotations').getAttribute('aria-pressed'),'false');assert.equal(await page.getByLabel('Highlight annotations').getAttribute('aria-pressed'),'true');
 });
 await check(mode+': adjustable circular eraser partially removes both kinds of ink and protects teaching content',async()=>{
  const grammar=await page.locator('.sentence-tokens').innerHTML(),diagram=await page.locator('.timeline svg').innerHTML();await page.getByLabel('Erase annotations').click();assert.equal(await page.getByLabel('Highlight annotations').getAttribute('aria-pressed'),'false');const slider=page.getByLabel('Eraser size');await slider.focus();await page.keyboard.press('Home');for(let i=0;i<18;i++)await page.keyboard.press('ArrowRight');assert.equal(await slider.inputValue(),'48');
  const box=await page.locator('.whiteboard').boundingBox();await page.mouse.move(box.x+200,box.y+70);await page.locator('.eraser-cursor').waitFor();const cursor=await page.locator('.eraser-cursor').evaluate(e=>({width:e.rx.baseVal.value*e.getScreenCTM().a*2,height:e.ry.baseVal.value*e.getScreenCTM().d*2}));assert(Math.abs(cursor.width-48)<1);assert(Math.abs(cursor.height-48)<1);await page.mouse.down();await page.mouse.move(box.x+200,box.y+170,{steps:5});await page.mouse.up();assert.equal(await page.locator('.whiteboard polyline').count(),4);assert.equal(await page.locator('.sentence-tokens').innerHTML(),grammar);assert.equal(await page.locator('.timeline svg').innerHTML(),diagram);
 });
 await check(mode+': erasing, drawing and clearing preserve undo/redo transactions',async()=>{
  await page.getByLabel('Undo annotation').click();assert.equal(await page.locator('.whiteboard polyline').count(),2);await page.getByLabel('Redo annotation').click();assert.equal(await page.locator('.whiteboard polyline').count(),4);await page.getByLabel('Clear annotations').click();assert.equal(await page.locator('.whiteboard polyline').count(),0);await page.getByLabel('Undo annotation').click();assert.equal(await page.locator('.whiteboard polyline').count(),4);await page.getByLabel('Redo annotation').click();assert.equal(await page.locator('.whiteboard polyline').count(),0);await page.getByLabel('Undo annotation').click();
 });
 await check(mode+': collapse keeps active eraser, its size, settings and annotations',async()=>{
  await page.getByLabel('Teaching settings',{exact:true}).click();await page.getByLabel('Playback speed').selectOption('1.5');await page.getByLabel('Minimise teaching control bar').click();assert.equal(await page.locator('.control-expanded').evaluate(e=>e.inert),true);await page.getByLabel('Expand teaching control bar').click();assert.equal(await page.getByLabel('Playback speed').inputValue(),'1.5');assert.equal(await page.getByLabel('Erase annotations').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.whiteboard polyline').count(),4);await page.getByLabel('Close teaching settings').click();assert.equal(await page.getByLabel('Eraser size').inputValue(),'48');
 });
 await check(mode+': real fullscreen contains both bars, including collapsed circles, and all features stay selectable',async()=>{
  await page.getByLabel('Classroom focus mode').click();await page.waitForFunction(()=>document.fullscreenElement?.classList.contains('app'));assert.equal(await page.evaluate(()=>['.feature-float','.control-float'].every(s=>document.fullscreenElement.contains(document.querySelector(s)))),true);await page.getByLabel('Minimise grammar feature bar').click();await page.getByLabel('Minimise teaching control bar').click();for(const label of ['Expand grammar feature bar','Expand teaching control bar'])assert(await page.getByLabel(label).isVisible());await page.getByLabel('Expand grammar feature bar').click();await page.getByLabel('Expand teaching control bar').click();
  for(const name of ['Compare','Sentence builder','Error detective','Practise','Sandbox','Demonstrate']){await page.getByRole('tab',{name,exact:true}).click();assert.equal(await page.getByRole('tab',{name,exact:true}).getAttribute('aria-selected'),'true');}
  await page.getByLabel('Classroom focus mode').click();await page.waitForFunction(()=>!document.fullscreenElement);assert(!(await page.locator('.app').evaluate(e=>e.classList.contains('focus'))));
 });
 await check(mode+': desktop, projector and narrow layouts keep controls unclipped without covering the canvas',async()=>{
  for(const [width,height]of [[1920,1080],[1280,720],[1024,768],[640,800]]){await page.setViewportSize({width,height});await page.waitForTimeout(250);for(const selector of ['.feature-float','.control-float']){const b=await page.locator(selector).boundingBox();assert(b.x>=0&&b.y>=0&&b.x+b.width<=width+1&&b.y+b.height<=height+1,selector+' clipped at '+width);}
   const canvas=await page.locator('.teaching-canvas').boundingBox(),dock=await page.locator('.control-dock').boundingBox();assert(canvas.y+canvas.height<=dock.y+1,'Control bar covered teaching content');assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));if(width===1280)await page.screenshot({path:'test-results/'+mode+'-floating-1280.png',fullPage:true});}
  await page.setViewportSize({width:1440,height:900});await page.getByRole('tab',{name:'Sentence builder',exact:true}).click();const first=page.locator('.builder-tokens button').first(),last=page.locator('.builder-tokens button').last();const before=await page.locator('.builder-tokens strong').allTextContents();await first.dragTo(last);assert.notDeepEqual(await page.locator('.builder-tokens strong').allTextContents(),before);
 });
 await context.close();
}assert.deepEqual(errors,[]);fs.writeFileSync('test-results/floating-results.json',JSON.stringify({status:'passed',tests:results.length,results,errors},null,2));}finally{await browser.close();await new Promise(r=>server.close(r));}
