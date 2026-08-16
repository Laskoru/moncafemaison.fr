#!/usr/bin/env bash
# Met à jour les notes Amazon réelles (note + nombre d'avis) de tous les
# produits cités dans les articles, dans src/data/amazon-ratings.json.
#
# Usage (depuis la racine du dépôt) :  bash scripts/fetch-ratings.sh
#
# Ces données sont FACTUELLES : elles proviennent des pages produit Amazon.
# On n'invente JAMAIS une note.
#
# Comportement en cas d'échec (Amazon limite les requêtes au bout d'un moment) :
# le script FUSIONNE les nouvelles notes avec les anciennes. Un ASIN dont la note
# n'a pas pu être lue conserve sa valeur précédente au lieu de disparaître.
set -u
REPO="${1:-.}"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
TODAY=$(date +%Y-%m-%d)
OUT="$REPO/src/data/amazon-ratings.json"
NEW="$OUT.new"
mkdir -p "$REPO/src/data"
[ -f "$OUT" ] || echo '{}' > "$OUT"

mapfile -t ASINS < <(grep -rhoE 'asin:[[:space:]]*"[A-Z0-9]{10}"' "$REPO/src/content/articles/" \
  | grep -oE '[A-Z0-9]{10}' | sort -u)

: > "$NEW"
ok=0
for A in "${ASINS[@]}"; do
  html=$(curl -sL -A "$UA" "https://www.amazon.fr/dp/$A")
  rating=$(echo "$html" | grep -oE 'title="[0-9],[0-9] sur 5' | head -1 | grep -oE '[0-9],[0-9]' | tr ',' '.')
  count=$(echo "$html" | grep -oE 'acrCustomerReviewText[^>]*>[^<]+' | head -1 | sed 's/.*>//' | tr -cd '0-9')
  if [ -n "$rating" ] && [ -n "$count" ] && [ "$count" -gt 0 ] 2>/dev/null; then
    echo "$A $rating $count" >> "$NEW"
    ok=$((ok + 1))
    echo "  OK $A -> $rating / $count avis"
  else
    echo "  -- $A (note non lue, ancienne valeur conservée)"
  fi
  sleep 0.5
done

# Fusion : anciennes valeurs + nouvelles (les nouvelles gagnent).
# On retire aussi les ASIN qui ne sont plus cités dans aucun article.
ASINS_LIST="${ASINS[*]}" TODAY="$TODAY" node -e '
const fs = require("fs");
const out = process.argv[1], neu = process.argv[2];
const prev = JSON.parse(fs.readFileSync(out, "utf8"));
const valid = new Set(process.env.ASINS_LIST.split(/\s+/).filter(Boolean));
const merged = {};
for (const [k, v] of Object.entries(prev)) if (valid.has(k)) merged[k] = v;
for (const line of fs.readFileSync(neu, "utf8").split("\n")) {
  const [asin, rating, count] = line.trim().split(" ");
  if (!asin) continue;
  merged[asin] = { rating: Number(rating), count: Number(count), updated: process.env.TODAY };
}
const sorted = {};
for (const k of Object.keys(merged).sort()) sorted[k] = merged[k];
fs.writeFileSync(out, JSON.stringify(sorted, null, 2) + "\n");
console.log("=> " + Object.keys(sorted).length + " notes au total dans " + out);
' "$OUT" "$NEW"

rm -f "$NEW"
echo "=> $ok note(s) rafraîchie(s) lors de cette exécution"
