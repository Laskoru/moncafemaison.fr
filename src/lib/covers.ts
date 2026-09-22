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

/**
 * srcset des variantes responsives d'une couverture locale (générées par la finisseuse :
 * <slug>-480.webp et <slug>-960.webp). Sans variante (article tout neuf), retourne undefined
 * et l'attribut est simplement omis : l'image d'origine est servie comme avant.
 */
export function coverSrcSet(cover: string | null | undefined): string | undefined {
  const m = cover?.match(/^\/covers\/(.+)\.(webp|jpe?g|png)$/);
  if (!m) return undefined;
  // Largeur réelle du fichier : le pipeline cloud livre du 1080 px, le local du 1600 px.
  // Annoncer la vraie largeur évite au navigateur de choisir une variante « trop petite ».
  const full = imageWidth(cover as string) ?? 1600;
  const parts: string[] = [];
  for (const w of [480, 960]) {
    const f = `/covers/${m[1]}-${w}.webp`;
    if (w < full && fs.existsSync(path.join(process.cwd(), 'public', f))) parts.push(`${f} ${w}w`);
  }
  if (!parts.length) return undefined;
  parts.push(`${cover} ${full}w`);
  return parts.join(', ');
}

/** Largeur (px) d'une image locale de /public — WebP, PNG ou JPEG — lue dans l'en-tête, avec cache. */
const widthCache = new Map<string, number | null>();
export function imageWidth(publicPath: string): number | null {
  const cached = widthCache.get(publicPath);
  if (cached !== undefined) return cached;
  let w: number | null = null;
  try {
    const b = fs.readFileSync(path.join(process.cwd(), 'public', publicPath));
    if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const chunk = b.toString('ascii', 12, 16);
      if (chunk === 'VP8 ') w = b.readUInt16LE(26) & 0x3fff;
      else if (chunk === 'VP8L') w = (b.readUInt32LE(21) & 0x3fff) + 1;
      else if (chunk === 'VP8X') w = 1 + (b[24] | (b[25] << 8) | (b[26] << 16));
    } else if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
      w = b.readUInt32BE(16);
    } else if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) { w = b.readUInt16BE(i + 7); break; }
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  } catch { w = null; }
  widthCache.set(publicPath, w && w > 0 ? w : null);
  return w && w > 0 ? w : null;
}
