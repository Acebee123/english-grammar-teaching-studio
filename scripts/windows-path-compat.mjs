// Some restricted Windows hosts reject the native async realpath API even
// when ordinary file reads and synchronous path resolution are permitted.
// Use Node's synchronous resolver under the same filesystem permissions.
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
if(process.platform==='win32'){
 const resolve=fs.realpathSync;
 fs.realpathSync.native=resolve;
 fs.promises.realpath=async(p,options)=>resolve(p,options);
 const callback=(p,options,cb)=>{if(typeof options==='function'){cb=options;options=undefined;}try{const r=resolve(p,options);queueMicrotask(()=>cb(null,r));}catch(e){queueMicrotask(()=>cb(e));}};
 fs.realpath=callback;fs.realpath.native=callback;
 syncBuiltinESMExports();
}
