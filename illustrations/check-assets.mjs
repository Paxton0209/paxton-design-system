import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const { assets } = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
const figures = JSON.parse(fs.readFileSync(path.join(root, 'source/figures.json'), 'utf8'));
const ids = new Set();
for (const asset of assets) {
  if (ids.has(asset.id)) throw new Error('Duplicate asset: ' + asset.id);
  ids.add(asset.id);
  const file = path.resolve(root, asset.file);
  if (!file.startsWith(root + path.sep)) throw new Error('Asset outside illustration directory');
  const bytes = fs.readFileSync(file);
  if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Expected PNG: ' + asset.id);
  if (bytes.readUInt32BE(16) !== asset.width || bytes.readUInt32BE(20) !== asset.height) throw new Error('Size mismatch: ' + asset.id);
  if (crypto.createHash('sha256').update(bytes).digest('hex') !== asset.sha256) throw new Error('Hash mismatch: ' + asset.id);
  if (asset.editableSource && !Object.hasOwn(figures, asset.id)) throw new Error('Missing editable source: ' + asset.id);
}
console.log(`Illustration assets: ${assets.length} PNGs verified; ${Object.keys(figures).length} editable compositions available.`);
