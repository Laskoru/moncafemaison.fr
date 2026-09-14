import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(), // sert de meta-description SEO
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    // mots-clés ciblés par l'article, utile pour ton suivi éditorial
    keywords: z.array(z.string()).default([]),
    // catégorie utilisée pour le classement par thème sur l'accueil
    category: z.enum(['machines', 'moulins', 'accessoires', 'preparer']),
    // image de couverture optionnelle, chemin relatif dans /public
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    // Produits Amazon à recommander dans cet article
    products: z
      .array(
        z.object({
          asin: z.string(), // identifiant produit Amazon, visible dans l'URL du produit
          title: z.string(),
          // Image produit (OPTIONNEL) : le plus simple est de NE PAS remplir ce
          // champ et de déposer la photo dans public/products/<ASIN>.jpg —
          // elle est alors détectée automatiquement. Voir public/products/README.md.
          // Ce champ ne sert que si tu veux forcer une URL précise.
          image: z.string().optional(),
          blurb: z.string().optional(), // une phrase expliquant pourquoi tu le recommandes

          // Points forts / limites honnêtes (transparence = confiance).
          pros: z.array(z.string()).default([]),
          cons: z.array(z.string()).default([]),
          // Libellé du ruban (défaut « Notre choix »).
          award: z.string().optional(),

          search: z.string().optional(),
        })
      )
      .default([]),
    // Questions fréquentes affichées en bas d'article (aussi utilisées pour le rich snippet FAQ)
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .default([]),
    // Tableau comparatif optionnel, affiché après le corps de l'article.
    // `columns` = en-têtes (ex. ["Critère", "Modèle A", "Modèle B"]),
    // `rows` = lignes, chacune ayant le même nombre de cellules que `columns`.
    comparison: z
      .object({
        columns: z.array(z.string()),
        rows: z.array(z.array(z.string())),
      })
      .optional(),
    // Sources & références externes citées en bas d'article (E-E-A-T).
    sources: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    // Carte « Notre choix » (conversion) : recommandation visible + bouton CTA.
    // Compatible modèle liens-de-recherche (url = recherche Amazon avec &tag), sans ASIN.
    topPick: z
      .object({
        name: z.string(),
        blurb: z.string().optional(),
        url: z.string().url(),
        ctaLabel: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { articles };
