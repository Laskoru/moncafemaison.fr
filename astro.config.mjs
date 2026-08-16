import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domaine final du site — doit correspondre exactement au domaine servi en
// production (avec ou sans www), sinon Google voit un conflit sur le canonical.
const SITE_URL = 'https://www.moncafemaison.fr';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
