// Génère une épingle Pinterest (image verticale + entrée CSV) par article publié.
// Usage : node scripts/generate-pins.mjs
//
// Sortie :
//   - public/pins/<slug>.jpg           (à committer/pusher pour que Pinterest
//                                        puisse aller chercher l'image en ligne)
//   - pinterest-export/pins.csv        (à importer via l'outil "Créer des
//                                        épingles en masse" de Pinterest)
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

// Node ne peut pas importer src/siteConfig.ts directement (fichier TS) sans
// loader supplémentaire — on duplique juste les 2 valeurs utiles ici.
const SITE_URL = 'https://www.moncafemaison.fr';
const SITE_NAME = 'Mon Café Maison';
const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const COVERS_DIR = path.join(ROOT, 'public/covers');
const OUT_IMG_DIR = path.join(ROOT, 'public/pins');
const OUT_CSV_DIR = path.join(ROOT, 'pinterest-export');

const BOARD_BY_CATEGORY = {
  machines: 'Machines à café & espresso',
  moulins: 'Moulins à café',
  accessoires: 'Accessoires café & barista',
};

const IMG_W = 1000;
const IMG_H = 1500;

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Découpe un titre en lignes qui tiennent dans `maxChars` caractères,
// sans couper un mot en deux.
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildOverlaySvg(title, siteName) {
  const lines = wrapText(title, 22).slice(0, 4);
  const fontSize = 58;
  const lineHeight = 68;
  const bottomPadding = 90;
  const textBlockHeight = lines.length * lineHeight;
  const startY = IMG_H - bottomPadding - textBlockHeight + fontSize;

  const tspans = lines
    .map((line, i) => `<tspan x="60" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  const scrimHeight = textBlockHeight + bottomPadding + 60;

  return `
<svg width="${IMG_W}" height="${IMG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.82" />
    </linearGradient>
    <linearGradient id="topScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${IMG_W}" height="160" fill="url(#topScrim)" />
  <rect x="0" y="${IMG_H - scrimHeight}" width="${IMG_W}" height="${scrimHeight}" fill="url(#scrim)" />
  <text font-family="Arial, sans-serif" font-weight="700" font-size="${fontSize}" fill="#ffffff">${tspans}</text>
  <text x="60" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#ffffff" opacity="0.95">${escapeXml(siteName)}</text>
</svg>`.trim();
}

function resolveCoverBuffer(slug, explicitUrl) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
    const localPath = path.join(COVERS_DIR, `${slug}.${ext}`);
    if (fs.existsSync(localPath)) return fs.readFileSync(localPath);
  }
  if (explicitUrl) return explicitUrl; // fetch plus tard
  return null;
}

async function fetchIfUrl(source) {
  if (Buffer.isBuffer(source)) return source;
  const res = await fetch(source);
  if (!res.ok) throw new Error(`fetch ${source} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(OUT_IMG_DIR, { recursive: true });
  fs.mkdirSync(OUT_CSV_DIR, { recursive: true });

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
  const rows = [['Title', 'Media URL', 'Pinterest board', 'Description', 'Link', 'Publish date', 'Keywords']];
  let done = 0;
  let skipped = 0;

  // Étale les épingles à 3/jour à partir de demain 9h (heure de Paris) —
  // Pinterest favorise un rythme régulier plutôt qu'un paquet publié d'un coup.
  const PINS_PER_DAY = 3;
  const PUBLISH_HOUR_UTC = 8; // ~9-10h à Paris selon l'heure d'été/hiver
  function publishDateFor(index) {
    const dayOffset = Math.floor(index / PINS_PER_DAY) + 1;
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + dayOffset);
    date.setUTCHours(PUBLISH_HOUR_UTC, 0, 0, 0);
    return date.toISOString().replace(/\.\d{3}Z$/, '');
  }

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const { data } = matter(raw);
    if (data.draft) continue;

    const coverSource = resolveCoverBuffer(slug, data.coverImage);
    if (!coverSource) {
      console.warn(`⚠ pas de couverture pour ${slug}, ignoré`);
      skipped++;
      continue;
    }

    try {
      const coverBuffer = await fetchIfUrl(coverSource);
      const base = await sharp(coverBuffer)
        .resize(IMG_W, IMG_H, { fit: 'cover', position: 'centre' })
        .toBuffer();

      const svg = buildOverlaySvg(data.title, SITE_NAME);
      const final = await sharp(base)
        .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
        .jpeg({ quality: 85 })
        .toBuffer();

      fs.writeFileSync(path.join(OUT_IMG_DIR, `${slug}.jpg`), final);

      const board = BOARD_BY_CATEGORY[data.category] ?? 'Café maison';
      const keywords = (data.keywords ?? []).slice(0, 5).join(', ');
      const description = `${data.description} 👉 Le comparatif complet sur ${SITE_NAME}.`.slice(0, 480);
      const link = `${SITE_URL}/articles/${slug}`;
      const mediaUrl = `${SITE_URL}/pins/${slug}.jpg`;

      const publishDate = publishDateFor(done);
      rows.push([data.title, mediaUrl, board, description, link, publishDate, keywords]);
      done++;
    } catch (err) {
      console.warn(`⚠ échec sur ${slug} : ${err.message}`);
      skipped++;
    }
  }

  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  fs.writeFileSync(path.join(OUT_CSV_DIR, 'pins.csv'), csv, 'utf8');

  console.log(`\n✅ ${done} épingles générées dans public/pins/`);
  if (skipped) console.log(`⚠ ${skipped} article(s) ignoré(s) (voir avertissements ci-dessus)`);
  console.log(`📄 CSV prêt : pinterest-export/pins.csv`);
}

main();
