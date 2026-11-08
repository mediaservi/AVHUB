/* ---------- DOM ---------- */
var oT=new WeakMap(),lT=new WeakMap(),oA=new WeakMap();
var ATTRS=['title','placeholder','aria-label','alt'];
function skip(n){var p=n.parentNode;if(!p||p.nodeType!==1)return true;var t=p.nodeName;
  if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='NOSCRIPT')return true;
  return !!(p.closest&&p.closest('[data-notr]'));}
function doText(n){
  if(skip(n))return;var v=n.nodeValue,o;
  if(lT.has(n)&&lT.get(n)===v)o=oT.get(n);else{o=v;oT.set(n,v);}
  var t=cur==='es'?o:tr(o);if(t!==v)n.nodeValue=t;lT.set(n,t);}
function doAttr(el){
  if(el.closest&&el.closest('[data-notr]'))return;
  var rec=oA.get(el);if(!rec){rec={};oA.set(el,rec);}
  ATTRS.forEach(function(a){
    if(!el.hasAttribute(a))return;var v=el.getAttribute(a),r=rec[a],o;
    if(r&&r.l===v)o=r.o;else o=v;
    var t=cur==='es'?o:tr(o);if(t!==v)el.setAttribute(a,t);rec[a]={o:o,l:t};});}
