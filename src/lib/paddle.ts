import "server-only";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

/** Server-side Paddle client (API key). Never import from a "use client" file. */
export function getPaddle() {
  return new Paddle(process.env.PADDLE_API_KEY!, {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? Environment.sandbox : Environment.production,
  });
}
