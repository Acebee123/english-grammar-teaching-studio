import {spawn} from 'node:child_process';
const p=spawn(process.execPath,['--import','./scripts/windows-path-compat.mjs','node_modules/vite/bin/vite.js','--host','127.0.0.1'],{stdio:'inherit'});
p.on('exit',c=>process.exit(c??0));
