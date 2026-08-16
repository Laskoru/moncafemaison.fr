# Playbook de création d'article — Mon Café Maison

Ce document décrit comment rédiger un nouvel article pour ce site (comparatifs
et conseils d'achat autour du café à la maison). Il est suivi par la routine
automatique **et** peut être utilisé à la main.

## Objectif d'une exécution

Créer **1 à 2 nouveaux articles** (vise 2 si les sujets s'y prêtent), chacun
**en brouillon** (`draft: true`), puis commiter et pousser sur `main`.
Les brouillons ne sont PAS visibles en ligne. Un process local ajoutera les
images (couverture + produits) et publiera. Soigne quand même la qualité, et
laisse toujours 2 produits à ASIN réels pour que le process local puisse finir.

Chaque article prend un sujet **différent**. Mieux vaut 1 article solide que 2
bâclés : si le 2e ne peut pas être fait correctement, n'en fais qu'un.

## Étapes (à répéter pour chaque article)

1. **Choisir le sujet.** Ouvre `CONTENT_IDEAS.md`, prends la première idée non
   cochée (`- [ ]`) — le 2e article prend la suivante. Vérifie qu'aucun fichier
   de `src/content/articles/` ne traite déjà le sujet. Coche l'idée (`- [x]`).
2. **Rédiger** dans `src/content/articles/<slug>.md` (slug kebab-case sans accents).
3. **Trouver les produits Amazon** (voir règle critique).
4. **Choisir une image** de couverture (voir règle images).
5. **Commiter et pousser** sur `main`.

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
  - asin: "B0XXXXXXXX"
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

## RÈGLE CRITIQUE : les produits Amazon (ASIN)

**Chaque article doit contenir 2 produits avec de vrais ASIN.** Une fois l'ASIN
présent, l'humain n'a plus qu'à déposer l'image `public/products/<ASIN>.jpg`. Ne
laisse donc PAS `products: []` — fais la recherche. Mais n'invente JAMAIS un ASIN
(lien cassé = zéro commission).

**Méthode quand `amazon.fr` est bloqué (routine cloud) :** WebSearch fait remonter
des URLs Amazon.
1. `WebSearch` : `<produit> amazon.fr` (ex. `moulin à café électrique amazon.fr`).
2. Repère les URLs `amazon.fr/.../dp/XXXXXXXXXX` — les 10 caractères après `/dp/`
   = l'ASIN (commence par `B0`).
3. Confirme avec `"<ASIN>" amazon` : la page doit bien correspondre au produit.
4. Choisis 2 produits pertinents et distincts.

En dernier recours seulement : `products: []` + une ligne
`# TODO-HUMAIN: ASIN à vérifier sur amazon.fr — <marque modèle 1>, <marque modèle 2>`.

- 2 produits/article ; le premier est « Notre choix ».
- **Ne remplis pas le champ `image:` des produits** : l'humain dépose
  `public/products/<ASIN>.jpg` et l'image apparaît automatiquement.

## Tableau comparatif (optionnel, recommandé)

Ajoute un bloc `comparison` au frontmatter quand tu compares des produits sur des
critères mesurables :

```yaml
comparison:
  columns: ["Critère", "Modèle A", "Modèle B"]
  rows:
    - ["Type de mouture", "Meules coniques", "Lames"]
    - ["Réglages", "40 crans", "aucun"]
```

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
