(function(){
var LANGS=['es','en','ca','gl','eu','pt'];
var ROWS=__ROWS__;
var cur='es',maps={},regs={},cache={};
function nk(s){return s.replace(/\s+/g,' ');}
function esc(s){return s.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&').replace(/ /g,'\\s+');}
function isW(c){return /[\p{L}\p{N}]/u.test(c);}
function build(l){
  var i=LANGS.indexOf(l),map=Object.create(null),exact=Object.create(null);
  function add(a,b){a=nk(a);if(!a||b==null)return;if(!(a in map))map[a]=b;}
  ROWS.forEach(function(r){
    var es=r[0],t=r[i];
    if(es.charAt(0)==='^'){exact[nk(es.slice(1))]=t;return;}
    add(es,t);
    var u=es.toUpperCase(),tu=t.toUpperCase();if(u!==es)add(u,tu);
    var c=es.charAt(0);
    if(c!==c.toLowerCase()&&c===c.toUpperCase()&&es.length>3&&es.toUpperCase()!==es){
      var lf=c.toLowerCase()+es.slice(1),tc=t.charAt(0);
      add(lf,tc.toLowerCase()+t.slice(1));
    }
  });
  var keys=Object.keys(map).sort(function(a,b){return b.length-a.length;});
  var parts=keys.map(function(k){
    var a=isW(k.charAt(0))?'(?<![\\p{L}\\p{N}])':'',z=isW(k.charAt(k.length-1))?'(?![\\p{L}\\p{N}])':'';
    return a+esc(k)+z;});
  maps[l]={map:map,exact:exact,re:parts.length?new RegExp(parts.join('|'),'gu'):null};
}
function tr(s,l){
  l=l||cur;if(l==='es'||!s)return s;
  var ck=l+'\u0001'+s;if(ck in cache)return cache[ck];
  if(!maps[l])build(l);
  var M=maps[l],lead=s.match(/^\s*/)[0],trail=s.match(/\s*$/)[0],core=s.trim(),out;
  if(core===''){out=s;}
  else{
    var n=nk(core);
    if(n in M.exact)out=lead+M.exact[n]+trail;
    else if(!M.re)out=s;
    else{M.re.lastIndex=0;out=s.replace(M.re,function(m){var k=nk(m);return k in M.map?M.map[k]:m;});}
  }
  cache[ck]=out;return out;
}
