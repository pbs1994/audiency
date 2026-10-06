"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CartItem } from "@/lib/cart-context";

export type CreateOrderResult = { orderId: string } | { error: string };

/**
 * Places an order for the signed-in user from their cart.
 *
 * No real payment processor is wired up yet — this records the order,
 * its items, and the usual 15% cashback as "paid" directly (simulated
 * checkout). Each order item also gets a 'pending' fulfillment_requests
 * row; nothing here calls any delivery/engagement API.
 *
 * Price integrity: priceValue is trusted as computed by the cart (same as
 * the rest of the site already does for display). Once a real payment
 * processor is wired, this is the place to recompute prices server-side
 * from the catalog instead of trusting the client.
 */
export async function createOrder(items: CartItem[]): Promise<CreateOrderResult> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "not_authenticated" };

  if (items.length === 0) return { error: "empty_cart" };
  if (items.some((item) => !item.targetUrl?.trim())) return { error: "missing_target" };

  const payload = items.map((item) => ({
    platform_slug: item.platformSlug ?? "autre",
    service_slug: item.serviceSlug ?? "service",
    service_name: item.name,
    target_url: item.targetUrl!.trim(),
    quantity: item.quantity ?? 1,
    unit: item.unit ?? "unités",
    unit_price_eur: item.priceValue / (item.quantity ?? 1),
    line_total_eur: item.priceValue,
  }));

  const admin = createAdminClient();
  const { data, error } = await admin.rpc("place_order", {
    p_user_id: userData.user.id,
    items: payload,
  });

  if (error) return { error: error.message };
  return { orderId: data as string };
}
