"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatQty } from "@/lib/price";
import { useCart, createCartItemId } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { routeHref, type Locale } from "@/lib/i18n";

const MULTIPLIERS = [1, 2, 5, 10, 20, 50];
const DISCOUNTS = [0, 5, 12, 20, 30, 38];

type Quality = "standard" | "premium";
type Gender = "all" | "female" | "male";

const QUALITY_MULTIPLIER: Record<Quality, number> = { standard: 1, premium: 1.45 };
const GENDER_MULTIPLIER: Record<Gender, number> = { all: 1, female: 1.2, male: 1.2 };

const T = {
  fr: {
    chooseQty: "Choisissez la quantité",
    popular: "Populaire",
    bestOffer: "Meilleure offre",
    perBase: (price: string, qty: string, unit: string) => `soit ${price} les ${qty} ${unit}`,
    addToCart: "Ajouter au panier",
    quality: "Qualité",
    qualityStandard: "Standard",
    qualityStandardBody: "Comptes actifs, origine mondiale",
    qualityPremium: "Premium 🇫🇷",
    qualityPremiumBody: "Profils français vérifiés, rétention supérieure",
    gender: "Profil",
    genderAll: "Tous",
    genderFemale: "Femmes",
    genderMale: "Hommes",
  },
  en: {
    chooseQty: "Choose your quantity",
    popular: "Popular",
    bestOffer: "Best offer",
    perBase: (price: string, qty: string, unit: string) => `that's ${price} per ${qty} ${unit}`,
    addToCart: "Add to cart",
    quality: "Quality",
    qualityStandard: "Standard",
    qualityStandardBody: "Active accounts, worldwide origin",
    qualityPremium: "Premium 🇫🇷",
    qualityPremiumBody: "Verified French profiles, higher retention",
    gender: "Profile",
    genderAll: "Any",
    genderFemale: "Female",
    genderMale: "Male",
  },
};

export default function QuantityBuilder({
  locale,
  basePriceEUR,
  baseQty,
  unit,
  logoName,
  serviceName,
  platformName,
  idPrefix,
  platformSlug,
  serviceSlug,
  followerType = false,
  genderOption = false,
}: {
  locale: Locale;
  basePriceEUR: number;
  baseQty: number;
  unit: string;
  logoName: string;
  serviceName: string;
  platformName: string;
  idPrefix: string;
  platformSlug: string;
  serviceSlug: string;
  followerType?: boolean;
  genderOption?: boolean;
}) {
  const t = T[locale];
  const router = useRouter();
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [index, setIndex] = useState(2);
  const [quality, setQuality] = useState<Quality>("standard");
  const [gender, setGender] = useState<Gender>("all");

  const optionMultiplier =
    (followerType ? QUALITY_MULTIPLIER[quality] : 1) * (genderOption ? GENDER_MULTIPLIER[gender] : 1);

  const tiers = MULTIPLIERS.map((m, i) => {
    const qty = baseQty * m;
    const linear = basePriceEUR * m * optionMultiplier;
    const discount = DISCOUNTS[i];
    const final = linear * (1 - discount / 100);
    return { qty, linear, discount, final };
  });

  const selected = tiers[index];
  const perBase = selected.final / MULTIPLIERS[index];

  const qualityLabel = followerType
    ? quality === "premium"
      ? t.qualityPremium
      : t.qualityStandard
    : null;
  const genderLabel = genderOption
    ? gender === "female"
      ? t.genderFemale
      : gender === "male"
        ? t.genderMale
        : t.genderAll
    : null;
  const optionSuffix = [qualityLabel, genderLabel && genderLabel !== t.genderAll ? genderLabel : null]
    .filter(Boolean)
    .join(" · ");

  const handleAddToCart = () => {
    addItem({
      id: createCartItemId(`${idPrefix}:${selected.qty}:${quality}:${gender}`),
      logoName,
      name: `${serviceName} ${platformName}`,
      detail: `${formatQty(selected.qty)} ${unit}${optionSuffix ? ` · ${optionSuffix}` : ""}`,
      priceValue: selected.final,
      platformSlug,
      serviceSlug,
      quantity: selected.qty,
      unit,
    });
    router.push(routeHref(locale, "cart"));
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-6">
      <p className="text-sm font-semibold text-text">{t.chooseQty}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {tiers.map((tier, i) => (
          <button
            key={tier.qty}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative rounded-xl border px-2 py-3 text-center transition-colors ${
              i === index
                ? "border-violet gradient-brand text-white"
                : "border-border bg-surface text-text hover:border-violet/40"
            }`}
          >
            {i === 2 && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold text-white">
                {t.popular}
              </span>
            )}
            {i === tiers.length - 1 && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold text-white">
                {t.bestOffer}
              </span>
            )}
            <span className="block text-sm font-bold">{formatQty(tier.qty)}</span>
            {tier.discount > 0 && (
              <span
                className={`mt-0.5 block text-[11px] font-medium ${
                  i === index ? "text-white/85" : "text-green"
                }`}
              >
                -{tier.discount}%
              </span>
            )}
          </button>
        ))}
      </div>

      {followerType && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-text">{t.quality}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {(["standard", "premium"] as Quality[]).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuality(q)}
                className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  quality === q
                    ? "border-violet bg-violet/5"
                    : "border-border bg-surface hover:border-violet/40"
                }`}
              >
                <span className="flex items-center justify-between text-sm font-semibold text-text">
                  {q === "premium" ? t.qualityPremium : t.qualityStandard}
                  {q === "premium" && (
                    <span className="text-xs font-medium text-orange">
                      +{Math.round((QUALITY_MULTIPLIER.premium - 1) * 100)}%
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-xs text-text-muted">
                  {q === "premium" ? t.qualityPremiumBody : t.qualityStandardBody}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {genderOption && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-text">{t.gender}</p>
          <div className="mt-2 flex gap-2">
            {(["all", "female", "male"] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                  gender === g
                    ? "border-violet bg-violet text-white"
                    : "border-border bg-surface text-text-muted hover:border-violet/40"
                }`}
              >
                {g === "all" ? t.genderAll : g === "female" ? t.genderFemale : t.genderMale}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-text-muted">
            {formatQty(selected.qty)} {unit}
            {optionSuffix && <span className="text-text-muted"> · {optionSuffix}</span>}
          </span>
          <div className="text-right">
            {(selected.discount > 0 || optionMultiplier > 1) && (
              <span className="mr-2 text-sm text-text-muted line-through">{format(selected.linear)}</span>
            )}
            <span className="text-2xl font-extrabold gradient-brand-text">{format(selected.final)}</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-text-muted">
          {t.perBase(format(perBase), formatQty(baseQty), unit)}
        </p>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-5 flex w-full items-center justify-center rounded-full gradient-brand py-3.5 text-sm font-bold text-white"
      >
        {t.addToCart} · {format(selected.final)}
      </button>
    </div>
  );
}
