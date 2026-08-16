import fs from 'node:fs';
import path from 'node:path';

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;

/**
 * Résout l'image de couverture d'un article, comme pour les produits :
 *  1. si un fichier local public/covers/<slug>.<ext> existe, on l'utilise
 *     (c'est le cas nominal : le process local télécharge la couverture) ;
 *  2. sinon on retombe sur l'URL `coverImage` du frontmatter si elle existe
 *     (compatibilité avec les anciens articles en URL Unsplash) ;
 *  3. sinon null (l'article s'affiche sans couverture).
 * Exécuté au build (Node), donc l'accès disque est OK.
 */
export function resolveCoverImage(slug: string, explicit?: string): string | null {
  // le slug d'une collection peut contenir un sous-dossier ; on ne garde que le nom de fichier
  const base = slug.split('/').pop() ?? slug;
  for (const ext of imageExtensions) {
    const localPath = path.join(process.cwd(), 'public', 'covers', `${base}.${ext}`);
    if (fs.existsSync(localPath)) return `/covers/${base}.${ext}`;
  }
  if (explicit) return explicit;
  return null;
}
