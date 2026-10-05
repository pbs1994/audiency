"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe2, ShieldCheck, Clock, Lock, Tag } from "lucide-react";
import SectionBadge from "./SectionBadge";
import PlatformLogo from "./PlatformLogo";
import { getPlatform } from "@/lib/platforms";

const TABS = [
  { slug: "instagram", label: "Instagram" },
  { slug: "tiktok", label: "TikTok" },
  { slug: "youtube", label: "YouTube" },
];

const PAYMENTS = ["VISA", "MASTERCARD", "G PAY", "APPLE PAY", "AMEX"];
const TRUST = [
  { icon: Globe2, title: "International", body: "Clients servis" },
  { icon: ShieldCheck, title: "Garanti", body: "Livraison sur chaque commande" },
  { icon: Clock, title: "Instantané", body: "Traitement de commande" },
  { icon: Lock, title: "Sécurisé", body: "Paiements protégés" },
];

export default function Pricing() {
  const [slug, setSlug] = useState("instagram");
  const platform = getPlatform(slug);
  if (!platform) return null;

  const best = platform.services.find((s) => s.highlight);
  const rows = platform.services.filter((s) => !s.highlight);

  return (
    <section id="tarifs" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={Tag} tone="orange">
          Tarifs transparents
        </SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">Nos tarifs</h2>

        <div className="mt-8 flex justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setSlug(t.slug)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                t.slug === slug
                  ? "gradient-brand text-white"
                  : "border border-border text-text-muted hover:text-text"
              }`}
            >
              <PlatformLogo name={t.label} size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {best && (
          <Link
            href={`/plateformes/${platform.slug}/${best.slug}`}
            className="mx-auto mt-10 block max-w-3xl rounded-2xl border-2 border-violet/30 bg-surface-soft p-6 text-left shadow-sm transition-colors hover:border-violet/50"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-violet to-rose px-3 py-1 text-xs font-bold text-white">
              MEILLEUR PACK
            </span>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-text">{best.name}</p>
                <p className="text-sm text-text-muted">{best.detail}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold gradient-brand-text">{best.price}</p>
                <span className="mt-1 inline-block rounded-full bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                  {best.sold}
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="mx-auto mt-6 grid max-w-3xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <Link
              key={row.slug}
              href={`/plateformes/${platform.slug}/${row.slug}`}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-violet/40"
            >
              <p className="font-semibold text-text">{row.name}</p>
              <p className="mt-2 text-xl font-extrabold gradient-brand-text">{row.price}</p>
              <span className="mt-2 inline-block rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                {row.sold}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/plateformes"
          className="mt-10 inline-block rounded-full gradient-brand px-7 py-3.5 text-sm font-bold text-white shadow-sm"
        >
          Voir tous les services
        </Link>

        <p className="mt-8 text-xs uppercase tracking-wide text-text-muted">Paiements sécurisés avec</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {PAYMENTS.map((p) => (
            <span key={p} className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-text-muted">
              {p}
            </span>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title}>
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet">
                <t.icon size={20} />
              </span>
              <p className="mt-3 font-bold text-text">{t.title}</p>
              <p className="text-xs text-text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
