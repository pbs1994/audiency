export function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d,.-]/g, "").replace(",", "."));
}

export function formatPrice(n: number): string {
  return `${n.toFixed(2).replace(".", ",")} €`;
}

export function formatQty(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return (Number.isInteger(k) ? String(k) : k.toFixed(1).replace(".", ",")) + "K";
}
