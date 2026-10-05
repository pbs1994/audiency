import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Zap, RefreshCcw } from "lucide-react";
import { PLATFORMS, getPlatform } from "@/lib/platforms";
import PlatformLogo from "@/components/PlatformLogo";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/plateformes/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const platform = getPlatform(slug);
  if (!platform) return {};
  return {
    title: `${platform.name} — Abonnés, vues et likes réels | Audiency`,
    description: platform.description,
  };
}

export default async function PlatformPage(props: PageProps<"/plateformes/[slug]">) {
  const { slug } = await props.params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Plateformes", href: "/plateformes" },
          { label: platform.name },
        ]}
      />

      <div className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-surface shadow-sm">
              <PlatformLogo name={platform.logoName} size={48} />
            </span>
            <div>
              <p className="text-sm font-semibold text-violet">{platform.tagline}</p>
              <h1 className="text-3xl font-extrabold text-text sm:text-4xl">{platform.name}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-text-muted">{platform.description}</p>
        </div>
      </div>

      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <h2 className="text-xl font-bold text-text">Services disponibles</h2>

          <div className="mt-6 divide-y divide-border border-y border-border">
            {platform.services.map((service) => (
              <div
                key={service.slug}
                className={`flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between ${
                  service.highlight ? "border-l-2 border-l-violet pl-4" : ""
                }`}
              >
                <div>
                  <Link
                    href={`/plateformes/${platform.slug}/${service.slug}`}
                    className="font-semibold text-text hover:text-violet"
                  >
                    {service.name}
                    {service.highlight && (
                      <span className="ml-3 rounded-full bg-violet/10 px-2.5 py-0.5 align-middle text-[11px] font-bold text-violet">
                        MEILLEUR PACK
                      </span>
                    )}
                  </Link>
                  <p className="text-sm text-text-muted">{service.detail}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-extrabold gradient-brand-text">{service.price}</p>
                    <p className="text-xs text-text-muted">{service.sold}</p>
                  </div>
                  <Link
                    href={`/plateformes/${platform.slug}/${service.slug}`}
                    className="shrink-0 rounded-full gradient-brand px-5 py-2.5 text-sm font-bold text-white"
                  >
                    Voir le service
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Zap size={18} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Livraison instantanée.</span> Démarrage
                en quelques minutes.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-violet" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Sans mot de passe.</span> Seul votre
                nom d’utilisateur est nécessaire.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCcw size={18} className="mt-0.5 shrink-0 text-green" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Garantie 30 jours.</span>{" "}
                Réabonnement ou remboursement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-brand">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Prêt à développer votre {platform.name} ?
          </h2>
          <Link
            href="/panier"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-violet shadow-sm"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-lg font-bold text-text">Autres plateformes</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {PLATFORMS.filter((p) => p.slug !== platform.slug).map((p) => (
              <Link
                key={p.slug}
                href={`/plateformes/${p.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm text-text-muted hover:border-violet/40 hover:text-text"
              >
                <PlatformLogo name={p.logoName} size={16} />
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
