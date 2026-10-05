import type { Metadata } from "next";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PlatformLogo from "@/components/PlatformLogo";

export const metadata: Metadata = {
  title: "Panier | Audiency",
};

const ITEMS = [
  {
    platform: "Instagram",
    name: "Vues + Likes",
    detail: "2 services en une commande",
    qty: 1,
    price: "1,59 €",
  },
];

export default function CartPage() {
  return (
    <>
      <PageHeader title="Votre panier" subtitle="Vérifiez votre commande avant de passer au paiement." />
      <section className="bg-surface">
        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.6fr]">
          <div className="divide-y divide-border border-y border-border">
            {ITEMS.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 py-5">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-surface-soft">
                    <PlatformLogo name={item.platform} size={44} />
                  </span>
                  <div>
                    <p className="font-semibold text-text">{item.name}</p>
                    <p className="text-sm text-text-muted">{item.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-mono text-sm text-text-muted">× {item.qty}</span>
                  <span className="font-bold text-text">{item.price}</span>
                  <button type="button" aria-label="Retirer" className="text-text-muted hover:text-rose">
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
                <span>1,59 €</span>
              </div>
              <div className="flex justify-between">
                <span>Cashback (15%)</span>
                <span className="text-green">+0,24 €</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4 font-bold text-text">
              <span>Total</span>
              <span>1,59 €</span>
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

        <div className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
          <Link href="/plateformes" className="text-sm font-medium text-violet">
            ← Continuer mes achats
          </Link>
        </div>
      </section>
    </>
  );
}
