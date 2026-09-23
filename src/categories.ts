export const categories = [
  {
    slug: 'machines',
    icon: 'espresso-machine',
    label: 'Machines & cafetières',
    short: 'Machines',
    description: 'Expresso, à grains, filtre, capsules ou italienne : la machine adaptée à ta façon de boire le café.',
  },
  {
    slug: 'moulins',
    icon: 'grinder',
    label: 'Moulins à café',
    short: 'Moulins',
    description: 'La mouture fraîche change tout : moulins électriques ou manuels, à meules ou à lames.',
  },
  {
    slug: 'accessoires',
    icon: 'kettle',
    label: 'Accessoires & entretien',
    short: 'Accessoires',
    description: 'Mousseurs à lait, balances, bouilloires, détartrants : les petits plus qui font la différence.',
  },
  {
    slug: 'preparer',
    icon: 'dripper',
    label: 'Préparer son café',
    short: 'Préparer',
    description: 'Réussir chaque méthode : espresso, moka, piston, filtre, cold brew — ratios, mouture et gestes qui changent la tasse.',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
