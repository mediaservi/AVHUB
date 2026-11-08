const b=require('@babel/core');const fs=require('fs');
const src=fs.readFileSync('../app.jsx','utf8');
try{b.transformSync(src,{presets:['@babel/preset-react'],filename:'a.jsx'});console.log('COMPILA OK')}catch(e){console.log('ERR',e.message.slice(0,500))}
