export const categories = [
  {
    slug: 'machines',
    icon: '☕',
    label: 'Machines & cafetières',
    description: 'Expresso, à grains, filtre, capsules ou italienne : la machine adaptée à ta façon de boire le café.',
  },
  {
    slug: 'moulins',
    icon: '⚙️',
    label: 'Moulins à café',
    description: 'La mouture fraîche change tout : moulins électriques ou manuels, à meules ou à lames.',
  },
  {
    slug: 'accessoires',
    icon: '🥛',
    label: 'Accessoires & entretien',
    description: 'Mousseurs à lait, balances, bouilloires, détartrants : les petits plus qui font la différence.',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
