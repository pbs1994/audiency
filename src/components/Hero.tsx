"use client";

import { useState } from "react";
import PlatformLogo, { hasPlatformLogo } from "./PlatformLogo";

const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "X / Twitter",
  "Snapchat",
  "Spotify",
  "Telegram",
  "WhatsApp",
];

export default function Hero() {
  const [active, setActive] = useState("Instagram");

  return (
    <section id="top" className="border-b border-border bg-surface-soft">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
          <span className="gradient-brand-text">Abonnés, Likes & Vues</span>
          <br />
          <span className="gradient-brand-text">Instagram & TikTok</span>
          <br />
          <span className="text-text">Prix les plus bas, livraison instantanée</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-text-muted sm:text-lg">
          Abonnés, likes et vues réels.{" "}
          <span className="font-semibold text-orange">Prix les plus bas</span> avec
          livraison instantanée — fournisseurs fiables, approuvés par des créateurs
          du monde entier.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setActive(p)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === p
                  ? "gradient-brand text-white shadow-sm"
                  : "border border-border bg-surface text-text-muted hover:border-violet/40 hover:text-text"
              }`}
            >
              {hasPlatformLogo(p) && (
                <PlatformLogo name={p} size={16} className="rounded-sm" />
              )}
              {p}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-violet/30 bg-surface p-6 text-left shadow-sm">
          <span className="inline-block rounded-full bg-gradient-to-r from-violet to-rose px-3 py-1 text-xs font-bold tracking-wide text-white">
            MEILLEUR PACK
          </span>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-text">
                Vues <span className="text-violet">+</span> Likes
              </p>
              <p className="text-sm text-text-muted">
                Vues et likes Instagram · 2 services en une commande
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-extrabold gradient-brand-text">1,59 €</p>
              <span className="mt-1 inline-block rounded-full bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                141K+ vendues
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
