"use client";

import { Gift } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import type { Locale } from "@/lib/i18n";

const HISTORY = {
  fr: [
    { label: "Cashback — commande #A-20481", amountEUR: 0.24, date: "28 sept. 2026" },
    { label: "Cashback — commande #A-19207", amountEUR: 0.45, date: "14 sept. 2026" },
    { label: "Crédit de bienvenue", amountEUR: 2.0, date: "2 sept. 2026" },
  ],
  en: [
    { label: "Cashback — order #A-20481", amountEUR: 0.24, date: "Sep 28, 2026" },
    { label: "Cashback — order #A-19207", amountEUR: 0.45, date: "Sep 14, 2026" },
    { label: "Welcome credit", amountEUR: 2.0, date: "Sep 2, 2026" },
  ],
};

const T = {
  fr: { available: "Solde disponible", history: "Historique" },
  en: { available: "Available balance", history: "History" },
};

export default function BalanceView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const history = HISTORY[locale];
  const { format } = useCurrency();
  const total = history.reduce((sum, h) => sum + h.amountEUR, 0);

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl gradient-brand p-6 text-white">
        <div>
          <p className="text-sm text-white/80">{t.available}</p>
          <p className="mt-1 text-3xl font-extrabold">{format(total)}</p>
        </div>
        <Gift size={28} />
      </div>

      <h2 className="mt-10 font-bold text-text">{t.history}</h2>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {history.map((h) => (
          <div key={h.label} className="flex items-center justify-between py-4 text-sm">
            <div>
              <p className="text-text">{h.label}</p>
              <p className="text-xs text-text-muted">{h.date}</p>
            </div>
            <span className="font-semibold text-green">+{format(h.amountEUR)}</span>
          </div>
        ))}
      </div>
    </>
  );
}
