// Schéma ItemList (listes d'articles : catégories, guides, tous les articles).
// Liste simple d'URL ordonnées, sans note ni prix : rien qui ne soit visible sur la page.
export function itemList(name: string, site: URL | undefined, slugs: { id: string; title: string }[]) {
  const origin = site?.origin ?? '';
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: slugs.length,
    itemListElement: slugs.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${origin}/articles/${a.id}/`,
      name: a.title,
    })),
  };
}
