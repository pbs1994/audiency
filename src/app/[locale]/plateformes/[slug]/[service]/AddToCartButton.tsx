"use client";

import { useRouter } from "next/navigation";
import { useCart, createCartItemId } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { routeHref, type Locale } from "@/lib/i18n";

const LABEL = { fr: "Ajouter au panier", en: "Add to cart" };

export default function AddToCartButton({
  locale,
  logoName,
  name,
  detail,
  priceEUR,
  idPrefix,
}: {
  locale: Locale;
  logoName: string;
  name: string;
  detail: string;
  priceEUR: number;
  idPrefix: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const { format } = useCurrency();

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          id: createCartItemId(idPrefix),
          logoName,
          name,
          detail,
          priceValue: priceEUR,
        });
        router.push(routeHref(locale, "cart"));
      }}
      className="mt-5 flex w-full items-center justify-center rounded-full gradient-brand py-3.5 text-sm font-bold text-white"
    >
      {LABEL[locale]} · {format(priceEUR)}
    </button>
  );
}
