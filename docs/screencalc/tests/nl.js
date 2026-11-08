const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
(async()=>{const b=await chromium.launch();
 const cases=[['en','indoor 4K screen'],['ca',"pantalla 4K d'interior"],['gl','pantalla 4K de interior'],['eu','barruko 4K pantaila'],['pt','ecrã 4K de interior'],
  ['en','outdoor rental screen 6 by 2 meters pitch 3.9 readable from 8 m'],['eu','kanpoko alokairuko pantaila 6x2 metro pitch 3.9']];
 for(const [l,txt] of cases){
 const ctx=await b.newContext({viewport:{width:1440,height:900}});await ctx.addInitScript(x=>{try{localStorage.setItem('screencalc_lang',x)}catch(e){}},l);
 const p=await ctx.newPage();p.setDefaultTimeout(8000);
 await p.route('**/ORIGEN_CATALOGO_PRIVADO/**',r=>r.fulfill({contentType:'text/csv',body:fs.readFileSync('modelos.csv','utf8')}));
 await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
 await p.goto('file:///home/claude/index.html');await p.waitForTimeout(4000);
 await p.locator('textarea').first().fill(txt);
 await p.locator('button').filter({hasText:/PROPONER|PROPOSE|PROPOSAR|PROPOÑER|PROPOSATU|PROPOR/}).first().click();await p.waitForTimeout(700);
 const qs=[];
 for(let i=0;i<14;i++){const q=p.locator('input[name=nlq]');if(!(await q.count()))break;
  const tx=await p.evaluate(()=>{const e=[...document.querySelectorAll('div')].filter(d=>d.querySelector('input[name=nlq]')).pop();return e?e.innerText.split('\n').slice(0,2).join(' | '):''});qs.push(tx.slice(0,100));
  await q.first().check();await p.locator('button').filter({hasText:/^(ENVIAR|SEND|BIDALI)$/}).first().click();await p.waitForTimeout(300);}
 await p.waitForTimeout(2500);
 const t=await p.evaluate(()=>document.body.innerText);
 console.log('##',l,txt);console.log(' Q1:',qs[0]);console.log(' n preguntas',qs.length);console.log(' =>',((t.match(/(PANTALLA LED|LED SCREEN|PANTALLA LED|LED PANTAILA|ECRÃ LED)[^\n]*/)||[])[0]||'(sin resultado)').slice(0,170));
 await ctx.close();}
 await b.close()})();
