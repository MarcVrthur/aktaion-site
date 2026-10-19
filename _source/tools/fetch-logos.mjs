/* Download official monochrome tool marks from Simple Icons, at build time.
   Runtime has no external dependency: every file is stored locally. */

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const VERSION = '16.35.0';
const SLUGS = [
  'wordpress', 'woocommerce', 'shopify', 'webflow', 'react', 'nextdotjs',
  'flutter', 'figma', 'notion', 'airtable', 'odoo', 'googlesheets',
  'googledrive', 'python', 'postgresql', 'metabase', 'looker', 'tensorflow',
  'huggingface', 'jupyter', 'anthropic', 'claude', 'meta', 'googleads',
  'googleanalytics', 'googletagmanager', 'tiktok', 'youtube', 'mailchimp',
  'brevo', 'zapier', 'make', 'n8n', 'miro', 'davinciresolve', 'blender',
  'github', 'supabase', 'strapi', 'tailwindcss', 'typescript', 'docker',
  'php', 'laravel', 'django', 'nuxt', 'svelte', 'angular', 'google', 'gmail',
  'hubspot', 'asana', 'clickup', 'sketch', 'ollama', 'mistralai',
  'scikitlearn', 'prestashop', 'contentful', 'sanity', 'nodedotjs',
  'javascript', 'swift', 'kotlin', 'android', 'apple', 'googleplay',
  'gitlab', 'jira', 'trello',
];

const here = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(here, '..', '..', 'assets', 'img', 'logos');
await mkdir(output, { recursive: true });

const missing = [];
const failed = [];
let downloaded = 0;

async function download(slug) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@${VERSION}/icons/${slug}.svg`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      missing.push(`${slug} (${response.status})`);
      return;
    }
    const svg = await response.text();
    if (!svg.trimStart().startsWith('<svg') || !svg.includes('viewBox')) {
      failed.push(`${slug} (invalid SVG)`);
      return;
    }
    await writeFile(path.join(output, `${slug}.svg`), svg.trimStart(), 'utf8');
    downloaded += 1;
  } catch (error) {
    failed.push(`${slug} (${error.message})`);
  }
}

for (let index = 0; index < SLUGS.length; index += 6) {
  await Promise.all(SLUGS.slice(index, index + 6).map(download));
}

console.log(`Simple Icons v${VERSION}: ${downloaded} downloaded to ${output}`);
if (missing.length) console.log(`Unavailable slugs: ${missing.join(', ')}`);
if (failed.length) console.log(`Failed: ${failed.join(', ')}`);
