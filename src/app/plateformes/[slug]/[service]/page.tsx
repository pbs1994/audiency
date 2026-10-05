import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  RefreshCcw,
  Headphones,
  Zap,
  Users2,
  Lock,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase,
  Palette,
  Search,
  UserCheck,
  Rocket,
} from "lucide-react";
import { getService, allServiceParams, type PlatformData, type ServiceItem } from "@/lib/platforms";
import PlatformLogo from "@/components/PlatformLogo";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuantityBuilder from "./QuantityBuilder";

export function generateStaticParams() {
  return allServiceParams();
}

export async function generateMetadata(
  props: PageProps<"/plateformes/[slug]/[service]">
): Promise<Metadata> {
  const { slug, service: serviceSlug } = await props.params;
  const found = getService(slug, serviceSlug);
  if (!found) return {};
  const { service } = found;
  return {
    title: `${service.title} — ${service.price} | Audiency`,
    description: `${service.title} : ${service.detail}. ${service.sold} sur Audiency, livraison instantanée, comptes réels, à partir de ${service.price}.`,
  };
}

function parseSoldNumber(sold: string): number {
  const match = sold.match(/(\d+(?:[.,]\d+)?)\s*K/i);
  if (!match) return 0;
  return Math.round(parseFloat(match[1].replace(",", ".")) * 1000);
}

const FEATURES = [
  { icon: Zap, title: "Livraison instantanée", body: "La plupart des services disent « instantané » mais mettent des heures à démarrer. Chez nous, ça commence en quelques minutes." },
  { icon: Users2, title: "100% comptes réels", body: "Chaque interaction provient d’un compte actif. Aucun robot, aucun profil fantôme qui disparaît après une semaine." },
  { icon: ShieldCheck, title: "Sécurité de votre compte", body: "Nous ne demandons jamais votre mot de passe. Nos méthodes respectent les conditions d’utilisation de chaque plateforme." },
  { icon: TrendingUp, title: "Un effet d’entraînement", body: "Un profil déjà suivi inspire confiance : les gens suivent plus volontiers un compte qui semble déjà populaire." },
  { icon: Headphones, title: "Support 24/7", body: "Une vraie équipe répond à vos questions à toute heure, pas un chatbot qui tourne en rond." },
];

const PERSONAS = [
  { icon: Users2, color: "border-t-teal", title: "Créateurs de contenu" },
  { icon: Briefcase, color: "border-t-violet", title: "Petites entreprises" },
  { icon: Star, color: "border-t-rose", title: "Influenceurs en devenir" },
  { icon: Palette, color: "border-t-green", title: "Artistes & créateurs" },
];

const COMPARISON = [
  { icon: Zap, label: "Livraison instantanée" },
  { icon: Users2, label: "100% comptes réels" },
  { icon: Lock, label: "Aucun mot de passe demandé" },
  { icon: RefreshCcw, label: "Garantie de réassort 30 jours" },
  { icon: Headphones, label: "Support 24/7" },
];

function personaBody(index: number, service: ServiceItem, platform: PlatformData) {
  const metric = service.name.toLowerCase();
  switch (index) {
    case 0:
      return `Vous publiez du contenu de qualité mais peinez à être vu. Plus de ${metric} aide l’algorithme ${platform.name} à pousser vos publications vers plus de monde.`;
    case 1:
      return `Vos clients font confiance aux marques qui ont déjà du succès. Un profil actif et suivi rassure dès la première visite.`;
    case 2:
      return `Les marques regardent vos chiffres avant de vous contacter. Passer un premier palier ouvre la porte aux partenariats.`;
    default:
      return `Votre travail mérite d’être vu. Plus d’audience, c’est plus de partages et plus d’opportunités d’être découvert.`;
  }
}

