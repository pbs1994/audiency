import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EngagementCalculator from "./EngagementCalculator";

export const metadata: Metadata = {
  title: "Calculateur d’engagement | Audiency",
  description: "Calculez votre taux d’engagement Instagram ou TikTok gratuitement.",
};

export default function EngagementCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Calculateur d’engagement"
        subtitle="Entrez vos statistiques pour estimer votre taux d’engagement moyen."
      />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <EngagementCalculator />
        </div>
      </section>
    </>
  );
}
