/* Vigilante del QR (GPL-3.0 · mediaservi.com): prueba el QR impreso como lo haría un móvil y manda el resultado al panel. */
import { chromium } from 'playwright';
const SITIO = 'https://avhub.mediaservi.com', PANEL = 'https://script.google.com/macros/s/AKfycbwkc12y4LODbFe-kQidnR2MbbA6cbW1WbhU3UiqmDmshx-ncAdGYrFRy8PNjm9Wg6Mx3w/exec';
const b = await chromium.launch(), pr = [];
async function prueba(n, conApp) {
  const a = Date.now(), ctx = await b.newContext({ userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36 vigia-qr', viewport: { width: 412, height: 915 } });
  const p = await ctx.newPage();
  await p.route(/script\.google\.com/, r => (r.request().method() === 'POST' && /"t":"stats"/.test(r.request().postData() || '')) ? r.abort() : r.continue());   // el vigilante no suma visitas
  try {
    if (conApp) { await p.goto(SITIO + '/', { waitUntil: 'domcontentloaded' }); await p.evaluate(async () => { await navigator.serviceWorker.register('sw.js'); await navigator.serviceWorker.ready; }); await p.reload({ waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500); }
    await p.goto(SITIO + '/qr?vigia=1', { waitUntil: 'commit', timeout: 20000 });
    await p.waitForURL(u => !u.href.startsWith(SITIO + '/qr'), { timeout: 15000, waitUntil: 'commit' });
    const u = new URL(p.url());
    if (u.protocol !== 'https:') throw new Error('acaba en ' + p.url().slice(0, 100));
    pr.push({ n, ok: true, ms: Date.now() - a, det: 'llega a ' + (u.host + u.pathname).slice(0, 100) });
  } catch (e) { pr.push({ n, ok: false, ms: Date.now() - a, det: String(e.message || e).split('\n')[0].slice(0, 150) }); }
  await ctx.close();
}
await prueba('Chrome · primera visita', false);
await prueba('Chrome · con la app instalada', true);
await b.close();
console.log(pr.map(x => (x.ok ? '✔ ' : '✘ ') + x.n + ' · ' + x.det + ' · ' + x.ms + ' ms').join('\n'));
try { await fetch(PANEL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ t: 'vigia', pr }) }); } catch (e) { console.log('panel: ' + e.message); }
process.exit(pr.every(x => x.ok) ? 0 : 1);
