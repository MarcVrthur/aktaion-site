/* Vérifications statiques du site généré (liens, ancres, ids, équilibre des balises). */

import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = (await readdir(root)).filter((file) => file.endsWith('.html')).sort();
const htmlByFile = new Map();
const issues = [];

for (const file of files) {
  htmlByFile.set(file, await readFile(resolve(root, file), 'utf8'));
}

const TAGS = [
  'div', 'section', 'article', 'a', 'ul', 'ol', 'li', 'form', 'aside', 'nav',
  'header', 'footer', 'main', 'table', 'tbody', 'thead', 'tr', 'th', 'td',
  'details', 'summary', 'button', 'select', 'h1', 'h2', 'h3', 'p', 'span',
  'i', 'b', 'strong', 'em', 'small',
];

for (const [file, html] of htmlByFile) {
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) issues.push(`${file} : ${h1Count} balise(s) h1`);

  if (!/<title>[^<]+<\/title>/.test(html)) issues.push(`${file} : balise title manquante`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) issues.push(`${file} : meta description manquante`);

  for (const needle of ['undefined', '[object Object]', 'NaN']) {
    if (html.includes(needle)) issues.push(`${file} : contenu inattendu « ${needle} »`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length) issues.push(`${file} : id en double — ${duplicates.join(', ')}`);

  for (const tag of TAGS) {
    const open = (html.match(new RegExp(`<${tag}\\b`, 'g')) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (open !== close) issues.push(`${file} : <${tag}> ouvert ${open} / fermé ${close}`);
  }

  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);

  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(href)) {
      if (href.startsWith('#') && href.length > 1) {
        const fragment = href.slice(1);
        if (!ids.includes(fragment)) issues.push(`${file} : ancre absente ${href}`);
      }
      continue;
    }

    const [pathPart, fragment] = href.split('#');
    if (!pathPart) continue;

    try {
      await access(resolve(root, pathPart));
    } catch {
      issues.push(`${file} : fichier absent ${href}`);
      continue;
    }

    if (fragment && htmlByFile.has(pathPart)) {
      const target = htmlByFile.get(pathPart);
      if (!new RegExp(`\\sid="${fragment}"`).test(target)) {
        issues.push(`${file} : ancre absente ${href}`);
      }
    }
  }
}

if (issues.length) {
  console.error(`✗ ${issues.length} problème(s)\n`);
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`✓ ${files.length} pages vérifiées : titres, descriptions, liens, ancres, ids et balises.`);
}
