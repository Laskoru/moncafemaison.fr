#!/usr/bin/env bash
# Récupère une image de couverture via l'API Unsplash (interrogeable en curl,
# contrairement aux pages web /s/photos qui sont rendues en JavaScript et donc
# vides pour un script). Remplace l'ancien endpoint /download devenu inutilisable.
#
# La clé d'accès Unsplash (gratuite, "Access Key") est lue depuis, dans l'ordre :
#   1. la variable d'environnement UNSPLASH_ACCESS_KEY
#   2. le fichier ~/.claude/unsplash-access-key (une seule ligne)
#
# Usage : bash scripts/fetch-cover.sh "<mots-clés>" "public/covers/<slug>.jpg" [taille_min_ko]
set -u
QUERY="${1:?usage: fetch-cover.sh \"<mots-clés>\" <destination> [taille_min_ko]}"
DEST="${2:?usage: fetch-cover.sh \"<mots-clés>\" <destination> [taille_min_ko]}"
MIN_KB="${3:-15}"

KEY="${UNSPLASH_ACCESS_KEY:-}"
if [ -z "$KEY" ] && [ -f "$HOME/.claude/unsplash-access-key" ]; then
  KEY=$(tr -d ' \t\r\n' < "$HOME/.claude/unsplash-access-key")
fi
if [ -z "$KEY" ]; then
  echo "ECHEC : clé Unsplash absente (UNSPLASH_ACCESS_KEY ou ~/.claude/unsplash-access-key)" >&2
  exit 3
fi

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
Q=$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$QUERY")
API="https://api.unsplash.com/search/photos?per_page=5&orientation=landscape&content_filter=high&query=$Q"
JSON=$(curl -s -A "$UA" -H "Accept-Version: v1" -H "Authorization: Client-ID $KEY" "$API")

# Extrait l'URL CDN de la 1re photo + son download_location (à pinger, requis par l'API Unsplash).
RESULT=$(node -e '
  let d=""; process.stdin.on("data",c=>d+=c).on("end",()=>{
    try{
      const j=JSON.parse(d);
      const r=(j.results||[])[0];
      if(!r){process.exit(0);}
      process.stdout.write((r.urls&&r.urls.raw||"")+"\t"+((r.links&&r.links.download_location)||""));
    }catch(e){}
  });' <<<"$JSON")
RAW="${RESULT%%$'\t'*}"
DL="${RESULT#*$'\t'}"

if [ -z "$RAW" ]; then
  echo "ECHEC : aucune photo Unsplash pour « $QUERY »" >&2
  exit 1
fi

# Conformité API Unsplash : signaler le téléchargement (best-effort, non bloquant).
[ -n "$DL" ] && curl -s -A "$UA" -H "Authorization: Client-ID $KEY" "$DL" -o /dev/null

mkdir -p "$(dirname "$DEST")"
curl -sL --compressed -A "$UA" "${RAW}&w=1600&h=800&fit=crop&fm=jpg&q=70" -o "$DEST"

if ! file -b "$DEST" 2>/dev/null | grep -qi jpeg; then
  echo "ECHEC : réponse invalide, pas une image JPEG" >&2; rm -f "$DEST"; exit 1
fi
SIZE_KB=$(( $(wc -c < "$DEST") / 1024 ))
if [ "$SIZE_KB" -lt "$MIN_KB" ]; then
  echo "ECHEC : fichier trop petit (${SIZE_KB} Ko < ${MIN_KB} Ko)" >&2; rm -f "$DEST"; exit 1
fi
echo "OK : $DEST (${SIZE_KB} Ko) — Unsplash « $QUERY »"
