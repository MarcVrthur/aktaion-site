/* ==========================================================================
   AKTAION V2 — générateur statique
   Usage : node _source/build.mjs
   ========================================================================== */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pages } from './pages.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

await mkdir(root, { recursive: true });

for (const page of pages) {
  const target = resolve(root, page.file);
  await writeFile(target, page.html, 'utf8');
  const kb = (Buffer.byteLength(page.html, 'utf8') / 1024).toFixed(1);
  console.log(`✓ ${page.file.padEnd(22)} ${kb} Ko`);
}

console.log(`\n${pages.length} pages générées dans ${root}`);
