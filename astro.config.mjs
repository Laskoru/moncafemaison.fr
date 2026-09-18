import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeAmazonLinks] },
});
