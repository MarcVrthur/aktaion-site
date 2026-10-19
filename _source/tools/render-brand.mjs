/* Rasterise the official Aktaion symbol into app icons and a social card.
   One-off build tool: Playwright is not a runtime dependency of the site. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/marca/node_modules/playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const imageRoot = path.join(root, 'assets', 'img');
const symbolSource = fs.readFileSync(path.join(imageRoot, 'brand', 'aktaion-symbol.svg'), 'utf8');
const symbolPath = symbolSource.match(/<path[^>]*\/>/)?.[0];
if (!symbolPath) throw new Error('Official symbol path not found');

const symbol = (color = '#fff', size = 320) =>
  `<svg viewBox="0 0 512 512" width="${size}" height="${size}" fill="${color}" aria-hidden="true">${symbolPath}</svg>`;

const iconDocument = (size) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  html,body{margin:0;width:${size}px;height:${size}px;background:#e90130;overflow:hidden}
  .icon{width:100%;height:100%;display:grid;place-items:center;background:#e90130;color:#fff}
  .icon svg{width:${Math.round(size * 0.74)}px;height:${Math.round(size * 0.74)}px}
</style></head><body><div class="icon">${symbol('#fff', Math.round(size * 0.74))}</div></body></html>`;

const ogDocument = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#e90130}
  body{font-family:"Lexend Deca",ui-sans-serif,system-ui,sans-serif;color:#fff}
  .og{position:relative;width:100%;height:100%;padding:56px 64px 44px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
  .og::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.14) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.14) 1px,transparent 1px);background-size:60px 60px}
  .og::after{content:"";position:absolute;width:620px;height:620px;border:1px solid rgba(255,255,255,.4);border-radius:50%;right:-180px;top:-240px}
  .top,.bottom{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:32px}
  .mono{font-family:"Roboto Mono",monospace;font-size:15px;letter-spacing:.16em;text-transform:uppercase;line-height:1.6}
  .top .left{max-width:420px}
  .rule{width:52px;height:2px;background:#fff;margin-top:18px}
  .symbol{position:absolute;z-index:1;right:74px;top:64px;width:286px;height:286px;opacity:.98}
  .symbol svg{width:100%;height:100%}
  .word{font-size:146px;font-weight:600;letter-spacing:-.06em;line-height:.8;margin:0 0 18px}
  .word i{font-style:normal;color:#fff}
  .bottom{align-items:flex-end}
  .meta{font-family:"Roboto Mono",monospace;font-size:14px;letter-spacing:.14em;text-transform:uppercase;line-height:1.8;text-align:right}
  .tag{position:absolute;z-index:1;right:64px;bottom:150px;font-family:"Roboto Mono",monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;border:1px solid rgba(255,255,255,.65);padding:10px 14px}
</style></head>
<body>
  <div class="og">
    <div class="top">
      <div class="left">
        <div class="mono">Aktaion — agence digitale</div>
        <div class="rule"></div>
      </div>
      <div class="mono">Afrique &amp; international</div>
    </div>
    <div class="symbol">${symbol('#fff', 286)}</div>
    <div class="tag">Depuis 2022</div>
    <div class="bottom">
      <div>
        <div class="word">aktaion<i>.</i></div>
        <div class="mono">Digitalisation · Web &amp; mobile · Data &amp; IA · Marketing</div>
      </div>
      <div class="meta">Concevoir<br>Construire<br>Accompagner</div>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });

async function shoot(document, width, height, file) {
  await page.setViewportSize({ width, height });
  await page.setContent(document, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(imageRoot, file), type: 'png' });
  console.log(`${file} — ${width}×${height}`);
}

for (const size of [180, 192, 512]) {
  const file = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  await shoot(iconDocument(size), size, size, file);
}

await shoot(ogDocument, 1200, 630, 'og-aktaion.png');
await browser.close();
