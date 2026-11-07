const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
(async()=>{const b=await chromium.launch();
 for(const [l,vw,vh,mob] of [['eu',1440,900,false],['ca',390,844,true],['en',1366,768,false]]){
 const ctx=await b.newContext({viewport:{width:vw,height:vh},isMobile:mob,hasTouch:mob});await ctx.addInitScript(x=>{try{localStorage.setItem('screencalc_lang',x)}catch(e){}},l);
 const p=await ctx.newPage();p.setDefaultTimeout(8000);
 await p.route('**/ORIGEN_CATALOGO_PRIVADO/**',r=>r.fulfill({contentType:'text/csv',body:fs.readFileSync('modelos.csv','utf8')}));
 await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
 await p.goto('file:///home/claude/index.html');await p.waitForTimeout(4000);
 await p.locator('textarea').first().fill(l==='ca'?"pantalla 4K d'interior":'indoor 4K screen');
 await p.locator('button').filter({hasText:/PROPONER|PROPOSE|PROPOSAR|PROPOSATU/}).first().click();await p.waitForTimeout(700);
 for(let i=0;i<14;i++){const q=p.locator('input[name=nlq]');if(!(await q.count()))break;await q.first().check();await p.locator('button').filter({hasText:/^(ENVIAR|SEND|BIDALI)$/}).first().click();await p.waitForTimeout(300);}
 await p.waitForTimeout(2500);await p.screenshot({path:`sh_${l}.png`});
 if(!mob){await p.screenshot({path:`shf_${l}.png`,fullPage:true})}
 const m=await p.evaluate(()=>{const a=document.querySelector('aside.controls-sidebar');const d=a&&a.firstElementChild;return a?{asideH:a.clientHeight,innerScroll:d.scrollHeight,innerClient:d.clientHeight}:null});console.log(l,JSON.stringify(m));
 await ctx.close();}
 await b.close()})();
