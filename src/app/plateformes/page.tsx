import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PlatformLogo from "@/components/PlatformLogo";
import { PLATFORMS } from "@/lib/platforms";

export const metadata: Metadata = {
  title: "Toutes les plateformes | BoostInflu",
  description: "Développez votre audience sur 9 réseaux sociaux avec BoostInflu.",
};

export default function PlatformsIndexPage() {
  return (
    <>
      <PageHeader
        title="Toutes les plateformes"
        subtitle="Choisissez votre réseau social pour voir la liste complète des services disponibles."
      />
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {PLATFORMS.map((p) => (
              <Link
                key={p.slug}
                href={`/plateformes/${p.slug}`}
                className="rounded-2xl border border-border bg-surface-soft p-6 shadow-sm transition-colors hover:border-violet/40"
              >
                <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-surface">
                  <PlatformLogo name={p.logoName} size={44} />
                </span>
                <p className="mt-4 font-bold text-text">{p.name}</p>
                <p className="mt-1 text-sm text-text-muted">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
