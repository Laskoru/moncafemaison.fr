// Pages "guides / hubs" : des pages thématiques qui regroupent plusieurs
// articles autour d'un besoin large (ex. « débuter le café maison »).
// Elles ciblent des requêtes générales et renforcent le maillage interne.
//
// Pour ajouter un guide : ajoute une entrée ici avec ses paragraphes d'intro
// et la liste des slugs d'articles à mettre en avant. La page se génère seule.

export interface Guide {
  slug: string;
  icon: string;
  title: string;
  /** Balise <title> (≤ 60 caractères) quand elle doit différer du H1. */
  seoTitle?: string;
  description: string; // méta-description SEO (120 à 155 caractères)
  intro: string[]; // paragraphes affichés en haut du guide
  articles: string[]; // slugs d'articles à regrouper (dans l'ordre souhaité)
  /** Réponse directe à la question principale du guide, affichée avant la liste. */
  essentials?: { title: string; items: string[] };
}

export const guides: Guide[] = [
  {
    slug: 'debuter-cafe-maison',
    icon: 'sprout',
    title: 'Débuter le café maison',
    seoTitle: 'Débuter le café maison : le matériel essentiel',
    description:
      'Par où commencer pour faire un bon café chez soi : la méthode, le moulin, la balance et la machine, dans le bon ordre, sans se ruiner.',
    intro: [
      "Faire un bon café à la maison ne demande pas forcément une machine hors de prix. Ce qui change vraiment le résultat dans la tasse, c'est la fraîcheur de la mouture, la qualité de l'eau et un minimum de régularité, pas le prix affiché.",
      "Ce guide rassemble l'essentiel pour bien démarrer : de quoi moudre son café juste avant l'extraction, une méthode de préparation simple et fiable, et les quelques accessoires qui font une vraie différence dès le premier jour.",
      "L'ordre compte : choisis d'abord la tasse que tu veux (espresso, grand filtre, café au lait), puis la méthode qui la donne, et seulement ensuite le matériel. Le <a href=\"/methodes-cafe/\">comparatif des méthodes</a> t'aide pour la première étape, le <a href=\"/calculateur-dosage-cafe/\">calculateur de dosage</a> pour les grammes.",
    ],
    essentials: {
      title: 'Le minimum pour bien commencer',
      items: [
        'Une méthode adaptée à ta tasse : filtre ou piston pour un grand café, moka ou machine expresso pour un café court et corsé.',
        'Du café en grains frais et un moulin à meules : c’est le premier poste qui change le goût.',
        'Une balance au gramme près pour refaire le même café d’un jour à l’autre.',
        'Un détartrage régulier de la machine, surtout si ton eau est calcaire.',
      ],
    },
    articles: [
      'meilleure-cafetiere-grains',
      'meilleur-moulin-cafe-electrique',
      'balance-cafe-precision',
      'machine-capsules-vs-machine-grains',
      'moulin-cafe-meules-ou-lames',
      'meilleur-detartrant-machine-a-cafe',
    ],
  },
  {
    slug: 'espresso-maison',
    icon: 'coffee',
    title: 'Réussir son espresso à la maison',
    seoTitle: 'Espresso maison : le guide pour le réussir',
    description:
      "Espresso maison : ce qu'il faut pour un bon espresso (machine, moulin, dose, tassage) et nos comparatifs pour bien s'équiper, dans l'ordre conseillé.",
    intro: [
      "L'espresso maison est exigeant : c'est la préparation qui pardonne le moins les erreurs de mouture et de dosage. Mais avec le bon duo machine + moulin, on obtient des résultats bluffants pour une fraction du prix des cafés de comptoir.",
      "On réunit ici les comparatifs utiles pour se lancer dans l'espresso : la machine, le moulin capable de descendre assez fin, et les petits accessoires (tamper, balance, pichet à lait) qui font la régularité.",
      "Commence par lire <a href=\"/articles/reussir-espresso-maison/\">les 4 réglages à maîtriser</a> : comprendre la mouture, la dose, le tassage et le temps d'extraction évite d'acheter du matériel pour corriger une erreur de geste.",
    ],
    essentials: {
      title: 'Que faut-il pour un bon espresso ?',
      items: [
        'Une machine à porte-filtre (ou une machine à grains) capable d’une extraction sous pression régulière.',
        'Une mouture fine et surtout régulière : un moulin à meules réglable finement, jamais à lames.',
        'Une dose pesée : par exemple 18 g de café pour environ 36 g d’espresso dans la tasse.',
        'Un tassage régulier et un temps d’extraction autour de 25 à 30 secondes ; on corrige avec la mouture.',
        'Des grains fraîchement torréfiés : sans eux, pas de crema.',
      ],
    },
    articles: [
      'meilleure-machine-expresso',
      'meilleur-moulin-cafe-electrique',
      'meilleur-mousseur-lait',
      'machine-expresso-broyeur-integre',
      'meilleur-moulin-pour-espresso',
      'tamper-espresso-bien-choisir',
      'reussir-espresso-maison',
    ],
  },
  {
    slug: 'cafe-filtre-slow',
    icon: 'droplet',
    title: 'Café filtre & slow coffee',
    seoTitle: 'Café filtre et slow coffee : méthodes et réglages',
    description:
      'French press, V60, Chemex, AeroPress, cold brew : le guide des méthodes douces pour un café filtre aromatique à la maison, avec dosages et matériel.',
    intro: [
      "Le café filtre (ou « slow coffee ») révèle les arômes d'un café bien plus finement qu'une machine automatique. C'est aussi le point d'entrée le plus économique : quelques accessoires suffisent pour des résultats remarquables.",
      "Ce guide regroupe nos comparatifs autour des méthodes douces : cafetière à piston, cafetières à filtre manuel, et le matériel qui va avec (bouilloire à col de cygne, balance, moulin).",
      "Pour les quantités, pars d'environ 7,5 g de café moulu par tasse de 125 ml : le <a href=\"/calculateur-dosage-cafe/\">calculateur de dosage</a> donne le détail de 2 à 12 tasses et pour chaque méthode.",
    ],
    essentials: {
      title: 'Les trois réglages du café filtre',
      items: [
        'Le ratio : autour de 1 g de café pour 17 g d’eau, à ajuster d’un ou deux grammes selon ton goût.',
        'La mouture : moyenne pour le filtre, plus grossière pour le piston, à moudre juste avant.',
        'L’eau : chaude mais pas bouillante, versée régulièrement ; une eau peu calcaire donne une tasse plus nette.',
      ],
    },
    articles: [
      'meilleure-cafetiere-piston-french-press',
      'meilleur-moulin-cafe-electrique',
      'balance-cafe-precision',
      'reussir-cafe-filtre-v60',
      'chemex-cafetiere-filtre-design',
      'aeropress-test-alternatives',
      'reussir-french-press-piston',
      'bouilloire-col-de-cygne',
      'filtres-reutilisables-cafe',
      'reussir-cold-brew-maison',
    ],
  },
];
