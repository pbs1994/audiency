import type { Metadata } from "next";
import { Gift } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Mon solde | BoostInflu",
};

const HISTORY = [
  { label: "Cashback — commande #A-20481", amount: "+0,24 €", date: "28 sept. 2026" },
  { label: "Cashback — commande #A-19207", amount: "+0,45 €", date: "14 sept. 2026" },
  { label: "Crédit de bienvenue", amount: "+2,00 €", date: "2 sept. 2026" },
];

export default function BalancePage() {
  return (
    <>
      <PageHeader title="Mon solde" subtitle="Votre cashback BoostInflu, utilisable sur n’importe quelle commande." />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <div className="flex items-center justify-between rounded-2xl gradient-brand p-6 text-white">
            <div>
              <p className="text-sm text-white/80">Solde disponible</p>
              <p className="mt-1 text-3xl font-extrabold">2,69 €</p>
            </div>
            <Gift size={28} />
          </div>

          <h2 className="mt-10 font-bold text-text">Historique</h2>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {HISTORY.map((h) => (
              <div key={h.label} className="flex items-center justify-between py-4 text-sm">
                <div>
                  <p className="text-text">{h.label}</p>
                  <p className="text-xs text-text-muted">{h.date}</p>
                </div>
                <span className="font-semibold text-green">{h.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
