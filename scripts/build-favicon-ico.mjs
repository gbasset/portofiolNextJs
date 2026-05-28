import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  const images = [];
  let offset = 6 + 16 * count;

  for (const { size, data } of pngBuffers) {
    const entry = Buffer.alloc(16);
    const dimension = size >= 256 ? 0 : size;
    entry.writeUInt8(dimension, 0);
    entry.writeUInt8(dimension, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    images.push(data);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images]);
}

const sizes = [16, 32];
const pngBuffers = sizes.map((size) => ({
  size,
  data: fs.readFileSync(path.join(publicDir, `favicon-${size}.png`)),
}));

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createIco(pngBuffers));
console.log(`favicon.ico written (${pngBuffers.map((p) => p.size).join(', ')}px)`);
