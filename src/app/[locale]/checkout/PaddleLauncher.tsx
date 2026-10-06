"use client";

import { useEffect } from "react";
import { initializePaddle } from "@paddle/paddle-js";
import { routeHref, type Locale } from "@/lib/i18n";

/**
 * Paddle's default payment link points here. When the URL carries a
 * `?_ptxn=txn_…` parameter, Paddle.js opens that transaction's checkout
 * automatically as soon as it is initialized.
 */
export default function PaddleLauncher({ locale }: { locale: Locale }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) return;
    initializePaddle({
      token,
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production",
      checkout: {
        settings: {
          variant: "one-page",
          locale,
          successUrl: `${window.location.origin}${routeHref(locale, "accountOrders")}`,
        },
      },
    });
  }, [locale]);

  return null;
}
