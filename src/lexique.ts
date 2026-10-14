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
  'Les boissons',
  'Méthodes douces',
  'Lait & entretien',
] as const;

export const lexique: LexiqueEntry[] = [
  // ---- Le grain & la torréfaction ----
  {
    term: 'Arabica / Robusta',
    question: 'Quelle différence entre arabica et robusta ?',
    answer:
      "Ce sont les deux grandes espèces de café cultivées. L'arabica est plus aromatique, plus acidulé et plus complexe, avec environ deux fois moins de caféine ; le robusta est plus corsé, plus amer, et donne davantage de crema en espresso. Beaucoup de mélanges italiens ajoutent volontairement une part de robusta pour le corps et la tenue de la mousse : ce n'est pas un défaut, c'est un choix de style.",
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
      "Le café ne devient pas dangereux, mais il perd vite ses arômes. Le repère utile n'est pas la date limite de consommation affichée mais la date de torréfaction : un café donne le meilleur entre 5 jours et 6 semaines après torréfaction. Un paquet sans date de torréfaction est souvent le signe d'un café déjà ancien : c'est le premier critère à regarder, avant même le prix.",
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
      "Les deux écrasent le grain de façon régulière, contrairement aux moulins à lames qui le hachent. Les meules coniques sont plus courantes, moins chères et chauffent moins ; les meules plates donnent une mouture souvent un peu plus homogène, appréciée en espresso pointu. Pour la grande majorité des usages maison, de bonnes meules coniques suffisent largement : l'écart avec un moulin à lames est bien plus grand que celui entre coniques et plates.",
    group: 'La mouture',
    related: ['meilleur-moulin-cafe-electrique', 'meilleur-moulin-cafe-manuel'],
  },
  {
    term: 'Finesse de mouture',
    question: 'Quelle mouture pour quelle cafetière ?',
    answer:
      "Plus l'eau reste longtemps en contact avec le café, plus la mouture doit être grossière. En pratique : très fine pour l'espresso, fine à moyenne pour la moka italienne, moyenne pour le filtre et le pour-over, grossière pour la French press et l'infusion à froid. Une mouture inadaptée est la première cause d'un café raté, bien avant la qualité du grain.",
    group: 'La mouture',
    related: ['moulin-cafe-meules-ou-lames', 'meilleure-cafetiere-piston-french-press', 'cafetiere-italienne-moka'],
  },
  {
    term: 'Homogénéité de la mouture',
    question: "Pourquoi la régularité de la mouture est-elle si importante ?",
    answer:
      "Si les particules sont de tailles très différentes, les plus fines sur-extraient (amertume) pendant que les grosses sous-extraient (acidité, goût d'eau), dans la même tasse. C'est exactement ce que produit un moulin à lames. Un moulin à meules, même d'entrée de gamme, améliore davantage le café que de passer à un grain plus cher.",
    group: 'La mouture',
    related: ['moulin-cafe-meules-ou-lames', 'meilleur-moulin-cafe-electrique'],
  },

  // ---- Extraction & espresso ----
  {
    term: 'Bars (pression)',
    question: 'Combien de bars faut-il pour un bon espresso ?',
    answer:
      "La norme d'extraction d'un espresso est d'environ 9 bars au niveau du café. Les machines annonçant 15 ou 20 bars affichent la pression maximale de la pompe, pas celle réellement appliquée : au-delà de 9 bars, ce n'est pas meilleur. Ce chiffre est donc un argument marketing plus qu'un critère de qualité : la stabilité de la température et la mouture comptent bien davantage.",
    group: 'Extraction & espresso',
    related: ['meilleure-machine-expresso'],
  },
  {
    term: 'Crema',
    question: "Qu'est-ce que la crema d'un espresso ?",
    answer:
      "C'est la mousse dense et noisette qui surmonte un espresso, formée par le CO₂ du café emprisonné sous pression. Une belle crema indique en général un café frais et une extraction correcte, mais ce n'est pas un gage de goût absolu : un robusta médiocre produit beaucoup de crema, un excellent arabica clair en produit peu. À regarder, donc, sans en faire l'unique juge.",
    group: 'Extraction & espresso',
    related: ['reussir-espresso-maison', 'meilleure-machine-expresso'],
  },
  {
    term: 'Sur-extraction / sous-extraction',
    question: 'Mon café est amer ou acide : que corriger ?',
    answer:
      "Un café amer, sec et astringent est généralement sur-extrait : mouture trop fine, temps trop long ou eau trop chaude. Un café acide, salé et sans corps est sous-extrait : mouture trop grossière ou passage trop rapide. Le réglage à modifier en premier est presque toujours la mouture, un cran à la fois.",
    group: 'Extraction & espresso',
    related: ['reussir-espresso-maison', 'delonghi-magnifica-s-cafe-trop-clair-amer'],
  },
  {
    term: 'Ratio café / eau',
    question: 'Quel dosage de café par tasse ?',
    answer:
      "Le repère courant en filtre est un ratio de 1:15 à 1:16, soit 60 à 65 g de café par litre d'eau (à peu près 6 g pour 100 ml). Pour un espresso, on part souvent de 18 g de café pour 36 g de boisson (ratio 1:2). Ces valeurs sont des points de départ à ajuster à son goût, pas des règles : une balance rend ces ajustements reproductibles d'un jour à l'autre.",
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
    related: ['reussir-cafe-filtre-v60', 'chemex-cafetiere-filtre-design'],
  },
  {
    term: 'Blooming (pré-infusion)',
    question: "Qu'est-ce que le blooming en café filtre ?",
    answer:
      "Il s'agit de mouiller le café avec un peu d'eau chaude, environ deux fois son poids, et d'attendre 30 à 45 secondes avant de continuer à verser. Cette pause laisse s'échapper le CO₂ restant et permet ensuite une extraction bien plus régulière. C'est le geste le plus simple pour améliorer nettement un café filtre.",
    group: 'Méthodes douces',
    related: ['reussir-cafe-filtre-v60'],
  },
  {
    term: 'Cold brew',
    question: 'Quelle différence entre cold brew et café glacé ?',
    answer:
      "Le cold brew est infusé à froid pendant 12 à 24 heures : il en résulte un café doux, peu acide et peu amer, qui se conserve quelques jours au réfrigérateur. Un café glacé classique est simplement un café chaud refroidi ou versé sur glace, avec un profil plus acidulé et plus proche du café d'origine. Le cold brew demande une mouture grossière et beaucoup de patience.",
    group: 'Méthodes douces',
    related: ['reussir-cold-brew-maison', 'meilleure-cafetiere-piston-french-press'],
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
      "Cela dépend surtout de la dureté de l'eau : tous les 2 à 3 mois en eau très calcaire, deux fois par an en eau douce. Le tartre réduit le débit, fait chuter la température et finit par abîmer la pompe : c'est la première cause de panne des machines domestiques. Utiliser une eau filtrée ou faiblement minéralisée espace nettement les détartrages.",
    group: 'Lait & entretien',
    related: ['meilleur-detartrant-machine-a-cafe', 'meilleure-machine-expresso'],
  },
  {
    term: 'Qualité de l’eau',
    question: 'Quelle eau utiliser pour faire son café ?',
    answer:
      "Un café est composé à plus de 98 % d'eau, donc elle compte autant que le grain. Une eau trop calcaire masque les arômes et entartre la machine ; une eau totalement déminéralisée donne un café plat, car quelques minéraux sont nécessaires à l'extraction. Une eau de source faiblement minéralisée ou filtrée constitue le meilleur compromis.",
    group: 'Lait & entretien',
  },

  // ---- Ajouts du 14/10/2026 (glossaire barista) ----
  {
    term: "Liberica",
    question: "C'est quoi le café liberica ?",
    answer:
      "La troisième espèce de café, cultivée en très petites quantités à côté de l'arabica et du robusta. Son goût est marqué, boisé, fumé, avec des notes de fruits secs, ce qui déroute une partie des buveurs. On la trouve surtout en mélange, rarement seule dans un paquet.",
    group: "Le grain & la torréfaction",
  },
  {
    term: "Mélange (blend)",
    question: "Qu'est-ce qu'un mélange de café ?",
    answer:
      "Un assemblage de grains de plusieurs origines, parfois de plusieurs espèces, composé pour obtenir un goût régulier d'une année sur l'autre. La plupart des cafés pour espresso sont des mélanges : chaque origine apporte une qualité (corps, douceur, acidité) et le torréfacteur dose l'ensemble.",
    group: "Le grain & la torréfaction",
    related: ["meilleure-cafetiere-grains"],
  },
  {
    term: "Pure origine",
    question: "Que veut dire « pure origine » sur un paquet de café ?",
    answer:
      "Le café vient d'un seul pays, d'une seule région, voire d'une seule ferme, sans être mélangé à d'autres. Il montre mieux le caractère de son terroir (fruité, floral, chocolaté), mais il varie d'une récolte à l'autre. C'est un format très courant pour le café filtre et le pour-over.",
    group: "Le grain & la torréfaction",
  },
  {
    term: "Grain vert",
    question: "Qu'appelle-t-on le café vert ?",
    answer:
      "C'est le grain de café avant torréfaction, une fois séché et débarrassé de sa pulpe. Il est dur, de couleur vert pâle, et n'a presque pas d'arôme de café : le goût se développe pendant la torréfaction.",
    group: "Le grain & la torréfaction",
  },
  {
    term: "Corps",
    question: "Que veut dire un café « qui a du corps » ?",
    answer:
      "Le corps décrit la sensation du café en bouche, de léger et presque aqueux à rond et épais. Un café au corps plein tapisse la bouche, un café léger paraît plus fluide. Le robusta, la torréfaction foncée et les méthodes qui laissent passer les huiles (piston, espresso) donnent plus de corps.",
    group: "Le grain & la torréfaction",
  },
  {
    term: "Acidité",
    question: "L'acidité d'un café, c'est un défaut ?",
    answer:
      "Pas forcément. En dégustation, l'acidité désigne une vivacité agréable, qui rappelle les agrumes ou les fruits rouges, surtout présente dans les arabicas en torréfaction claire. Elle devient un défaut quand elle est piquante et creuse, ce qui signale souvent un café sous-extrait.",
    group: "Le grain & la torréfaction",
  },
  {
    term: "Moulin à meules",
    question: "Qu'est-ce qu'un moulin à meules ?",
    answer:
      "Un moulin qui écrase le grain entre deux meules, dont l'écart fixe la finesse de mouture. Il donne une mouture bien plus régulière qu'un moulin à lames, qui hache le grain au hasard. C'est le premier achat conseillé pour améliorer son café.",
    group: "La mouture",
    related: ["moulin-cafe-meules-ou-lames", "meilleur-moulin-cafe-electrique"],
  },
  {
    term: "Rétention",
    question: "Qu'est-ce que la rétention d'un moulin ?",
    answer:
      "C'est la mouture qui reste coincée dans le moulin après chaque utilisation. Elle tombe dans la tasse suivante, déjà rassise, et fausse un peu la dose. Une rétention faible compte surtout pour l'espresso et quand on change souvent de café.",
    group: "La mouture",
    related: ["meilleur-moulin-pour-espresso"],
  },
  {
    term: "Mouture à la demande",
    question: "Pourquoi moudre son café juste avant de le préparer ?",
    answer:
      "Le café moulu perd ses arômes bien plus vite que le grain entier, car sa surface en contact avec l'air est multipliée. Moudre la dose au moment de la préparer garde le maximum de goût. C'est l'intérêt principal d'un moulin à la maison ou d'une machine à broyeur intégré.",
    group: "La mouture",
    related: ["machine-capsules-vs-machine-grains", "meilleur-moulin-cafe-manuel"],
  },
  {
    term: "Porte-filtre",
    question: "À quoi sert le porte-filtre d'une machine expresso ?",
    answer:
      "C'est la pièce à long manche qui se fixe sous le groupe de la machine. Il contient le panier où l'on met et tasse la mouture, et un bec par lequel l'espresso coule dans la tasse.",
    group: "Extraction & espresso",
    related: ["meilleure-machine-expresso"],
  },
  {
    term: "Panier (simple, double, pressurisé)",
    question: "Quelle différence entre un panier simple, double et pressurisé ?",
    answer:
      "Le panier est le petit filtre métallique qui se loge dans le porte-filtre. Le simple reçoit la dose d'un espresso, le double celle d'un doppio. Le panier pressurisé, fréquent sur les machines d'entrée de gamme, recrée lui-même la pression : il pardonne une mouture imparfaite, mais limite la marge de progression.",
    group: "Extraction & espresso",
    related: ["meilleure-machine-expresso"],
  },
  {
    term: "Tamper (tassage)",
    question: "À quoi sert un tamper ?",
    answer:
      "Le tamper, ou tasseur, compresse la mouture dans le panier pour former une galette compacte et plate. Un tassage régulier aide l'eau à traverser le café de façon uniforme. Le diamètre du tamper doit correspondre exactement à celui du panier.",
    group: "Extraction & espresso",
    related: ["tamper-espresso-bien-choisir"],
  },
  {
    term: "Galette (puck)",
    question: "Qu'est-ce que la galette de café dans le porte-filtre ?",
    answer:
      "C'est la mouture tassée dans le panier, avant et après l'extraction. Une galette détrempée, creusée ou fissurée après le café signale souvent un problème de dose, de mouture ou de tassage.",
    group: "Extraction & espresso",
    related: ["reussir-espresso-maison"],
  },
  {
    term: "Canalisation (channeling)",
    question: "Qu'est-ce que la canalisation en espresso ?",
    answer:
      "L'eau trouve un chemin plus facile dans la galette (fissure, zone moins tassée, amas de mouture) et s'y engouffre au lieu de traverser tout le café. Une partie du café est sur-extraite, le reste sous-extrait : l'espresso est à la fois amer et acide. Une bonne répartition de la mouture et un tassage à plat la limitent.",
    group: "Extraction & espresso",
    related: ["tamper-espresso-bien-choisir"],
  },
  {
    term: "WDT",
    question: "C'est quoi le WDT en espresso ?",
    answer:
      "Une technique de répartition de la mouture avant le tassage, avec un outil à fines aiguilles qu'on fait tourner dans le panier. Elle casse les petits amas et répartit le café de façon homogène, ce qui réduit le risque de canalisation.",
    group: "Extraction & espresso",
    related: ["reussir-espresso-maison"],
  },
  {
    term: "Pré-infusion",
    question: "À quoi sert la pré-infusion sur une machine expresso ?",
    answer:
      "La machine mouille d'abord la galette à faible pression pendant quelques secondes, avant d'envoyer la pleine pression. Le café s'imbibe de façon plus égale, ce qui limite la canalisation. Beaucoup de machines récentes la proposent, parfois réglable.",
    group: "Extraction & espresso",
    related: ["meilleure-machine-expresso"],
  },
  {
    term: "Shot",
    question: "Qu'appelle-t-on un shot d'espresso ?",
    answer:
      "C'est une portion d'espresso, le café qui coule en une extraction, d'environ 30 ml. Le mot vient de l'anglais et sert surtout à compter les doses dans une boisson au lait : un latte « double shot » contient deux espressos.",
    group: "Extraction & espresso",
  },
  {
    term: "Ristretto",
    question: "Qu'est-ce qu'un ristretto ?",
    answer:
      "Un espresso plus court et plus concentré : même quantité de café, mais moins d'eau, de l'ordre de 15 à 20 ml selon Test-Achats. Il est plus doux et moins amer qu'un espresso, car l'extraction s'arrête plus tôt.",
    group: "Les boissons",
    related: ["reussir-espresso-maison"],
  },
  {
    term: "Lungo",
    question: "Qu'est-ce qu'un lungo ?",
    answer:
      "« Long » en italien : un espresso pour lequel on laisse passer plus d'eau à travers la même dose de café. La tasse est plus grande et le goût plus amer. À ne pas confondre avec l'americano, où l'eau est ajoutée après l'extraction.",
    group: "Les boissons",
  },
  {
    term: "Doppio",
    question: "Qu'est-ce qu'un doppio ?",
    answer:
      "Un double espresso : deux fois plus de café et deux fois plus d'eau, extraits ensemble dans un panier double. Test-Achats donne l'ordre de grandeur de 18 g de café pour environ 60 ml. C'est la base de la plupart des boissons au lait en coffee shop.",
    group: "Les boissons",
    related: ["reussir-espresso-maison"],
  },
  {
    term: "Americano",
    question: "Quelle différence entre un americano et un lungo ?",
    answer:
      "L'americano est un espresso auquel on ajoute de l'eau chaude après l'extraction : le goût reste celui de l'espresso, dilué. Un lungo, lui, fait passer davantage d'eau à travers le café pendant l'extraction, ce qui le rend plus amer.",
    group: "Les boissons",
  },
  {
    term: "Long black",
    question: "Qu'est-ce qu'un long black ?",
    answer:
      "Un americano à l'envers : on verse d'abord l'eau chaude dans la tasse, puis l'espresso par-dessus. La crema reste ainsi à la surface au lieu d'être cassée par l'eau.",
    group: "Les boissons",
  },
  {
    term: "Cappuccino",
    question: "Comment est composé un cappuccino ?",
    answer:
      "Un espresso, du lait chaud et de la mousse de lait, en parts à peu près égales. C'est une boisson plus courte et plus mousseuse qu'un latte.",
    group: "Les boissons",
    related: ["meilleur-mousseur-lait"],
  },
  {
    term: "Latte",
    question: "Qu'est-ce qu'un latte ?",
    answer:
      "Un espresso allongé d'une grande quantité de lait chaud, avec un peu de mousse. Le café y est plus discret que dans un cappuccino. C'est la boisson de base du latte art.",
    group: "Les boissons",
    related: ["meilleur-mousseur-lait"],
  },
  {
    term: "Latte macchiato",
    question: "Quelle différence entre un latte et un latte macchiato ?",
    answer:
      "Dans le latte macchiato, on remplit d'abord un grand verre de lait chaud et de mousse, puis on verse l'espresso, qui « tache » le lait et forme des couches visibles. Le latte, lui, se prépare en versant le lait sur le café.",
    group: "Les boissons",
    related: ["meilleur-mousseur-lait"],
  },
  {
    term: "Macchiato (café noisette)",
    question: "Qu'est-ce qu'un macchiato ?",
    answer:
      "Un espresso « taché » d'un petit peu de lait ou de mousse de lait, qui adoucit son amertume. C'est l'équivalent du café noisette servi en France.",
    group: "Les boissons",
  },
  {
    term: "Cortado",
    question: "Qu'est-ce qu'un cortado ?",
    answer:
      "Un espresso coupé d'une quantité à peu près égale de lait chaud, chauffé à la vapeur mais sans mousse. Venu d'Espagne (cortar veut dire couper), il est plus court et plus corsé qu'un cappuccino.",
    group: "Les boissons",
  },
  {
    term: "Piccolo",
    question: "Qu'est-ce qu'un piccolo ?",
    answer:
      "Une petite boisson proche du macchiato, mais où le peu de lait est versé dans le café plutôt que posé dessus.",
    group: "Les boissons",
  },
  {
    term: "Flat white",
    question: "Qu'est-ce qu'un flat white ?",
    answer:
      "Un espresso, souvent double, avec du lait chaud et une fine couche de micro-mousse ferme. Le café y est plus présent que dans un latte. La recette varie selon les cafés : certains le préparent même avec un double ristretto.",
    group: "Les boissons",
    related: ["meilleur-mousseur-lait"],
  },
  {
    term: "Moka (cafetière italienne)",
    question: "Une moka fait-elle un espresso ?",
    answer:
      "La moka, ou cafetière italienne, pousse l'eau chauffée dans sa base à travers le café grâce à la pression de la vapeur. Cette pression reste bien plus faible que dans une machine expresso : le café est corsé et concentré, mais ce n'est pas un espresso au sens strict.",
    group: "Méthodes douces",
    related: ["cafetiere-italienne-moka", "reussir-cafetiere-italienne-moka"],
  },
  {
    term: "Cafetière à piston (French press)",
    question: "Comment fonctionne une cafetière à piston ?",
    answer:
      "Le café moulu grossièrement infuse directement dans l'eau chaude pendant quelques minutes, puis un filtre métallique poussé par le piston le sépare de la boisson. Le café garde ses huiles, ce qui lui donne du corps.",
    group: "Méthodes douces",
    related: ["reussir-french-press-piston", "meilleure-cafetiere-piston-french-press"],
  },
  {
    term: "V60 (cône filtre)",
    question: "C'est quoi un V60 ?",
    answer:
      "Un cône de filtration en V, à poser sur la tasse, avec un grand trou au fond et des rainures en spirale sur les parois. L'eau s'écoule vite, ce qui demande un versement régulier mais donne un café clair et aromatique. C'est l'outil le plus répandu du pour-over.",
    group: "Méthodes douces",
    related: ["reussir-cafe-filtre-v60"],
  },
  {
    term: "AeroPress",
    question: "Qu'est-ce que l'AeroPress ?",
    answer:
      "Un cylindre dans lequel le café infuse avant d'être poussé à travers un petit filtre papier par un piston. Léger et compact, il donne un café entre le filtre et l'espresso léger, et se prête à beaucoup de recettes.",
    group: "Méthodes douces",
    related: ["aeropress-test-alternatives"],
  },
  {
    term: "Chemex",
    question: "Qu'est-ce qu'une Chemex ?",
    answer:
      "Une carafe en verre en forme de sablier, avec un col en bois, qui sert à la fois de support de filtre et de verseuse. Ses filtres papier épais retiennent davantage d'huiles : le café est très clair et léger en corps.",
    group: "Méthodes douces",
    related: ["chemex-cafetiere-filtre-design"],
  },
  {
    term: "Buse vapeur",
    question: "À quoi sert la buse vapeur d'une machine expresso ?",
    answer:
      "C'est le petit tube qui envoie de la vapeur dans le lait pour le chauffer et le faire mousser. Bien utilisée, elle donne une micro-mousse soyeuse. Il faut la purger et l'essuyer après chaque usage pour que le lait n'y sèche pas.",
    group: "Lait & entretien",
    related: ["meilleur-mousseur-lait"],
  },
  {
    term: "Latte art",
    question: "Qu'est-ce que le latte art ?",
    answer:
      "Le dessin formé à la surface d'un latte ou d'un cappuccino en versant la micro-mousse de lait dans l'espresso (cœur, rosette, tulipe). Il demande un lait bien texturé, un pichet à bec fin et de l'entraînement.",
    group: "Lait & entretien",
    related: ["meilleur-mousseur-lait"],
  },
  {
    term: "Backflush (filtre aveugle)",
    question: "Qu'est-ce qu'un backflush sur une machine expresso ?",
    answer:
      "Un nettoyage du groupe avec un filtre aveugle, un panier sans trous : l'eau, parfois additionnée d'un produit nettoyant, repart dans le circuit et évacue les dépôts de café. Ne le fais que si la notice de ta machine le prévoit, car toutes ne le supportent pas.",
    group: "Lait & entretien",
    related: ["meilleure-machine-expresso"],
  },
  {
    term: "Joint de groupe",
    question: "Quand changer le joint de groupe d'une machine expresso ?",
    answer:
      "Le joint de groupe assure l'étanchéité entre la machine et le porte-filtre. Quand il durcit, le porte-filtre tourne plus loin qu'avant ou de l'eau fuit sur les côtés pendant l'extraction : c'est le signe qu'il faut le remplacer.",
    group: "Lait & entretien",
    related: ["machine-cafe-qui-fuit-par-le-bas"],
  },
];
