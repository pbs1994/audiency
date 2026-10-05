import type { Locale } from "./i18n";

export function formatQty(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return (Number.isInteger(k) ? String(k) : k.toFixed(1).replace(".", ",")) + "K";
}

/** "309K+" -> "309K+ vendues" / "309K+ sold" */
export function soldLabel(sold: string, locale: Locale): string {
  return locale === "fr" ? `${sold} vendues` : `${sold} sold`;
}
