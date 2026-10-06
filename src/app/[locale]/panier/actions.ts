"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPaddle } from "@/lib/paddle";
import { getService, getVariantId } from "@/lib/platforms";
import { computeLineCents } from "@/lib/pricing";
import type { CartItem } from "@/lib/cart-context";

export type StartCheckoutResult = { orderId: string; transactionId: string } | { error: string };

/**
 * Starts a real payment for the signed-in user's cart.
 *
 * Prices are recomputed here from the static catalog — the cart's
 * priceValue is never trusted. The order is stored as 'pending_payment'
 * and a Paddle transaction with non-catalog prices is created for it;
 * the client then opens Paddle's overlay on the returned transactionId.
 * The order only becomes 'paid' (and earns cashback) when Paddle's
 * transaction.completed webhook calls complete_order().
 */
export async function startCheckout(items: CartItem[]): Promise<StartCheckoutResult> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "not_authenticated" };

  if (items.length === 0) return { error: "empty_cart" };
  if (items.some((item) => !item.targetUrl?.trim())) return { error: "missing_target" };

  const lines = [];
  for (const item of items) {
    const found =
      item.platformSlug && item.serviceSlug ? getService(item.platformSlug, item.serviceSlug) : undefined;
    if (!found) return { error: "unknown_service" };

    const quantity = item.quantity ?? 1;
    const quality = item.quality ?? "standard";
    const gender = item.gender ?? "all";
    const cents = computeLineCents(found.service, quantity, quality, gender);
    if (cents === null || cents <= 0) return { error: "invalid_quantity" };

    lines.push({ item, service: found.service, quantity, cents, quality, gender });
  }

  const payload = lines.map(({ item, service, quantity, cents, quality, gender }) => ({
    service_id: service.id,
    service_variant_id: getVariantId(service, quality, gender),
    platform_slug: item.platformSlug,
    service_slug: item.serviceSlug,
    service_name: item.name,
    target_url: item.targetUrl!.trim(),
    quantity,
    unit: item.unit ?? "unités",
    unit_price_eur: cents / 100 / quantity,
    line_total_eur: cents / 100,
  }));

  const admin = createAdminClient();
  const { data, error } = await admin.rpc("place_order", {
    p_user_id: userData.user.id,
    items: payload,
  });
  if (error) return { error: error.message };
  const orderId = data as string;

  try {
    const transaction = await getPaddle().transactions.create({
      currencyCode: "EUR",
      customData: { order_id: orderId, user_id: userData.user.id },
      items: lines.map(({ item, service, cents, quality, gender }) => ({
        quantity: 1,
        price: {
          name: item.name,
          description: `${getVariantId(service, quality, gender)} — ${item.detail}`,
          productId: process.env.PADDLE_PRODUCT_ID!,
          unitPrice: { amount: String(cents), currencyCode: "EUR" },
          quantity: { minimum: 1, maximum: 1 },
        },
      })),
    });

    await admin.from("orders").update({ paddle_transaction_id: transaction.id }).eq("id", orderId);
    return { orderId, transactionId: transaction.id };
  } catch {
    await admin.from("orders").update({ status: "cancelled" }).eq("id", orderId);
    return { error: "payment_unavailable" };
  }
}
