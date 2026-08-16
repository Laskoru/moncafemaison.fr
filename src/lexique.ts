// Lexique / FAQ transversale : le vocabulaire du café à la maison.
// Chaque entrée cible une requête longue traîne du type « c'est quoi la crema »,
// « combien de bars pour un espresso », « quelle mouture pour une moka ».
//
// Pour ajouter un terme : une entrée ici suffit, la page /lexique se génère
// seule et alimente le rich snippet FAQ (JSON-LD).

export interface LexiqueEntry {
  term: string;
  question: string;
  answer: string;
  group: string;
  related?: string[];
}

export const lexiqueGroups = [
  'Le grain & la torréfaction',
  'La mouture',
  'Extraction & espresso',
  'Méthodes douces',
  'Lait & entretien',
] as const;

export const lexique: LexiqueEntry[] = [
  // ---- Le grain & la torréfaction ----
  {
    term: 'Arabica / Robusta',
    question: 'Quelle différence entre arabica et robusta ?',
    answer:
      "Ce sont les deux grandes espèces de café cultivées. L'arabica est plus aromatique, plus acidulé et plus complexe, avec environ deux fois moins de caféine ; le robusta est plus corsé, plus amer, et donne davantage de crema en espresso. Beaucoup de mélanges italiens ajoutent volontairement une part de robusta pour le corps et la tenue de la mousse — ce n'est pas un défaut, c'est un choix de style.",
    group: 'Le grain & la torréfaction',
    related: ['meilleure-cafetiere-grains'],
  },
  {
    term: 'Torréfaction (claire, moyenne, foncée)',
    question: 'Quelle torréfaction choisir pour son café ?',
    answer:
      "La torréfaction claire préserve l'acidité et les arômes fruités ou floraux du grain, idéale en filtre et en pour-over. La torréfaction foncée développe l'amertume et les notes de cacao ou de grillé, plus classique en espresso et en moka. La moyenne est le compromis polyvalent. Aucune n'est meilleure dans l'absolu : c'est une affaire de goût et de méthode d'extraction.",
    group: 'Le grain & la torréfaction',
  },
  {
    term: 'Date de torréfaction',
    question: 'Un café a-t-il une date de péremption ?',
    answer:
      "Le café ne devient pas dangereux, mais il perd vite ses arômes. Le repère utile n'est pas la date limite de consommation affichée mais la date de torréfaction : un café donne le meilleur entre 5 jours et 6 semaines après torréfaction. Un paquet sans date de torréfaction est souvent le signe d'un café déjà ancien — c'est le premier critère à regarder, avant même le prix.",
    group: 'Le grain & la torréfaction',
  },
  {
    term: 'Dégazage',
    question: "Pourquoi faut-il attendre quelques jours après la torréfaction ?",
    answer:
      "Un café fraîchement torréfié libère du CO₂ pendant plusieurs jours. Utilisé trop tôt, ce gaz perturbe l'extraction : l'eau passe mal, le café mousse beaucoup et le goût reste creux. C'est aussi pour cela que les paquets ont une petite valve : elle laisse sortir le gaz sans laisser entrer l'oxygène.",
    group: 'Le grain & la torréfaction',
  },

  // ---- La mouture ----
  {
    term: 'Meules coniques / plates',
    question: 'Meules coniques ou meules plates pour un moulin ?',
    answer:
      "Les deux écrasent le grain de façon régulière, contrairement aux moulins à lames qui le hachent. Les meules coniques sont plus courantes, moins chères et chauffent moins ; les meules plates donnent une mouture souvent un peu plus homogène, appréciée en espresso pointu. Pour la grande majorité des usages maison, de bonnes meules coniques suffisent largement — l'écart avec un moulin à lames est bien plus grand que celui entre coniques et plates.",
    group: 'La mouture',
    related: ['meilleur-moulin-cafe-electrique', 'meilleur-moulin-cafe-manuel'],
  },
  {
    term: 'Finesse de mouture',
    question: 'Quelle mouture pour quelle cafetière ?',
    answer:
      "Plus l'eau reste longtemps en contact avec le café, plus la mouture doit être grossière. En pratique : très fine pour l'espresso, fine à moyenne pour la moka italienne, moyenne pour le filtre et le pour-over, grossière pour la French press et l'infusion à froid. Une mouture inadaptée est la première cause d'un café raté, bien avant la qualité du grain.",
    group: 'La mouture',
    related: ['meilleure-cafetiere-piston-french-press', 'cafetiere-italienne-moka'],
  },
  {
    term: 'Homogénéité de la mouture',
    question: "Pourquoi la régularité de la mouture est-elle si importante ?",
    answer:
      "Si les particules sont de tailles très différentes, les plus fines sur-extraient (amertume) pendant que les grosses sous-extraient (acidité, goût d'eau) — dans la même tasse. C'est exactement ce que produit un moulin à lames. Un moulin à meules, même d'entrée de gamme, améliore davantage le café que de passer à un grain plus cher.",
    group: 'La mouture',
    related: ['meilleur-moulin-cafe-electrique'],
  },

  // ---- Extraction & espresso ----
  {
    term: 'Bars (pression)',
    question: 'Combien de bars faut-il pour un bon espresso ?',
    answer:
      "La norme d'extraction d'un espresso est d'environ 9 bars au niveau du café. Les machines annonçant 15 ou 20 bars affichent la pression maximale de la pompe, pas celle réellement appliquée : au-delà de 9 bars, ce n'est pas meilleur. Ce chiffre est donc un argument marketing plus qu'un critère de qualité — la stabilité de la température et la mouture comptent bien davantage.",
    group: 'Extraction & espresso',
    related: ['meilleure-machine-expresso'],
  },
  {
    term: 'Crema',
    question: "Qu'est-ce que la crema d'un espresso ?",
    answer:
      "C'est la mousse dense et noisette qui surmonte un espresso, formée par le CO₂ du café emprisonné sous pression. Une belle crema indique en général un café frais et une extraction correcte, mais ce n'est pas un gage de goût absolu : un robusta médiocre produit beaucoup de crema, un excellent arabica clair en produit peu. À regarder, donc, sans en faire l'unique juge.",
    group: 'Extraction & espresso',
    related: ['meilleure-machine-expresso'],
  },
  {
    term: 'Sur-extraction / sous-extraction',
    question: 'Mon café est amer ou acide : que corriger ?',
    answer:
      "Un café amer, sec et astringent est généralement sur-extrait : mouture trop fine, temps trop long ou eau trop chaude. Un café acide, salé et sans corps est sous-extrait : mouture trop grossière ou passage trop rapide. Le réglage à modifier en premier est presque toujours la mouture, un cran à la fois.",
    group: 'Extraction & espresso',
  },
  {
    term: 'Ratio café / eau',
    question: 'Quel dosage de café par tasse ?',
    answer:
      "Le repère courant en filtre est d'environ 60 g de café par litre d'eau, soit à peu près 6 g pour 100 ml. Pour un espresso, on part souvent de 18 g de café pour 36 g de boisson (ratio 1:2). Ces valeurs sont des points de départ à ajuster à son goût, pas des règles : une balance rend ces ajustements reproductibles d'un jour à l'autre.",
    group: 'Extraction & espresso',
    related: ['balance-cafe-precision'],
  },

  // ---- Méthodes douces ----
  {
    term: 'Pour-over',
    question: "Qu'appelle-t-on un café « pour-over » ?",
    answer:
      "C'est l'extraction filtre manuelle : on verse l'eau chaude à la main, en plusieurs fois, sur un lit de café dans un cône (V60, Chemex, Kalita). Cela donne un café clair, aromatique et nuancé, où l'on distingue bien les arômes du grain. La contrepartie est qu'il demande un peu de technique et de régularité dans le versement.",
    group: 'Méthodes douces',
  },
  {
    term: 'Blooming (pré-infusion)',
    question: "Qu'est-ce que le blooming en café filtre ?",
    answer:
      "Il s'agit de mouiller le café avec un peu d'eau chaude, environ deux fois son poids, et d'attendre 30 à 45 secondes avant de continuer à verser. Cette pause laisse s'échapper le CO₂ restant et permet ensuite une extraction bien plus régulière. C'est le geste le plus simple pour améliorer nettement un café filtre.",
    group: 'Méthodes douces',
  },
  {
    term: 'Cold brew',
    question: 'Quelle différence entre cold brew et café glacé ?',
    answer:
      "Le cold brew est infusé à froid pendant 12 à 24 heures : il en résulte un café doux, peu acide et peu amer, qui se conserve quelques jours au réfrigérateur. Un café glacé classique est simplement un café chaud refroidi ou versé sur glace, avec un profil plus acidulé et plus proche du café d'origine. Le cold brew demande une mouture grossière et beaucoup de patience.",
    group: 'Méthodes douces',
    related: ['meilleure-cafetiere-piston-french-press'],
  },

  // ---- Lait & entretien ----
  {
    term: 'Micro-mousse',
    question: "Qu'est-ce qu'une bonne mousse de lait ?",
    answer:
      "La micro-mousse est un lait texturé aux bulles si fines qu'elles deviennent invisibles, avec un aspect brillant de peinture liquide. C'est elle qui permet le latte art et donne une texture soyeuse, contrairement à la mousse épaisse et sèche pleine de grosses bulles. Le lait entier, plus riche en protéines et en matières grasses, la réussit plus facilement.",
    group: 'Lait & entretien',
    related: ['meilleur-mousseur-lait'],
  },
  {
    term: 'Détartrage',
    question: 'À quelle fréquence détartrer sa machine à café ?',
    answer:
      "Cela dépend surtout de la dureté de l'eau : tous les 2 à 3 mois en eau très calcaire, deux fois par an en eau douce. Le tartre réduit le débit, fait chuter la température et finit par abîmer la pompe — c'est la première cause de panne des machines domestiques. Utiliser une eau filtrée ou faiblement minéralisée espace nettement les détartrages.",
    group: 'Lait & entretien',
    related: ['meilleure-machine-expresso', 'meilleure-cafetiere-grains'],
  },
  {
    term: 'Qualité de l’eau',
    question: 'Quelle eau utiliser pour faire son café ?',
    answer:
      "Un café est composé à plus de 98 % d'eau, donc elle compte autant que le grain. Une eau trop calcaire masque les arômes et entartre la machine ; une eau totalement déminéralisée donne un café plat, car quelques minéraux sont nécessaires à l'extraction. Une eau de source faiblement minéralisée ou filtrée constitue le meilleur compromis.",
    group: 'Lait & entretien',
  },
];
