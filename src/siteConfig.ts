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
  accentColor: '#c07a3e', // ambre / café, chaleureux

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
    pinterest: '',
  },

  // Auteur par défaut affiché sur les articles
  author: 'Rédaction',

  // Code de vérification Google Search Console (méthode "balise HTML").
  // C'est la valeur après "google-site-verification=". Laisse vide si inutile.
  googleSiteVerification: '',

  // Code de revendication du site sur Pinterest (Paramètres → Revendiquer →
  // Revendiquer un site web → "Ajouter une balise HTML"). Colle ici la valeur
  // du content de la balise <meta name="p:domain_verify" content="...">.
  pinterestVerification: 'b3f3e01eaed2d288456f025adfbcf8b8',
};

export type SiteConfig = typeof siteConfig;
