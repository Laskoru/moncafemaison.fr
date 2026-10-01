// Génère public/ressources/checklist-cafe-maison.pdf : une checklist sobre (texte seul,
// Helvetica, encodage WinAnsi pour les accents), sans dépendance.
// Contenu repris des pages du site (calculateur, guides) : rien d'inventé.
// Usage : node scripts/generate-checklist.mjs
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public/ressources/checklist-cafe-maison.pdf');

const content = [
  ['title', 'Checklist : un bon café à la maison'],
  ['sub', 'Mon Café Maison · www.moncafemaison.fr'],
  ['h', '1. Choisir sa méthode avant son matériel'],
  ['li', 'Je sais quelle tasse je veux : grand café filtre, café court et corsé, ou café au lait.'],
  ['li', 'J\'ai choisi la méthode qui la donne : filtre, piston, moka, expresso ou cold brew.'],
  ['li', 'Comparatif des méthodes : www.moncafemaison.fr/methodes-cafe/'],
  ['h', '2. Doser au gramme près'],
  ['li', 'Café filtre : environ 7,5 g de café moulu par tasse de 125 ml (ratio 1 : 17).'],
  ['li', '4 tasses : environ 29,5 g pour 500 ml. 6 tasses : environ 44 g pour 750 ml.'],
  ['li', 'Repère de la Specialty Coffee Association : 55 g de café par kg d\'eau (environ 1 litre).'],
  ['li', 'Je pèse une fois ma cuillère habituelle pour savoir combien de grammes elle contient.'],
  ['li', 'Calculateur : www.moncafemaison.fr/calculateur-dosage-cafe/'],
  ['h', '3. Moudre juste avant'],
  ['li', 'Un moulin à meules plutôt qu\'à lames : la mouture est plus régulière.'],
  ['li', 'Mouture moyenne pour le filtre, grossière pour le piston, fine pour la moka,'],
  ['li2', 'très fine et régulière pour l\'expresso.'],
  ['li', 'Grains conservés à l\'abri de l\'air, de l\'humidité, de la chaleur et de la lumière.'],
  ['h', '4. Réussir l\'expresso'],
  ['li', 'Dose pesée, par exemple 18 g de café pour environ 36 g dans la tasse.'],
  ['li', 'Tassage régulier, extraction autour de 25 à 30 secondes.'],
  ['li', 'Trop rapide et acide : mouture plus fine. Trop lent et amer : mouture plus grosse.'],
  ['h', '5. Entretenir'],
  ['li', 'Je détartre selon la notice de ma machine, plus souvent si mon eau est calcaire.'],
  ['li', 'Dureté de l\'eau par commune : www.moncafemaison.fr/durete-eau-cafe/'],
  ['li', 'Je nettoie le moulin et le porte-filtre régulièrement.'],
  ['foot', 'Ces repères sont des points de départ : ajuste d\'un ou deux grammes selon ton goût.'],
];

// WinAnsi : les caractères latins accentués ont le même code que Latin-1 ;
// quelques signes typographiques ont des codes propres.
const WIN = { '’': 0x92, '‘': 0x91, '“': 0x93, '”': 0x94, '–': 0x96, '—': 0x97, '…': 0x85, '·': 0xb7, ' ': 0x20, '€': 0x80 };
function encode(str) {
  const bytes = [];
  for (const ch of str) {
    let c = WIN[ch] ?? ch.codePointAt(0);
    if (c > 255) c = 0x3f;
    if (c === 0x28 || c === 0x29 || c === 0x5c) bytes.push(0x5c);
    bytes.push(c);
  }
  return Buffer.from(bytes);
}

const W = 595, H = 842, M = 56;
const styles = {
  title: { font: 'F2', size: 20, gap: 30 },
  sub: { font: 'F1', size: 10, gap: 28 },
  h: { font: 'F2', size: 13, gap: 22, before: 10 },
  li: { font: 'F1', size: 10.5, gap: 16, box: true },
  li2: { font: 'F1', size: 10.5, gap: 16, indent: true },
  foot: { font: 'F1', size: 9.5, gap: 16, before: 18 },
};
const parts = [];
let y = H - M - 10;
parts.push(Buffer.from('0.65 0.33 0.11 RG 1 w\n'));
for (const [kind, text] of content) {
  const st = styles[kind];
  y -= st.before ?? 0;
  const x = M + (st.box || st.indent ? 20 : 0);
  if (st.box) parts.push(Buffer.from(`${M + 2} ${y - 1} 9 9 re S\n`));
  parts.push(Buffer.from(`BT /${st.font} ${st.size} Tf ${x} ${y} Td (`), encode(text), Buffer.from(') Tj ET\n'));
  if (kind === 'sub') parts.push(Buffer.from(`0.8 0.76 0.69 RG ${M} ${y - 12} m ${W - M} ${y - 12} l S 0.65 0.33 0.11 RG\n`));
  y -= st.gap;
}
const stream = Buffer.concat(parts);

const objs = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  null,
  '<< /Title (Checklist : un bon cafe a la maison) /Author (Mon Cafe Maison) /Producer (scripts/generate-checklist.mjs) >>',
];
const chunks = [Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'latin1')];
const offsets = [];
let pos = chunks[0].length;
objs.forEach((o, i) => {
  offsets.push(pos);
  const body = o === null
    ? Buffer.concat([Buffer.from(`${i + 1} 0 obj\n<< /Length ${stream.length} >>\nstream\n`), stream, Buffer.from('\nendstream\nendobj\n')])
    : Buffer.from(`${i + 1} 0 obj\n${o}\nendobj\n`);
  chunks.push(body);
  pos += body.length;
});
const xref = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('');
chunks.push(Buffer.from(xref + `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${pos}\n%%EOF\n`));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, Buffer.concat(chunks));
console.log(`Checklist écrite : ${path.relative(process.cwd(), OUT)}`);
