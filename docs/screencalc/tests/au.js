const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
const lang=process.argv[2]||'en';const txtIn=process.argv[3]||'pantalla exterior alquiler 600x250 pitch 2.5 con electronica con backup con escalador mediaserver novastar con dante';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900}});
 await ctx.addInitScript(l=>{try{localStorage.setItem('screencalc_lang',l)}catch(e){}},lang);
 const p=await ctx.newPage();p.setDefaultTimeout(8000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/ORIGEN_CATALOGO_PRIVADO/**',r=>r.fulfill({contentType:'text/csv',body:fs.readFileSync('modelos.csv','utf8')}));
 await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
 await p.goto('file:///home/claude/index.html');await p.waitForTimeout(4500);
 const all=new Set();
 const snap=async()=>{const a=await p.evaluate(()=>{const o=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const pn=n.parentNode.nodeName;if(['SCRIPT','STYLE'].includes(pn))continue;const t=n.nodeValue.replace(/\s+/g,' ').trim();if(t)o.push(t)}document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(e=>{['title','placeholder','aria-label'].forEach(k=>{const v=e.getAttribute(k);if(v)o.push('@'+v)})});return o});a.forEach(x=>all.add(x));return a};
 await snap();
 const dl=p.locator('button[aria-label*="escarg"],button[aria-label*="ownload"],header .hdr-btn').nth(1);
 try{await dl.click();await p.waitForTimeout(300);await snap();await p.getByRole('button').filter({hasText:/CANCEL|UTZI|CANCEL·LAR/}).first().click();}catch(e){console.log('dl',e.message.slice(0,60))}
 await p.locator('textarea').first().fill(txtIn);
 await p.locator('button.bg-corp-teal, button').filter({hasText:/PROPONER|PROPOSE|PROPOSAR|PROPOÑER|PROPOSATU|PROPOR/}).first().click();await p.waitForTimeout(800);await snap();
 for(let i=0;i<16;i++){const q=p.locator('input[name=nlq]');if(!(await q.count()))break;await q.first().check();await p.locator('button').filter({hasText:/^(ENVIAR|SEND|BIDALI)$/}).first().click();await p.waitForTimeout(350);await snap();}
 await p.waitForTimeout(3000);await snap();
 const tab=p.locator('button').filter({hasText:/SOLO LÍNEA|LINE ONLY|NOMÉS|SÓ LIÑA|LINEA SOILIK|APENAS/});
 for(const t of ['PDF','⚙']){}
 try{await p.locator('button').filter({hasText:/SIMULAR|SIMULATE|SIMULAR|SIMULATU/}).first().click();await p.waitForTimeout(500);await snap();}catch(e){console.log('sim',e.message.slice(0,50))}
 const es=/[áéíóúñ¿¡ÁÉÍÓÚÑ]|\b(el|la|los|las|de|del|con|sin|para|por|una?|que|se|es|en|al|pantalla|mantenimiento|resolución|cabinet|más|desde|hasta|necesari\w*)\b/i;
 const bad=[...all].filter(x=>es.test(x)&&!/^(\d|[A-Z0-9\- ]+$)/.test(x));
 console.log('TOTAL',all.size,'SOSPECHOSOS',bad.length);bad.forEach(x=>console.log(' -',x.slice(0,150)));
 console.log('errs',errs.slice(0,3));fs.writeFileSync('au_'+lang+'.json',JSON.stringify([...all]));await b.close()})();
