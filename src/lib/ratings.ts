import ratings from '../data/amazon-ratings.json';

export interface Rating {
  rating: number; // note moyenne sur 5 (ex. 4.5)
  count: number; // nombre d'avis
  updated: string; // date de récupération AAAA-MM-JJ
}

/**
 * Renvoie la note Amazon réelle d'un produit si elle a été récupérée
 * (fichier src/data/amazon-ratings.json, maintenu par le process local).
 * Ces données sont factuelles : on n'invente jamais de note.
 */
export function getRating(asin: string): Rating | null {
  const all = ratings as Record<string, Rating>;
  const r = all[asin];
  if (!r || typeof r.rating !== 'number' || typeof r.count !== 'number') return null;
  return r;
}
