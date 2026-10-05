"use client";

import { useState } from "react";
import Link from "next/link";
import PlatformLogo, { hasPlatformLogo } from "./PlatformLogo";
import { getPlatform } from "@/lib/platforms";

const PLATFORMS = [
  { label: "Instagram", slug: "instagram" },
  { label: "TikTok", slug: "tiktok" },
  { label: "YouTube", slug: "youtube" },
  { label: "Facebook", slug: "facebook" },
  { label: "X / Twitter", slug: "x" },
  { label: "Snapchat", slug: "snapchat" },
  { label: "Spotify", slug: "spotify" },
  { label: "Telegram", slug: "telegram" },
  { label: "WhatsApp", slug: "whatsapp" },
];

export default function Hero() {
  const [activeSlug, setActiveSlug] = useState("instagram");
  const activePlatform = getPlatform(activeSlug)!;
  const bestValue = activePlatform.services.find((s) => s.highlight) ?? activePlatform.services[0];

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
              key={p.slug}
              type="button"
              onClick={() => setActiveSlug(p.slug)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeSlug === p.slug
                  ? "gradient-brand text-white shadow-sm"
                  : "border border-border bg-surface text-text-muted hover:border-violet/40 hover:text-text"
              }`}
            >
              {hasPlatformLogo(p.label) && (
                <PlatformLogo name={p.label} size={16} className="rounded-sm" />
              )}
              {p.label}
            </button>
          ))}
        </div>

        <Link
          href={`/plateformes/${activePlatform.slug}/${bestValue.slug}`}
          className="mx-auto mt-10 block max-w-xl rounded-2xl border-2 border-violet/30 bg-surface p-6 text-left shadow-sm transition-colors hover:border-violet/50"
        >
          <span className="inline-block rounded-full bg-gradient-to-r from-violet to-rose px-3 py-1 text-xs font-bold tracking-wide text-white">
            MEILLEUR PACK
          </span>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-text">
                {bestValue.name} <span className="text-violet">·</span> {activePlatform.name}
              </p>
              <p className="text-sm text-text-muted">{bestValue.detail}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-extrabold gradient-brand-text">{bestValue.price}</p>
              <span className="mt-1 inline-block rounded-full bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                {bestValue.sold}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
