"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "./local-store";

export type CartItem = {
  id: string;
  logoName: string;
  name: string;
  detail: string;
  priceValue: number;
  /** Structured fields, used to build a real order at checkout. */
  platformSlug?: string;
  serviceSlug?: string;
  quantity?: number;
  unit?: string;
  targetUrl?: string;
  /** Only meaningful when the service offers that option (followerType / genderOption). */
  quality?: "standard" | "premium";
  gender?: "all" | "female" | "male";
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, patch: Partial<CartItem>) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const store = createLocalStore<CartItem[]>("boostinflu-cart", []);

/** Module-level so it's never called from within a component's render body. */
export function createCartItemId(prefix: string) {
  return `${prefix}:${Date.now()}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  const addItem = (item: CartItem) => {
    store.setValue((prev) => [...prev, item]);
  };

  const removeItem = (id: string) => {
    store.setValue((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, patch: Partial<CartItem>) => {
    store.setValue((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const clear = () => store.setValue([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
