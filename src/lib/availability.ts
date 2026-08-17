import availability from '../data/availability.json';
import { siteConfig } from '../siteConfig';

interface Entry {
  available: boolean;
  checked: string; // AAAA-MM-JJ
}

/**
 * Un produit est considéré comme achetable SAUF si le dernier relevé dit le
 * contraire (fichier src/data/availability.json, mis à jour chaque jour par
 * scripts/check-availability.sh).
 *
 * Le doute profite au lien produit : un ASIN encore jamais relevé pointe vers
 * sa fiche, qui reste le lien le plus rentable. Seule une indisponibilité
 * CONSTATÉE fait basculer vers la recherche.
 */
export function isAvailable(asin: string): boolean {
  const entry = (availability as Record<string, Entry>)[asin];
  if (!entry) return true;
  return entry.available !== false;
}

/**
 * Lien affilié vers la fiche produit.
 */
export function productUrl(asin: string): string {
  return `https://www.amazon.fr/dp/${asin}?tag=${siteConfig.amazon.tag}`;
}

/**
 * Lien affilié vers une recherche Amazon. Les liens de recherche sont
 * autorisés par le programme Partenaires et rémunérés de la même façon :
 * tout achat qualifiant après le clic est attribué au tag.
 * Sert de repli quand le produit visé n'est plus achetable.
 */
export function searchUrl(query: string): string {
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&tag=${siteConfig.amazon.tag}`;
}

/**
 * Nettoie un titre de produit pour en faire une requête de recherche utile.
 * On retire la partie descriptive après le tiret cadratin (« — 2 moteurs,
 * mémoire… ») pour ne garder que la marque et le modèle.
 */
export function queryFromTitle(title: string): string {
  return title.split('—')[0].replace(/\s+/g, ' ').trim();
}
