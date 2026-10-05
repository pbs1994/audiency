"use client";

import { useCurrency } from "@/lib/currency-context";

export default function Price({ amountEUR }: { amountEUR: number }) {
  const { format } = useCurrency();
  return <>{format(amountEUR)}</>;
}
