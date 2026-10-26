# Backlog de sujets d'articles

> **Rappel avant chaque article (voir CONTENT_PLAYBOOK.md)** : 1 article par semaine au
> maximum ; mettre à jour un article existant vaut mieux que publier un article moyen ;
> aucune expérience, aucun test ni chiffre inventé ; 2 à 4 sources fiables dans `sources` ;
> au moins 2 liens entrants depuis des articles existants, vérifiés par grep avant commit.

La routine prend la première idée non cochée, écrit l'article en brouillon,
puis coche l'idée. Ajoute librement de nouvelles idées en bas.
Format : `- [ ] Sujet — angle — catégorie`.

> **Consignes techniques pour la routine (22/10/2026, économie de tokens)**
> - Unsplash : appelle search_photos avec `per_page: 4` (les réponses à 8 photos sont très longues). Une seconde recherche seulement si aucune des 4 ne montre le sujet.
> - Légifrance, economie.gouv.fr (DGCCRF), EUR-Lex, dyson.fr, miele.fr et certains sites de fabricants renvoient 403 ou une page vide à WebFetch : un seul essai par URL, puis `curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/141.0" <url>` ; si ça échoue encore, prends une autre source (service-public.gouv.fr, notice PDF du fabricant) au lieu de réessayer.
> - Ne relis pas un fichier déjà lu et ne relance pas une recherche déjà faite.

## Requêtes Google peu couvertes (21/10)

- [x] Machine à café qui prend toutes les capsules : ce qui existe vraiment — aucune machine n'accepte tout ; machines multi-systèmes (adaptateurs, tiroirs interchangeables), compatibles Nespresso Original vs Vertuo fermé, Dolce Gusto et capsules d'autres marques ; requête « machine à café qui prend toutes les capsules », requêtes associées « machine à café multi capsules », « machine compatible nespresso et dolce gusto », « machine à café toutes capsules » ; caractéristiques d'après les fiches des fabricants (concurrence Google faible, 21/10)

## Requêtes Google peu couvertes (15/10)

Requêtes tirées des suggestions Google du 15/10/2026, absentes des articles publiés et du backlog, avec une page 1 Google faible ou moyenne (forums, pages étrangères ou génériques). Garde la requête principale dans le titre, la description et un titre ##.

- [x] Senseo qui ne coule plus ou qui fuit : les causes et quoi faire — après un détartrage (pompe désamorcée, résidus), porte-dosette bouché, clapet du réservoir, fuite au bec verseur ou par le bas, machine bloquée sous pression ; s'appuyer sur la notice Philips (pas de vinaigre) ; requête « senseo ne coule plus après détartrage » ; requêtes associées « senseo qui fuit au niveau du bec verseur », « senseo qui fuit par le bas », « cafetiere senseo bloqué que faire » ; liens vers la fuite par le bas et le détartrant — machines (conseil, sans produit)
- [x] Senseo qui clignote : ce que veulent dire les voyants — deux boutons qui clignotent ensemble (détartrage), voyant rouge, clignotement rapide (réservoir, flotteur coincé), voyant CALC qui reste allumé ; requête « senseo pourquoi les deux boutons clignotent » ; requêtes associées « pourquoi senseo clignote rouge », « senseo qui clignote rouge », « pourquoi senseo clignote rapidement » ; lien vers Nespresso qui clignote — machines (conseil, sans produit)
- [x] Nettoyer une machine à café à grain : pastilles, groupe café et broyeur (Krups, DeLonghi, Philips) — à quoi servent les pastilles et où les trouver, nettoyage ou détartrage (deux opérations distinctes), fréquence, groupe amovible ou non selon la marque, notices des fabricants ; requête « pastilles pour machine à café krups où peut on les trouver » ; requêtes associées « comment nettoyer une machine à café delonghi magnifica », « krups machine à grain nettoyage », « comment nettoyer machine à grain philips » ; liens vers le détartrant et la machine à grains — accessoires (conseil, lien de recherche pastilles)
- [x] Quelles capsules pour une machine Krups ? — Krups fabrique des machines Nespresso (Original et Vertuo), Dolce Gusto et à grain : retrouver son système avec la référence (XN, YY, KP, EA), capsules d'origine et compatibles ; requête « quelle capsules pour machine à café krups » ; requêtes associées « quelles capsules pour krups », « cafetière nespresso krups », « machine à café nespresso krups » ; lien vers capsules ou grains — machines (conseil, sans produit)
- [x] Latte, latte macchiato, cappuccino, flat white : les vraies différences — proportions d'espresso et de lait, épaisseur de mousse, ordre de versement, taille de tasse, tableau récapitulatif ; requête « latte ou latte macchiato » ; requêtes associées « cappuccino ou latte macchiato », « quelle différence entre cappuccino et latte macchiato », « latte ou flat white » ; liens vers le mousseur à lait et le lexique — preparer (technique, sans produit)
- [x] Café décaféiné sans solvant : comment on décaféine le café et comment le reconnaître — procédés à l'eau (Swiss Water), au CO2 ou aux solvants (dichlorométhane, acétate d'éthyle), ce que dit l'étiquette, caféine résiduelle selon la règle européenne ; requête « comment cafe decafeine » ; requêtes associées « quelle marque de café décaféiné sans solvant », « café décaféiné sans solvant en dosette », « café décaféiné sans solvant carte noire » — preparer (conseil, liens de recherche Amazon possibles en fin d'article)
- [x] Machine à café DeLonghi qui ne coule plus : le diagnostic — réservoir et flotteur, infuseur entartré, trous du porte-filtre bouchés, broyeur qui ne tourne plus, voyant rouge, quand appeler le SAV ; requête « machine à café delonghi broyeur ne fonctionne plus » ; requêtes associées « pourquoi ma machine à café delonghi ne coule plus », « pourquoi ma machine à café delonghi clignote rouge », « pourquoi ma machine à café ne coule plus » ; lien vers l'article Magnifica S — machines (conseil, sans produit)
- [x] Combien de tasses avec un kilo de café ? — expresso, filtre, piston, moka : tableau par méthode à partir des doses de référence, coût par tasse ; requête « combien d expresso peut on faire avec un kilo de café » ; requêtes associées « 1kg de café en grain combien de tasses », « combien de cafe en grain avec 1kg » ; lien vers le calculateur de dosage — preparer (conseil, sans produit)

