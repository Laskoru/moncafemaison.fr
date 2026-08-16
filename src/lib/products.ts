import fs from 'node:fs';
import path from 'node:path';

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;

/**
 * Résout l'image d'un produit, du plus explicite au plus automatique :
 *  1. si `explicit` (champ `image:` du frontmatter) est fourni, on le renvoie ;
 *  2. sinon on cherche un fichier local public/products/<ASIN>.<ext> ;
 *  3. sinon null (le produit s'affiche sans image).
 * Exécuté au build (Node), donc l'accès disque est OK.
 */
export function resolveProductImage(asin: string, explicit?: string): string | null {
  if (explicit) return explicit;
  for (const ext of imageExtensions) {
    const localPath = path.join(process.cwd(), 'public', 'products', `${asin}.${ext}`);
    if (fs.existsSync(localPath)) return `/products/${asin}.${ext}`;
  }
  return null;
}

/** Renvoie les images résolues des `limit` premiers produits (sans les null). */
export function resolveProductImages(
  products: { asin: string; image?: string }[] = [],
  limit = 2
): string[] {
  return products
    .slice(0, limit)
    .map((p) => resolveProductImage(p.asin, p.image))
    .filter((src): src is string => src !== null);
}
