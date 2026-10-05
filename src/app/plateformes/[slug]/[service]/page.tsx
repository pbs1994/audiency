import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Zap, ShieldCheck, RefreshCcw, Search, UserCheck, Rocket } from "lucide-react";
import { getService, allServiceParams } from "@/lib/platforms";
import PlatformLogo from "@/components/PlatformLogo";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return allServiceParams();
}

export async function generateMetadata(
  props: PageProps<"/plateformes/[slug]/[service]">
): Promise<Metadata> {
  const { slug, service: serviceSlug } = await props.params;
  const found = getService(slug, serviceSlug);
  if (!found) return {};
  const { platform, service } = found;
  return {
    title: `${service.title} — ${service.price} | Audiency`,
    description: `${service.title} : ${service.detail}. ${service.sold} sur Audiency, livraison instantanée, comptes réels, à partir de ${service.price}.`,
  };
}

export default async function ServicePage(props: PageProps<"/plateformes/[slug]/[service]">) {
  const { slug, service: serviceSlug } = await props.params;
  const found = getService(slug, serviceSlug);
  if (!found) notFound();
  const { platform, service } = found;

  const siblings = platform.services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Plateformes", href: "/plateformes" },
          { label: platform.name, href: `/plateformes/${platform.slug}` },
          { label: service.title },
        ]}
      />

      <div className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-surface shadow-sm">
              <PlatformLogo name={platform.logoName} size={48} />
            </span>
            <div>
              <p className="text-sm font-semibold text-violet">{platform.name}</p>
              <h1 className="text-3xl font-extrabold text-text sm:text-4xl">{service.title}</h1>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-text-muted">
            {service.detail} sur {platform.name}. Un service parmi les plus demandés
            d’Audiency : déjà {service.sold} auprès de créateurs et de marques qui font
            confiance à notre réseau de comptes réels et actifs.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-3xl font-extrabold gradient-brand-text">{service.price}</span>
            {service.highlight && (
              <span className="rounded-full bg-violet/10 px-2.5 py-1 text-xs font-bold text-violet">
                MEILLEUR PACK
              </span>
            )}
            <button
              type="button"
              className="rounded-full gradient-brand px-6 py-3 text-sm font-bold text-white"
            >
              Commander maintenant
            </button>
          </div>
        </div>
      </div>

      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-lg font-bold text-text">Comment ça marche</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="flex gap-3">
              <Search size={18} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Choisissez la quantité</span> adaptée
                à votre {platform.name.split(" ")[0]}.
              </p>
            </div>
            <div className="flex gap-3">
              <UserCheck size={18} className="mt-0.5 shrink-0 text-violet" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Indiquez votre pseudo</span> ou l’URL
                de votre publication. Aucun mot de passe.
              </p>
            </div>
            <div className="flex gap-3">
              <Rocket size={18} className="mt-0.5 shrink-0 text-green" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Recevez votre commande</span> en
                quelques minutes, livrée progressivement.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-y border-border py-8 sm:grid-cols-3">
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
                <span className="font-semibold text-text">100% comptes réels.</span> Aucun robot,
                aucune ferme à clics.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCcw size={18} className="mt-0.5 shrink-0 text-green" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">Garantie 30 jours.</span> Réabonnement
                ou remboursement.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-text">Questions fréquentes</h2>
            <div className="mt-4 space-y-5">
              <div>
                <p className="font-semibold text-text">
                  Le service « {service.title} » est-il sans risque pour mon compte {platform.name} ?
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  Oui. Nous ne demandons jamais votre mot de passe et notre méthode de livraison
                  respecte les conditions d’utilisation de {platform.name}.
                </p>
              </div>
              <div>
                <p className="font-semibold text-text">
                  En combien de temps ma commande « {service.name} » est-elle livrée ?
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  La livraison démarre généralement en moins de 5 minutes et se poursuit de
                  façon progressive jusqu’à la quantité commandée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-brand">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold text-white">
            Prêt à commander {service.name.toLowerCase()} {platform.name} ?
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
          {siblings.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-text">Autres services {platform.name}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/plateformes/${platform.slug}/${s.slug}`}
                    className="rounded-full border border-border px-3.5 py-2 text-sm text-text-muted hover:border-violet/40 hover:text-text"
                  >
                    {s.name} {platform.name} — {s.price}
                  </Link>
                ))}
              </div>
            </>
          )}

          <p className="mt-8 text-sm">
            <Link href={`/plateformes/${platform.slug}`} className="font-medium text-violet">
              ← Voir tous les services {platform.name}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
