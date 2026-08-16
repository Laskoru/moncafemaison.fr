# Images des produits Amazon

Pour afficher la vraie photo d'un produit dans un article, **une seule règle** :

> Dépose l'image dans ce dossier, nommée avec l'**ASIN** du produit.

## Exemple

L'article recommande le produit dont l'ASIN est `B08PP39PLD` ?
Enregistre sa photo ici sous :

```
public/products/B08PP39PLD.jpg
```

…et c'est tout. L'image apparaît automatiquement à côté du produit, sans
rien modifier dans le fichier `.md` de l'article.

## Où trouver l'ASIN ?

- Il est écrit dans le frontmatter de l'article, ligne `asin: "..."`.
- Ou dans l'URL Amazon du produit : `amazon.fr/dp/`**`B08PP39PLD`**`/...`

## Où récupérer la photo ?

1. Ouvre la page du produit sur Amazon.
2. Clic droit sur la photo principale → « Enregistrer l'image sous… »
3. Renomme le fichier avec l'ASIN (ex. `B08PP39PLD.jpg`) et place-le ici.

Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
Conseil : une image d'environ 500 × 500 px suffit largement (fond blanc).

## Alternative : coller une URL

Si tu préfères, tu peux aussi coller directement une URL d'image dans
l'article, dans le bloc du produit :

```yaml
products:
  - asin: "B08PP39PLD"
    title: "..."
    image: "https://m.media-amazon.com/images/I/....jpg"   # ← optionnel
```

Si `image:` est renseigné, il a la priorité. Sinon, le site cherche
automatiquement `public/products/<ASIN>.<ext>`. Si aucune des deux n'existe,
le produit s'affiche simplement sans photo (aucune image cassée).
