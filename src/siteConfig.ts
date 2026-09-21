// ────────────────────────────────────────────────────────────
// Config centrale du site.
// C'est le SEUL fichier à modifier quand tu dupliques ce
// template pour lancer un nouveau site de niche.
// ────────────────────────────────────────────────────────────

export const siteConfig = {
  // Identité
  name: 'Mon Café Maison',
  tagline: 'Faire un bon café chez soi, sans se tromper de matériel',
  description:
    "Mon Café Maison aide à choisir le bon matériel pour faire un excellent café à la maison : machines, moulins et accessoires, comparatifs et conseils d'achat.",
  lang: 'fr',
  locale: 'fr_FR',

  // Branding
  accentColor: '#b5702c', // ambre torréfié, chaleureux

  // Publicité — AdSense désactivé pour le moment, on démarre en 100% affiliation Amazon
  adsense: {
    enabled: false, // passe à true le jour où tu ajoutes AdSense
    clientId: 'ca-pub-XXXXXXXXXXXXXXXX',
  },

  // Programme Partenaires Amazon
  amazon: {
    enabled: true,
    tag: 'moncafemaison-21',
  },

  // Email de contact public (mentions légales, confidentialité, contact)
  contactEmail: 'contact@moncafemaison.fr',

  // Réseaux / contact (optionnel, laisse vide si non utilisé)
  social: {
    twitter: '',
    instagram: '',
    // URL complète du profil Pinterest (ex : 'https://www.pinterest.fr/moncafemaison/').
    // Renseignée ici, elle alimente le champ sameAs du schéma Organization.
    pinterest: 'https://fr.pinterest.com/malinalamaison/',
    // Profil Flipboard (magazines alimentés par le flux RSS) — champ sameAs.
    flipboard: 'https://flipboard.com/@HBWEB35',
  },

  // Auteur par défaut affiché sur les articles
  author: 'Hugo B.',

  // Code de vérification Google Search Console (méthode "balise HTML").
  // C'est la valeur après "google-site-verification=". Laisse vide si inutile.
  googleSiteVerification: '',

  // Identifiant de mesure Google Analytics 4 (format G-XXXXXXXXXX). Laisse vide
  // pour désactiver. La balise gtag.js est alors chargée dans le <head>.
  gaId: 'G-FY147WDC2M',

  // Code de revendication du site sur Pinterest (Paramètres → Revendiquer →
  // Revendiquer un site web → "Ajouter une balise HTML"). Colle ici la valeur
  // du content de la balise <meta name="p:domain_verify" content="...">.
  pinterestVerification: 'c423934bbd4908b7a53d8d6217675a21',

  // Encart "ressource gratuite" de la sidebar (l'aimant à liens du site)
  freebie: {
    url: '/calculateur-dosage-cafe/',
    title: 'Calculateur de dosage',
    desc: 'Le bon café en grammes, selon ta méthode et ton nombre de tasses.',
    cta: 'Ouvrir le calculateur',
  },

  // Newsletter : colle ici l'URL du formulaire de ton service (Brevo/Mailchimp).
  newsletter: { actionUrl: '' },
};

export type SiteConfig = typeof siteConfig;
