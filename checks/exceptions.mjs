#!/usr/bin/env node
// 例外计数：统计 CSS 里的 ds-allow 注释、写死的颜色和 px、阶梯外字重，用来追踪 MIGRATION.md 的清理进度。
// 无依赖。用法：
//   node checks/exceptions.mjs <文件或目录…> [--json] [--max-allow N]
// --max-allow N：ds-allow 总数超过 N 时退出码为 1（迁移完成后可在 CI 里收紧）。
import {readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const args = process.argv.slice(2);
const json = args.includes('--json');
const maxIdx = args.indexOf('--max-allow');
const maxAllow = maxIdx >= 0 ? Number(args[maxIdx + 1]) : Infinity;
const targets = args.filter((a, i) => !a.startsWith('--') && !(maxIdx >= 0 && i === maxIdx + 1));
if (!targets.length) {
  console.error('用法：node checks/exceptions.mjs <文件或目录…> [--json] [--max-allow N]');
  process.exit(2);
}

const skip = new Set(['node_modules', '.git', 'fixtures', 'design-system', 'tokens']);
const files = [];
const walk = p => {
  const s = statSync(p);
  if (s.isDirectory()) {
    for (const n of readdirSync(p)) if (!skip.has(n)) walk(join(p, n));
  } else if (/\.css$/.test(p) && !/tokens\.css$/.test(p)) files.push(p);
};
targets.forEach(walk);

const rows = files.map(f => {
  const src = readFileSync(f, 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const noVar = code.replace(/var\([^)]*\)/g, '');
  return {
    file: relative(process.cwd(), f),
    allow: (src.match(/ds-allow/g) || []).length,
    hex: (noVar.match(/#[0-9a-fA-F]{3,8}\b/g) || []).length,
    px: (noVar.match(/(?<![\w-])[1-9]\d*(?:\.\d+)?px\b/g) || []).length,
    weight: (code.match(/font-weight\s*:\s*(?:[6-9]00|bold)|font\s*:\s*(?:[6-9]00|bold)\b/g) || []).length,
  };
}).filter(r => r.allow + r.hex + r.px + r.weight > 0);

const total = rows.reduce((t, r) => ({allow: t.allow + r.allow, hex: t.hex + r.hex, px: t.px + r.px, weight: t.weight + r.weight}), {allow: 0, hex: 0, px: 0, weight: 0});

if (json) {
  console.log(JSON.stringify({total, files: rows}, null, 1));
} else {
  const pad = (s, n) => String(s).padStart(n);
  console.log('ds-allow  hex   px  w600+  file');
  for (const r of rows.sort((a, b) => b.allow - a.allow)) console.log(`${pad(r.allow, 8)} ${pad(r.hex, 4)} ${pad(r.px, 4)} ${pad(r.weight, 6)}  ${r.file}`);
  console.log(`${pad(total.allow, 8)} ${pad(total.hex, 4)} ${pad(total.px, 4)} ${pad(total.weight, 6)}  合计（${files.length} 个 CSS 文件）`);
}
if (total.allow > maxAllow) {
  console.error(`ds-allow 共 ${total.allow} 处，超过上限 ${maxAllow}`);
  process.exit(1);
}
