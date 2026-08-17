// Génère les visuels de profil Pinterest : photo de profil (600x600, carrée
// -> Pinterest l'affiche en cercle) et photo de couverture (1600x900, 16:9).
// Usage : node scripts/generate-pinterest-profile.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'pinterest-export');

const ACCENT = '#c07a3e';
const SIGNAL = '#6e8b5a';
const SITE_NAME = 'Mon Café Maison';
const TAGLINE = 'Faire un bon café chez soi, sans se tromper de matériel';

// Photo de couverture : déjà téléchargée localement pour l'article
// "cafetiere-italienne-moka" (moka pot + tasse, lumière chaude) — la plus
// adaptée en banner parmi les couvertures existantes.
const COVER_PHOTO_LOCAL = path.join(ROOT, 'public/covers/cafetiere-italienne-moka.jpg');

async function generateProfilePicture() {
  // Reprend le mark du header (rect + trait + petit rond), agrandi et
  // centré pour rester lisible une fois recadré en cercle par Pinterest.
  const svg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="600" fill="${ACCENT}"/>
  <g transform="translate(90,90) scale(13.125)">
    <path d="M8 24V13l8 7 8-7v11" fill="none" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="16" cy="7" r="2.6" fill="${SIGNAL}"/>
  </g>
</svg>`.trim();

  const out = await sharp(Buffer.from(svg)).jpeg({ quality: 95 }).toBuffer();
  fs.writeFileSync(path.join(OUT_DIR, 'profile-picture.jpg'), out);
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function generateCoverPhoto() {
  const W = 1600;
  const H = 900;
  const photoBuffer = fs.readFileSync(COVER_PHOTO_LOCAL);

  const base = await sharp(photoBuffer).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer();

  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.72" />
      <stop offset="55%" stop-color="#000000" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#scrim)" />
  <rect x="80" y="330" width="70" height="70" rx="15" fill="${ACCENT}" />
  <path d="M105 385V352l17.5 15 17.5-15v33" transform="translate(0,-8)" fill="none" stroke="#ffffff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
  <text x="80" y="470" font-family="Arial, sans-serif" font-weight="700" font-size="64" fill="#ffffff">${escapeXml(SITE_NAME)}</text>
  <text x="80" y="515" font-family="Arial, sans-serif" font-weight="400" font-size="30" fill="#ffffff" opacity="0.92">${escapeXml(TAGLINE)}</text>
</svg>`.trim();

  const out = await sharp(base)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 88 })
    .toBuffer();
  fs.writeFileSync(path.join(OUT_DIR, 'cover-photo.jpg'), out);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await generateProfilePicture();
  await generateCoverPhoto();
  console.log('\n✅ profile-picture.jpg (600x600) et cover-photo.jpg (1600x900) générées dans pinterest-export/');
}

main();
