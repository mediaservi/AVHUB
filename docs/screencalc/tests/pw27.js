const {chromium,devices}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
const tag=process.argv[2]||'a';
(async()=>{const b=await chromium.launch();
 const vps=[['pc1366',{width:1366,height:768},false],['pc1440',{width:1440,height:900},false],['pc1920',{width:1920,height:1080},false],['movV',{width:390,height:844},true],['movH',{width:844,height:390},true]];
 for(const [nm,vp,mob] of vps){
  const ctx=await b.newContext({viewport:vp,isMobile:mob,hasTouch:mob});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
  await p.goto('file:///home/claude/index.html');await p.waitForTimeout(4500);
  const m=await p.evaluate(()=>{const a=document.querySelector('aside.controls-sidebar');const d=a&&a.firstElementChild;return a?{asideH:a.clientHeight,innerScroll:d.scrollHeight,innerClient:d.clientHeight,vis:getComputedStyle(a).display}:null});
  console.log(nm,'manual',JSON.stringify(m));
  await p.screenshot({path:`p3${tag}_${nm}.png`});
  if(errs.length)console.log('errs',errs.join('|'));
  await ctx.close();}
 await b.close()})();
