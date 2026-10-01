// Mise en avant saisonnière de l'accueil, calculée à la date du build (heure de Paris).
// Le site est reconstruit à chaque push (dont les commits automatiques du flux Pinterest
// et du relevé de disponibilité) : la section apparaît et disparaît d'elle-même. Pour tester : SEASON_DATE=2026-11-15 npm run build
export interface Season { slug: string; from: string; to: string } // MM-JJ inclus

export const SEASONS: Season[] = [
  { slug: 'black-friday-cafe-guide-achat', from: '10-25', to: '12-01' },
  { slug: 'idees-cadeaux-cafe-par-budget', from: '11-01', to: '12-24' },
];

export function parisToday(): string {
  const forced = process.env.SEASON_DATE;
  if (forced && /^\d{4}-\d{2}-\d{2}$/.test(forced)) return forced;
  // en-CA formate en AAAA-MM-JJ
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

/** Slugs à mettre en avant aujourd'hui, dans l'ordre de SEASONS. */
export function activeSeasonSlugs(today = parisToday()): string[] {
  const md = today.slice(5);
  return SEASONS.filter((s) => md >= s.from && md <= s.to).map((s) => s.slug);
}
