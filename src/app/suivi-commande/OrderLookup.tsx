"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function OrderLookup() {
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
          placeholder="Numéro de commande (ex. A-20481)"
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg gradient-brand px-5 py-3 text-sm font-bold text-white"
        >
          <Search size={16} /> Suivre
        </button>
      </form>

      {submitted && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="bg-gradient-to-r from-violet to-rose px-5 py-4 text-white">
            <p className="font-bold">Commande #A-20481</p>
            <p className="text-xs text-white/80">Vues + Likes · Instagram</p>
          </div>
          <div className="space-y-5 bg-surface p-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text">Vues</span>
                <span className="text-xs font-semibold text-green">LIVRÉ</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-soft">
                <div className="h-2 w-full rounded-full bg-green" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text">Likes</span>
                <span className="text-xs font-semibold text-violet">EN COURS</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-soft">
                <div className="h-2 w-[64%] rounded-full bg-gradient-to-r from-violet to-teal" />
              </div>
              <p className="mt-1 text-xs text-text-muted">640 / 1 000 livrés</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
