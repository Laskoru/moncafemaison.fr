#!/usr/bin/env bash
# Vérifie en un seul appel la disponibilité, le prix, le titre et l'image
# d'un produit Amazon. Remplace les `curl`/`grep` ad-hoc répétés dans le
# skill de publication, pour que la routine automatique n'ait besoin que
# d'une permission ciblée sur CE script.
#
# Usage : bash scripts/check-product.sh <ASIN>
#
# Sortie (une ligne par champ) :
#   CAPTCHA=1                si Amazon bloque — n'insiste pas, arrête-toi
#   CAPTCHA=0
#   ACHETABLE=0|1            0 = pas de bouton d'achat = produit indisponible
#   TITRE=...
#   PRIX=...                 vide si introuvable
#   IMAGE=<url _AC_SL600_>   vide si introuvable
set -u
ASIN="${1:?usage: check-product.sh <ASIN>}"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
HTML=$(curl -sL --compressed -A "$UA" -H "Accept-Language: fr-FR,fr;q=0.9" "https://www.amazon.fr/dp/$ASIN")

if echo "$HTML" | grep -qiE 'images-na.ssl-images-amazon.com/captcha|automated access'; then
  echo "CAPTCHA=1"
  exit 0
fi
echo "CAPTCHA=0"

achetable=$(echo "$HTML" | grep -c 'id="add-to-cart-button"')
if [ "$achetable" -gt 0 ]; then echo "ACHETABLE=1"; else echo "ACHETABLE=0"; fi

titre=$(echo "$HTML" | grep -oE '<title>[^<]+' | head -1 | sed 's/<title>//')
echo "TITRE=$titre"

prix=$(echo "$HTML" | grep -oE '"priceAmount":[0-9.]+' | head -1 | cut -d: -f2)
[ -z "$prix" ] && prix=$(echo "$HTML" | grep -oE 'class="a-offscreen">[0-9][0-9 ,.]*' | head -1 | sed 's/.*>//')
echo "PRIX=$prix"

img=$(echo "$HTML" | grep -oE '"hiRes":"[^"]+"' | head -1 | sed 's/"hiRes":"//; s/"$//')
img600=$(echo "$img" | sed -E 's/_AC_[A-Z]+[0-9]+_/_AC_SL600_/')
echo "IMAGE=$img600"
