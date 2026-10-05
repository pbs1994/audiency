"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import PlatformLogo from "@/components/PlatformLogo";
import { formatPrice } from "@/lib/price";

export default function CartView() {
  const { items, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface-soft text-text-muted">
          <ShoppingBag size={24} />
        </span>
        <p className="mt-4 font-semibold text-text">Votre panier est vide</p>
        <p className="mt-1 text-sm text-text-muted">
          Parcourez nos services et ajoutez-en un pour commencer.
        </p>
        <Link
          href="/plateformes"
          className="mt-6 inline-block rounded-full gradient-brand px-6 py-3 text-sm font-bold text-white"
        >
          Voir les plateformes
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
              <span className="font-bold text-text">{formatPrice(item.priceValue)}</span>
              <button
                type="button"
                aria-label="Retirer du panier"
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
        <p className="font-bold text-text">Résumé</p>
        <div className="mt-4 space-y-2 text-sm text-text-muted">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Cashback (15%)</span>
            <span className="text-green">+{formatPrice(cashback)}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-4 font-bold text-text">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-full gradient-brand py-3 text-sm font-bold text-white"
        >
          Procéder au paiement
        </button>
        <p className="mt-3 text-center text-xs text-text-muted">
          Paiement sécurisé · Satisfait ou remboursé 30 jours
        </p>
      </div>
    </div>
  );
}
