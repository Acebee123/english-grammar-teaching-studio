import {spawnSync} from 'node:child_process';
for(const args of [['node_modules/typescript/bin/tsc','--noEmit'],['node_modules/vite/bin/vite.js','build'],['scripts/offline.mjs']]){const r=spawnSync(process.execPath,['--import','./scripts/windows-path-compat.mjs',...args],{stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);}
