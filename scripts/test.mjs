import './windows-path-compat.mjs';
import {build} from 'esbuild';
import fs from 'node:fs';
fs.mkdirSync('test-results',{recursive:true});
await build({entryPoints:['tests/engine.test.ts'],bundle:true,platform:'node',format:'esm',outfile:'test-results/engine.test.mjs'});
await import('../test-results/engine.test.mjs');
