#!/usr/bin/env bash
# Relève le prix Amazon des produits cités dans les articles et l'archive
# dans src/data/price-history.json (une valeur par ASIN et par jour).
#
# Usage : bash scripts/track-prices.sh [repo] [limite]
#
# BUT : constituer, dans la durée, une donnée chiffrée qu'aucun autre site
# français n'a — par exemple « le prix moyen des machines à grains a baissé de
# X % en six mois ». C'est ce type de statistique qui se fait citer (et donc
# qui rapporte des liens), pas un avis de plus.
#
# ATTENTION — DIFFUSION DES PRIX :
# le contrat Partenaires Amazon encadre l'affichage des prix sur un site
# affilié. Ces relevés servent de DONNÉE DE TRAVAIL. Ne publie jamais un prix
# unitaire par produit à partir de ce fichier : publie uniquement des
# statistiques agrégées (indice base 100, évolution en %, moyenne par
# catégorie), sans prix nominatif ni incitation à acheter à un prix donné.
#
# Comme fetch-ratings.sh : lot limité par exécution, arrêt propre sur captcha,
# et fusion — une valeur déjà relevée n'est jamais perdue.
set -u
REPO="${1:-.}"
LIMIT="${2:-15}"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
TODAY=$(date +%Y-%m-%d)
OUT="$REPO/src/data/price-history.json"
NEW="$OUT.new"
mkdir -p "$REPO/src/data"
[ -f "$OUT" ] || echo '{}' > "$OUT"

mapfile -t ASINS < <(grep -rhoE 'asin:[[:space:]]*"[A-Z0-9]{10}"' "$REPO/src/content/articles/" \
  | grep -oE '[A-Z0-9]{10}' | sort -u)

# On ignore les ASIN déjà relevés aujourd'hui, puis on prend les plus anciens.
mapfile -t TODO < <(ASINS_LIST="${ASINS[*]}" TODAY="$TODAY" node -e '
const fs = require("fs");
const hist = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const today = process.env.TODAY;
const all = process.env.ASINS_LIST.split(/\s+/).filter(Boolean);
const reste = all.filter((a) => !(hist[a] && hist[a][today]));
reste.sort((a, b) => {
  const da = Object.keys(hist[a] || {}).sort().pop() || "";
  const db = Object.keys(hist[b] || {}).sort().pop() || "";
  return da < db ? -1 : da > db ? 1 : a < b ? -1 : 1;
});
console.log(reste.join("\n"));
' "$OUT" | head -n "$LIMIT")

echo "== ${#ASINS[@]} ASIN suivis ; ${#TODO[@]} relevé(s) aujourd'hui (limite $LIMIT) =="

: > "$NEW"
ok=0
for A in "${TODO[@]}"; do
  html=$(curl -sL --compressed -A "$UA" "https://www.amazon.fr/dp/$A")
  if echo "$html" | grep -qiE 'captcha|automated access'; then
    echo "  !! Captcha Amazon : arrêt du relevé (rien n'est perdu, on reprendra demain)."
    break
  fi
  price=$(echo "$html" | grep -oE '"priceAmount":[0-9.]+' | head -1 | cut -d: -f2)
  if [ -n "$price" ]; then
    echo "$A $price" >> "$NEW"
    ok=$((ok + 1))
    echo "  OK $A -> $price EUR"
  else
    echo "  -- $A (prix indisponible : rupture ou page sans offre)"
  fi
  sleep 1
done

ASINS_LIST="${ASINS[*]}" TODAY="$TODAY" node -e '
const fs = require("fs");
const out = process.argv[1], neu = process.argv[2];
const hist = JSON.parse(fs.readFileSync(out, "utf8"));
const valid = new Set(process.env.ASINS_LIST.split(/\s+/).filter(Boolean));
// on ne garde que les ASIN encore cités quelque part
for (const k of Object.keys(hist)) if (!valid.has(k)) delete hist[k];
for (const line of fs.readFileSync(neu, "utf8").split("\n")) {
  const [asin, price] = line.trim().split(" ");
  if (!asin) continue;
  hist[asin] = hist[asin] || {};
  hist[asin][process.env.TODAY] = Number(price);
}
const trie = {};
for (const k of Object.keys(hist).sort()) trie[k] = hist[k];
fs.writeFileSync(out, JSON.stringify(trie, null, 2) + "\n");
const jours = new Set();
for (const a of Object.values(trie)) for (const d of Object.keys(a)) jours.add(d);
console.log("=> " + Object.keys(trie).length + " produits suivis sur " + jours.size + " jour(s) de relevé");
' "$OUT" "$NEW"

rm -f "$NEW"
echo "=> $ok prix relevé(s) lors de cette exécution"
exit 0
