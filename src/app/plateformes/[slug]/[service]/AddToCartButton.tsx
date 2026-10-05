"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { parsePrice } from "@/lib/price";

export default function AddToCartButton({
  logoName,
  name,
  detail,
  price,
  idPrefix,
}: {
  logoName: string;
  name: string;
  detail: string;
  price: string;
  idPrefix: string;
}) {
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          id: `${idPrefix}:${Date.now()}`,
          logoName,
          name,
          detail,
          priceValue: parsePrice(price),
        });
        router.push("/panier");
      }}
      className="mt-5 flex w-full items-center justify-center rounded-full gradient-brand py-3.5 text-sm font-bold text-white"
    >
      Ajouter au panier · {price}
    </button>
  );
}
