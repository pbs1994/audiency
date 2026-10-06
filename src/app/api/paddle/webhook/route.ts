import { EventName } from "@paddle/paddle-node-sdk";
import { getPaddle } from "@/lib/paddle";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Paddle webhook. The signature is verified against the raw body, so the
 * body must be read as text (not parsed JSON). Fulfilment state lives
 * here, not on the browser redirect.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature");
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!signature || !secret) return new Response("Unauthorized", { status: 401 });

  const rawBody = await request.text();

  let event;
  try {
    event = await getPaddle().webhooks.unmarshal(rawBody, secret, signature);
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  if (event.eventType === EventName.TransactionCompleted) {
    const customData = event.data.customData as { order_id?: string } | null;
    if (customData?.order_id) {
      const { error } = await createAdminClient().rpc("complete_order", {
        p_order_id: customData.order_id,
        p_transaction_id: event.data.id,
      });
      // Non-2xx makes Paddle retry; complete_order() is idempotent.
      if (error) return new Response("Failed", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}
