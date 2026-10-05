import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CartView from "./CartView";

export const metadata: Metadata = {
  title: "Panier | BoostInflu",
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Votre panier" subtitle="Vérifiez votre commande avant de passer au paiement." />
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <CartView />
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
