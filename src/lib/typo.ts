/**
 * Espaces insécables de la typographie française : devant « : ; ! ? » » et après « « »,
 * pour éviter un signe orphelin en début de ligne dans les titres affichés.
 * À réserver aux textes rendus (H1, titres de cartes), jamais aux données (schema, <title>).
 */
export function frenchNbsp(s: string): string {
  return s.replace(/ ([:;!?»])/g, ' $1').replace(/« /g, '« ');
}
