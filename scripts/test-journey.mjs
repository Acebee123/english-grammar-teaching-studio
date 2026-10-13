import './windows-path-compat.mjs';
import {build} from 'esbuild';
await build({entryPoints:['tests/journey.test.ts'],bundle:true,platform:'node',format:'esm',outfile:'test-results/journey.test.mjs'});
await import('../test-results/journey.test.mjs');
