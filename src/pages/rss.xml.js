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

// Extrait « riche » pour les agrégateurs (Flipboard recommande ≥ 300 caractères) :
// la meta-description suivie du début de l'article, en texte brut, coupé à une fin de phrase.
function excerpt(description, body, min = 300, max = 460) {
  const text = body
    .replace(/^---[\s\S]*?---/, '')                 // sécurité : pas de frontmatter
    .replace(/<[^>]+>/g, ' ')                       // balises HTML éventuelles
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')          // images markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')        // liens markdown → texte
    .replace(/^\s*#{1,6}\s+.*$/gm, ' ')               // titres de section : retirés
    .replace(/^\s*(>\s*|[-*]\s+)/gm, '')             // citations, puces : on garde le texte
    .replace(/[*_`]+/g, '')                         // gras, italique, code
    .replace(/\s+/g, ' ')
    .trim();
  let out = description.trim();
  if (out.length >= min) return out;
  const extra = text.startsWith(out) ? text.slice(out.length) : text;
  out = (out + ' ' + extra).slice(0, max);
  const cut = Math.max(out.lastIndexOf('. '), out.lastIndexOf('! '), out.lastIndexOf('? '));
  return cut > min ? out.slice(0, cut + 1) : out.replace(/\s+\S*$/, '') + '…';
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
        description: excerpt(article.data.description, article.body),
        pubDate: article.data.pubDate,
        link: `/articles/${article.slug}/`,
        // Nécessaire pour que Pinterest (auto-pin via RSS) sache quelle
        // image utiliser pour créer l'épingle.
        enclosure: image
          ? { url: new URL(image.href, context.site).href, length: image.length, type: 'image/jpeg' }
          : undefined,
        // Auteur au format attendu par Flipboard et les lecteurs RSS.
        customData: `<dc:creator>${article.data.author ?? siteConfig.author}</dc:creator>`,
      };
    }),
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
    customData: `<language>${siteConfig.locale.replace('_', '-')}</language>`,
  });
}
