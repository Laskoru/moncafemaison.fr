// Génère un brief TikTok (accroche, points à filmer, légende, hashtags) par
// article publié. Pas de génération vidéo : ça reste à filmer/monter à la
// main, ce script écrit juste tout le texte pour ne plus avoir à le rédiger.
// Usage : node scripts/generate-tiktok-briefs.mjs
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://www.moncafemaison.fr';
const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const OUT_DIR = path.join(ROOT, 'tiktok-export');

const HASHTAGS_BY_CATEGORY = {
  machines: ['#machineacafe', '#espressoathome', '#cafemaison'],
  moulins: ['#moulinacafe', '#cafemaison', '#baristahome'],
  accessoires: ['#cafemaison', '#baristahome', '#coffeegadgets'],
};

function buildBrief(data, slug) {
  const link = `${SITE_URL}/articles/${slug}`;
  const hashtags = [...(HASHTAGS_BY_CATEGORY[data.category] ?? []), '#pourtoi'].join(' ');
  const firstProduct = (data.products ?? [])[0];

  return `# ${data.title}

## Accroche (3 premières secondes, à dire ou afficher en texte)
"${data.description.split('.')[0]}."

## Ce qu'il faut montrer à la caméra (30-45 secondes au total)
1. Plan large du problème / de la situation avant (ex. café raté, matériel générique, geste imprécis)
2. Le produit en action, montré concrètement — pas juste posé
${firstProduct ? `3. Zoom sur le produit recommandé : "${firstProduct.title}"${firstProduct.blurb ? ` — ${firstProduct.blurb}` : ''}` : '3. Zoom sur les 2-3 critères les plus importants pour bien choisir'}
4. Plan de conclusion + rappel du lien en bio/commentaire

## Légende à copier-coller
${data.description} Le comparatif complet est en lien 👉 ${link}

## Hashtags
${hashtags}
`;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
  let done = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const { data } = matter(raw);
    if (data.draft) continue;

    const brief = buildBrief(data, slug);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), brief, 'utf8');
    done++;
  }

  console.log(`\n✅ ${done} briefs TikTok générés dans tiktok-export/`);
}

main();
