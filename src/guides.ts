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
  description: string; // méta-description SEO
  intro: string[]; // paragraphes affichés en haut du guide
  articles: string[]; // slugs d'articles à regrouper (dans l'ordre souhaité)
}

export const guides: Guide[] = [
  {
    slug: 'debuter-cafe-maison',
    icon: '🌱',
    title: 'Débuter le café maison',
    description:
      'Par où commencer pour faire un bon café chez soi : le matériel essentiel (machine, moulin, balance) sans se ruiner ni se compliquer la vie.',
    intro: [
      "Faire un bon café à la maison ne demande pas forcément une machine hors de prix. Ce qui change vraiment le résultat dans la tasse, c'est la fraîcheur de la mouture, la qualité de l'eau et un minimum de régularité — pas le prix affiché.",
      "Ce guide rassemble l'essentiel pour bien démarrer : de quoi moudre son café juste avant l'extraction, une méthode de préparation simple et fiable, et les quelques accessoires qui font une vraie différence dès le premier jour.",
    ],
    articles: [
      'meilleure-cafetiere-grains',
      'meilleur-moulin-cafe-electrique',
      'balance-cafe-precision',
    ],
  },
  {
    slug: 'espresso-maison',
    icon: '☕',
    title: 'Réussir son espresso à la maison',
    description:
      "Le guide pour tirer un espresso digne d'un café : machine, moulin adapté, et les accessoires qui font la crema.",
    intro: [
      "L'espresso maison est exigeant : c'est la préparation qui pardonne le moins les erreurs de mouture et de dosage. Mais avec le bon duo machine + moulin, on obtient des résultats bluffants pour une fraction du prix des cafés de comptoir.",
      "On réunit ici les comparatifs utiles pour se lancer dans l'espresso : la machine, le moulin capable de descendre assez fin, et les petits accessoires (tamper, balance, pichet à lait) qui font la régularité.",
    ],
    articles: [
      'meilleure-machine-expresso',
      'meilleur-moulin-cafe-electrique',
      'meilleur-mousseur-lait',
    ],
  },
  {
    slug: 'cafe-filtre-slow',
    icon: '💧',
    title: 'Café filtre & slow coffee',
    description:
      'French press, V60, Chemex, AeroPress : le guide des méthodes douces pour un café filtre aromatique à la maison.',
    intro: [
      "Le café filtre (ou « slow coffee ») révèle les arômes d'un café bien plus finement qu'une machine automatique. C'est aussi le point d'entrée le plus économique : quelques accessoires suffisent pour des résultats remarquables.",
      "Ce guide regroupe nos comparatifs autour des méthodes douces : cafetière à piston, cafetières à filtre manuel, et le matériel qui va avec (bouilloire à col de cygne, balance, moulin).",
    ],
    articles: [
      'meilleure-cafetiere-piston-french-press',
      'meilleur-moulin-cafe-electrique',
      'balance-cafe-precision',
    ],
  },
];
