/**
 * Seller / publisher identity shown on the legal pages. Fill in every field
 * before the site goes live — Paddle's domain review and French law
 * (LCEN art. 6, mentions légales) both require it. Anything still set to
 * TODO renders literally on the site.
 */
const TODO = "[À COMPLÉTER]";

export const COMPANY = {
  name: TODO, // raison sociale, ex. "BoostInflu SAS"
  legalForm: TODO, // forme juridique et capital social
  address: "Résidence Paramount, Flic-en-Flac, Île Maurice", // siège social
  registration: "Mauritius Business Registration Number (BRN) 125012049",
  vat: TODO, // n° TVA intracommunautaire, si applicable
  publisher: TODO, // directeur de la publication
  host: TODO, // hébergeur : nom, adresse, téléphone
  email: "contact@boostinflu.com",
  phone: TODO,
  mediator: TODO, // médiateur de la consommation (obligatoire en B2C en France)
  lastUpdated: { fr: "6 octobre 2026", en: "October 6, 2026" },
} as const;

export const PADDLE_TERMS_URL = "https://www.paddle.com/legal/checkout-buyer-terms";
