export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

/**
 * Static (non data-driven) routes, with a translated SEO slug per locale.
 * Key is a stable identifier used across the app; value is the path segment
 * chain (without locale prefix, without leading slash).
 */
export const STATIC_ROUTES = {
  home: { fr: "", en: "" },
  platforms: { fr: "plateformes", en: "platforms" },
  freeTools: { fr: "outils-gratuits", en: "free-tools" },
  engagementCalculator: {
    fr: "outils-gratuits/calculateur-engagement",
    en: "free-tools/engagement-calculator",
  },
  hashtagGenerator: {
    fr: "outils-gratuits/generateur-hashtags",
    en: "free-tools/hashtag-generator",
  },
  about: { fr: "a-propos", en: "about" },
  contact: { fr: "contact", en: "contact" },
  terms: { fr: "conditions-utilisation", en: "terms-of-service" },
  privacy: { fr: "confidentialite", en: "privacy-policy" },
  refunds: { fr: "remboursement", en: "refund-policy" },
  legalNotice: { fr: "mentions-legales", en: "legal-notice" },
  login: { fr: "connexion", en: "login" },
  forgotPassword: { fr: "mot-de-passe-oublie", en: "forgot-password" },
  resetPassword: { fr: "reinitialiser-mot-de-passe", en: "reset-password" },
  cart: { fr: "panier", en: "cart" },
  trackOrder: { fr: "suivi-commande", en: "track-order" },
  balance: { fr: "solde", en: "balance" },
  account: { fr: "compte", en: "account" },
  accountOrders: { fr: "compte/commandes", en: "account/orders" },
} as const;

export type RouteKey = keyof typeof STATIC_ROUTES;

/** Build a locale-prefixed href for a static route key. */
export function routeHref(locale: Locale, key: RouteKey): string {
  const segment = STATIC_ROUTES[key][locale];
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return segment ? `${prefix}/${segment}` : prefix || "/";
}

/** Build a locale-prefixed href for a platform hub page. */
export function platformHref(locale: Locale, platformSlug: string): string {
  const base = routeHref(locale, "platforms");
  return `${base}/${platformSlug}`;
}

/** Build a locale-prefixed href for a service detail page. */
export function serviceHref(
  locale: Locale,
  platformSlug: string,
  serviceSlugFr: string,
  serviceSlugEn: string
): string {
  const base = platformHref(locale, platformSlug);
  return `${base}/${locale === "fr" ? serviceSlugFr : serviceSlugEn}`;
}

/** Prefix an arbitrary already-French path with the locale (used for simple cases). */
export function withLocale(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path}`;
}
