export type ServiceItem = {
  slug: string;
  title: string;
  name: string;
  detail: string;
  price: string;
  sold: string;
  highlight?: boolean;
};

export type PlatformData = {
  slug: string;
  logoName: string;
  name: string;
  tagline: string;
  description: string;
  services: ServiceItem[];
};

export const PLATFORMS: PlatformData[] = [
  {
    slug: "instagram",
    logoName: "Instagram",
    name: "Instagram",
    tagline: "Abonnés, vues et likes réels",
    description:
      "Développez votre compte Instagram avec des abonnés, vues et likes provenant de comptes réels et actifs. Livraison progressive, aucun mot de passe requis.",
    services: [
      { slug: "pack-vues-likes-instagram", title: "Pack Vues + Likes Instagram", name: "Vues + Likes", detail: "2 services en une seule commande", price: "1,59 €", sold: "141K+ vendues", highlight: true },
      { slug: "acheter-abonnes-instagram", title: "Acheter des Abonnés Instagram", name: "Abonnés", detail: "Livraison progressive, rétention garantie", price: "2,49 €", sold: "309K+ vendues" },
      { slug: "acheter-vues-instagram", title: "Acheter des Vues Instagram", name: "Vues", detail: "Pour publications et reels", price: "1,49 €", sold: "217K+ vendues" },
      { slug: "acheter-likes-instagram", title: "Acheter des Likes Instagram", name: "Likes", detail: "Engagement sur vos publications", price: "0,99 €", sold: "111K+ vendues" },
      { slug: "acheter-likes-premium-instagram", title: "Acheter des Likes Premium Instagram", name: "Likes Premium", detail: "Comptes vérifiés et actifs", price: "1,49 €", sold: "109K+ vendues" },
      { slug: "acheter-vues-stories-instagram", title: "Acheter des Vues Stories Instagram", name: "Vues Stories", detail: "Boost de visibilité en story", price: "1,29 €", sold: "54K+ vendues" },
    ],
  },
  {
    slug: "tiktok",
    logoName: "TikTok",
    name: "TikTok",
    tagline: "Vues, likes et partages réels",
    description:
      "Donnez à vos vidéos TikTok le coup de pouce qu’elles méritent avec un engagement réel et une livraison instantanée.",
    services: [
      { slug: "pack-vues-likes-partages-tiktok", title: "Pack Vues + Likes + Partages TikTok", name: "Vues + Likes + Partages", detail: "Pack complet pour un décollage rapide", price: "1,79 €", sold: "98K+ vendues", highlight: true },
      { slug: "acheter-abonnes-tiktok", title: "Acheter des Abonnés TikTok", name: "Abonnés", detail: "Comptes actifs et réels", price: "2,99 €", sold: "176K+ vendues" },
      { slug: "acheter-vues-tiktok", title: "Acheter des Vues TikTok", name: "Vues", detail: "Pour accélérer la portée de vos vidéos", price: "0,89 €", sold: "402K+ vendues" },
      { slug: "acheter-likes-tiktok", title: "Acheter des Likes TikTok", name: "Likes", detail: "Engagement sur vos vidéos", price: "1,19 €", sold: "133K+ vendues" },
      { slug: "acheter-partages-tiktok", title: "Acheter des Partages TikTok", name: "Partages", detail: "Augmentez la diffusion de vos vidéos", price: "1,49 €", sold: "54K+ vendues" },
      { slug: "acheter-commentaires-personnalises-tiktok", title: "Acheter des Commentaires Personnalisés TikTok", name: "Commentaires personnalisés", detail: "Rédigés pour correspondre à votre contenu", price: "3,49 €", sold: "18K+ vendues" },
    ],
  },
  {
    slug: "youtube",
    logoName: "YouTube",
    name: "YouTube",
    tagline: "Abonnés, vues et engagement réels",
    description:
      "Développez votre chaîne YouTube avec des abonnés et des vues réels, pour une croissance mesurable et durable.",
    services: [
      { slug: "pack-vues-likes-commentaires-youtube", title: "Pack Vues + Likes + Commentaires YouTube", name: "Vues + Likes + Commentaires", detail: "Pack complet pour vos nouvelles vidéos", price: "3,49 €", sold: "41K+ vendues", highlight: true },
      { slug: "acheter-abonnes-youtube", title: "Acheter des Abonnés YouTube", name: "Abonnés", detail: "Croissance progressive de la chaîne", price: "4,29 €", sold: "67K+ vendues" },
      { slug: "acheter-vues-youtube", title: "Acheter des Vues YouTube", name: "Vues", detail: "Pour vos vidéos et shorts", price: "1,99 €", sold: "189K+ vendues" },
      { slug: "acheter-likes-youtube", title: "Acheter des Likes YouTube", name: "Likes", detail: "Engagement sur vos vidéos", price: "2,19 €", sold: "48K+ vendues" },
      { slug: "acheter-commentaires-personnalises-youtube", title: "Acheter des Commentaires Personnalisés YouTube", name: "Commentaires personnalisés", detail: "Commentaires pertinents et rédigés", price: "3,99 €", sold: "22K+ vendues" },
      { slug: "acheter-heures-de-visionnage-youtube", title: "Acheter des Heures de Visionnage YouTube", name: "Heures de visionnage", detail: "Pour atteindre les seuils de monétisation", price: "6,99 €", sold: "9K+ vendues" },
    ],
  },
  {
    slug: "facebook",
    logoName: "Facebook",
    name: "Facebook",
    tagline: "Pages, groupes et publications",
    description:
      "Renforcez la présence de votre page ou groupe Facebook avec un engagement réel et durable.",
    services: [
      { slug: "acheter-abonnes-page-facebook", title: "Acheter des Abonnés Page Facebook", name: "Abonnés Page", detail: "Croissance organique simulée", price: "2,19 €", sold: "88K+ vendues", highlight: true },
      { slug: "acheter-likes-page-facebook", title: "Acheter des Likes Page Facebook", name: "Likes Page", detail: "Renforce la crédibilité de votre page", price: "1,79 €", sold: "102K+ vendues" },
      { slug: "acheter-likes-publication-facebook", title: "Acheter des Likes Publication Facebook", name: "Likes Publication", detail: "Engagement sur vos publications", price: "0,99 €", sold: "134K+ vendues" },
      { slug: "acheter-partages-facebook", title: "Acheter des Partages Facebook", name: "Partages", detail: "Augmentez la portée de vos posts", price: "1,29 €", sold: "36K+ vendues" },
      { slug: "acheter-membres-de-groupe-facebook", title: "Acheter des Membres de Groupe Facebook", name: "Membres de groupe", detail: "Pour développer votre communauté", price: "2,49 €", sold: "21K+ vendues" },
    ],
  },
  {
    slug: "x",
    logoName: "X / Twitter",
    name: "X / Twitter",
    tagline: "Abonnés, likes et retweets",
    description:
      "Développez votre audience sur X avec des abonnés et un engagement provenant de comptes réels.",
    services: [
      { slug: "acheter-abonnes-x", title: "Acheter des Abonnés X", name: "Abonnés", detail: "Comptes actifs et réels", price: "2,79 €", sold: "57K+ vendues", highlight: true },
      { slug: "acheter-likes-x", title: "Acheter des Likes X", name: "Likes", detail: "Engagement sur vos publications", price: "0,89 €", sold: "143K+ vendues" },
      { slug: "acheter-retweets-x", title: "Acheter des Retweets X", name: "Retweets", detail: "Augmentez la diffusion de vos posts", price: "1,19 €", sold: "62K+ vendues" },
      { slug: "acheter-vues-x", title: "Acheter des Vues X", name: "Vues", detail: "Pour vos publications et vidéos", price: "0,69 €", sold: "201K+ vendues" },
    ],
  },
  {
    slug: "snapchat",
    logoName: "Snapchat",
    name: "Snapchat",
    tagline: "Vues et abonnés réels",
    description:
      "Boostez la visibilité de vos stories et de votre profil Snapchat.",
    services: [
      { slug: "acheter-vues-story-snapchat", title: "Acheter des Vues Story Snapchat", name: "Vues Story", detail: "Boost de visibilité instantané", price: "1,49 €", sold: "44K+ vendues", highlight: true },
      { slug: "acheter-abonnes-snapchat", title: "Acheter des Abonnés Snapchat", name: "Abonnés", detail: "Comptes actifs et réels", price: "2,99 €", sold: "19K+ vendues" },
      { slug: "booster-score-snapchat", title: "Booster son Score Snapchat", name: "Score boost", detail: "Augmentation progressive du score", price: "1,99 €", sold: "8K+ vendues" },
    ],
  },
  {
    slug: "spotify",
    logoName: "Spotify",
    name: "Spotify",
    tagline: "Écoutes et abonnés réels",
    description:
      "Donnez à votre musique la portée qu’elle mérite avec des écoutes et des abonnés réels sur Spotify.",
    services: [
      { slug: "acheter-ecoutes-spotify", title: "Acheter des Écoutes Spotify", name: "Écoutes", detail: "Pour vos titres et albums", price: "1,99 €", sold: "76K+ vendues", highlight: true },
      { slug: "acheter-abonnes-playlist-spotify", title: "Acheter des Abonnés Playlist Spotify", name: "Abonnés Playlist", detail: "Croissance de votre playlist", price: "2,49 €", sold: "31K+ vendues" },
      { slug: "acheter-abonnes-profil-spotify", title: "Acheter des Abonnés Profil Spotify", name: "Abonnés Profil", detail: "Développez votre audience d’artiste", price: "2,29 €", sold: "18K+ vendues" },
    ],
  },
  {
    slug: "telegram",
    logoName: "Telegram",
    name: "Telegram",
    tagline: "Membres et vues de canal",
    description:
      "Développez votre canal ou groupe Telegram avec des membres réels et actifs.",
    services: [
      { slug: "acheter-membres-de-canal-telegram", title: "Acheter des Membres de Canal Telegram", name: "Membres de canal", detail: "Comptes actifs et réels", price: "2,49 €", sold: "64K+ vendues", highlight: true },
      { slug: "acheter-vues-de-publication-telegram", title: "Acheter des Vues de Publication Telegram", name: "Vues de publication", detail: "Augmentez la portée de vos posts", price: "0,99 €", sold: "112K+ vendues" },
      { slug: "acheter-reactions-telegram", title: "Acheter des Réactions Telegram", name: "Réactions", detail: "Engagement sur vos publications", price: "0,79 €", sold: "47K+ vendues" },
    ],
  },
  {
    slug: "whatsapp",
    logoName: "WhatsApp",
    name: "WhatsApp",
    tagline: "Membres et vues de statut",
    description:
      "Développez votre communauté WhatsApp avec des membres de groupe et des vues de statut réels.",
    services: [
      { slug: "acheter-membres-de-groupe-whatsapp", title: "Acheter des Membres de Groupe WhatsApp", name: "Membres de groupe", detail: "Comptes actifs et réels", price: "2,99 €", sold: "12K+ vendues", highlight: true },
      { slug: "acheter-vues-de-statut-whatsapp", title: "Acheter des Vues de Statut WhatsApp", name: "Vues de statut", detail: "Augmentez la visibilité de vos statuts", price: "1,49 €", sold: "9K+ vendues" },
    ],
  },
];

export function getPlatform(slug: string) {
  return PLATFORMS.find((p) => p.slug === slug);
}

export function getService(platformSlug: string, serviceSlug: string) {
  const platform = getPlatform(platformSlug);
  if (!platform) return undefined;
  const service = platform.services.find((s) => s.slug === serviceSlug);
  if (!service) return undefined;
  return { platform, service };
}

export function allServiceParams() {
  return PLATFORMS.flatMap((p) => p.services.map((s) => ({ slug: p.slug, service: s.slug })));
}
