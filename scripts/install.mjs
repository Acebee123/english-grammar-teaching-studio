import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const bundled = 'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pnpm/bin/pnpm.cjs';
const args=['install','--ignore-scripts','--pm-on-fail=ignore','--config.node-linker=hoisted','--config.enable-global-virtual-store=false','--store-dir','.sites-runtime/pnpm-store'];
const env={...process.env,NODE_OPTIONS:(process.env.NODE_OPTIONS??'')+' --import "'+pathToFileURL(path.resolve('scripts/windows-path-compat.mjs')).href+'"'};
const r = existsSync(bundled) ? spawnSync(process.execPath,[bundled,...args],{stdio:'inherit',env}) : spawnSync('pnpm',args,{stdio:'inherit',env,shell:process.platform==='win32'});
process.exit(r.status??1);