function walk(root){
  if(!root)return;
  if(root.nodeType===3){doText(root);return;}
  if(root.nodeType!==1)return;
  doAttr(root);
  var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null),n;
  while((n=w.nextNode())){n.nodeType===3?doText(n):doAttr(n);}
}
var mo=null;
function start(){
  if(mo||!document.body)return;
  mo=new MutationObserver(function(ms){
    for(var i=0;i<ms.length;i++){var m=ms[i];
      if(m.type==='characterData')doText(m.target);
      else if(m.type==='attributes')doAttr(m.target);
      else m.addedNodes.forEach(walk);}
  });
  mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});
}
function set(l){
  if(LANGS.indexOf(l)<0)l='es';cur=l;
  try{document.documentElement.lang=l;}catch(e){}
  start();walk(document.body);
}
/* ---------- Lenguaje natural: normaliza la petición a vocabulario castellano ---------- */
function plain(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/·/g,'');}
var UN=function(w){return new RegExp('\\b(?:'+w+')\\b','g');};
var LEX={
 en:[[UN('meters?|metres?|mtrs?'),'metros'],[UN('centimet(?:er|re)s?'),'cm'],[UN('millimet(?:er|re)s?'),'mm'],
  [/(\d)\s*(m|cm|mm|metros)?\s*(?:by|x)\s*(\d)/g,'$1$2 x $3'],
  [UN('wide|width|across'),'ancho'],[UN('height|high|tall'),'alto'],
  [UN('indoors?|inside|inner'),'interior'],[UN('outdoors?|outside|open air'),'exterior'],
  [UN('shop windows?|storefront|display window|window display'),'escaparate'],[UN('street|facade'),'calle'],
  [UN('rentals?|rent|hire|hired|events?|stage|concerts?|festival|touring|tour|temporary|trade show|fair'),'alquiler'],
  [UN('fixed|permanent(?:ly)?|installation|installed'),'instalacion'],
  [UN('pixel pitch'),'pitch'],[UN('viewed from|viewing distance|view distance|distance'),'distancia'],
  [UN('at'),'a'],[UN('from'),'desde'],[UN('up to|until'),'hasta'],
  [UN('without|w\\/o|no'),'sin'],[UN('electronics?|controller|control system'),'electronica'],[UN('turnkey|turn-key'),'llave en mano'],
  [UN('redundan(?:cy|t)'),'backup'],[UN('fib(?:er|re)|optical'),'fibra'],[UN('direct'),'directo'],[UN('network cable|ethernet'),'rj45'],
  [UN('media server'),'mediaserver'],[UN('sources'),'fuentes'],
  [UN('protected|protection'),'protegido'],[UN('public'),'publico'],[UN('kids|children'),'ninos'],[UN('knocks|bumps|impacts'),'golpes'],[UN('touch'),'tactil'],
  [UN('sea|seaside|coast(?:al)?|beach|humid(?:ity)?|salty|marine'),'marino']],
 ca:[[UN('metres?'),'metros'],[UN('amplada|ample'),'ancho'],[UN('alcada|alt|altura'),'alto'],[/(\d)\s*(m|cm|mm|metros)?\s*per\s*(\d)/g,'$1$2 x $3'],
  [UN('aparador|escaparat'),'escaparate'],[UN('carrer'),'calle'],
  [UN('lloguer|esdeveniments?|concerts?|escenari|gira|temporal|fira'),'alquiler'],
  [UN('installacio|instal\\w*|fixa|fix|permanent'),'instalacion'],[UN('des de|a partir de'),'desde'],[UN('fins a'),'hasta'],[UN('sense'),'sin'],
  [UN('entrades'),'entradas'],[UN('fonts'),'fuentes'],[UN('xarxa'),'red'],[UN('clau en ma'),'llave en mano'],
  [UN('protegit|protegida'),'protegido'],[UN('public'),'publico'],[UN('vandalisme'),'vandalismo'],[UN('nens'),'ninos'],
  [UN('humitat'),'humedad'],[UN('platja'),'playa'],[UN('salobre'),'salin']],
 gl:[[UN('rua'),'calle'],[UN('aluguer|aluguel|eventos?|concertos?|palco|xira|feira|temporal'),'alquiler'],
  [UN('fixo|fixa|permanente'),'instalacion'],[UN('ata'),'hasta'],[UN('sen'),'sin'],[UN('fontes'),'fuentes'],[UN('rede'),'red'],
  [UN('chave en man'),'llave en mano'],[UN('protexid[oa]'),'protegido'],[UN('vandalismo'),'vandalismo'],[UN('nenos'),'ninos'],
  [UN('humidade'),'humedad'],[UN('praia'),'playa']],
 pt:[[UN('eletronica'),'electronica'],[UN('largura|largo|comprimento'),'ancho'],[UN('rua'),'calle'],[UN('montra|vitrine|vitrina'),'escaparate'],
  [UN('aluguer|aluguel|locacao|eventos?|concertos?|palco|digressao|feira|temporari[oa]'),'alquiler'],
  [UN('instalacao|instalar|fixo|fixa|permanente'),'instalacion'],[UN('a partir de'),'desde'],[UN('ate'),'hasta'],[UN('sem'),'sin'],
  [UN('fontes'),'fuentes'],[UN('rede'),'red'],[UN('chave na mao'),'llave en mano'],[UN('criancas'),'ninos'],[UN('tatil'),'tactil'],
  [UN('humidade'),'humedad'],[UN('praia'),'playa'],[UN('salgado'),'salin']],
 eu:[[UN('zabalera|zabal\\w*'),'ancho'],[UN('altuera|altu\\w*|garai\\w*'),'alto'],
  [/(\d+(?:[.,]\d+)?)\s*(?:metro|m)\w*(?:-?(?:ra|tik|tara|tatik))\b/g,'a $1 m'],[UN('metro\\w*'),'metros'],
  [UN('kanpoko|kanpoan|kanpoaldeko|kanpo\\w*'),'exterior'],[UN('barruko|barruan|barrualdeko|barru\\w*'),'interior'],
  [UN('erakusleiho\\w*'),'escaparate'],[UN('kale\\w*'),'calle'],
  [UN('alokairu\\w*|ekitaldi\\w*|kontzertu\\w*|oholtza\\w*|bira\\w*|aldi baterako'),'alquiler'],
  [UN('instalazio\\w*|finko\\w*|iraunkor\\w*'),'instalacion'],[UN('distantzia\\w*'),'distancia'],
  [UN('eskalatzaile\\w*|eskaladore\\w*'),'escalador'],[UN('elektronika\\w*'),'electronica'],[UN('zuntz\\w*'),'fibra'],
  [UN('sarrera\\w*'),'entradas'],[UN('iturri\\w*'),'fuentes'],[UN('kable\\w*'),'cable'],[UN('giltza eskuko|giltza eskura'),'llave en mano'],
  [UN('babestu\\w*'),'protegido'],[UN('publiko\\w*'),'publico'],[UN('hezetasun\\w*|heze\\w*'),'humedad'],[UN('itsaso\\w*'),'mar'],
  [UN('kostalde\\w*'),'costa'],[UN('hondartza\\w*'),'playa'],[/(\S+)\s+gabe\b/g,'sin $1']]
};
function normNL(raw,l){
  l=l||cur;var s=plain(raw);if(l==='es')return raw;
  var lists=[LEX[l]||[]];if(l!=='en')lists.push(LEX.en);
  lists.forEach(function(L){L.forEach(function(p){s=s.replace(p[0],p[1]);});});
  return s;
}
var SR={es:'es-ES',en:'en-US',ca:'ca-ES',gl:'gl-ES',eu:'eu-ES',pt:'pt-PT'};
var WH={es:'spanish',en:'english',ca:'catalan',gl:'galician',eu:'basque',pt:'portuguese'};
window.SC_I18N={set:set,tr:tr,normNL:normNL,lang:function(){return cur;},srLang:function(){return SR[cur]||'es-ES';},whLang:function(){return WH[cur]||'spanish';},LANGS:LANGS};
})();
