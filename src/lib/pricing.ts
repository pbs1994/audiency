import type { GenderChoice, QualityChoice, ServiceItem } from "./platforms";

/** Quantity tiers offered by the quantity picker, and the volume discount (%) at each. */
export const MULTIPLIERS = [1, 2, 5, 10, 20, 50];
export const DISCOUNTS = [0, 5, 12, 20, 30, 38];

export const QUALITY_MULTIPLIER: Record<QualityChoice, number> = { standard: 1, premium: 1.45 };
export const GENDER_MULTIPLIER: Record<GenderChoice, number> = { all: 1, female: 1.2, male: 1.2 };

/**
 * Authoritative line price in euro cents for a catalog service, or null if
 * the quantity isn't one the picker can produce. Server-side checkout uses
 * this instead of trusting the cart's priceValue.
 */
export function computeLineCents(
  service: ServiceItem,
  quantity: number,
  quality: QualityChoice,
  gender: GenderChoice
): number | null {
  // Packs and other fixed-price services: a single unit at the listed price.
  if (!service.baseQty) {
    return quantity === 1 ? Math.round(service.priceEUR * 100) : null;
  }

  const tier = MULTIPLIERS.findIndex((m) => service.baseQty! * m === quantity);
  if (tier === -1) return null;

  const optionMultiplier =
    (service.followerType ? QUALITY_MULTIPLIER[quality] : 1) *
    (service.genderOption ? GENDER_MULTIPLIER[gender] : 1);
  const final = service.priceEUR * MULTIPLIERS[tier] * optionMultiplier * (1 - DISCOUNTS[tier] / 100);
  return Math.round(final * 100);
}
