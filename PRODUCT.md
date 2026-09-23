# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Des particuliers francophones qui veulent faire un meilleur café chez eux, le matin ou le week-end, et qui hésitent devant une machine, un moulin ou une méthode (espresso, filtre, piston, moka, cold brew). Ils cherchent une réponse claire et honnête avant d'acheter, souvent depuis leur téléphone après une recherche Google précise (« quelle machine à grain pour un petit budget », « mouture pour V60 »). Registre : tutoiement, du début à la fin.

## Product Purpose

Mon Café Maison (moncafemaison.fr) aide à choisir le bon matériel et la bonne méthode pour un excellent café à la maison : comparatifs de machines, moulins et accessoires, guides par besoin (débuter, espresso maison, filtre & slow coffee), fiches méthodes et outils gratuits (calculateur de dosage, panorama des méthodes). Succès : le lecteur repart avec une décision (méthode, matériel, réglage) et, quand un achat est pertinent, clique vers Amazon avec le lien partenaire.

## Positioning

Le site part de la tasse que l'on veut (résultat en bouche, temps, budget) et non de la liste des best-sellers : méthode d'abord, matériel ensuite. Notes Amazon réelles jamais retouchées, limites des produits écrites noir sur blanc, aucune marque ne paie pour figurer. Les recettes et techniques de préparation ne contiennent aucune recommandation produit.

## Operating Context

Site statique Astro 4 déployé sur Vercel à chaque push sur `main` (dépôt GitHub Laskoru/moncafemaison.fr). Les articles (markdown, frontmatter `title`/`seoTitle`/`description`/`category`/`topPick`/`comparison`/`faq`/`products`) sont écrits deux fois par semaine par une routine cloud, puis finis en local (couvertures WebP dans `public/covers/`, épingles Pinterest). Catégories : Machines & cafetières, Moulins à café, Accessoires & entretien, Préparer son café. Guides : Débuter le café maison, Réussir son espresso à la maison, Café filtre & slow coffee. Outils : calculateur de dosage, méthodes de café. Pages fixes : accueil, articles, catégories, guides, outils, lexique, à propos, auteur, contact, mentions légales, confidentialité, 404. Monétisation : liens de recherche Amazon avec le tag `moncafemaison-21` (jamais d'ASIN), CTA « Notre choix » et tableau comparatif sur les articles matériel. Analytics GA4 derrière un bandeau cookies, newsletter absente.

## Capabilities and Constraints

- Composants partagés à conserver fonctionnellement : Header, Footer, Breadcrumbs, ArticleCard, ArticleLayout (sommaire, fiche « Notre choix », produits, FAQ, sources, partage), AmazonProduct, AmazonSearchCTA, SelectionMethod, AuthorBox, CookieConsent, Icon (SVG uniquement, jamais d'emoji).
- Contraintes techniques : polices auto-hébergées (`public/fonts` + `src/styles/fonts.css`), aucune requête tierce hors GA4, Lighthouse mobile ≥ 95, CLS 0, contraste ≥ 4,5:1, `prefers-reduced-motion` respecté, pas de particules ni d'objet 3D animé dans le hero, texte ≥ 0,72 rem.
- Contenu : 27 articles publiés, couvertures locales, notes Amazon dans `src/data/amazon-ratings.json`. Ne jamais inventer d'avis, de prix ou de fait.
- Structure SEO conservée : H1 unique, JSON-LD Article/FAQ/Breadcrumb, canonical, sitemap, llms.txt, `seoTitle` quand le titre dépasse 65 caractères.

## Brand Commitments

Préférence durable (Hugo, 22/09/2026) : pour ce site, le **standard de la catégorie joué franchement**, au niveau de finition de Coffeeness (coffeeness.de/fr) et MaxiCoffee (blog) — comparatifs propres, grandes photos produits, tableaux clairs, ton expert accessible ; pas de concept visuel décalé.

Nom « Mon Café Maison » conservé ; tout le reste de l'identité visuelle (logo, couleurs, polices, mises en page) peut changer (décision d'Hugo, 22/09/2026). Auteur affiché : Hugo B. Voix : directe, tutoiement, concrète, sans jargon barista gratuit, honnête sur les limites.

## Evidence on Hand

Articles et comparatifs réels dans `src/content/articles/`, couvertures dans `public/covers/`, notes Amazon réelles, méthode de sélection décrite (SelectionMethod). Aucun témoignage client, aucun chiffre d'audience publiable : ne pas en fabriquer.

## Product Principles

- La méthode avant la machine : chaque page ramène à un résultat en tasse.
- Une décision par page : le lecteur doit savoir quoi faire en moins d'une minute.
- Honnêteté monétaire : liens partenaires signalés, limites des produits écrites, recettes sans pub.
- Lisibilité mobile d'abord : l'essentiel des lectures vient du téléphone.
- Cohérence avec les 7 autres sites de l'éditeur (mêmes règles techniques), identité visuelle propre.

## Accessibility & Inclusion

Contraste texte ≥ 4,5:1, navigation clavier complète avec focus visible, alternatives textuelles sur toutes les images, animations désactivables.
