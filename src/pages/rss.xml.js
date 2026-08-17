import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '../siteConfig';
import { resolveCoverImage } from '../lib/covers';

// Pour l'auto-pin Pinterest (flux RSS -> épingles) : on préfère l'image
// verticale déjà pensée pour Pinterest (public/pins/<slug>.jpg, générée par
// `npm run pins`) et on retombe sur la couverture normale si elle n'existe
// pas encore pour cet article.
function resolvePinImage(slug, coverImage) {
  const base = slug.split('/').pop() ?? slug;
  const pinPath = path.join(process.cwd(), 'public', 'pins', `${base}.jpg`);
  if (fs.existsSync(pinPath)) {
    return { href: `/pins/${base}.jpg`, length: fs.statSync(pinPath).size };
  }
  const cover = resolveCoverImage(slug, coverImage);
  // Une couverture distante (URL Unsplash) n'a pas de taille connue localement
  // et n'est de toute façon pas au bon format pour Pinterest — on ignore.
  if (!cover || cover.startsWith('http')) return null;
  const coverPath = path.join(process.cwd(), 'public', cover);
  if (!fs.existsSync(coverPath)) return null;
  return { href: cover, length: fs.statSync(coverPath).size };
}

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: articles.map((article) => {
      const image = resolvePinImage(article.slug, article.data.coverImage);
      return {
        title: article.data.title,
        description: article.data.description,
        pubDate: article.data.pubDate,
        link: `/articles/${article.slug}/`,
        // Nécessaire pour que Pinterest (auto-pin via RSS) sache quelle
        // image utiliser pour créer l'épingle.
        enclosure: image
          ? { url: new URL(image.href, context.site).href, length: image.length, type: 'image/jpeg' }
          : undefined,
      };
    }),
    customData: `<language>${siteConfig.locale.replace('_', '-')}</language>`,
  });
}
