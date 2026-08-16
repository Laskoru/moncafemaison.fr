import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../siteConfig';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.slug}/`,
    })),
    customData: `<language>${siteConfig.locale.replace('_', '-')}</language>`,
  });
}
