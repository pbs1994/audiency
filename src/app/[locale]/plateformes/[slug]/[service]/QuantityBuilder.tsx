"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { formatQty } from "@/lib/price";
import { useCart, createCartItemId } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { routeHref, type Locale } from "@/lib/i18n";

const MULTIPLIERS = [1, 2, 5, 10, 20, 50];
const DISCOUNTS = [0, 5, 12, 20, 30, 38];

const T = {
  fr: {
    chooseQty: "Choisissez la quantité",
    popular: "Populaire",
    bestOffer: "Meilleure offre",
    perBase: (price: string, qty: string, unit: string) => `soit ${price} les ${qty} ${unit}`,
    usernameLabel: "Nom d’utilisateur ou URL",
    usernamePlaceholder: "@votre_nom_utilisateur",
    verify: "Vérifier",
    validFormat: "Format valide",
    addToCart: "Ajouter au panier",
  },
  en: {
    chooseQty: "Choose your quantity",
    popular: "Popular",
    bestOffer: "Best offer",
    perBase: (price: string, qty: string, unit: string) => `that's ${price} per ${qty} ${unit}`,
    usernameLabel: "Username or URL",
    usernamePlaceholder: "@your_username",
    verify: "Verify",
    validFormat: "Valid format",
    addToCart: "Add to cart",
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
}: {
  locale: Locale;
  basePriceEUR: number;
  baseQty: number;
  unit: string;
  logoName: string;
  serviceName: string;
  platformName: string;
  idPrefix: string;
}) {
  const t = T[locale];
  const router = useRouter();
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [index, setIndex] = useState(2);
  const [username, setUsername] = useState("");
  const [checked, setChecked] = useState(false);

  const tiers = MULTIPLIERS.map((m, i) => {
    const qty = baseQty * m;
    const linear = basePriceEUR * m;
    const discount = DISCOUNTS[i];
    const final = linear * (1 - discount / 100);
    return { qty, linear, discount, final };
  });

  const selected = tiers[index];
  const perBase = selected.final / MULTIPLIERS[index];

  const handleAddToCart = () => {
    addItem({
      id: createCartItemId(`${idPrefix}:${selected.qty}`),
      logoName,
      name: `${serviceName} ${platformName}`,
      detail: `${formatQty(selected.qty)} ${unit}`,
      priceValue: selected.final,
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

      <div className="mt-5 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-text-muted">
            {formatQty(selected.qty)} {unit}
          </span>
          <div className="text-right">
            {selected.discount > 0 && (
              <span className="mr-2 text-sm text-text-muted line-through">{format(selected.linear)}</span>
            )}
            <span className="text-2xl font-extrabold gradient-brand-text">{format(selected.final)}</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-text-muted">
          {t.perBase(format(perBase), formatQty(baseQty), unit)}
        </p>
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-text" htmlFor="username">
          {t.usernameLabel}
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setChecked(false);
            }}
            placeholder={t.usernamePlaceholder}
            className="flex-1 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setChecked(username.trim().length > 1)}
            className="shrink-0 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text hover:border-violet/40"
          >
            {t.verify}
          </button>
        </div>
        {checked && (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-green">
            <Check size={14} /> {t.validFormat}
          </p>
        )}
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
