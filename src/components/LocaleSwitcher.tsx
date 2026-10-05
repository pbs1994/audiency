"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useCurrency, type Currency } from "@/lib/currency-context";
import { routeHref } from "@/lib/i18n";

const LANGUAGES = [
  { code: "fr" as const, label: "Français" },
  { code: "en" as const, label: "English" },
];

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "EUR", label: "€ Euro" },
  { code: "USD", label: "$ US Dollar" },
];

export default function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm text-text-muted hover:text-text"
        aria-expanded={open}
      >
        <Globe size={15} />
        {locale.toUpperCase()} / {currency}
        <ChevronDown size={13} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-surface p-3 shadow-lg">
            <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
              {locale === "fr" ? "Langue" : "Language"}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      if (l.code !== locale) router.push(routeHref(l.code, "home"));
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-text hover:bg-surface-soft"
                  >
                    {l.label}
                    {locale === l.code && <Check size={14} className="text-violet" />}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-text-muted">
              {locale === "fr" ? "Devise" : "Currency"}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {CURRENCIES.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm text-text hover:bg-surface-soft"
                  >
                    {c.label}
                    {currency === c.code && <Check size={14} className="text-violet" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
