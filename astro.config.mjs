import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// Domaine final du site — doit correspondre exactement au domaine servi en
// production (avec ou sans www), sinon Google voit un conflit sur le canonical.
const SITE_URL = 'https://www.moncafemaison.fr';

// Les liens Amazon écrits directement dans le markdown des articles doivent
// porter rel="nofollow sponsored" (exigence Google + Amazon Partenaires) et
// s'ouvrir dans un nouvel onglet, comme ceux des composants (AmazonProduct, CTA).
// Les autres liens externes (sources, sites officiels) restent intacts.
const AMAZON_RE = /^https?:\/\/(?:[a-z0-9-]+\.)*(?:amazon\.[a-z.]{2,6}|amzn\.(?:to|eu))(?:\/|$)/i;
function rehypeAmazonLinks() {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && AMAZON_RE.test(String(node.properties?.href ?? ''))) {
      node.properties.rel = ['nofollow', 'sponsored', 'noopener'];
      node.properties.target = '_blank';
    }
    for (const child of node.children ?? []) visit(child);
  };
  return (tree) => visit(tree);
}

// Les routines d'écriture glissent parfois un emoji en tête de paragraphe, de titre ou
// d'encadré (« 🛒 Notre sélection… »). La charte des sites n'utilise pas d'emoji comme
// pictogrammes : on retire ceux qui ouvrent un bloc de texte, le reste du contenu est intact.
const LEADING_EMOJI_RE = /^(?:\s*(?![©®™])\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}\uFE0F?)*)+\s*/u;
function rehypeStripLeadingEmoji() {
  const BLOCKS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'td', 'th', 'strong', 'em', 'a', 'blockquote', 'summary']);
  const visit = (node) => {
    if (node.type === 'element' && BLOCKS.has(node.tagName)) {
      const first = node.children?.[0];
      if (first?.type === 'text') first.value = first.value.replace(LEADING_EMOJI_RE, '');
    }
    for (const child of node.children ?? []) visit(child);
  };
  return (tree) => visit(tree);
}

// ---- Sitemap : dates réelles (lastmod) + pages vides exclues ---------------------------
// Lit le frontmatter des articles (sans dépendance) pour donner à chaque URL une date de
// dernière modification fiable : les moteurs s'en servent pour prioriser le recrawl.
function readArticles() {
  const dir = path.join(process.cwd(), 'src/content/articles');
  const out = [];
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = (src.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
    const get = (k) => (fm.match(new RegExp('^' + k + ':\\s*["\']?([^"\'\\r\\n]+)', 'm')) || [])[1]?.trim();
    if (/^draft:\s*true/m.test(fm)) continue;
    out.push({ slug: f.replace(/\.md$/, ''), category: get('category'), date: get('updatedDate') || get('pubDate') });
  }
  return out;
}
const ARTICLES = readArticles();
const LATEST = ARTICLES.map((a) => a.date).filter(Boolean).sort().pop();
const EMPTY_CATEGORIES = (() => {
  try {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/categories.ts'), 'utf8');
    const slugs = [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
    return slugs.filter((s) => !ARTICLES.some((a) => a.category === s));
  } catch { return []; }
})();
const isoDate = (d) => (d ? new Date(d + (d.length === 10 ? 'T00:00:00Z' : '')) : undefined);

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap({
    // Catégories vides : ni dans le sitemap (elles sont aussi en noindex côté page).
    filter: (page) => !EMPTY_CATEGORIES.some((s) => page.includes('/categorie/' + s + '/')),
    serialize(item) {
      const m = item.url.match(/\/articles\/([^/]+)\/?$/);
      if (m) {
        const a = ARTICLES.find((x) => x.slug === m[1]);
        if (a?.date) item.lastmod = isoDate(a.date);
      } else if (LATEST && /^\/(articles\/|categorie\/[^/]+\/|guides\/(?:[^/]+\/)?)?$/.test(new URL(item.url).pathname)) {
        item.lastmod = isoDate(LATEST); // accueil, listes, catégories, guides : bougent à chaque publication
      }
      return item;
    },
  })],
  markdown: { rehypePlugins: [rehypeAmazonLinks, rehypeStripLeadingEmoji] },
});
