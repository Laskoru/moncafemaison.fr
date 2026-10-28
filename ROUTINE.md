# Règles communes des routines de publication

Ce fichier est lu par la routine cloud de publication avant d'écrire. Toutes ses règles s'appliquent intégralement, sans exception. Le prompt de la routine y ajoute ce qui est propre au site : thème, registre (tutoiement ou vouvoiement), catégories, champs particuliers (plantCare, fishCare, recipe, ageRange, medicalNotice...), cas où mettre ou non des liens Amazon, exclusions du bonus conversion et photo de repli pour la couverture.

## 1. Rythme

Si un article de `src/content/articles/` porte déjà `pubDate` = la date du jour (`date +%F`), ne publie rien de plus aujourd'hui : termine sans commit et dis-le dans le récapitulatif.

## 2. Frontmatter

Frontmatter complet, sur le modèle des articles publiés :

- `title` de 60 caractères MAXIMUM (accrocheur mais court). Si tu gardes malgré tout un title plus long, ajoute OBLIGATOIREMENT le champ `seoTitle` (60 caractères max, mot-clé principal en premier, sans nom de site) : il remplace le title dans la balise `<title>` et l'`og:title`, le H1 garde le title complet. Pas d'année dans le title.
- `description` de 120 à 155 caractères.
- `pubDate` via `date +%F`, `updatedDate` idem.
- `author` "Hugo B.".
- `keywords`, `category` (une catégorie valide de `src/content.config.ts`), `coverAlt`, `pinHook`, `pinSub`.
- `faq` de 2 à 3 VRAIES questions d'internautes sur le sujet (celles que Google suggère : pourquoi, comment, combien, faut-il...) avec des réponses de 2 à 3 phrases qui apportent une info absente du corps. Si aucune vraie question ne reste, omets le champ `faq` plutôt que d'en inventer.
- `sources` (voir section 5).
- `draft: false`.
- PAS de `products`.

Corps en français, titres `##` / `###`, 3 à 4 liens internes `/articles/<slug>/`. Fin d'article variée selon le sujet (court paragraphe de conclusion sans intertitre, `## Notre avis`, `## Ce qu'il faut retenir`, checklist...) : jamais deux synthèses, et pas de `## En résumé` systématique. Unités avec une espace (18 °C, 230 V, 58 mm).

## 3. Écriture et référencement (le SEO d'abord, sans signature d'IA)

