# Template de site de contenu (Astro)

Template prêt à l'emploi pour lancer un site de contenu monétisé par la publicité.
Articles en Markdown, SEO intégré, bandeau cookies RGPD, emplacements AdSense.

## 1. Installation locale

Prérequis : Node.js 18+ installé sur ta machine.

```bash
npm install
npm run dev
```

Le site tourne alors sur `http://localhost:4321`.

## 2. Personnaliser ce site

Un seul fichier à éditer pour l'identité du site : `src/siteConfig.ts`
(nom, description, couleur d'accent, identifiant AdSense).

Complète aussi les placeholders `[À compléter]` dans :
- `src/pages/mentions-legales.astro`
- `src/pages/politique-de-confidentialite.astro`

Et le domaine final dans `astro.config.mjs` (`SITE_URL`).

## 3. Ajouter un article

Crée un fichier `.md` dans `src/content/articles/`, avec ce frontmatter :

```md
---
title: "Titre de l'article"
description: "Résumé pour le SEO (150-160 caractères)"
pubDate: 2026-08-15
keywords: ["mot-clé"]
draft: false
---

Contenu en Markdown ici.
```

La page est générée automatiquement à l'URL `/articles/nom-du-fichier`.
Aucune autre action nécessaire.

## 4. Mettre en ligne (GitHub + Vercel)

```bash
git init
git add .
git commit -m "Premier commit"
```

Puis sur GitHub : crée un nouveau repo vide, et pousse :

```bash
git remote add origin https://github.com/TON-COMPTE/NOM-DU-REPO.git
git branch -M main
git push -u origin main
```

Sur [vercel.com](https://vercel.com) : "Add New Project" → importe ce repo GitHub.
Vercel détecte Astro automatiquement, aucune config nécessaire. Clique Deploy.

Chaque nouveau `git push` sur `main` redéploie automatiquement le site.

## 5. Domaine personnalisé

Dans le dashboard Vercel du projet : Settings → Domains → ajoute ton nom de
domaine, puis pointe les DNS chez ton registrar selon les instructions
affichées par Vercel.

## 6. Activer la publicité

1. Inscris le site sur [Google AdSense](https://adsense.google.com) une fois
   qu'il a suffisamment de contenu (une dizaine d'articles minimum conseillée).
2. Une fois validé, récupère ton `client-id` AdSense et les `slot` de chaque
   emplacement.
3. Dans `src/siteConfig.ts` : passe `adsense.enabled` à `true` et renseigne
   `clientId`.
4. Dans `src/layouts/ArticleLayout.astro` : remplace les valeurs `slot="..."`
   des deux `<AdSlot />` par tes vrais identifiants de bloc.

Les pubs ne s'affichent qu'après acceptation du bandeau cookies par le
visiteur — c'est fait pour être conforme RGPD par défaut.

## 7. Dupliquer pour un nouveau site

1. Copie tout le dossier du template dans un nouveau dossier.
2. `rm -rf node_modules .astro dist` puis `git init` à nouveau (nouvel
   historique, nouveau repo).
3. Modifie uniquement `src/siteConfig.ts` et `astro.config.mjs`.
4. Remplace le contenu d'exemple dans `src/content/articles/` par les
   vrais articles du nouveau site.
5. Crée un nouveau repo GitHub + un nouveau projet Vercel, comme à l'étape 4.
