"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "./local-store";

export type CartItem = {
  id: string;
  logoName: string;
  name: string;
  detail: string;
  priceValue: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
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

  const clear = () => store.setValue([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
