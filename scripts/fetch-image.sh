#!/usr/bin/env bash
# Télécharge une image depuis un hôte autorisé (Amazon ou Unsplash) et
# vérifie qu'elle est valide. Centralise ce qui se faisait via des `curl`
# ad-hoc, pour que la routine automatique n'ait besoin que d'une permission
# ciblée sur CE script plutôt que sur `curl` en général.
#
# Usage : bash scripts/fetch-image.sh <url> <destination> [taille_min_ko]
set -u
URL="${1:?usage: fetch-image.sh <url> <destination> [taille_min_ko]}"
DEST="${2:?usage: fetch-image.sh <url> <destination> [taille_min_ko]}"
MIN_KB="${3:-3}"

HOST=$(echo "$URL" | sed -E 's#^https?://##; s#/.*##')
case "$HOST" in
  amazon.fr|*.amazon.fr|media-amazon.com|*.media-amazon.com|unsplash.com|*.unsplash.com)
    ;;
  *)
    echo "REFUS : hôte non autorisé ($HOST). Seuls amazon.fr, media-amazon.com et unsplash.com sont acceptés." >&2
    exit 2
    ;;
esac

mkdir -p "$(dirname "$DEST")"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
curl -sL --compressed -A "$UA" "$URL" -o "$DEST"

if ! file -b "$DEST" 2>/dev/null | grep -qi jpeg; then
  echo "ECHEC : réponse invalide, pas une image JPEG" >&2
  rm -f "$DEST"
  exit 1
fi

SIZE_KB=$(( $(wc -c < "$DEST") / 1024 ))
if [ "$SIZE_KB" -lt "$MIN_KB" ]; then
  echo "ECHEC : fichier trop petit (${SIZE_KB} Ko < ${MIN_KB} Ko attendus)" >&2
  rm -f "$DEST"
  exit 1
fi

echo "OK : $DEST (${SIZE_KB} Ko)"
