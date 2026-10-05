import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import OrderLookup from "./OrderLookup";

export const metadata: Metadata = {
  title: "Suivre ma commande | BoostInflu",
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHeader
        title="Suivre ma commande"
        subtitle="Entrez votre numéro de commande pour voir sa progression en direct."
      />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <OrderLookup />
        </div>
      </section>
    </>
  );
}
