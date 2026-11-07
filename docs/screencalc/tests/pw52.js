const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
const L=(...a)=>console.log(new Date().toISOString().slice(17,23),...a);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
 p.setDefaultTimeout(8000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/ORIGEN_CATALOGO_PRIVADO/**',r=>r.fulfill({contentType:'text/csv',body:fs.readFileSync('modelos.csv','utf8')}));
 await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
 await p.goto('file:///home/claude/index.html');await p.waitForTimeout(4000);L('cargada');
 await p.locator('textarea').first().fill(process.argv[2]||'pantalla 4K de interior');L('escrito');
 await p.getByRole('button',{name:/PROPONER/}).click();L('click');
 await p.waitForTimeout(800);
 for(let i=0;i<14;i++){const q=p.locator('input[name=nlq]');const n=await q.count();const tx=await p.evaluate(()=>{const e=[...document.querySelectorAll('.popup-fondo, div')].filter(d=>d.querySelector('input[name=nlq]')).pop();return e?e.innerText.split('\n').slice(0,3).join(' / '):''});L('opciones',n,tx.slice(0,110));if(!n)break;
   await q.first().check();await p.getByRole('button',{name:'ENVIAR'}).click();await p.waitForTimeout(400);}
 await p.waitForTimeout(3000);
 const t=await p.evaluate(()=>document.body.innerText);L((t.match(/PANTALLA LED[^\n]*/)||[])[0]);L('errs',errs.slice(0,3));
 await p.screenshot({path:'e52.png'});await p.setViewportSize({width:390,height:844});await p.waitForTimeout(800);await p.screenshot({path:'e52m.png'});await b.close()})();