## 🔎 Priorité SEO (Search Console du 14/10/2026)

- [x] Meule plate ou conique : quel moulin pour ton café ? — la différence de goût et d'usage, sans recouper l'article meules ou lames ; requête « moulin à café meule plate ou conique » ; liens vers les 3 comparatifs de moulins — moulins
- [x] Combien de temps se conserve le café moulu ouvert ? — tableau grains, moulu ouvert, moulu sous vide, frigo ou non ; les sources se contredisent, trancher avec des sources fiables ; requête « combien de temps se conserve le café moulu ouvert » — preparer (conseil, sans produit)
- [x] Comment servir un espresso : tasse, eau, cuillère — tasse chauffée, verre d'eau, sucre, ordre de service ; requête « comment servir un espresso » — preparer (technique, sans produit)
- [ ] Café filtre pas assez fort : 6 réglages à vérifier — dose, mouture, eau, température, filtre, entretien ; requêtes « café pas fort », « café trop dilué » ; liens vers le calculateur de dosage et le V60 — preparer (conseil, sans produit)
- [ ] Ristretto : combien de café et d'eau, et comment le faire — ratio 1:1 à 1:1,5 au poids, quantité en tasse, réglage de la mouture ; requête « quantité d'eau pour un ristretto » — preparer (technique, sans produit)

## 🎁 Saison — priorité : à publier avant mi-octobre (indexés pour Noël / Black Friday)
- [x] Idées cadeaux pour un amateur de café : notre sélection par budget (Noël 2026) — guide cadeaux, du petit accessoire à la machine — accessoires
- [x] Black Friday café : quel matériel vaut vraiment le coup d'attendre (et comment repérer une fausse promo) — guide d'achat malin — machines

## 🎯 Priorité : questions souvent cherchées et peu couvertes (recherche de mots-clés du 26/09/2026)

Requêtes réelles tirées des suggestions Google, avec peu de pages qui y répondent vraiment. Vérifié le 26/09/2026 : aucun article publié ne les traite déjà. Garde la requête principale dans le titre, la description et un titre ##.

- [x] DeLonghi Magnifica S : café trop clair, trop amer ou message « mouture trop fine » — diagnostic et réglages pas à pas (mouture, dose, groupe café, détartrage) ; requêtes « café trop clair delonghi magnifica s », « café trop amer delonghi magnifica s », « machine à café delonghi mouture trop fine » — machines (conseil, sans produit)
- [x] Machine à café qui fuit par le bas : trouver d'où vient la fuite (machine à grain, cafetière filtre, capsules) et quoi faire — requêtes « machine à grain philips qui fuit par le bas », « cafetière qui fuit par le bas » — machines (conseil, sans produit)
- [x] Moulin à café pour cafetière italienne : quelle mouture pour la moka et quel moulin choisir (manuel ou électrique, meules) — requête « moulin à café pour cafetière italienne » — moulins (comparatif, liens de recherche Amazon)
- [x] Cafetière Nespresso qui clignote : ce que veulent dire les voyants selon le modèle (détartrage, réservoir, erreur) — requête « pourquoi cafetière nespresso clignote » — machines (conseil, sans produit)

