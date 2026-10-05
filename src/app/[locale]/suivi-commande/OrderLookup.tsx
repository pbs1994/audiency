"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    placeholder: "Numéro de commande (ex. A-20481)",
    track: "Suivre",
    order: "Commande #A-20481",
    product: "Vues + Likes · Instagram",
    views: "Vues",
    delivered: "LIVRÉ",
    likes: "Likes",
    inProgress: "EN COURS",
    progress: "640 / 1 000 livrés",
  },
  en: {
    placeholder: "Order number (e.g. A-20481)",
    track: "Track",
    order: "Order #A-20481",
    product: "Views + Likes · Instagram",
    views: "Views",
    delivered: "DELIVERED",
    likes: "Likes",
    inProgress: "IN PROGRESS",
    progress: "640 / 1,000 delivered",
  },
};

export default function OrderLookup({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input
          type="text"
          required
          placeholder={t.placeholder}
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg gradient-brand px-5 py-3 text-sm font-bold text-white"
        >
          <Search size={16} /> {t.track}
        </button>
      </form>

      {submitted && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="bg-gradient-to-r from-violet to-rose px-5 py-4 text-white">
            <p className="font-bold">{t.order}</p>
            <p className="text-xs text-white/80">{t.product}</p>
          </div>
          <div className="space-y-5 bg-surface p-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text">{t.views}</span>
                <span className="text-xs font-semibold text-green">{t.delivered}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-soft">
                <div className="h-2 w-full rounded-full bg-green" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text">{t.likes}</span>
                <span className="text-xs font-semibold text-violet">{t.inProgress}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-soft">
                <div className="h-2 w-[64%] rounded-full bg-gradient-to-r from-violet to-teal" />
              </div>
              <p className="mt-1 text-xs text-text-muted">{t.progress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
