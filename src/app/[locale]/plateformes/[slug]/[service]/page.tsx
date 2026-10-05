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
import { getService, serviceParamsForPlatform, PLATFORMS } from "@/lib/platforms";
import PlatformLogo from "@/components/PlatformLogo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Price from "@/components/Price";
import { soldLabel } from "@/lib/price";
import {
  LOCALES,
  DEFAULT_LOCALE,
  routeHref,
  platformHref,
  serviceHref,
  type Locale,
} from "@/lib/i18n";
import QuantityBuilder from "./QuantityBuilder";
import AddToCartButton from "./AddToCartButton";

export function generateStaticParams() {
  return PLATFORMS.flatMap((p) =>
    serviceParamsForPlatform(p.slug).map((s) => ({ slug: p.slug, ...s }))
  );
}

const BASE_URL = "https://boostinflu.fr";

export async function generateMetadata(
  props: PageProps<"/[locale]/plateformes/[slug]/[service]">
): Promise<Metadata> {
  const { locale: rawLocale, slug, service: serviceSlug } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const found = getService(slug, serviceSlug);
  if (!found || (locale === "fr" ? found.service.slug : found.service.slugEn) !== serviceSlug) return {};
  const { service } = found;
  const fr = locale === "fr";
  return {
    title: fr
      ? `${service.title} — ${service.priceEUR.toFixed(2).replace(".", ",")} € | BoostInflu`
      : `${service.titleEn} — from $${(service.priceEUR * 1.08).toFixed(2)} | BoostInflu`,
    description: fr
      ? `${service.title} : ${service.detail}. ${service.sold} vendues sur BoostInflu, livraison instantanée, comptes réels.`
      : `${service.titleEn}: ${service.detailEn}. ${service.sold} sold on BoostInflu, instant delivery, real accounts.`,
    alternates: {
      languages: {
        fr: `${BASE_URL}${serviceHref("fr", slug, service.slug, service.slugEn)}`,
        en: `${BASE_URL}${serviceHref("en", slug, service.slug, service.slugEn)}`,
      },
    },
  };
}

function parseSoldNumber(sold: string): number {
  const match = sold.match(/(\d+(?:[.,]\d+)?)\s*K/i);
  if (!match) return 0;
  return Math.round(parseFloat(match[1].replace(",", ".")) * 1000);
}

