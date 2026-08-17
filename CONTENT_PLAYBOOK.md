# Playbook de création d'article — Mon Café Maison

Ce document décrit comment rédiger un nouvel article pour ce site (comparatifs
et conseils d'achat autour du café à la maison). Il est suivi par la routine
automatique **et** peut être utilisé à la main.

## Objectif d'une exécution

Créer **1 seul nouvel article**, **en brouillon** (`draft: true`), puis commiter
et pousser sur `main`. Les brouillons ne sont PAS visibles en ligne : un process
local ajoute les images (couverture + produit) et publie ensuite. Laisse
toujours 1 produit à ASIN réel pour qu'il puisse finir le travail.

### Format éditorial : guide → recherche → un seul choix

Chaque article est un **vrai guide d'achat**, pas un duel entre deux fiches
produit. Il se termine par UN SEUL produit recommandé, pas deux. La page se lit
dans cet ordre (la recherche et le produit sont ajoutés automatiquement par le
site, tu n'as rien à écrire pour eux) :

1. Le corps de l'article : ce qui compte, les critères à vérifier avant
   d'acheter, comment choisir selon son usage. C'est la partie que tu écris.
2. Un lien « Voir « *mot-clé* » sur Amazon » généré automatiquement à partir de
   `keywords[0]` — un lien de recherche, jamais mort, pour qui veut comparer
   lui-même les modèles du moment.
3. Le bloc « Notre choix » : le produit unique du frontmatter, avec son image,
   sa note réelle et son prix.

Pourquoi un seul produit et pas deux : un ASIN unique divise par deux le risque
de rupture de stock, élimine le problème d'écart de prix entre deux produits,
et le lien de recherche du point 2 fait déjà le travail de comparaison — sans
jamais devenir obsolète, contrairement à une fiche produit précise.

### Pourquoi un seul article (et pas plus)

Le site publie **délibérément peu : 3 articles par semaine maximum**. La
fréquence de publication n'est pas un critère de classement Google, et un
volume élevé sur un domaine récent relève au contraire du « scaled content
abuse » que Google sanctionne depuis 2024.

La consigne est donc claire : **prends tout le temps nécessaire pour un seul
article vraiment bon** plutôt que d'en produire plusieurs corrects. Un article
de plus ne fera jamais gagner de positions ; un article médiocre peut en faire
perdre.

## Étapes

1. **Choisir le sujet.** Ouvre `CONTENT_IDEAS.md`, prends la première idée non
   cochée (`- [ ]`). Vérifie qu'aucun fichier de `src/content/articles/` ne
   traite déjà le sujet. Coche l'idée (`- [x]`).
2. **Rédiger** dans `src/content/articles/<slug>.md` (slug kebab-case sans accents).
3. **Trouver les produits Amazon** (voir règle critique).
4. **Mailler en interne** : lier 2 à 3 articles existants (voir plus bas).
5. **Renseigner l'indication de couverture** (voir règle images).
6. **Commiter et pousser** sur `main`.

## Maillage interne (à ne pas négliger)

Chaque nouvel article doit citer et lier **2 à 3 articles existants** du site,
avec un lien markdown vers `/articles/<slug>` et une ancre naturelle intégrée
à une phrase (pas de « cliquez ici »). Exemple :

```md
La qualité de la mouture compte autant que la machine : voir notre comparatif des
[moulins à café électriques](/articles/meilleur-moulin-cafe-electrique).
```

C'est l'un des rares leviers SEO entièrement sous notre contrôle : il fait
circuler l'autorité entre les pages et aide Google à comprendre la structure
thématique du site.

## Format du frontmatter

```md
---
title: "Titre avec le mot-clé principal (55-65 caractères)"
description: "Méta-description SEO, 110-130 caractères, avec le mot-clé principal."
pubDate: AAAA-MM-JJ   # date du jour
author: "Rédaction"
keywords: ["mot-clé principal", "variante 1", "variante 2"]
category: "machines"   # UNIQUEMENT : machines | moulins | accessoires
# coverImage : NE PAS mettre d'URL. La couverture est téléchargée localement
# (public/covers/<slug>.jpg) exactement comme les images produits.
coverAlt: "Description factuelle de l'image"
draft: true            # le process local passe à false après avoir ajouté les images
products:
  - asin: "B0XXXXXXXX"        # UN SEUL produit — voir « RÈGLE CRITIQUE » plus bas
    title: "Marque Modèle — 2-3 caractéristiques clés"
    blurb: "Une phrase : pour qui / pourquoi ce produit."
faq:
  - question: "Question fréquente réelle sur le sujet ?"
    answer: "Réponse honnête et concrète, 2-3 phrases."
---
```

## Structure du corps

- **800 mots minimum** de contenu utile.
- 4 à 6 titres `##`, ex. : `## Pourquoi [le sujet] change le café`,
  `## Les critères qui comptent vraiment`, `## Comment choisir selon ton usage`,
  `## Conclusion`.
- Ton : tutoiement, direct, honnête, sans jargon marketing. On assume les
  compromis. **Ne jamais inventer** de chiffres précis (prix, notes) invérifiables.
- Vocabulaire café à mobiliser selon le sujet : mouture, meules, pression (bars),
  crema, extraction, fraîcheur des grains, entretien/détartrage, pour-over, etc.

## RÈGLE CRITIQUE : le produit Amazon (ASIN)

**Chaque article doit contenir UN SEUL produit avec un vrai ASIN.** Une fois
l'ASIN présent, l'humain n'a plus qu'à déposer l'image
`public/products/<ASIN>.jpg`. Ne laisse donc PAS `products: []` — fais la
recherche. Mais n'invente JAMAIS un ASIN (lien cassé = zéro commission).
N'ajoute JAMAIS un deuxième produit — le format n'en veut qu'un (voir la
section format éditorial plus haut).

**Méthode quand `amazon.fr` est bloqué (routine cloud) :** WebSearch fait remonter
des URLs Amazon.
1. `WebSearch` : `<produit> amazon.fr` (ex. `moulin à café électrique amazon.fr`).
2. Repère les URLs `amazon.fr/.../dp/XXXXXXXXXX` — les 10 caractères après `/dp/`
   = l'ASIN (commence par `B0`).
3. Confirme avec `"<ASIN>" amazon` : la page doit bien correspondre au produit,
   sur le marché **français** (amazon.fr, pas .it/.com/.de — un même produit a
   un ASIN différent selon le pays).
4. Choisis le produit le plus représentatif du sujet — celui que tu
   recommanderais spontanément, pas forcément le moins cher ni le plus cher.

En dernier recours seulement : `products: []` + une ligne
`# TODO-HUMAIN: ASIN à vérifier sur amazon.fr — <marque modèle envisagé>`.

- **Un seul produit par article** — le bloc « Notre choix » en fin de page.
- **Ne remplis pas le champ `image:` du produit** : l'humain dépose
  `public/products/<ASIN>.jpg` et l'image apparaît automatiquement.
- **N'ajoute pas de bloc `comparison`.** Ce format a été abandonné (il
  comparait deux SKU précis, ce qui devenait faux dès que l'un des deux
  changeait de prix ou de stock). Compare des approches en prose dans
  `## Comment choisir selon ton usage` plutôt que deux produits nommés.

## Règle images (couverture + produits : tout est géré en local)

Ne cherche PAS d'URL d'image. Les photos sont téléchargées par le process local,
comme les images produits :

- **Couverture** : n'ajoute pas de `coverImage`. Renseigne seulement `coverAlt`
  et ajoute dans le frontmatter une indication pour le process local :
  `# COVER: <mots-clés en anglais pour trouver la photo>` (ex. `# COVER: pour over coffee dripper`).
  Le process local téléchargera la photo dans `public/covers/<slug>.jpg`, détectée
  automatiquement au build.
- **Produits** : ne remplis pas `image:`. Le process local dépose
  `public/products/<ASIN>.jpg`.

## Commit

Message clair (`Nouveaux brouillons : <titres>`) + push sur `main`.
Les articles restent `draft: true` (invisibles) jusqu'à ce que le process local
ajoute les images et passe `draft: false`.