export default async function ServicePage(props: PageProps<"/plateformes/[slug]/[service]">) {
  const { slug, service: serviceSlug } = await props.params;
  const found = getService(slug, serviceSlug);
  if (!found) notFound();
  const { platform, service } = found;

  const siblings = platform.services.filter((s) => s.slug !== service.slug);
  const totalSold = platform.services.reduce((sum, s) => sum + parseSoldNumber(s.sold), 0);
  const soldNumber = parseSoldNumber(service.sold);
  const reviews = Math.max(18, Math.round(soldNumber / 650));
  const rating = ["4.7", "4.8", "4.9", "4.8"][soldNumber % 4];
  const canBuildQuantity = Boolean(service.baseQty && service.unit);

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

      {/* Hero */}
      <div className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-surface shadow-sm">
              <PlatformLogo name={platform.logoName} size={48} />
            </span>
            <p className="text-sm font-semibold text-violet">{platform.name}</p>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-text sm:text-4xl">{service.title}</h1>

          <p className="mt-4 max-w-xl text-text-muted">
            {service.detail} sur {platform.name}. Un service parmi les plus demandés
            d’Audiency, déjà {service.sold} auprès de créateurs et de marques qui font
            confiance à notre réseau de comptes réels et actifs.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-1.5 text-text">
              <Star size={16} className="text-orange" fill="currentColor" strokeWidth={0} />
              <span className="font-semibold">{rating}</span>
              <span className="text-text-muted">({reviews} avis)</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold text-green">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              {service.sold}
            </span>
            <span className="flex gap-1.5">
              {["VISA", "G PAY", "APPLE PAY"].map((p) => (
                <span key={p} className="rounded-md border border-border px-2 py-1 text-[10px] font-semibold text-text-muted">
                  {p}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Order builder */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          {canBuildQuantity ? (
            <QuantityBuilder basePrice={service.price} baseQty={service.baseQty!} unit={service.unit!} />
          ) : (
            <div className="rounded-2xl border-2 border-violet/30 bg-surface-soft p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-bold text-text">{service.name}</p>
                  <p className="text-sm text-text-muted">{service.detail}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold gradient-brand-text">{service.price}</p>
                  <p className="text-xs text-text-muted">{service.sold}</p>
                </div>
              </div>
              <Link
                href="/panier"
                className="mt-5 flex w-full items-center justify-center rounded-full gradient-brand py-3.5 text-sm font-bold text-white"
              >
                Ajouter au panier · {service.price}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">Comment ça marche</h2>
          <div className="relative mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Search, title: "Choisissez la quantité", body: `Sélectionnez le volume de ${service.name.toLowerCase()} adapté à vos objectifs.` },
              { icon: UserCheck, title: "Indiquez votre pseudo", body: "Aucun mot de passe. Juste votre nom d’utilisateur ou l’URL de votre publication." },
              { icon: Rocket, title: "Recevez votre commande", body: "La livraison démarre en quelques minutes et se poursuit progressivement." },
            ].map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon size={20} className="mt-4 text-violet" />
                <p className="mt-3 font-semibold text-text">{step.title}</p>
                <p className="mt-1 text-sm text-text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">
            Pourquoi choisir Audiency pour {service.name.toLowerCase()} {platform.name}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-surface-soft p-5">
                <f.icon size={20} className="text-violet" />
                <p className="mt-3 font-semibold text-text">{f.title}</p>
                <p className="mt-1 text-sm text-text-muted">{f.body}</p>
              </div>
            ))}
            <div className="rounded-2xl border-2 border-orange/40 bg-orange/5 p-5">
              <Clock size={20} className="text-orange" />
              <p className="mt-3 font-semibold text-orange">
                {totalSold.toLocaleString("fr-FR")}+ commandes livrées
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Sur {platform.name} seul — notre expérience garantit une livraison fiable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">
            À qui s’adresse ce service {platform.name}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map((p, i) => (
              <div key={p.title} className={`rounded-2xl border border-border border-t-4 ${p.color} bg-surface p-5`}>
                <p.icon size={20} className="text-text" />
                <p className="mt-3 font-semibold text-text">{p.title}</p>
                <p className="mt-2 text-sm text-text-muted">{personaBody(i, service, platform)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">Audiency face aux autres services</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border bg-surface-soft px-5 py-4">
              <span />
              <span className="flex w-24 items-center justify-center gap-1.5 font-bold text-text">
                <span className="grid h-6 w-6 place-items-center rounded-full gradient-brand text-[10px] font-bold text-white">
                  A
                </span>
                Audiency
              </span>
              <span className="w-24 text-center text-text-muted">Autres</span>
            </div>
            {COMPARISON.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-border px-5 py-4 last:border-b-0"
              >
                <span className="flex items-center gap-2 text-sm text-text">
                  <row.icon size={16} className="text-text-muted" />
                  {row.label}
                </span>
                <span className="flex w-24 justify-center">
                  <CheckCircle2 size={18} className="text-green" />
                </span>
                <span className="flex w-24 justify-center">
                  <XCircle size={18} className="text-rose/60" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees (dark) */}
      <section className="bg-navy">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold text-on-navy">Notre promesse</h2>
          <p className="mt-2 text-sm text-on-navy-muted">
            Des garanties claires, sans petites lignes.
          </p>
          <div className="mt-8 grid gap-5 text-left sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Satisfait ou remboursé", body: "Pas satisfait ? Remboursement intégral, sans question." },
              { icon: RefreshCcw, title: "Garantie de réassort", body: "Une baisse dans les 30 jours ? Nous relivrons gratuitement." },
              { icon: Headphones, title: "Support 24/7", body: "Notre équipe est disponible à toute heure pour vous aider." },
            ].map((g) => (
              <div key={g.title} className="rounded-2xl border border-navy-line bg-navy-2 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-green/15 text-green">
                  <g.icon size={18} />
                </span>
                <p className="mt-4 font-semibold text-on-navy">{g.title}</p>
                <p className="mt-1 text-sm text-on-navy-muted">{g.body}</p>
              </div>
            ))}
          </div>
          <span className="mt-8 inline-block rounded-full border border-navy-line px-4 py-2 text-xs font-medium text-on-navy-muted">
            Plus de 50 000 clients satisfaits
          </span>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
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
      </section>

      {/* Final CTA */}
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

      {/* Related services */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          {siblings.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-text">Services similaires sur {platform.name}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siblings.slice(0, 4).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/plateformes/${platform.slug}/${s.slug}`}
                    className="rounded-2xl border border-border bg-surface-soft p-4 transition-colors hover:border-violet/40"
                  >
                    <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-surface">
                      <PlatformLogo name={platform.logoName} size={40} />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-text">{s.name}</p>
                    <p className="mt-1 text-lg font-extrabold gradient-brand-text">{s.price}</p>
                    <p className="text-xs text-text-muted">{s.sold}</p>
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
