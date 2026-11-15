const {chromium}=require('playwright');const fs=require('fs');
const css=fs.readFileSync('tw/out.css','utf8');
(async()=>{const b=await chromium.launch();
 for(const modo of ['lite','completo']){
 const p=await (await b.newContext({viewport:{width:1400,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/cdn.tailwindcss.com/**',r=>r.fulfill({contentType:'application/javascript',body:`window.tailwind={};var s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s);`}));
 await p.goto('file:///home/claude/index.html');await p.waitForTimeout(5000);
 const ta=p.locator('textarea').first();
 await ta.fill('pantalla exterior alquiler 600x250cm pitch 2.5 con electronica y mediaserver');await ta.press('Enter');await p.waitForTimeout(600);
 for(let i=0;i<14;i++){const q=p.locator('label input[name=nlq]');if(!(await q.count()))break;await q.first().check();await p.getByRole('button',{name:'ENVIAR'}).click();await p.waitForTimeout(300);}
 await p.waitForTimeout(3000);
 console.log(modo,'esquema?',await p.locator('.esquema-sec').count());
 await p.evaluate(()=>{window.print=()=>{}});
 await p.locator('header button',{hasText:'PDF'}).first().click();await p.waitForTimeout(400);
 if(modo==='completo'&&await p.getByText('PDF CABLEADO').count())await p.getByText('PDF CABLEADO').first().click();else if(await p.getByText('PDF PANTALLA').count())await p.getByText('PDF PANTALLA').first().click();
 await p.waitForTimeout(1200);
 await p.emulateMedia({media:'print'});
 await p.pdf({path:'v416_'+modo+'.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
 console.log('errs',errs.join('|')||'none');await p.close();}
 await b.close()})();
