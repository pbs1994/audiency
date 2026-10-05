"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "./local-store";

export type Currency = "EUR" | "USD";

const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
};

const SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
};

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Convert a EUR amount and format it in the active currency. */
  format: (amountEUR: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
// null = no explicit user choice yet — fall back to the page's locale-based default.
const store = createLocalStore<Currency | null>("boostinflu-currency", null);

export function CurrencyProvider({
  defaultCurrency,
  children,
}: {
  defaultCurrency: Currency;
  children: ReactNode;
}) {
  const stored = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const currency = stored ?? defaultCurrency;

  const setCurrency = (c: Currency) => store.setValue(c);

  const format = (amountEUR: number) => {
    const converted = amountEUR * RATES[currency];
    const symbol = SYMBOLS[currency];
    const value = converted.toFixed(2).replace(".", currency === "EUR" ? "," : ".");
    return currency === "EUR" ? `${value} ${symbol}` : `${symbol}${value}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
