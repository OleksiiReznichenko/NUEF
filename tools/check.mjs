import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const css = await readFile(resolve(root, 'assets/css/style.css'), 'utf8');
const demo = await readFile(resolve(root, 'assets/css/demo.css'), 'utf8');
const script = await readFile(resolve(root, 'assets/js/script.js'), 'utf8');
const errors = [];
let checked = 0;

const syntax = spawnSync(process.execPath, ['--check', resolve(root, 'assets/js/script.js')]);
if (syntax.status !== 0) errors.push('JavaScript syntax failed');
if (html.includes('href="#"')) errors.push('Placeholder anchor links found');
if (/<form\b|registration-form|fileInputForm|data\.php|action="/i.test(html)) {
  errors.push('Legacy form or submission markup found');
}
if (/_formEvents\(|formCallingButtons|registration-form/.test(script + css + demo)) {
  errors.push('Legacy form code or styles remain');
}

if (script.includes('location.reload()')) errors.push('Resize-triggered page reload remains');
if (!html.includes('smoothscroll/1.4.10/SmoothScroll.min.js') ||
    !script.includes('typeof window.SmoothScroll === "function"')) {
  errors.push('Original SmoothScroll wheel initialization is missing');
}
if (!script.includes('_scrollDistance("studio")')) errors.push('Responsive studio pin not found');
if (!script.includes('trigger.end - 24')) errors.push('Pinned contact navigation not found');

const ids = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), (m) => m[1]));
for (const [, fragment] of html.matchAll(/\bhref="#([^"]+)"/g)) {
  if (!ids.has(fragment)) errors.push(`Missing section anchor: #${fragment}`);
}

// Verify all local markup media, including responsive image candidates and lazy video.
const markupRefs = Array.from(html.matchAll(/\b(?:src|data-src|href|poster)="(assets\/[^\"]+)"/g), (m) => m[1]);
const srcsets = Array.from(html.matchAll(/\bsrcset="([\s\S]*?)"/g), (m) => m[1]);
for (const srcset of srcsets) {
  for (const candidate of srcset.split(',')) {
    const path = candidate.trim().split(/\s+/)[0];
    if (path.startsWith('assets/')) markupRefs.push(path);
  }
}
const styleRefs = Array.from((css + '\n' + demo).matchAll(/url\(\s*["']?(\.\.\/media\/[^)'"\s]+)["']?\s*\)/g), (m) => `assets/media/${m[1].split('/').pop()}`);
for (const file of new Set([...markupRefs, ...styleRefs])) {
  try { await access(resolve(root, file)); checked++; }
  catch { errors.push(`Missing asset: ${file}`); }
}
try { await access(resolve(root, 'data.php')); errors.push('Unsafe data.php still present'); }
catch {}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checks passed: JavaScript syntax, demo safety, navigation, ${checked} local assets.`);
}