const T = {
  fr: {
    home: "Accueil",
    platforms: "Plateformes",
    reviews: (n: number) => `(${n} avis)`,
    howItWorks: "Comment ça marche",
    steps: [
      { icon: Search, title: "Choisissez la quantité", body: (metric: string) => `Sélectionnez le volume de ${metric} adapté à vos objectifs.` },
      { icon: UserCheck, title: "Indiquez votre pseudo", body: () => "Aucun mot de passe. Juste votre nom d’utilisateur ou l’URL de votre publication." },
      { icon: Rocket, title: "Recevez votre commande", body: () => "La livraison démarre en quelques minutes et se poursuit progressivement." },
    ],
    whyChoose: (service: string, platform: string) => `Pourquoi choisir BoostInflu pour ${service} ${platform}`,
    features: [
      { icon: Zap, title: "Livraison instantanée", body: "La plupart des services disent « instantané » mais mettent des heures à démarrer. Chez nous, ça commence en quelques minutes." },
      { icon: Users2, title: "100% comptes réels", body: "Chaque interaction provient d’un compte actif. Aucun robot, aucun profil fantôme qui disparaît après une semaine." },
      { icon: ShieldCheck, title: "Sécurité de votre compte", body: "Nous ne demandons jamais votre mot de passe. Nos méthodes respectent les conditions d’utilisation de chaque plateforme." },
      { icon: TrendingUp, title: "Un effet d’entraînement", body: "Un profil déjà suivi inspire confiance : les gens suivent plus volontiers un compte qui semble déjà populaire." },
      { icon: Headphones, title: "Support 24/7", body: "Une vraie équipe répond à vos questions à toute heure, pas un chatbot qui tourne en rond." },
    ],
    statCard: (n: string) => `${n}+ commandes livrées`,
    statCardBody: (platform: string) => `Sur ${platform} seul — notre expérience garantit une livraison fiable.`,
    forWhom: (platform: string) => `À qui s’adresse ce service ${platform}`,
    personas: [
      { icon: Users2, color: "border-t-teal", title: "Créateurs de contenu" },
      { icon: Briefcase, color: "border-t-violet", title: "Petites entreprises" },
      { icon: Star, color: "border-t-rose", title: "Influenceurs en devenir" },
      { icon: Palette, color: "border-t-green", title: "Artistes & créateurs" },
    ],
    personaBody: (i: number, metric: string, platform: string) =>
      [
        `Vous publiez du contenu de qualité mais peinez à être vu. Plus de ${metric} aide l’algorithme ${platform} à pousser vos publications vers plus de monde.`,
        "Vos clients font confiance aux marques qui ont déjà du succès. Un profil actif et suivi rassure dès la première visite.",
        "Les marques regardent vos chiffres avant de vous contacter. Passer un premier palier ouvre la porte aux partenariats.",
        "Votre travail mérite d’être vu. Plus d’audience, c’est plus de partages et plus d’opportunités d’être découvert.",
      ][i],
    comparisonTitle: "BoostInflu face aux autres services",
    comparisonUs: "BoostInflu",
    comparisonThem: "Autres",
    comparison: [
      { icon: Zap, label: "Livraison instantanée" },
      { icon: Users2, label: "100% comptes réels" },
      { icon: Lock, label: "Aucun mot de passe demandé" },
      { icon: RefreshCcw, label: "Garantie de réassort 30 jours" },
      { icon: Headphones, label: "Support 24/7" },
    ],
    promiseTitle: "Notre promesse",
    promiseSubtitle: "Des garanties claires, sans petites lignes.",
    promises: [
      { icon: ShieldCheck, title: "Satisfait ou remboursé", body: "Pas satisfait ? Remboursement intégral, sans question." },
      { icon: RefreshCcw, title: "Garantie de réassort", body: "Une baisse dans les 30 jours ? Nous relivrons gratuitement." },
      { icon: Headphones, title: "Support 24/7", body: "Notre équipe est disponible à toute heure pour vous aider." },
    ],
    trustedBy: "Plus de 50 000 clients satisfaits",
    faqTitle: "Questions fréquentes",
    faqSafety: (title: string, platform: string) => `Le service « ${title} » est-il sans risque pour mon compte ${platform} ?`,
    faqSafetyBody: (platform: string) => `Oui. Nous ne demandons jamais votre mot de passe et notre méthode de livraison respecte les conditions d’utilisation de ${platform}.`,
    faqDelay: (name: string) => `En combien de temps ma commande « ${name} » est-elle livrée ?`,
    faqDelayBody: "La livraison démarre généralement en moins de 5 minutes et se poursuit de façon progressive jusqu’à la quantité commandée.",
    ctaHeading: (service: string, platform: string) => `Prêt à commander ${service} ${platform} ?`,
    ctaButton: "Commencer maintenant",
    similarServices: (platform: string) => `Services similaires sur ${platform}`,
    backToAll: (platform: string) => `← Voir tous les services ${platform}`,
  },
  en: {
    home: "Home",
    platforms: "Platforms",
    reviews: (n: number) => `(${n} reviews)`,
    howItWorks: "How it works",
    steps: [
      { icon: Search, title: "Choose your quantity", body: (metric: string) => `Pick the volume of ${metric} that fits your goals.` },
      { icon: UserCheck, title: "Enter your username", body: () => "No password. Just your username or your post URL." },
      { icon: Rocket, title: "Receive your order", body: () => "Delivery starts within minutes and continues gradually." },
    ],
    whyChoose: (service: string, platform: string) => `Why choose BoostInflu for ${service.toLowerCase()} ${platform}`,
    features: [
      { icon: Zap, title: "Instant delivery", body: "Most services say “instant” but take hours to even start. Ours begins within minutes." },
      { icon: Users2, title: "100% real accounts", body: "Every interaction comes from an active account. No bots, no ghost profiles that vanish after a week." },
      { icon: ShieldCheck, title: "Your account's safety", body: "We never ask for your password. Our methods comply with every platform's terms of service." },
      { icon: TrendingUp, title: "A snowball effect", body: "A profile that's already followed inspires trust — people follow accounts that already look popular." },
      { icon: Headphones, title: "24/7 support", body: "A real team answers your questions around the clock, not a chatbot running in circles." },
    ],
    statCard: (n: string) => `${n}+ orders delivered`,
    statCardBody: (platform: string) => `On ${platform} alone — our experience guarantees reliable delivery.`,
    forWhom: (platform: string) => `Who is this ${platform} service for`,
    personas: [
      { icon: Users2, color: "border-t-teal", title: "Content creators" },
      { icon: Briefcase, color: "border-t-violet", title: "Small businesses" },
      { icon: Star, color: "border-t-rose", title: "Rising influencers" },
      { icon: Palette, color: "border-t-green", title: "Artists & creators" },
    ],
    personaBody: (i: number, metric: string, platform: string) =>
      [
        `You post great content but struggle to get seen. More ${metric} helps ${platform}'s algorithm push your posts to more people.`,
        "Customers trust brands that already look successful. An active, followed profile reassures them from their very first visit.",
        "Brands check your numbers before reaching out. Crossing that first threshold opens the door to partnerships.",
        "Your work deserves to be seen. More audience means more shares and more chances to get discovered.",
      ][i],
    comparisonTitle: "BoostInflu vs other services",
    comparisonUs: "BoostInflu",
    comparisonThem: "Others",
    comparison: [
      { icon: Zap, label: "Instant delivery" },
      { icon: Users2, label: "100% real accounts" },
      { icon: Lock, label: "No password required" },
      { icon: RefreshCcw, label: "30-day refill guarantee" },
      { icon: Headphones, label: "24/7 support" },
    ],
    promiseTitle: "Our promise",
    promiseSubtitle: "Clear guarantees, no fine print.",
    promises: [
      { icon: ShieldCheck, title: "Money-back guarantee", body: "Not satisfied? Full refund, no questions asked." },
      { icon: RefreshCcw, title: "Refill guarantee", body: "A drop within 30 days? We'll refill it for free." },
      { icon: Headphones, title: "24/7 support", body: "Our team is available around the clock to help you." },
    ],
    trustedBy: "Trusted by over 50,000 happy customers",
    faqTitle: "Frequently asked questions",
    faqSafety: (title: string, platform: string) => `Is the "${title}" service safe for my ${platform} account?`,
    faqSafetyBody: (platform: string) => `Yes. We never ask for your password and our delivery method complies with ${platform}'s terms of service.`,
    faqDelay: (name: string) => `How long does my "${name}" order take to deliver?`,
    faqDelayBody: "Delivery usually starts in under 5 minutes and continues gradually until the ordered quantity is reached.",
    ctaHeading: (service: string, platform: string) => `Ready to order ${service.toLowerCase()} ${platform}?`,
    ctaButton: "Start now",
    similarServices: (platform: string) => `Similar services on ${platform}`,
    backToAll: (platform: string) => `← View all ${platform} services`,
  },
};

