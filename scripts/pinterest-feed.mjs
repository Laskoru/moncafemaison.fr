// Flux RSS Pinterest (publication automatique) : un flux par tableau, dans public/pinterest/<tableau>.xml.
// Pinterest lit chaque flux une fois par jour et publie les éléments qu'il n'a pas encore vus.
// Le flux ne montre que les épingles dont la date est arrivée (fuseau de Paris), sur 30 jours glissants,
// et jamais avant la date de départ : les épingles futures restent invisibles jusqu'à leur jour.
// Exception : un flux n'est jamais vide (Pinterest refuse de le brancher), il montre alors sa
// prochaine épingle en avance, qui part dès le branchement.
// Données : pinterest/queue.json, écrit par Sites/pins-v3/generate.mjs sur le PC d'Hugo.
// Lancé chaque matin par .github/workflows/pinterest-feed.yml, et par la finisseuse locale.
// Test : PINS_TODAY=AAAA-MM-JJ node scripts/pinterest-feed.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const queueFile = path.join(ROOT, 'pinterest', 'queue.json');
if (!fs.existsSync(queueFile)) { console.log('pinterest/queue.json absent : rien à faire.'); process.exit(0); }
const queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));

const today = process.env.PINS_TODAY || new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const from = new Date(`${today}T12:00:00Z`);
from.setUTCDate(from.getUTCDate() - 30);
const windowStart = [queue.start, from.toISOString().slice(0, 10)].sort().pop();

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Une date future n'est jamais annoncée : une épingle d'amorce porte la date du jour tant que la sienne n'est pas arrivée.
const rfc822 = (day) => new Date(`${day < today ? day : today}T04:00:00Z`).toUTCString();
const byDate = (dir) => (a, b) => (a.date === b.date ? a.order - b.order : (a.date < b.date ? -1 : 1) * dir);
const base = `https://www.${queue.domain}`;
const outDir = path.join(ROOT, 'public', 'pinterest');
fs.mkdirSync(outDir, { recursive: true });

const summary = [];
for (const [feed, board] of Object.entries(queue.feeds)) {
  const mine = queue.items.filter((it) => it.feed === feed && it.date >= queue.start);
  let items = mine.filter((it) => it.date >= windowStart && it.date <= today).sort(byDate(-1));
  if (!items.length) {
    // Pinterest refuse de brancher un flux vide : on garde toujours une épingle. D'abord la dernière
    // déjà parue (Pinterest l'a vue, rien n'est republié), sinon la prochaine à venir (l'amorce),
    // publiée dès le branchement du flux au lieu d'attendre sa date.
    const past = mine.filter((it) => it.date <= today).sort(byDate(-1))[0];
    const next = mine.filter((it) => it.date > today).sort(byDate(1))[0];
    items = [past || next].filter(Boolean);
  }
  const xmlItems = items.map((it) => {
    const local = path.join(ROOT, 'public', new URL(it.image).pathname);
    const length = fs.existsSync(local) ? fs.statSync(local).size : 0;
    return [
      '    <item>',
      `      <title>${esc(it.title)}</title>`,
      `      <link>${esc(it.link)}</link>`,
      `      <guid isPermaLink="false">${esc(it.guid)}</guid>`,
      `      <pubDate>${rfc822(it.date)}</pubDate>`,
      `      <description>${esc(it.description)}</description>`,
      `      <enclosure url="${esc(it.image)}" length="${length}" type="image/jpeg" />`,
      `      <media:content url="${esc(it.image)}" medium="image" type="image/jpeg" width="1000" height="1500" />`,
      '    </item>',
    ].join('\n');
  });
  const newest = items.length ? rfc822(items[0].date) : rfc822(queue.start);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(`${queue.site} · ${board}`)}</title>`,
    `    <link>${base}/</link>`,
    `    <description>${esc(`Épingles du tableau Pinterest « ${board} »`)}</description>`,
    '    <language>fr-FR</language>',
    `    <lastBuildDate>${newest}</lastBuildDate>`,
    `    <atom:link href="${base}/pinterest/${feed}.xml" rel="self" type="application/rss+xml" />`,
    ...xmlItems,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
  const file = path.join(outDir, `${feed}.xml`);
  const changed = !fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== xml;
  if (changed) fs.writeFileSync(file, xml);
  summary.push(`${feed}.xml : ${items.length} épingle(s)${changed ? ' (mis à jour)' : ''}`);
}
// Un flux dont le tableau a disparu de la file est retiré.
for (const f of fs.readdirSync(outDir)) if (f.endsWith('.xml') && !(f.slice(0, -4) in queue.feeds)) fs.rmSync(path.join(outDir, f));
console.log(`Flux Pinterest au ${today} (départ ${queue.start}) : ${summary.join(' ; ')}`);
