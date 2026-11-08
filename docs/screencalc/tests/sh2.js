const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
(async()=>{const b=await chromium.launch();
 for(const [n,vw,vh,mob] of [['m',390,844,true],['d',1440,900,false],['s',1366,768,false]]){
 const ctx=await b.newContext({viewport:{width:vw,height:vh},isMobile:mob,hasTouch:mob,deviceScaleFactor:2});
 const p=await ctx.newPage();
 await p.route('**/ORIGEN_CATALOGO_PRIVADO/**',r=>r.fulfill({contentType:'text/csv',body:fs.readFileSync('modelos.csv','utf8')}));
 await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
 await p.goto('file:///home/claude/index.html');await p.waitForTimeout(4000);
 await p.locator('textarea').first().fill('pantalla 4K de interior');
 await p.screenshot({path:`in_${n}.png`,clip:{x:0,y:0,width:Math.min(vw,480),height:330}});
 const m=await p.evaluate(()=>{const a=document.querySelector('aside.controls-sidebar');const d=a&&a.firstElementChild;return a&&d?[a.clientHeight,d.scrollHeight]:null});console.log(n,m);
 await ctx.close()}
 await b.close()})();
