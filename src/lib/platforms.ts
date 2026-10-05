export type ServiceItem = {
  slug: string;
  slugEn: string;
  title: string;
  titleEn: string;
  name: string;
  nameEn: string;
  detail: string;
  detailEn: string;
  priceEUR: number;
  sold: string;
  highlight?: boolean;
  /** Quantity the listed price buys — enables the quantity picker when set alongside `unit`. */
  baseQty?: number;
  unit?: string;
  unitEn?: string;
};

export type PlatformData = {
  slug: string;
  logoName: string;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  services: ServiceItem[];
};

export const PLATFORMS: PlatformData[] = [
  {
    slug: "instagram",
    logoName: "Instagram",
    name: "Instagram",
    nameEn: "Instagram",
    tagline: "Abonnés, vues et likes réels",
    taglineEn: "Real followers, views and likes",
    description:
      "Développez votre compte Instagram avec des abonnés, vues et likes provenant de comptes réels et actifs. Livraison progressive, aucun mot de passe requis.",
    descriptionEn:
      "Grow your Instagram account with real, active followers, views and likes. Gradual delivery, no password required.",
    services: [
      { slug: "pack-vues-likes-instagram", slugEn: "instagram-views-likes-pack", title: "Pack Vues + Likes Instagram", titleEn: "Instagram Views + Likes Pack", name: "Vues + Likes", nameEn: "Views + Likes", detail: "2 services en une seule commande", detailEn: "2 services in one order", priceEUR: 2.99, sold: "141K+", highlight: true },
      { slug: "acheter-abonnes-instagram", slugEn: "buy-instagram-followers", title: "Acheter des Abonnés Instagram", titleEn: "Buy Instagram Followers", name: "Abonnés", nameEn: "Followers", detail: "Livraison progressive, rétention garantie", detailEn: "Gradual delivery, retention guaranteed", priceEUR: 2.99, sold: "309K+", baseQty: 100, unit: "abonnés", unitEn: "followers" },
      { slug: "acheter-vues-instagram", slugEn: "buy-instagram-views", title: "Acheter des Vues Instagram", titleEn: "Buy Instagram Views", name: "Vues", nameEn: "Views", detail: "Pour publications et reels", detailEn: "For posts and reels", priceEUR: 2.49, sold: "217K+", baseQty: 1000, unit: "vues", unitEn: "views" },
      { slug: "acheter-likes-instagram", slugEn: "buy-instagram-likes", title: "Acheter des Likes Instagram", titleEn: "Buy Instagram Likes", name: "Likes", nameEn: "Likes", detail: "Engagement sur vos publications", detailEn: "Engagement on your posts", priceEUR: 1.99, sold: "111K+", baseQty: 1000, unit: "likes", unitEn: "likes" },
      { slug: "acheter-likes-premium-instagram", slugEn: "buy-instagram-premium-likes", title: "Acheter des Likes Premium Instagram", titleEn: "Buy Instagram Premium Likes", name: "Likes Premium", nameEn: "Premium Likes", detail: "Comptes vérifiés et actifs", detailEn: "Verified, active accounts", priceEUR: 2.99, sold: "109K+", baseQty: 1000, unit: "likes premium", unitEn: "premium likes" },
      { slug: "acheter-vues-stories-instagram", slugEn: "buy-instagram-story-views", title: "Acheter des Vues Stories Instagram", titleEn: "Buy Instagram Story Views", name: "Vues Stories", nameEn: "Story Views", detail: "Boost de visibilité en story", detailEn: "Boost your story visibility", priceEUR: 2.49, sold: "54K+", baseQty: 1000, unit: "vues", unitEn: "views" },
    ],
  },
  {
    slug: "tiktok",
    logoName: "TikTok",
    name: "TikTok",
    nameEn: "TikTok",
    tagline: "Vues, likes et partages réels",
    taglineEn: "Real views, likes and shares",
    description:
      "Donnez à vos vidéos TikTok le coup de pouce qu’elles méritent avec un engagement réel et une livraison instantanée.",
    descriptionEn:
      "Give your TikTok videos the boost they deserve with real engagement and instant delivery.",
    services: [
      { slug: "pack-vues-likes-partages-tiktok", slugEn: "tiktok-views-likes-shares-pack", title: "Pack Vues + Likes + Partages TikTok", titleEn: "TikTok Views + Likes + Shares Pack", name: "Vues + Likes + Partages", nameEn: "Views + Likes + Shares", detail: "Pack complet pour un décollage rapide", detailEn: "Complete pack for a fast takeoff", priceEUR: 2.49, sold: "98K+", highlight: true },
      { slug: "acheter-abonnes-tiktok", slugEn: "buy-tiktok-followers", title: "Acheter des Abonnés TikTok", titleEn: "Buy TikTok Followers", name: "Abonnés", nameEn: "Followers", detail: "Comptes actifs et réels", detailEn: "Real, active accounts", priceEUR: 3.49, sold: "176K+", baseQty: 100, unit: "abonnés", unitEn: "followers" },
      { slug: "acheter-vues-tiktok", slugEn: "buy-tiktok-views", title: "Acheter des Vues TikTok", titleEn: "Buy TikTok Views", name: "Vues", nameEn: "Views", detail: "Pour accélérer la portée de vos vidéos", detailEn: "Boost your videos' reach", priceEUR: 1.29, sold: "402K+", baseQty: 1000, unit: "vues", unitEn: "views" },
      { slug: "acheter-likes-tiktok", slugEn: "buy-tiktok-likes", title: "Acheter des Likes TikTok", titleEn: "Buy TikTok Likes", name: "Likes", nameEn: "Likes", detail: "Engagement sur vos vidéos", detailEn: "Engagement on your videos", priceEUR: 1.79, sold: "133K+", baseQty: 1000, unit: "likes", unitEn: "likes" },
      { slug: "acheter-partages-tiktok", slugEn: "buy-tiktok-shares", title: "Acheter des Partages TikTok", titleEn: "Buy TikTok Shares", name: "Partages", nameEn: "Shares", detail: "Augmentez la diffusion de vos vidéos", detailEn: "Increase your videos' spread", priceEUR: 1.99, sold: "54K+", baseQty: 100, unit: "partages", unitEn: "shares" },
      { slug: "acheter-commentaires-personnalises-tiktok", slugEn: "buy-tiktok-custom-comments", title: "Acheter des Commentaires Personnalisés TikTok", titleEn: "Buy TikTok Custom Comments", name: "Commentaires personnalisés", nameEn: "Custom Comments", detail: "Rédigés pour correspondre à votre contenu", detailEn: "Written to match your content", priceEUR: 4.49, sold: "18K+", baseQty: 10, unit: "commentaires", unitEn: "comments" },
    ],
  },
  {
    slug: "youtube",
    logoName: "YouTube",
    name: "YouTube",
    nameEn: "YouTube",
    tagline: "Abonnés, vues et engagement réels",
    taglineEn: "Real subscribers, views and engagement",
    description:
      "Développez votre chaîne YouTube avec des abonnés et des vues réels, pour une croissance mesurable et durable.",
    descriptionEn:
      "Grow your YouTube channel with real subscribers and views, for measurable, lasting growth.",
    services: [
      { slug: "pack-vues-likes-commentaires-youtube", slugEn: "youtube-views-likes-comments-pack", title: "Pack Vues + Likes + Commentaires YouTube", titleEn: "YouTube Views + Likes + Comments Pack", name: "Vues + Likes + Commentaires", nameEn: "Views + Likes + Comments", detail: "Pack complet pour vos nouvelles vidéos", detailEn: "Complete pack for your new videos", priceEUR: 4.49, sold: "41K+", highlight: true },
      { slug: "acheter-abonnes-youtube", slugEn: "buy-youtube-subscribers", title: "Acheter des Abonnés YouTube", titleEn: "Buy YouTube Subscribers", name: "Abonnés", nameEn: "Subscribers", detail: "Croissance progressive de la chaîne", detailEn: "Gradual channel growth", priceEUR: 4.99, sold: "67K+", baseQty: 100, unit: "abonnés", unitEn: "subscribers" },
      { slug: "acheter-vues-youtube", slugEn: "buy-youtube-views", title: "Acheter des Vues YouTube", titleEn: "Buy YouTube Views", name: "Vues", nameEn: "Views", detail: "Pour vos vidéos et shorts", detailEn: "For your videos and shorts", priceEUR: 2.99, sold: "189K+", baseQty: 1000, unit: "vues", unitEn: "views" },
      { slug: "acheter-likes-youtube", slugEn: "buy-youtube-likes", title: "Acheter des Likes YouTube", titleEn: "Buy YouTube Likes", name: "Likes", nameEn: "Likes", detail: "Engagement sur vos vidéos", detailEn: "Engagement on your videos", priceEUR: 2.99, sold: "48K+", baseQty: 1000, unit: "likes", unitEn: "likes" },
      { slug: "acheter-commentaires-personnalises-youtube", slugEn: "buy-youtube-custom-comments", title: "Acheter des Commentaires Personnalisés YouTube", titleEn: "Buy YouTube Custom Comments", name: "Commentaires personnalisés", nameEn: "Custom Comments", detail: "Commentaires pertinents et rédigés", detailEn: "Relevant, hand-written comments", priceEUR: 4.99, sold: "22K+", baseQty: 10, unit: "commentaires", unitEn: "comments" },
      { slug: "acheter-heures-de-visionnage-youtube", slugEn: "buy-youtube-watch-hours", title: "Acheter des Heures de Visionnage YouTube", titleEn: "Buy YouTube Watch Hours", name: "Heures de visionnage", nameEn: "Watch Hours", detail: "Pour atteindre les seuils de monétisation", detailEn: "To reach monetization thresholds", priceEUR: 8.99, sold: "9K+", baseQty: 100, unit: "heures", unitEn: "hours" },
    ],
  },
  {
    slug: "facebook",
    logoName: "Facebook",
    name: "Facebook",
    nameEn: "Facebook",
    tagline: "Pages, groupes et publications",
    taglineEn: "Pages, groups and posts",
    description:
      "Renforcez la présence de votre page ou groupe Facebook avec un engagement réel et durable.",
    descriptionEn: "Strengthen your Facebook page or group with real, lasting engagement.",
    services: [
      { slug: "acheter-abonnes-page-facebook", slugEn: "buy-facebook-page-followers", title: "Acheter des Abonnés Page Facebook", titleEn: "Buy Facebook Page Followers", name: "Abonnés Page", nameEn: "Page Followers", detail: "Croissance organique simulée", detailEn: "Simulated organic growth", priceEUR: 2.79, sold: "88K+", highlight: true },
      { slug: "acheter-likes-page-facebook", slugEn: "buy-facebook-page-likes", title: "Acheter des Likes Page Facebook", titleEn: "Buy Facebook Page Likes", name: "Likes Page", nameEn: "Page Likes", detail: "Renforce la crédibilité de votre page", detailEn: "Boosts your page's credibility", priceEUR: 2.29, sold: "102K+", baseQty: 100, unit: "likes", unitEn: "likes" },
      { slug: "acheter-likes-publication-facebook", slugEn: "buy-facebook-post-likes", title: "Acheter des Likes Publication Facebook", titleEn: "Buy Facebook Post Likes", name: "Likes Publication", nameEn: "Post Likes", detail: "Engagement sur vos publications", detailEn: "Engagement on your posts", priceEUR: 1.79, sold: "134K+", baseQty: 1000, unit: "likes", unitEn: "likes" },
      { slug: "acheter-partages-facebook", slugEn: "buy-facebook-shares", title: "Acheter des Partages Facebook", titleEn: "Buy Facebook Shares", name: "Partages", nameEn: "Shares", detail: "Augmentez la portée de vos posts", detailEn: "Increase your posts' reach", priceEUR: 1.79, sold: "36K+", baseQty: 100, unit: "partages", unitEn: "shares" },
      { slug: "acheter-membres-de-groupe-facebook", slugEn: "buy-facebook-group-members", title: "Acheter des Membres de Groupe Facebook", titleEn: "Buy Facebook Group Members", name: "Membres de groupe", nameEn: "Group Members", detail: "Pour développer votre communauté", detailEn: "Grow your community", priceEUR: 2.99, sold: "21K+", baseQty: 100, unit: "membres", unitEn: "members" },
    ],
  },
  {
    slug: "x",
    logoName: "X / Twitter",
    name: "X / Twitter",
    nameEn: "X / Twitter",
    tagline: "Abonnés, likes et retweets",
    taglineEn: "Followers, likes and retweets",
    description:
      "Développez votre audience sur X avec des abonnés et un engagement provenant de comptes réels.",
    descriptionEn: "Grow your audience on X with followers and engagement from real accounts.",
    services: [
      { slug: "acheter-abonnes-x", slugEn: "buy-x-followers", title: "Acheter des Abonnés X", titleEn: "Buy X Followers", name: "Abonnés", nameEn: "Followers", detail: "Comptes actifs et réels", detailEn: "Real, active accounts", priceEUR: 3.29, sold: "57K+", highlight: true },
      { slug: "acheter-likes-x", slugEn: "buy-x-likes", title: "Acheter des Likes X", titleEn: "Buy X Likes", name: "Likes", nameEn: "Likes", detail: "Engagement sur vos publications", detailEn: "Engagement on your posts", priceEUR: 1.69, sold: "143K+", baseQty: 1000, unit: "likes", unitEn: "likes" },
      { slug: "acheter-retweets-x", slugEn: "buy-x-retweets", title: "Acheter des Retweets X", titleEn: "Buy X Retweets", name: "Retweets", nameEn: "Retweets", detail: "Augmentez la diffusion de vos posts", detailEn: "Increase your posts' spread", priceEUR: 1.69, sold: "62K+", baseQty: 100, unit: "retweets", unitEn: "retweets" },
      { slug: "acheter-vues-x", slugEn: "buy-x-views", title: "Acheter des Vues X", titleEn: "Buy X Views", name: "Vues", nameEn: "Views", detail: "Pour vos publications et vidéos", detailEn: "For your posts and videos", priceEUR: 1.29, sold: "201K+", baseQty: 1000, unit: "vues", unitEn: "views" },
    ],
  },
  {
    slug: "snapchat",
    logoName: "Snapchat",
    name: "Snapchat",
    nameEn: "Snapchat",
    tagline: "Vues et abonnés réels",
    taglineEn: "Real views and followers",
    description: "Boostez la visibilité de vos stories et de votre profil Snapchat.",
    descriptionEn: "Boost the visibility of your stories and your Snapchat profile.",
    services: [
      { slug: "acheter-vues-story-snapchat", slugEn: "buy-snapchat-story-views", title: "Acheter des Vues Story Snapchat", titleEn: "Buy Snapchat Story Views", name: "Vues Story", nameEn: "Story Views", detail: "Boost de visibilité instantané", detailEn: "Instant visibility boost", priceEUR: 1.99, sold: "44K+", highlight: true },
      { slug: "acheter-abonnes-snapchat", slugEn: "buy-snapchat-followers", title: "Acheter des Abonnés Snapchat", titleEn: "Buy Snapchat Followers", name: "Abonnés", nameEn: "Followers", detail: "Comptes actifs et réels", detailEn: "Real, active accounts", priceEUR: 3.49, sold: "19K+", baseQty: 100, unit: "abonnés", unitEn: "followers" },
      { slug: "booster-score-snapchat", slugEn: "boost-snapchat-score", title: "Booster son Score Snapchat", titleEn: "Boost Your Snapchat Score", name: "Score boost", nameEn: "Score Boost", detail: "Augmentation progressive du score", detailEn: "Gradual score increase", priceEUR: 2.49, sold: "8K+" },
    ],
  },
  {
    slug: "spotify",
    logoName: "Spotify",
    name: "Spotify",
    nameEn: "Spotify",
    tagline: "Écoutes et abonnés réels",
    taglineEn: "Real streams and followers",
    description:
      "Donnez à votre musique la portée qu’elle mérite avec des écoutes et des abonnés réels sur Spotify.",
    descriptionEn: "Give your music the reach it deserves with real streams and followers on Spotify.",
    services: [
      { slug: "acheter-ecoutes-spotify", slugEn: "buy-spotify-streams", title: "Acheter des Écoutes Spotify", titleEn: "Buy Spotify Streams", name: "Écoutes", nameEn: "Streams", detail: "Pour vos titres et albums", detailEn: "For your tracks and albums", priceEUR: 2.49, sold: "76K+", highlight: true },
      { slug: "acheter-abonnes-playlist-spotify", slugEn: "buy-spotify-playlist-followers", title: "Acheter des Abonnés Playlist Spotify", titleEn: "Buy Spotify Playlist Followers", name: "Abonnés Playlist", nameEn: "Playlist Followers", detail: "Croissance de votre playlist", detailEn: "Grow your playlist", priceEUR: 2.99, sold: "31K+", baseQty: 100, unit: "abonnés", unitEn: "followers" },
      { slug: "acheter-abonnes-profil-spotify", slugEn: "buy-spotify-profile-followers", title: "Acheter des Abonnés Profil Spotify", titleEn: "Buy Spotify Profile Followers", name: "Abonnés Profil", nameEn: "Profile Followers", detail: "Développez votre audience d’artiste", detailEn: "Grow your artist audience", priceEUR: 2.79, sold: "18K+", baseQty: 100, unit: "abonnés", unitEn: "followers" },
    ],
  },
  {
    slug: "telegram",
    logoName: "Telegram",
    name: "Telegram",
    nameEn: "Telegram",
    tagline: "Membres et vues de canal",
    taglineEn: "Channel members and views",
    description:
      "Développez votre canal ou groupe Telegram avec des membres réels et actifs.",
    descriptionEn: "Grow your Telegram channel or group with real, active members.",
    services: [
      { slug: "acheter-membres-de-canal-telegram", slugEn: "buy-telegram-channel-members", title: "Acheter des Membres de Canal Telegram", titleEn: "Buy Telegram Channel Members", name: "Membres de canal", nameEn: "Channel Members", detail: "Comptes actifs et réels", detailEn: "Real, active accounts", priceEUR: 2.99, sold: "64K+", highlight: true },
      { slug: "acheter-vues-de-publication-telegram", slugEn: "buy-telegram-post-views", title: "Acheter des Vues de Publication Telegram", titleEn: "Buy Telegram Post Views", name: "Vues de publication", nameEn: "Post Views", detail: "Augmentez la portée de vos posts", detailEn: "Increase your posts' reach", priceEUR: 1.69, sold: "112K+", baseQty: 1000, unit: "vues", unitEn: "views" },
      { slug: "acheter-reactions-telegram", slugEn: "buy-telegram-reactions", title: "Acheter des Réactions Telegram", titleEn: "Buy Telegram Reactions", name: "Réactions", nameEn: "Reactions", detail: "Engagement sur vos publications", detailEn: "Engagement on your posts", priceEUR: 1.29, sold: "47K+", baseQty: 100, unit: "réactions", unitEn: "reactions" },
    ],
  },
  {
    slug: "whatsapp",
    logoName: "WhatsApp",
    name: "WhatsApp",
    nameEn: "WhatsApp",
    tagline: "Membres et vues de statut",
    taglineEn: "Group members and status views",
    description:
      "Développez votre communauté WhatsApp avec des membres de groupe et des vues de statut réels.",
    descriptionEn: "Grow your WhatsApp community with real group members and status views.",
    services: [
      { slug: "acheter-membres-de-groupe-whatsapp", slugEn: "buy-whatsapp-group-members", title: "Acheter des Membres de Groupe WhatsApp", titleEn: "Buy WhatsApp Group Members", name: "Membres de groupe", nameEn: "Group Members", detail: "Comptes actifs et réels", detailEn: "Real, active accounts", priceEUR: 3.49, sold: "12K+", highlight: true },
      { slug: "acheter-vues-de-statut-whatsapp", slugEn: "buy-whatsapp-status-views", title: "Acheter des Vues de Statut WhatsApp", titleEn: "Buy WhatsApp Status Views", name: "Vues de statut", nameEn: "Status Views", detail: "Augmentez la visibilité de vos statuts", detailEn: "Increase your status visibility", priceEUR: 1.99, sold: "9K+", baseQty: 100, unit: "vues", unitEn: "views" },
    ],
  },
];

export function getPlatform(slug: string) {
  return PLATFORMS.find((p) => p.slug === slug);
}

/** Looks up a service by either its French or English slug — the caller checks the match against the active locale. */
export function getService(platformSlug: string, serviceSlug: string) {
  const platform = getPlatform(platformSlug);
  if (!platform) return undefined;
  const service = platform.services.find((s) => s.slug === serviceSlug || s.slugEn === serviceSlug);
  if (!service) return undefined;
  return { platform, service };
}

/** All (French + English) service slugs for one platform, deduplicated. */
export function serviceParamsForPlatform(platformSlug: string) {
  const platform = getPlatform(platformSlug);
  if (!platform) return [];
  const slugs = new Set<string>();
  for (const s of platform.services) {
    slugs.add(s.slug);
    slugs.add(s.slugEn);
  }
  return Array.from(slugs).map((service) => ({ service }));
}
