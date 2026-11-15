import json
rows=[]
for f in ['d1.txt','d2.txt','d3.txt','d4.txt','d5.txt','d6.txt']:
    for ln in open(f,encoding='utf-8').read().split('\n'):
        if not ln.strip(): continue
        p=ln.split('|')
        if len(p)!=6: print('BAD',len(p),ln[:80]); continue
        rows.append(p)
js=open('engine_head.js',encoding='utf-8').read().replace('__ROWS__',json.dumps(rows,ensure_ascii=False))+open('engine_tail.js',encoding='utf-8').read()
open('engine.js','w',encoding='utf-8').write(js)
print(len(rows),len(js))