export default async function ServicePage(props: PageProps<"/[locale]/plateformes/[slug]/[service]">) {
  const { locale: rawLocale, slug, service: serviceSlug } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const found = getService(slug, serviceSlug);
  if (!found) notFound();
  if ((locale === "fr" ? found.service.slug : found.service.slugEn) !== serviceSlug) notFound();
  const { platform, service } = found;
  const t = T[locale];
  const fr = locale === "fr";

  const platformName = fr ? platform.name : platform.nameEn;
  const serviceName = fr ? service.name : service.nameEn;
  const serviceTitle = fr ? service.title : service.titleEn;
  const serviceDetail = fr ? service.detail : service.detailEn;
  const unit = fr ? service.unit : service.unitEn;

  const siblings = platform.services.filter((s) => s.slug !== service.slug);
  const totalSold = platform.services.reduce((sum, s) => sum + parseSoldNumber(s.sold), 0);
  const soldNumber = parseSoldNumber(service.sold);
  const reviews = Math.max(18, Math.round(soldNumber / 650));
  const rating = ["4.7", "4.8", "4.9", "4.8"][soldNumber % 4];
  const canBuildQuantity = Boolean(service.baseQty && service.unit && service.unitEn);

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t.home, href: routeHref(locale, "home") },
          { label: t.platforms, href: routeHref(locale, "platforms") },
          { label: platformName, href: platformHref(locale, platform.slug) },
          { label: serviceTitle },
        ]}
      />

      {/* Hero */}
      <div className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-surface shadow-sm">
              <PlatformLogo name={platform.logoName} size={48} />
            </span>
            <p className="text-sm font-semibold text-violet">{platformName}</p>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-text sm:text-4xl">{serviceTitle}</h1>

          <p className="mt-4 max-w-xl text-text-muted">
            {serviceDetail} {fr ? "sur" : "on"} {platformName}.{" "}
            {fr
              ? `Un service parmi les plus demandés de BoostInflu, déjà ${service.sold} auprès de créateurs et de marques qui font confiance à notre réseau de comptes réels et actifs.`
              : `One of BoostInflu's most requested services, already ${service.sold} ordered by creators and brands who trust our network of real, active accounts.`}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-1.5 text-text">
              <Star size={16} className="text-orange" fill="currentColor" strokeWidth={0} />
              <span className="font-semibold">{rating}</span>
              <span className="text-text-muted">{t.reviews(reviews)}</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-green/10 px-3 py-1 text-xs font-semibold text-green">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              {soldLabel(service.sold, locale)}
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
            <QuantityBuilder
              locale={locale}
              basePriceEUR={service.priceEUR}
              baseQty={service.baseQty!}
              unit={unit!}
              logoName={platform.logoName}
              serviceName={serviceName}
              platformName={platformName}
              idPrefix={`${platform.slug}:${service.slug}`}
            />
          ) : (
            <div className="rounded-2xl border-2 border-violet/30 bg-surface-soft p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-bold text-text">{serviceName}</p>
                  <p className="text-sm text-text-muted">{serviceDetail}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold gradient-brand-text">
                    <Price amountEUR={service.priceEUR} />
                  </p>
                  <p className="text-xs text-text-muted">{soldLabel(service.sold, locale)}</p>
                </div>
              </div>
              <AddToCartButton
                locale={locale}
                logoName={platform.logoName}
                name={`${serviceName} ${platformName}`}
                detail={serviceDetail}
                priceEUR={service.priceEUR}
                idPrefix={`${platform.slug}:${service.slug}`}
              />
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">{t.howItWorks}</h2>
          <div className="relative mt-8 grid gap-6 sm:grid-cols-3">
            {t.steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <step.icon size={20} className="mt-4 text-violet" />
                <p className="mt-3 font-semibold text-text">{step.title}</p>
                <p className="mt-1 text-sm text-text-muted">{step.body(serviceName.toLowerCase())}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">{t.whyChoose(serviceName, platformName)}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-surface-soft p-5">
                <f.icon size={20} className="text-violet" />
                <p className="mt-3 font-semibold text-text">{f.title}</p>
                <p className="mt-1 text-sm text-text-muted">{f.body}</p>
              </div>
            ))}
            <div className="rounded-2xl border-2 border-orange/40 bg-orange/5 p-5">
              <Clock size={20} className="text-orange" />
              <p className="mt-3 font-semibold text-orange">{t.statCard(totalSold.toLocaleString(fr ? "fr-FR" : "en-US"))}</p>
              <p className="mt-1 text-sm text-text-muted">{t.statCardBody(platformName)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">{t.forWhom(platformName)}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.personas.map((p, i) => (
              <div key={p.title} className={`rounded-2xl border border-border border-t-4 ${p.color} bg-surface p-5`}>
                <p.icon size={20} className="text-text" />
                <p className="mt-3 font-semibold text-text">{p.title}</p>
                <p className="mt-2 text-sm text-text-muted">
                  {t.personaBody(i, serviceName.toLowerCase(), platformName)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-xl font-bold text-text">{t.comparisonTitle}</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-[1fr_auto_auto] items-center border-b border-border bg-surface-soft px-5 py-4">
              <span />
              <span className="flex w-24 items-center justify-center gap-1.5 font-bold text-text">
                <span className="grid h-6 w-6 place-items-center rounded-full gradient-brand text-[10px] font-bold text-white">
                  B
                </span>
                {t.comparisonUs}
              </span>
              <span className="w-24 text-center text-text-muted">{t.comparisonThem}</span>
            </div>
            {t.comparison.map((row) => (
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
          <h2 className="text-2xl font-extrabold text-on-navy">{t.promiseTitle}</h2>
          <p className="mt-2 text-sm text-on-navy-muted">{t.promiseSubtitle}</p>
          <div className="mt-8 grid gap-5 text-left sm:grid-cols-3">
            {t.promises.map((g) => (
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
            {t.trustedBy}
          </span>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-lg font-bold text-text">{t.faqTitle}</h2>
          <div className="mt-4 space-y-5">
            <div>
              <p className="font-semibold text-text">{t.faqSafety(serviceTitle, platformName)}</p>
              <p className="mt-1 text-sm text-text-muted">{t.faqSafetyBody(platformName)}</p>
            </div>
            <div>
              <p className="font-semibold text-text">{t.faqDelay(serviceName)}</p>
              <p className="mt-1 text-sm text-text-muted">{t.faqDelayBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-brand">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold text-white">{t.ctaHeading(serviceName, platformName)}</h2>
          <Link
            href={routeHref(locale, "cart")}
            className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-violet shadow-sm"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          {siblings.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-text">{t.similarServices(platformName)}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siblings.slice(0, 4).map((s) => (
                  <Link
                    key={s.slug}
                    href={serviceHref(locale, platform.slug, s.slug, s.slugEn)}
                    className="rounded-2xl border border-border bg-surface-soft p-4 transition-colors hover:border-violet/40"
                  >
                    <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-surface">
                      <PlatformLogo name={platform.logoName} size={40} />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-text">{fr ? s.name : s.nameEn}</p>
                    <p className="mt-1 text-lg font-extrabold gradient-brand-text">
                      <Price amountEUR={s.priceEUR} />
                    </p>
                    <p className="text-xs text-text-muted">{soldLabel(s.sold, locale)}</p>
                  </Link>
                ))}
              </div>
            </>
          )}

          <p className="mt-8 text-sm">
            <Link href={platformHref(locale, platform.slug)} className="font-medium text-violet">
              {t.backToAll(platformName)}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