- **Longueur selon l'intention de recherche** : question précise 700 à 1100 mots ; guide ou méthode 1100 à 1600 ; comparatif ou guide d'achat 1400 à 2000. Chaque paragraphe apporte une info : ne délaye jamais pour atteindre un nombre de mots.
- **SEO** : la requête principale de l'idée (notée « requête » dans CONTENT_IDEAS.md quand elle y est) figure mot pour mot dans le title (au début si possible), la description, la 1re phrase et un titre `##`. La réponse directe tient dans les 2 à 3 premières phrases (pour l'extrait en position zéro). Les requêtes associées données dans l'idée deviennent des `##` ou `###` formulés comme les gens les tapent. Un tableau ou une liste quand cela aide à comparer. 3 à 4 liens internes contextuels avec une ancre descriptive. `coverAlt` descriptif.
- **Titres variés** : question, « Comment... », chiffre, « X : Y »... pas toujours le format « X : Y » ; mot-clé principal en premier.
- **Ponctuation** : n'utilise JAMAIS le tiret long (—) ni le demi-cadratin (–) comme ponctuation, ni dans le texte ni dans le frontmatter ; mets une virgule, deux-points ou des parenthèses.
- **Formules interdites** : « change tout », « change la donne », « bonne nouvelle », « le secret », « la clé » au sens figuré, « voici comment » ou « voici pourquoi » en début de phrase, « incontournable », « véritable allié », « petit plus », « dans cet article », « il est important de noter », « n'hésite pas », « n'hésitez pas », « en conclusion », « le guide complet », « tout ce qu'il faut savoir », « plongeons ».
- **Concret** : chiffres, dimensions, durées, exemples précis, avis argumenté. Jamais de faux test ni de vécu inventé (« j'ai testé », « chez moi »).

## 4. Style naturel (aucune signature d'IA)

Phrases de longueur variée, dont des courtes. Pas d'énumérations en trois temps à répétition. Pas de question rhétorique suivie de sa réponse. Pas d'introduction qui reformule le titre. Du gras seulement sur l'essentiel. Des exemples précis (situations, mesures, modèles) plutôt que des généralités. Un avis tranché et argumenté quand le sujet s'y prête. Écris comme un rédacteur qui connaît son sujet et parle à son lecteur, pas comme une fiche.

## 5. Sources solides

Directive d'Hugo du 27/09/2026 : des articles solides, avec des sources solides.

- Avant d'écrire, trouve et OUVRE 2 à 4 sources fiables sur le sujet. WebFetch est OBLIGATOIRE : ouvre chaque page avec WebFetch et lis-la. Si WebFetch échoue sur une page, ne la cite pas et prends une autre source que tu peux ouvrir.
- Chaque chiffre, durée, âge, dose, température ou règle de l'article doit figurer dans une page que tu as ouverte, sinon retire-le.
- Sources acceptées : organismes officiels (ameli.fr, sante.fr, anses.fr, service-public.fr, economie.gouv.fr, ademe.fr, inrae.fr, securite-routiere.gouv.fr...), instituts, fédérations et associations reconnues, notice ou documentation du fabricant pour les caractéristiques techniques, études publiées. Jamais un blog concurrent, une fiche marchande ni un comparatif sponsorisé.
- Chaque chiffre, dosage, durée, température, règle ou caractéristique technique vient d'une de ces sources ou d'un savoir pratique courant présenté comme tel. Ce que tu ne peux pas vérifier, retire-le ou dis-le sans chiffre.
- Liste ces sources dans le frontmatter, champ `sources`, au même format que les articles qui en ont déjà : `- label: "Organisme, « Titre exact de la page »"` puis `url: "https://..."`. Uniquement des pages que tu as ouvertes et qui confirment l'article ; jamais d'URL, de titre ni d'organisme inventé.
- Si une source contredit ce que tu allais écrire, suis la source.

## 6. Bonus conversion (format)

Seulement pour un article MATÉRIEL ou guide d'achat (les exclusions propres au site sont dans le prompt). Ajoute au frontmatter :

- (a) `topPick: { name: <ce que tu recommandes>, blurb: <1 phrase>, url: <lien de recherche Amazon avec &tag=<TAG>>, ctaLabel: <ex. "Comparer sur Amazon"> }` (carte Notre choix + bouton) ;
- (b) `comparison: { columns: [...], rows: [[...]] }` si tu compares plusieurs options ou types (tableau).

Boost des clics.

## 7. Couverture via Unsplash MCP

Recherche avec `mcp__Unsplash__search_photos`, requête EN anglais et précise. NE télécharge RIEN (réseau bloqué).

- a) LIS la description et l'alt_description de chaque résultat : garde une photo qui MONTRE le sujet de l'article ; sinon une photo large honnête du thème (le prompt du site indique lequel) ; sinon `draft: true`.
- b) ANTI-DOUBLON : l'identifiant d'image est la partie `photo-XXXXXXXX` de `urls.regular`. Il ne doit figurer ni dans `public/covers/sources.txt` ni dans le `coverImage` d'un autre article (`grep -r`) ; sinon prends-en une autre.
- c) Mets `urls.regular` dans `coverImage:` et ajoute à `public/covers/sources.txt` (crée-le s'il manque) la ligne `<slug> <photo-XXXXXXXX> <urls.regular>`.
- d) `coverAlt` = ce que la PHOTO montre, d'après sa description Unsplash traduite (80 à 125 caractères) : jamais un objet, un lieu ou une espèce qui n'y figure pas.
- Supprime la ligne `# COVER`.

## 8. Lien entrant (maillage interne, seulement si draft:false)

Choisis UN article publié de la même catégorie au sujet proche. S'il a une section `## Pour aller plus loin`, ajoute à sa liste la ligne `- [<title du nouvel article>](/articles/<slug>/)` et ne change RIEN d'autre dans ce fichier. Sinon ne touche à rien.

## 9. Contrôle avant commit

- title ≤ 60 caractères (sinon seoTitle ≤ 60) et sans année ;
- description de 120 à 155 caractères ;
- au plus une section de synthèse ;
- chaque lien `/articles/<slug>/` du nouvel article pointe vers un fichier existant (`ls src/content/articles/<slug>.md`) ;
- coverAlt présent et fidèle à la photo ;
- aucun tiret long ni demi-cadratin : `grep -c ' — \| – ' src/content/articles/<slug>.md` doit renvoyer 0 ;
- aucune formule interdite (section 3) ;
- la requête principale est dans le title, la description, la 1re phrase et un `##` ;
- le champ `sources` liste 2 à 4 pages réellement ouvertes avec WebFetch qui confirment l'article (aucune URL inventée) ;
- relis chaque chiffre de l'article et vérifie qu'il figure dans une de ces pages.

Corrige, puis relance le build si tu as modifié quelque chose.
