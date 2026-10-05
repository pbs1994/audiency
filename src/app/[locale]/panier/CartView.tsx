"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import PlatformLogo from "@/components/PlatformLogo";
import { routeHref, type Locale } from "@/lib/i18n";

const T = {
  fr: {
    empty: "Votre panier est vide",
    emptyBody: "Parcourez nos services et ajoutez-en un pour commencer.",
    browse: "Voir les plateformes",
    remove: "Retirer du panier",
    summary: "Résumé",
    subtotal: "Sous-total",
    cashback: "Cashback (15%)",
    total: "Total",
    checkout: "Procéder au paiement",
    secure: "Paiement sécurisé · Satisfait ou remboursé 30 jours",
  },
  en: {
    empty: "Your cart is empty",
    emptyBody: "Browse our services and add one to get started.",
    browse: "View platforms",
    remove: "Remove from cart",
    summary: "Summary",
    subtotal: "Subtotal",
    cashback: "Cashback (15%)",
    total: "Total",
    checkout: "Proceed to checkout",
    secure: "Secure payment · 30-day money-back guarantee",
  },
};

export default function CartView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const { items, removeItem } = useCart();
  const { format } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface-soft text-text-muted">
          <ShoppingBag size={24} />
        </span>
        <p className="mt-4 font-semibold text-text">{t.empty}</p>
        <p className="mt-1 text-sm text-text-muted">{t.emptyBody}</p>
        <Link
          href={routeHref(locale, "platforms")}
          className="mt-6 inline-block rounded-full gradient-brand px-6 py-3 text-sm font-bold text-white"
        >
          {t.browse}
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + i.priceValue, 0);
  const cashback = subtotal * 0.15;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.6fr]">
      <div className="divide-y divide-border border-y border-border">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-surface-soft">
                <PlatformLogo name={item.logoName} size={44} />
              </span>
              <div>
                <p className="font-semibold text-text">{item.name}</p>
                <p className="text-sm text-text-muted">{item.detail}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="font-bold text-text">{format(item.priceValue)}</span>
              <button
                type="button"
                aria-label={t.remove}
                onClick={() => removeItem(item.id)}
                className="text-text-muted hover:text-rose"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-2xl border border-border bg-surface-soft p-6">
        <p className="font-bold text-text">{t.summary}</p>
        <div className="mt-4 space-y-2 text-sm text-text-muted">
          <div className="flex justify-between">
            <span>{t.subtotal}</span>
            <span>{format(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.cashback}</span>
            <span className="text-green">+{format(cashback)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-4 font-bold text-text">
          <span>{t.total}</span>
          <span>{format(subtotal)}</span>
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-full gradient-brand py-3 text-sm font-bold text-white"
        >
          {t.checkout}
        </button>
        <p className="mt-3 text-center text-xs text-text-muted">{t.secure}</p>
      </div>
    </div>
  );
}
