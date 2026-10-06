/**
 * Seller / publisher identity shown on the legal pages. Fill in every field
 * before the site goes live — Paddle's domain review and French law
 * (LCEN art. 6, mentions légales) both require it.
 */
export const COMPANY = {
  legalForm: "Entrepreneur individuel (self-employed)",
  address: "Résidence Paramount, Flic-en-Flac, Île Maurice", // siège social
  registration: "Mauritius Business Registration Number (BRN) 125012049",
  host: "Vercel Inc., 201 Mission St #300, San Francisco, CA 94105, États-Unis (vercel.com)",
  email: "contact@boostinflu.com",
  lastUpdated: { fr: "6 octobre 2026", en: "October 6, 2026" },
} as const;

export const PADDLE_TERMS_URL = "https://www.paddle.com/legal/checkout-buyer-terms";
