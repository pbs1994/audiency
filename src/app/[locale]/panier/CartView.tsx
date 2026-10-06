"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import PlatformLogo from "@/components/PlatformLogo";
import { routeHref, type Locale } from "@/lib/i18n";
import { createOrder } from "./actions";

const T = {
  fr: {
    empty: "Votre panier est vide",
    emptyBody: "Parcourez nos services et ajoutez-en un pour commencer.",
    browse: "Voir les plateformes",
    remove: "Retirer du panier",
    targetLabel: "Nom d’utilisateur ou URL",
    targetPlaceholder: "@votre_nom_utilisateur",
    summary: "Résumé",
    subtotal: "Sous-total",
    cashback: "Cashback (15%)",
    total: "Total",
    checkout: "Procéder au paiement",
    checkoutPending: "Validation…",
    loginToPay: "Se connecter pour valider",
    secure: "Paiement sécurisé · Satisfait ou remboursé 30 jours",
    demoNotice: "Mode démo : aucun paiement réel n’est traité pour le moment.",
    error: "Une erreur est survenue, merci de réessayer.",
    missingTarget: "Indiquez un nom d’utilisateur ou une URL pour chaque service avant de continuer.",
    required: "Champ requis",
  },
  en: {
    empty: "Your cart is empty",
    emptyBody: "Browse our services and add one to get started.",
    browse: "View platforms",
    remove: "Remove from cart",
    targetLabel: "Username or URL",
    targetPlaceholder: "@your_username",
    summary: "Summary",
    subtotal: "Subtotal",
    cashback: "Cashback (15%)",
    total: "Total",
    checkout: "Proceed to checkout",
    checkoutPending: "Placing order…",
    loginToPay: "Log in to checkout",
    secure: "Secure payment · 30-day money-back guarantee",
    demoNotice: "Demo mode: no real payment is processed yet.",
    error: "Something went wrong, please try again.",
    missingTarget: "Enter a username or URL for every service before continuing.",
    required: "Required field",
  },
};

export default function CartView({ locale, loggedIn }: { locale: Locale; loggedIn: boolean }) {
  const t = T[locale];
  const router = useRouter();
  const { items, removeItem, updateItem, clear } = useCart();
  const { format } = useCurrency();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const missingTarget = items.some((i) => !i.targetUrl?.trim());

  const handleCheckout = async () => {
    if (missingTarget) {
      setShowValidation(true);
      setError(t.missingTarget);
      return;
    }
    setPending(true);
    setError(null);
    const result = await createOrder(items);
    if ("error" in result) {
      setError(t.error);
      setPending(false);
      return;
    }
    clear();
    router.push(routeHref(locale, "accountOrders"));
  };

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
        {items.map((item) => {
          const isMissing = showValidation && !item.targetUrl?.trim();
          return (
            <div key={item.id} className="py-5">
              <div className="flex items-center justify-between gap-4">
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
              <div className="mt-3 pl-15">
                <label className="text-xs font-medium text-text-muted">{t.targetLabel}</label>
                <input
                  type="text"
                  value={item.targetUrl ?? ""}
                  onChange={(e) => updateItem(item.id, { targetUrl: e.target.value })}
                  placeholder={t.targetPlaceholder}
                  className={`mt-1 w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none ${
                    isMissing ? "border-rose focus:border-rose" : "border-border focus:border-violet"
                  }`}
                />
                {isMissing && <p className="mt-1 text-xs font-medium text-rose">{t.required}</p>}
              </div>
            </div>
          );
        })}
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
        {loggedIn ? (
          <button
            type="button"
            onClick={handleCheckout}
            disabled={pending}
            className="mt-6 w-full rounded-full gradient-brand py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {pending ? t.checkoutPending : t.checkout}
          </button>
        ) : (
          <Link
            href={routeHref(locale, "login")}
            className="mt-6 flex w-full items-center justify-center rounded-full gradient-brand py-3 text-sm font-bold text-white"
          >
            {t.loginToPay}
          </Link>
        )}
        {error && <p className="mt-3 text-center text-sm font-medium text-rose">{error}</p>}
        <p className="mt-3 text-center text-xs text-text-muted">{t.secure}</p>
        <p className="mt-1 text-center text-[11px] text-text-muted">{t.demoNotice}</p>
      </div>
    </div>
  );
}
