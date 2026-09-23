---
name: Mon Café Maison
description: Magazine de comparatifs café maison, finition « standard de la catégorie » (blanc chaud, encre café, cuivre torréfié).
colors:
  bg: "#fbf8f3"
  surface: "#ffffff"
  bg-soft: "#f4eee5"
  zebra: "#faf6f0"
  text: "#20170f"
  text-muted: "#5c5045"
  text-faint: "#77695c"
  border: "#e6ddd0"
  border-strong: "#cfc2b1"
  accent: "#a5531b"
  accent-hover: "#8a4416"
  accent-soft: "#f7ebe0"
  crema: "#5f7a4a"
  ink: "#20170f"
  on-ink: "#fbf8f3"
  on-ink-muted: "#c9bcae"
  accent-on-ink: "#e4955d"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.2vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.22rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body-article:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.72
  lede:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 600
    lineHeight: 1.2
  meta:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    fontFeature: "tnum"
  label:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  table:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "tnum"
  numeric-result:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "3.4rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  gutter: "1.25rem"
  gutter-mobile: "1rem"
  card-inset: "1.5rem"
  section: "3.25rem"
  section-mobile: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    padding: "0.7em 1.3em"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.surface}"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    padding: "0.7em 1.3em"
    height: "44px"
  button-outline-hover:
    textColor: "{colors.accent}"
  card-article:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "1rem 1.1rem 1.15rem"
  product-box:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.card-inset}"
  table-head:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    padding: "0.75rem 0.9rem"
  nav-link:
    textColor: "{colors.text}"
    typography: "{typography.ui}"
    padding: "0 0.75rem"
    height: "44px"
  nav-link-hover:
    textColor: "{colors.accent}"
  input-select:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "44px"
  segment-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
  ink-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    padding: "3rem 1.25rem"
---

# Design System: Mon Café Maison

## Overview

**Creative North Star : « La table de dégustation »**

Un magazine de comparatifs qui se lit comme une fiche de dégustation bien tenue : un fond blanc chaud, une encre presque noire tirée du café, un seul métal chaud (le cuivre torréfié) pour tout ce qui se clique. Le site joue franchement le standard de la catégorie (préférence durable de l'éditeur, voir PRODUCT.md) : grandes photos 16:9, titraille grotesque serrée, colonne de lecture en serif, tableaux zébrés, fiches produit à grande photo. Rien de décalé : la finition fait la différence, pas le concept.

La densité est celle d'un magazine web : des sections séparées par des filets de 1px, des cartes blanches à peine soulevées, beaucoup de métadonnées en petite grotesque chiffrée. La profondeur reste douce (deux ombres diffuses, jamais d'ombre dure). Le mouvement est bref et sobre : fondu d'entrée de la « une », glissement de flèche au survol, léger zoom de photo sur les cartes, tout neutralisé par `prefers-reduced-motion`.

La construction effective diffère d'un point de la direction initiale : l'image de la « une » n'est pas pleine largeur mais occupe la colonne gauche (58 %) d'une grille 58/42 ; seule la couverture d'article remplit sa colonne. Le code fait foi.

