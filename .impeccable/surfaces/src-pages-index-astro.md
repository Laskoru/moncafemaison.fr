---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/layouts/ArticleLayout.astro","src/layouts/BaseLayout.astro"]
---

# Accueil — Mon Café Maison

Scope : la page d'accueil (src/pages/index.astro) et le monde visuel qu'elle installe pour tout le site (article, catégorie, guide, outils, 404). Mode : Read (le visiteur comprend quelle méthode/quel matériel lui convient) avec une action de lecture claire.

Audience : particuliers francophones, souvent sur téléphone, après une recherche Google précise. Job : décider d'une méthode puis d'un matériel. Action : ouvrir le bon comparatif ou l'outil de dosage. Preuve : 27 comparatifs réels, notes Amazon réelles, méthode de sélection publiée, auteur nommé (Hugo B.). Contraintes : registre tu, polices auto-hébergées, Lighthouse mobile ≥ 95, pas de particules ni d'objet 3D, icônes SVG seulement, aucune reco produit dans les recettes.

Direction choisie : le standard de la catégorie joué franchement, au niveau de finition de Coffeeness (coffeeness.de/fr) et MaxiCoffee/Coffee Spirit — mise en page de magazine café pro, grandes photos, comparatifs propres. Moment mémorable : la grande couverture du comparatif du moment, pleine largeur, avec sa décision en une ligne.

## Direction contract

THESIS: Mon Café Maison est un magazine de comparatifs café qui a le sérieux et la finition des leaders (Coffeeness, Coffee Spirit) : photo pleine largeur, titres nets, tableaux lisibles. Il refuse le hero de site affilié générique (badge « comparatifs indépendants » + trois statistiques + deux boutons) et le halo de dégradés en fond de page.

OWN-WORLD: fond blanc chaud (#fbf8f3) et non crème ; encre café très sombre (#20170f) ; un seul accent cuivre torréfié (#a5531b) pour liens/CTA, un vert crema (#5f7a4a) réservé aux notes Amazon ; surfaces cartes blanches à bord 1px (#e6ddd0), rayons 8px, ombre 0 8px 24px -12px. Typographie : display « Bricolage Grotesque » (large, condensé aux grands corps, caractère de titraille magazine), corps « Source Serif 4 » 17px pour la lecture, « Bricolage Grotesque » 500 pour les métadonnées et tableaux. Filets horizontaux fins pour structurer, jamais de bordure gauche colorée. Reconnaissable sans contenu : grande image 16:9 pleine largeur, colonne de lecture 68ch, bandeau de sommaire collant, tableau comparatif zébré.

STORY: le visiteur comprend en une seconde qu'il est sur un site café sérieux et français ; il croit les comparatifs parce que la méthode, l'auteur et les notes réelles sont visibles ; il fait : ouvre le comparatif du moment ou choisit sa catégorie (Machines, Moulins, Accessoires, Préparer).

FIRST VIEWPORT: en-tête blanc 64px, logo « Mon Café Maison » en Bricolage Grotesque à gauche, quatre catégories + Guides + Outils au centre, pas de champ de recherche. Sous l'en-tête, une « une » de magazine : à gauche (58 %) la couverture du dernier comparatif en 16:9 arrondie 8px, à droite (42 %) la catégorie en petites capitales cuivre, le titre H1 du site en 2.6rem (« Le bon café à la maison, méthode d'abord ») puis le titre du comparatif en lien 1.5rem, sa description, et le bouton cuivre « Lire le comparatif » ; sous la une, une rangée de 4 tuiles de catégories avec icône SVG, nom, nombre d'articles, séparées par des filets. Mobile : image au-dessus, texte dessous, bouton pleine largeur.

FORM: le standard de la catégorie, sortie permanente prise par l'utilisateur (canon) ; position hors liste ; clé de graine aca5a7ca.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
