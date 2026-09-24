export const categories = [
  {
    slug: 'machines',
    icon: 'espresso-machine',
    label: 'Machines & cafetières',
    short: 'Machines',
    description: 'Expresso, à grains, filtre, capsules ou italienne : la machine adaptée à ta façon de boire le café.',
    intro: `<p>Une bonne machine, c’est d’abord celle qui colle à ta façon de boire le café. Tu bois surtout des espressos et des cappuccinos ? Regarde du côté des <a href="/articles/meilleure-machine-expresso/">machines expresso</a>, de celles <a href="/articles/machine-expresso-broyeur-integre/">avec broyeur intégré</a> ou des <a href="/articles/meilleure-cafetiere-grains/">machines à grains</a>, qui moulent le café juste avant l’extraction. Tu prépares plusieurs tasses le matin pour toute la maison ? Une <a href="/articles/meilleure-cafetiere-filtre-programmable/">cafetière filtre programmable</a> reste la solution la plus simple.</p>
<p>Tu hésites entre capsules et grains ? Notre <a href="/articles/machine-capsules-vs-machine-grains/">comparatif des deux systèmes</a> t’aide à trancher selon ton budget et ton usage. Et pour un très bon café sans grosse dépense, les méthodes douces donnent d’excellents résultats : <a href="/articles/cafetiere-italienne-moka/">moka</a>, <a href="/articles/meilleure-cafetiere-piston-french-press/">piston</a>, <a href="/articles/aeropress-test-alternatives/">AeroPress</a> ou <a href="/articles/chemex-cafetiere-filtre-design/">Chemex</a>.</p>`,
  },
  {
    slug: 'moulins',
    icon: 'grinder',
    label: 'Moulins à café',
    short: 'Moulins',
    description: 'La mouture fraîche change tout : moulins électriques ou manuels, à meules ou à lames.',
    intro: `<p>Le moulin compte autant que la machine : un café moulu juste avant l’infusion garde ses arômes, alors qu’un café moulu à l’avance les perd vite. La mouture doit aussi correspondre à ta méthode : très fine pour l’espresso, moyenne pour le filtre, grossière pour le piston.</p>
<p>Premier choix : <a href="/articles/moulin-cafe-meules-ou-lames/">meules ou lames</a>. Les meules donnent une mouture régulière, les lames hachent le grain de façon inégale. Ensuite, manuel ou électrique : le <a href="/articles/meilleur-moulin-cafe-manuel/">moulin manuel</a> est silencieux et souvent plus précis à prix égal, le <a href="/articles/meilleur-moulin-cafe-electrique/">moulin électrique</a> fait gagner du temps chaque matin. Pour l’espresso, il faut un réglage fin et stable : vois notre guide du <a href="/articles/meilleur-moulin-pour-espresso/">moulin pour espresso</a>. Petit budget ? Voici les <a href="/articles/moulin-cafe-pas-cher-qui-vaut-le-coup/">moulins pas chers qui valent le coup</a>.</p>`,
  },
  {
    slug: 'accessoires',
    icon: 'kettle',
    label: 'Accessoires & entretien',
    short: 'Accessoires',
    description: 'Mousseurs à lait, balances, bouilloires, détartrants : les petits plus qui font la différence.',
    intro: `<p>Les accessoires font souvent plus pour ta tasse qu’un changement de machine. Une <a href="/articles/balance-cafe-precision/">balance de précision</a> permet de doser au gramme près et de refaire le même café d’un jour à l’autre. Une <a href="/articles/bouilloire-col-de-cygne/">bouilloire à col de cygne</a> contrôle le versement pour le V60 et la Chemex. Pour l’espresso, un <a href="/articles/tamper-espresso-bien-choisir/">tamper</a> bien choisi assure un tassage régulier.</p>
<p>Côté lait, le <a href="/articles/meilleur-mousseur-lait/">mousseur</a> ouvre la porte au cappuccino et au latte maison. Pour que ta machine dure, le <a href="/articles/meilleur-detartrant-machine-a-cafe/">détartrage régulier</a> reste le geste d’entretien le plus important. À voir aussi : les <a href="/articles/filtres-reutilisables-cafe/">filtres réutilisables</a> et nos <a href="/articles/idees-cadeaux-cafe-par-budget/">idées cadeaux par budget</a>.</p>`,
  },
  {
    slug: 'preparer',
    icon: 'dripper',
    label: 'Préparer son café',
    short: 'Préparer',
    description: 'Réussir chaque méthode : espresso, moka, piston, filtre, cold brew — ratios, mouture et gestes qui changent la tasse.',
    intro: `<p>Le même café peut être délicieux ou amer selon la façon de le préparer. Trois réglages font presque tout : le ratio entre café et eau, la finesse de la mouture et le temps de contact. Chaque guide ci-dessous te donne ces repères pour une méthode, avec les gestes qui évitent les erreurs classiques.</p>
<p>Pour doser sans calcul, ouvre le <a href="/calculateur-dosage-cafe/">calculateur de dosage</a> : il donne les grammes de café et la quantité d’eau selon ta méthode et ton nombre de tasses. Tu ne sais pas encore quelle méthode choisir ? Le <a href="/methodes-cafe/">comparatif des méthodes</a> met côte à côte résultat en tasse, difficulté et budget.</p>`,
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