**Key Characteristics :**
- Blanc chaud + encre café + un seul accent cuivre ; vert crema réservé aux notes Amazon.
- Deux voix typographiques : Bricolage Grotesque (titres, interface, données), Source Serif 4 (lecture).
- Structure par filets fins horizontaux ; cartes blanches bord 1px, rayon 8px.
- Photos 16:9 partout (une, cartes, lignes éditoriales, couverture d'article) ; photos produit en carré sur fond blanc.
- Chiffres alignés (`tabular-nums`) dans les métadonnées, tableaux et résultats d'outil.
- Icônes SVG uniquement (`Icon.astro`), jamais d'emoji.

## Colors

Une palette de brûlerie claire : papier blanc chaud, encre café, cuivre torréfié, un vert crema discret.

### Primary
- **Cuivre torréfié** (`accent`) : liens, bouton principal, puces de liste, icônes de catégorie, libellé de catégorie, soulignement de l'onglet actif, bord de la fiche « Notre choix ». Contraste 5,14:1 sur `bg`, 5,45:1 sur `surface`.
- **Cuivre foncé** (`accent-hover`) : survol du bouton principal uniquement.
- **Voile cuivre** (`accent-soft`) : pastille ronde derrière l'icône de la recherche Amazon en milieu d'article.

### Secondary
- **Vert crema** (`crema`) : étoiles et note chiffrée Amazon, titre « On aime » et coches des points forts. Rien d'autre.

### Neutral
- **Blanc chaud** (`bg`) : fond de page ; fond des champs de formulaire.
- **Blanc** (`surface`) : cartes, en-tête, bande des catégories, pied de page, fiches produit, tableaux.
- **Grège** (`bg-soft`) : en-têtes de tableau, citations, encadrés d'astuce et de rupture de stock, fond des vignettes en attente.
- **Grège pâle** (`zebra`) : lignes paires des tableaux comparatifs.
- **Encre café** (`text`, et `ink` pour les fonds) : texte courant et titres ; fond de la bande « Nos outils » et du lien d'évitement.
- **Brun moyen** (`text-muted`) : chapeaux, descriptions, légendes, texte des pieds de page.
- **Brun clair** (`text-faint`) : métadonnées, mentions de lien partenaire, flèches au repos (5,01:1 sur `bg`, 4,60:1 sur `bg-soft` : c'est la limite basse, ne pas l'éclaircir).
- **Filet** (`border`) et **Filet appuyé** (`border-strong`) : séparations et bords de cartes ; bord des boutons contour et des champs ; séparateur « · » des métadonnées.
- **Sur encre** (`on-ink`, `on-ink-muted`, `accent-on-ink`) : texte, texte secondaire et accent sur fond `ink` (16,65:1, 9,48:1, 7,35:1). Les filets internes y sont `rgba(251, 248, 243, 0.18)`.

### Named Rules
**La règle du cuivre unique.** Le cuivre est la seule couleur d'interaction : tout ce qui est cuivre se clique ou désigne une catégorie. Aucune deuxième couleur d'accent pour les boutons, badges ou liens.

**La règle du vert crema.** Le vert ne sert qu'aux notes Amazon réelles et aux points forts, et uniquement sur fond `surface` (4,81:1). Sur `bg-soft` (4,17:1) ou `zebra` (4,46:1) il passe sous 4,5:1 : interdit.

**La règle de l'encre.** Le fond `ink` est une bande pleine largeur, une par page au plus ; son texte utilise exclusivement les jetons `on-ink*`.

## Typography

**Display Font :** Bricolage Grotesque 500–800 (repli Segoe UI, system-ui)
**Body Font :** Source Serif 4 400–600 + italique 400 (repli Georgia)
**Label/UI Font :** Bricolage Grotesque 500–600 (`--font-ui`, même famille que le display)

**Character :** une grotesque de titraille magazine, serrée et affirmée, sur une serif de lecture calme. Auto-hébergées (`public/fonts`, sous-ensembles latin et latin-ext), `font-display: swap`.

### Hierarchy
- **Display** (700, `clamp(2rem, 1.3rem + 2.2vw, 2.8rem)`, 1.06) : H1 unique. La « une » plafonne à 2.6rem (interligne 1.05, 16ch) ; le titre d'article aussi (`clamp(1.9rem, 1.2rem + 2.4vw, 2.6rem)`, 26ch).
- **Headline** (700, 1.6rem, 1.12) : H2 ; 1.55rem dans les en-têtes de section et blocs d'article ; 1.65rem dans le corps d'article, précédé d'un filet.
- **Title** (700, 1.22rem) : H3 ; 1.15rem sur les cartes, 1.25–1.3rem sur les lignes éditoriales et guides, 1.2rem sur les fiches produit.
- **Body** (400, 17px, 1.6) : texte courant. Corps d'article 1.0625rem / 1.72 sur 68ch ; premier paragraphe 1.2rem ; chapeau 1.12rem en `text-muted`, 62ch max.
- **UI** (600, 0.92–0.98rem) : boutons, navigation (0.95rem), liens de section.
- **Meta** (500, 0.85rem, chiffres tabulaires) : dates, durées de lecture, compteurs.
- **Label** (600–700, 0.74–0.8rem, 0.06–0.08em, capitales) : catégorie dans la rangée de métadonnées, en-têtes de tableau, titres de colonnes du pied de page, « Notre choix », « On aime / Ce qui peut gêner », libellé du sommaire.
- **Résultat chiffré** (800, 3.4rem, -0.03em) : nombres des outils ; unité en 1.3rem cuivre.

### Named Rules
**La règle des deux voix.** Serif pour lire, grotesque pour tout le reste (titres, boutons, métadonnées, tableaux, légendes). Jamais de serif dans l'interface ni de grotesque en paragraphe long.

**La règle du chiffre aligné.** Toute donnée chiffrée (dates, compteurs, tableaux, résultats) est en grotesque avec `tabular-nums`.

**La règle du plancher.** Aucun texte sous 0.72rem ; les capitales espacées démarrent à 0.74rem.

## Layout

Deux largeurs : `--wide` 1160px pour les pages et grilles, `--narrow` 720px pour les colonnes étroites ; la lecture d'article est bornée à `--measure` 68ch. Gouttière 1.25rem, 1rem sous 640px. En-tête collant de 64px (`--header-h`).

- **Accueil :** « une » en grille 58fr/42fr (écart 2.5rem), image 16:9 à gauche, titre du site, filet, puis le comparatif du moment et son bouton ; bande de 4 catégories séparées par des filets verticaux (2×2 sous 900px) ; sections espacées de 3.25rem (2.5rem sous 640px) avec en-tête titre + lien sur filet ; grille de cartes 3 → 2 (1000px) → 1 (640px) colonnes, écart 1.4rem ; bande encre « Nos outils » 1fr/2fr ; bloc méthode 5fr/7fr au-dessus de 900px.
- **Article :** fil d'Ariane, titre, métadonnées, couverture 16:9, bandeau de sommaire collant sous l'en-tête, fiche « Notre choix », corps 68ch, tableau comparatif, fiches produits, FAQ, sources, outils, articles liés.
- **Tableaux :** au-dessous de 760px, chaque ligne devient une fiche empilée où chaque cellule est précédée de son libellé.
- **Cibles tactiles :** 44px minimum pour boutons, liens de navigation, tuiles et champs ; 32px pour les liens de pied de page et de liste secondaire.

Points de rupture observés : 1000, 900, 760, 640, 600, 520, 480, 440px.

### Named Rules
**La règle du filet.** La structure se fait par filets horizontaux de 1px (`border`) : sous l'en-tête, entre sections, entre lignes de liste, au-dessus des H2 d'article. Les filets verticaux ne servent qu'à séparer des colonnes voisines, jamais comme barre colorée en bordure d'un bloc.

## Elevation & Depth

Hybride discret : le papier est plat, les objets cliquables ou recommandés sont posés dessus avec une ombre diffuse à étalement négatif, jamais décalée.

### Shadow Vocabulary
- **Posé** (`box-shadow: 0 8px 24px -12px rgba(32, 23, 15, 0.28)`, `--shadow-card`) : cartes article, fiches produit, image de la « une ».
- **Soulevé** (`box-shadow: 0 18px 36px -16px rgba(32, 23, 15, 0.32)`, `--shadow-lift`) : survol de carte, fiche produit mise en avant, fiche « Notre choix », menu mobile ouvert.

### Named Rules
**La règle des deux hauteurs.** Deux ombres seulement. « Soulevé » signifie survol ou recommandation ; tout le reste est posé ou plat.

## Shapes

Coins doucement arrondis et homogènes : 8px (`--radius`) pour cartes, boutons, champs, images, tableaux et encadrés ; 4px pour les pastilles et le code en ligne ; le carré du logo arrondit à 14/64. `--radius-lg` (12px) est déclaré mais inutilisé : ne pas l’introduire sans besoin. Seule forme ronde : la pastille d'icône de la recherche Amazon (44px). Bords 1px partout ; le bord passe au cuivre pour signaler la recommandation ou le survol d'un contour. Les photos sont recadrées `object-fit: cover` en 16:9, les photos produit `contain` sur blanc avec marge intérieure.

## Components

### Buttons
Francs et compacts, grotesque 600.
- **Shape :** coins doux (8px), hauteur minimale 44px, icône SVG 18px à droite.
- **Primary :** fond cuivre, texte blanc, `0.7em 1.3em` ; pleine largeur sur mobile dans la « une » et les fiches produit.
- **Hover / Focus :** fond cuivre foncé ; transitions de couleur 0.15s ; focus = contour cuivre 2px décalé de 3px (global).
- **Outline :** fond blanc, bord `border-strong`, texte encre ; au survol bord et texte cuivre. Même traitement pour les liens-outils en fin d'article.

### Cards / Containers
- **Carte article :** blanc, bord 1px, 8px, ombre posée ; photo 16:9 en tête (zoom 1.03 au survol), titre 1.15rem, métadonnées en pied (catégorie en capitales cuivre · date). Survol : ombre soulevée, bord appuyé, titre cuivre. Toute la carte est cliquable par lien étiré.
- **Ligne éditoriale :** vignette 16:9 de 240px + titre + description sur deux lignes + métadonnées, séparée par filets ; variante numérotée.
- **Encadrés :** citation, astuce d'outil, rupture de stock : fond grège, bord 1px, 8px.

### Inputs / Fields
- **Style :** select sur fond `bg`, bord `border-strong`, 8px, 44px, chevron SVG `text-faint` ; curseur natif teinté cuivre (`accent-color`).
- **Segments :** boutons contigus au même style ; actif = fond cuivre, texte blanc.
- **Focus :** contour cuivre global ; survol = bord cuivre.

### Navigation
- **En-tête :** blanc, collant, filet bas ; logo + nom en grotesque 700 1.2rem à gauche, six liens centrés (grotesque 600 0.95rem, 44px) ; lien courant souligné d'un trait cuivre de 2px ; survol cuivre.
- **Mobile (< 900px) :** bouton menu 44px bordé ; panneau déroulant blanc à ombre soulevée, liens 48px séparés par filets, liens secondaires en `text-muted` 500.
- **Sommaire d'article :** bande blanche collante sous l'en-tête entre deux filets, libellé « Sommaire » en capitales, chapitres défilant horizontalement avec fondu à droite, chapitre courant en encre souligné cuivre.
- **Pied de page :** blanc, quatre colonnes (marque, catégories, guides, le site), titres en capitales 0.76rem, liens `text-muted`, mention Partenaire Amazon en `text-faint`.

### Fiche produit (signature)
Grande photo carrée (220px) sur blanc à gauche, titre, note Amazon (cinq étoiles SVG masquées en vert crema + note chiffrée + nombre d'avis), accroche, colonnes « On aime » (coches crema) / « Ce qui peut gêner » (tirets `text-faint`), puis sous un filet : libellé « Notre choix » à côté du bouton Amazon et mention de lien partenaire. Variante mise en avant : bord cuivre + ombre soulevée. Variante sans photo : deux colonnes, verdict séparé par un filet vertical neutre.

### Fiche « Notre choix » (signature)
Encadré blanc bordé de cuivre, ombre soulevée, grille contenu / 40 % : nom du produit en grotesque 1.35rem et verdict à gauche ; libellé, bouton pleine largeur et mention partenaire à droite.

### Tableau comparatif (signature)
Enveloppe blanche bordée 8px, grotesque 500 0.92rem, en-tête grège en capitales 0.74rem `text-muted`, lignes paires `zebra`, première cellule de ligne en 600 encre ; empilé en fiches sous 760px.

### Rangée de métadonnées
Éléments séparés par un « · » en `border-strong`, porté par chaque élément et masqué en début de ligne : jamais de séparateur orphelin au retour à la ligne.

## Do's and Don'ts

### Do:
- **Do** utiliser `accent` pour tout ce qui est cliquable et rien d'autre ; `accent-hover` au seul survol du bouton principal.
- **Do** poser le libellé « Notre choix » à côté du bouton d'achat, jamais au-dessus du titre du produit.
- **Do** placer la catégorie dans la rangée de métadonnées, après le titre (catégorie · date · durée).
- **Do** recadrer toute photo éditoriale en 16:9 et toute photo produit en `contain` sur blanc.
- **Do** séparer les blocs par des filets 1px `border` et garder les cartes à 8px, bord 1px, ombre posée.
- **Do** mettre les chiffres en grotesque tabulaire et vérifier 4,5:1 pour tout texte, `text-faint` compris.

### Don't:
- **Don't** introduire une deuxième couleur d'accent ; le vert crema reste aux notes Amazon et aux points forts, sur blanc.
- **Don't** utiliser d'ombre dure décalée ni de dégradé décoratif en fond de page.
- **Don't** marquer un bloc par une barre colorée sur son bord gauche.
- **Don't** utiliser d'emoji ou de glyphe comme icône : uniquement `Icon.astro` (SVG).
- **Don't** mettre de particules ni d'objet 3D animé dans la « une ».
- **Don't** descendre sous 0.72rem de corps de texte.

## Sources des images

- **`public/covers/`** : photos Unsplash récupérées par les routines de publication, converties en WebP par la finition locale, avec variantes `-480` et `-960` pour le `srcset`. `hero-home.webp` (et ses variantes) sert aussi à l'image OG de l'accueil.
- **`public/products/`** : images produit Amazon issues du CDN produit `m.media-amazon.com`, enregistrées en `<ASIN>.jpg` par l'ancien pipeline produit de l'éditeur, pour les fiches produit Partenaires Amazon.
- **`public/pins/`** : épingles Pinterest générées par le générateur d'épingles de l'éditeur.
- **Logo, favicons, apple-touch-icon, `og-default.jpg`** (`logo.png`, `favicon-96.png`, `favicon-192.png`, `apple-touch-icon.png`, `og-default.jpg`) : produits par cette refonte ; la provenance est inscrite dans chaque fichier (« Mon Cafe Maison redesign 2026-09-23. No generative model. »). `favicon.svg` et `Logo.astro` en sont la source vectorielle (mêmes formes).
