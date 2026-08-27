// Génère une épingle Pinterest (image verticale 1000×1500 très attractive + entrée CSV)
// par article publié. Rendu via Chrome headless (design riche : photo + carte de
// texte, accroche en Fraunces, pastille catégorie, flèche d'appel à l'action).
// Usage : node scripts/generate-pins.mjs
//
// Accroche : frontmatter `pinHook` (recommandé, avec *mot* en italique accent)
// sinon le titre avant « : ». Sous-titre : `pinSub` sinon rien.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';

// ── Réglages par site (SEUL bloc à adapter en dupliquant ce script) ──
const SITE_URL = 'https://www.moncafemaison.fr';
const SITE_NAME = 'Mon Café Maison';
const ACCENT = '#b5702c';
const CATEGORY_LABEL = {
  machines: 'Machines',
  moulins: 'Moulins',
  accessoires: 'Accessoires',
};
const BOARD_BY_CATEGORY = {
  machines: 'Machines à café & espresso',
  moulins: 'Moulins à café',
  accessoires: 'Accessoires café & barista',
};
// ─────────────────────────────────────────────────────────────────────

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const COVERS_DIR = path.join(ROOT, 'public/covers');
const OUT_IMG_DIR = path.join(ROOT, 'public/pins');
const OUT_CSV_DIR = path.join(ROOT, 'pinterest-export');
const IMG_W = 1000, IMG_H = 1500;

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe` : null,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);
const CHROME = CHROME_CANDIDATES.find((p) => fs.existsSync(p));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// *mot* → <em>mot</em> (italique accentué), le reste échappé.
function hookHtml(text) {
  return esc(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function coverPath(slug) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
    const p = path.join(COVERS_DIR, `${slug}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function buildHtml({ coverAbs, category, hook, sub }) {
  const label = (CATEGORY_LABEL[category] ?? 'À la maison').toUpperCase();
  const subHtml = sub ? `<div class="sub">${esc(sub)}</div>` : '';
  const fileUrl = 'file:///' + coverAbs.replace(/\\/g, '/');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Nunito+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<style>
 *{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;}
 body{width:${IMG_W}px;height:${IMG_H}px;position:relative;background:#faf4ec;font-family:"Nunito Sans",sans-serif;overflow:hidden;}
 .photo{position:absolute;top:0;left:0;width:${IMG_W}px;height:1000px;object-fit:cover;}
 .topscrim{position:absolute;top:0;left:0;width:${IMG_W}px;height:200px;background:linear-gradient(180deg,rgba(30,20,15,.55),transparent);}
 .brand{position:absolute;top:34px;left:44px;display:flex;align-items:center;gap:12px;color:#fff;}
 .brand svg{width:30px;height:30px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.4));}
 .brand .t{font-family:"Fraunces",serif;font-weight:600;font-size:30px;text-shadow:0 1px 6px rgba(0,0,0,.45);}
 .card{position:absolute;left:0;bottom:0;width:${IMG_W}px;height:760px;background:#fbf6ef;border-radius:56px 56px 0 0;box-shadow:0 -18px 50px rgba(120,80,60,.22);padding:64px 66px 60px;}
 .pill{display:inline-flex;align-items:center;gap:10px;background:${ACCENT};color:#fff;font-weight:800;font-size:23px;letter-spacing:2px;padding:12px 26px;border-radius:40px;}
 .hook{font-family:"Fraunces",serif;font-weight:600;font-size:82px;line-height:1.06;color:#382f28;margin-top:34px;letter-spacing:-.5px;}
 .hook em{font-style:italic;color:${ACCENT};}
 .sub{font-size:30px;color:#8c7f72;font-weight:600;margin-top:26px;line-height:1.35;}
 .cta{position:absolute;left:66px;bottom:60px;display:flex;align-items:center;gap:16px;}
 .cta .txt{font-family:"Fraunces",serif;font-weight:600;font-size:31px;color:#382f28;}
 .arrow{width:64px;height:64px;border-radius:50%;background:${ACCENT};display:flex;align-items:center;justify-content:center;}
 .arrow svg{width:30px;height:30px;stroke:#fff;}
 .site{position:absolute;right:66px;bottom:66px;font-weight:800;font-size:26px;color:${ACCENT};}
 .sprig{position:absolute;top:-2px;right:40px;width:150px;opacity:.85;}
</style></head><body>
 <img class="photo" src="${fileUrl}">
 <div class="topscrim"></div>
 <div class="brand"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v2M12 3v2"/></svg><span class="t">${esc(SITE_NAME)}</span></div>
 <div class="card">
  <svg class="sprig" viewBox="0 0 120 120" fill="none" stroke="#caa77f" stroke-width="1.6"><g transform="translate(44 44) rotate(25)"><ellipse rx="16" ry="10.5" fill="#efe1d0"/><path d="M0 -10 C -6 -3, -6 3, 0 10"/></g><g transform="translate(80 60) rotate(-15)"><ellipse rx="15" ry="10" fill="#e7d3bd"/><path d="M0 -9 C -6 -3, -6 3, 0 9"/></g><g transform="translate(54 82) rotate(52)"><ellipse rx="14" ry="9" fill="#f1e4d4"/><path d="M0 -8 C -5 -3, -5 3, 0 8"/></g></svg>
  <span class="pill">✦ ${label}</span>
  <div class="hook">${hook}</div>
  ${subHtml}
  <div class="cta"><span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span><span class="txt">à découvrir</span></div>
  <span class="site">${esc(SITE_URL.replace(/^https?:\/\/(www\.)?/, ''))}</span>
 </div>
</body></html>`;
}

function renderPin(html, outJpg) {
  const tmp = path.join(os.tmpdir(), `pin-${Date.now()}-${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(tmp, html, 'utf8');
  try {
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--virtual-time-budget=5000', `--window-size=${IMG_W},${IMG_H}`,
      `--screenshot=${outJpg}`, 'file:///' + tmp.replace(/\\/g, '/'),
    ], { stdio: 'ignore' });
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

function main() {
  if (!CHROME) { console.error('❌ Chrome/Edge introuvable pour le rendu des épingles.'); process.exit(1); }
  fs.mkdirSync(OUT_IMG_DIR, { recursive: true });
  fs.mkdirSync(OUT_CSV_DIR, { recursive: true });

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
  const rows = [['Title', 'Media URL', 'Pinterest board', 'Description', 'Link', 'Publish date', 'Keywords']];
  let done = 0, skipped = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const { data } = matter(fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8'));
    if (data.draft) continue;

    const cover = coverPath(slug);
    if (!cover) { console.warn(`⚠ pas de couverture pour ${slug}, ignoré`); skipped++; continue; }

    // Accroche : pinHook (avec *emphase*), sinon titre avant « : »
    const rawHook = data.pinHook || String(data.title).split(':')[0].trim();
    const hook = hookHtml(rawHook);
    const sub = data.pinSub || '';

    try {
      const html = buildHtml({ coverAbs: cover, category: data.category, hook, sub });
      renderPin(html, path.join(OUT_IMG_DIR, `${slug}.jpg`));

      const board = BOARD_BY_CATEGORY[data.category] ?? 'Maison & astuces';
      const keywords = (data.keywords ?? []).slice(0, 5).join(', ');
      const description = `${data.description} 👉 Le guide complet sur ${SITE_NAME}.`.slice(0, 480);
      rows.push([data.title, `${SITE_URL}/pins/${slug}.jpg`, board, description, `${SITE_URL}/articles/${slug}/`, '', keywords]);
      done++;
      process.stdout.write('.');
    } catch (err) {
      console.warn(`\n⚠ échec sur ${slug} : ${err.message}`); skipped++;
    }
  }

  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  fs.writeFileSync(path.join(OUT_CSV_DIR, 'pins.csv'), csv, 'utf8');
  console.log(`\n✅ ${done} épingles générées dans public/pins/`);
  if (skipped) console.log(`⚠ ${skipped} article(s) ignoré(s)`);
  console.log(`📄 CSV prêt : pinterest-export/pins.csv`);
}

main();
