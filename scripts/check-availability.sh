#!/usr/bin/env bash
# Vérifie que chaque produit cité dans les articles est TOUJOURS ACHETABLE
# sur amazon.fr. Un lien qui s'ouvre ne suffit pas : la page peut vivre alors
# que le produit est en rupture, ce qui ne rapporte aucune commission.
#
# Usage : bash scripts/check-availability.sh [repo] [limite]
#
# DÉTECTION (validée à la main — ne pas « simplifier » sans revérifier) :
#   - Le seul signal fiable d'achat possible est le bouton `add-to-cart-button`.
#   - Le stock officiel se lit UNIQUEMENT dans le bloc `id="availability"`.
#     Chercher « Actuellement indisponible » dans toute la page donne des faux
#     positifs : la mention apparaît aussi pour les produits suggérés et les
#     offres d'autres vendeurs.
#   - Le prix n'est pas toujours dans `priceAmount` : prévoir `a-offscreen`.
#
# États : DISPO / STOCK FAIBLE (bientôt épuisé) / INDISPO / INTROUVABLE
set -u
REPO="${1:-.}"
LIMIT="${2:-15}"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
ART="$REPO/src/content/articles"

mapfile -t ASINS < <(grep -rhoE 'asin:[[:space:]]*"[A-Z0-9]{10}"' "$ART" \
  | grep -oE '[A-Z0-9]{10}' | sort -u | head -n "$LIMIT")

echo "== Vérification de ${#ASINS[@]} produit(s) =="
probleme=0
faible=0

for A in "${ASINS[@]}"; do
  html=$(curl -sL --compressed -A "$UA" -H "Accept-Language: fr-FR,fr;q=0.9" "https://www.amazon.fr/dp/$A")

  if echo "$html" | grep -qiE 'images-na.ssl-images-amazon.com/captcha|automated access'; then
    echo "!! Captcha Amazon : arrêt. Relance plus tard pour finir la liste."
    break
  fi

  fichiers=$(grep -rl "$A" "$ART" 2>/dev/null | xargs -r -n1 basename | tr '\n' ' ')

  # Bouton d'achat = seul signal fiable
  achetable=$(echo "$html" | grep -c 'id="add-to-cart-button"')

  # Bloc de stock officiel uniquement
  # on retire l'ouverture de balise puis les balises internes pour ne garder que le texte
  stock=$(echo "$html" | grep -oE 'id="availability".{0,200}' | head -1 \
    | sed 's/^[^>]*>//; s/<[^>]*>/ /g' | tr -s ' ' | sed 's/^ *//' | cut -c1-70)

  # Prix : priceAmount sinon a-offscreen
  prix=$(echo "$html" | grep -oE '"priceAmount":[0-9.]+' | head -1 | cut -d: -f2)
  [ -z "$prix" ] && prix=$(echo "$html" | grep -oE 'class="a-offscreen">[0-9][0-9 ,.]*' | head -1 | sed 's/.*>//')

  if echo "$html" | grep -qiE '<title>[^<]*(Page introuvable|Page Not Found)'; then
    echo "INTROUVABLE   $A  -> $fichiers"
    probleme=$((probleme + 1))
  elif [ "$achetable" -eq 0 ]; then
    detail="${stock:-pas de bouton achat}"
    echo "INDISPO       $A  $detail"
    echo "              articles : $fichiers"
    probleme=$((probleme + 1))
  elif echo "$stock" | grep -qiE 'ne reste plus que'; then
    echo "STOCK FAIBLE  $A  ${prix} — $stock"
    echo "              articles : $fichiers"
    faible=$((faible + 1))
  else
    echo "dispo         $A  ${prix}"
  fi
  sleep 2
done

echo "== $probleme produit(s) à remplacer, $faible à surveiller (stock faible) =="
exit 0