## Machines & cafetières

- [x] Meilleure machine à café à grains — le tout-en-un fraîcheur/simplicité — machines
- [x] Meilleure machine expresso pour débuter — tirer un vrai espresso sans se ruiner — machines
- [x] Meilleure cafetière à piston (French press) — le café filtre le plus simple — machines
- [x] Cafetière italienne (moka) : laquelle choisir — le classique sur le feu — machines
- [x] Machine à capsules vs machine à grains — quel système pour quel profil — machines
- [x] Meilleure cafetière filtre programmable — le café du matin sans effort — machines
- [x] AeroPress : test et alternatives — café nomade et rapide — machines
- [ ] V60 / pour-over : le kit pour débuter — le café filtre aromatique — machines
- [x] Chemex : pour qui, comment choisir — le filtre design et propre — machines
- [x] Machine expresso avec broyeur intégré — grains + espresso en un appareil — machines
- [x] Meilleure machine à café automatique avec broyeur — le haut de gamme maison — machines
- [x] Cafetière à dosettes souples (ESE) — alternative aux capsules — machines

## Moulins à café

- [x] Meilleur moulin à café électrique — la mouture fraîche à la maison — moulins
- [x] Meilleur moulin à café manuel — précis et silencieux, pour le voyage — moulins
- [x] Moulin à meules ou à lames : la vraie différence — moulins
- [x] Meilleur moulin pour espresso — descendre assez fin, avec régularité — moulins
- [x] Moulin à café pas cher qui vaut le coup — le bon rapport qualité/prix — moulins

## Accessoires & entretien

- [x] Meilleur mousseur à lait — cappuccino et latte à la maison — accessoires
- [x] Balance de précision pour le café — doser au gramme près — accessoires
- [x] Bouilloire à col de cygne — le contrôle du débit pour le pour-over — accessoires
- [x] Meilleur détartrant pour machine à café — entretenir sans abîmer — accessoires
- [x] Filtres réutilisables : lesquels choisir — économique et écologique — accessoires
- [x] Tamper à espresso : bien le choisir — tassage régulier de la mouture — accessoires
- [ ] Boîte à café hermétique — garder les grains frais plus longtemps — accessoires
- [ ] Pichet à lait (pitcher) pour latte art — accessoires
- [ ] Tasses et verres à café : le bon format selon la boisson — accessoires
- [ ] Kit de nettoyage machine espresso — pastilles, brosses, chiffons — accessoires
- [ ] Adoucisseur / filtre à eau pour cafetière — l'eau, clé du goût — accessoires
- [ ] Thermomètre / accessoires latte art pour débuter — accessoires

## Ajouts (réserve)

- [ ] Cafetière cold brew : le café infusé à froid — machines
- [ ] Cafetière turque (ibrik) : le café à l'orientale — machines
- [ ] Machine à café encastrable : pour cuisine équipée — machines
- [ ] Cafetière à capsules rechargeables : réduire les déchets — machines
- [ ] Percolateur à café pour recevoir (grandes quantités) — machines
- [ ] Moulin à café pour French press : la mouture grossière idéale — moulins
- [ ] Moulin à café silencieux : moudre sans réveiller la maison — moulins
- [ ] Entretenir et nettoyer son moulin à café — moulins
- [ ] Bouilloire électrique à température réglable — accessoires
- [ ] Mug isotherme à café : garder son café chaud — accessoires
- [ ] Distributeur de mouture (WDT) pour espresso — accessoires
- [ ] Tapis de tassage (tamping mat) pour espresso — accessoires
- [ ] Filtre à eau / carafe filtrante pour le café — accessoires
- [ ] Conservation des grains : boîte hermétique sous vide — accessoires
- [ ] Kit latte art pour débuter — accessoires
- [ ] Tasses et mugs à espresso : quel format choisir — accessoires

## 🔎 Longue traîne (audit SEO du 22/09/2026)

- [ ] Quelle eau utiliser pour un bon espresso à la maison — dureté, filtration, calcaire : l'eau change le goût — preparer
- [ ] Porte-filtre pressurisé ou non pressurisé : quelle différence pour l'espresso — comprendre son panier et progresser — machines
- [ ] Quel café en grains choisir selon sa méthode (moka, piston, filtre) — torréfaction et mouture par méthode — preparer
- [ ] Comment nettoyer une cafetière à piston sans détartrant chimique — entretien naturel, bicarbonate et vinaigre — accessoires
