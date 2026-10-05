import { Gift } from "lucide-react";
import Price from "@/components/Price";
import type { Locale } from "@/lib/i18n";

export type WalletTransaction = {
  id: string;
  type: string;
  amount_eur: number;
  description: string | null;
  created_at: string;
};

const T = {
  fr: { available: "Solde disponible", history: "Historique", empty: "Aucun mouvement pour le moment." },
  en: { available: "Available balance", history: "History", empty: "No activity yet." },
};

export default function BalanceView({
  locale,
  balanceEUR,
  history,
}: {
  locale: Locale;
  balanceEUR: number;
  history: WalletTransaction[];
}) {
  const t = T[locale];

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl gradient-brand p-6 text-white">
        <div>
          <p className="text-sm text-white/80">{t.available}</p>
          <p className="mt-1 text-3xl font-extrabold">
            <Price amountEUR={balanceEUR} />
          </p>
        </div>
        <Gift size={28} />
      </div>

      <h2 className="mt-10 font-bold text-text">{t.history}</h2>
      {history.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">{t.empty}</p>
      ) : (
        <div className="mt-4 divide-y divide-border border-y border-border">
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between py-4 text-sm">
              <div>
                <p className="text-text">{h.description ?? h.type}</p>
                <p className="text-xs text-text-muted">
                  {new Date(h.created_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US")}
                </p>
              </div>
              <span className={`font-semibold ${h.amount_eur >= 0 ? "text-green" : "text-rose"}`}>
                {h.amount_eur >= 0 ? "+" : ""}
                <Price amountEUR={h.amount_eur} />
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
