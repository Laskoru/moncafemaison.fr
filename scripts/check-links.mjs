// Vérifie les liens internes du site construit (dist/) : chaque href/src qui
// commence par « / » doit pointer vers un fichier ou une page existante.
// Ancres (#...) et paramètres (?...) ignorés. Code de sortie 1 si un lien est cassé.
// Usage : npm run build && npm run check-links
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.argv[2] || 'dist');
if (!fs.existsSync(DIST)) {
  console.error(`Dossier introuvable : ${DIST} (lance d'abord npm run build)`);
  process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

function exists(url) {
  let clean = url.split('#')[0].split('?')[0];
  if (!clean) return true;
  try { clean = decodeURIComponent(clean); } catch {}
  const target = path.join(DIST, clean);
  if (!target.startsWith(DIST)) return false;
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  return fs.existsSync(path.join(target, 'index.html')) || fs.existsSync(target + '.html');
}

const ATTR = /\s(?:href|src)=["']([^"']+)["']/g;
const SRCSET = /\ssrcset=["']([^"']+)["']/g;
const broken = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const urls = [];
  for (const m of html.matchAll(ATTR)) urls.push(m[1]);
  for (const m of html.matchAll(SRCSET)) for (const part of m[1].split(',')) urls.push(part.trim().split(/\s+/)[0]);
  for (const raw of urls) {
    const url = raw.replace(/&amp;/g, '&');
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    checked++;
    if (!exists(url)) broken.push(`${path.relative(DIST, file)} → ${url}`);
  }
}

if (broken.length) {
  console.error(`${broken.length} lien(s) interne(s) cassé(s) :`);
  for (const b of [...new Set(broken)]) console.error('  ' + b);
  process.exit(1);
}
console.log(`check-links : ${checked} liens internes vérifiés dans ${htmlFiles.length} pages, aucun cassé.`);
