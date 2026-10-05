import type { Metadata } from "next";
import { Target, Users, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/a-propos">): Promise<Metadata> {
  const { locale } = await props.params;
  const fr = locale === "fr";
  return {
    title: fr ? "À propos | BoostInflu" : "About | BoostInflu",
    description: fr
      ? "L’histoire et la mission de BoostInflu, votre partenaire de croissance sociale."
      : "The story and mission of BoostInflu, your social growth partner.",
  };
}

const VALUES = {
  fr: [
    { icon: Target, title: "Notre mission", body: "Donner à chaque créateur et chaque marque les moyens de construire une audience réelle, rapidement et sans friction." },
    { icon: Users, title: "Des comptes réels", body: "Nous ne travaillons qu’avec des comptes actifs et authentiques — jamais de robots ni de fermes à clics." },
    { icon: ShieldCheck, title: "Votre sécurité d’abord", body: "Aucune méthode que nous utilisons ne demande votre mot de passe ni ne met votre compte en danger." },
  ],
  en: [
    { icon: Target, title: "Our mission", body: "Give every creator and brand the means to build a real audience, quickly and without friction." },
    { icon: Users, title: "Real accounts", body: "We only work with active, authentic accounts — never bots or click farms." },
    { icon: ShieldCheck, title: "Your safety first", body: "None of our methods ever ask for your password or put your account at risk." },
  ],
};

const T = {
  fr: {
    title: "À propos de BoostInflu",
    subtitle: "Nous aidons les créateurs et les marques à développer une audience réelle depuis 2023.",
    p1: "BoostInflu est né d’un constat simple : développer une audience sur les réseaux sociaux prend du temps, et les outils existants sont souvent chers, lents ou peu fiables. Nous avons construit une plateforme qui connecte les créateurs à un réseau de comptes réels et actifs, avec une livraison instantanée et un suivi transparent.",
    p2: "Aujourd’hui, des milliers de créateurs, d’entreprises et d’agences utilisent BoostInflu pour accélérer leur croissance sur Instagram, TikTok, YouTube et sept autres plateformes.",
  },
  en: {
    title: "About BoostInflu",
    subtitle: "We've helped creators and brands grow a real audience since 2023.",
    p1: "BoostInflu was born from a simple observation: growing an audience on social media takes time, and existing tools are often expensive, slow or unreliable. We built a platform that connects creators to a network of real, active accounts, with instant delivery and transparent tracking.",
    p2: "Today, thousands of creators, businesses and agencies use BoostInflu to accelerate their growth on Instagram, TikTok, YouTube and seven other platforms.",
  },
};

export default async function AboutPage(props: PageProps<"/[locale]/a-propos">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];
  const values = VALUES[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <p className="text-text-muted leading-relaxed">{t.p1}</p>
          <p className="mt-4 text-text-muted leading-relaxed">{t.p2}</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-surface-soft p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet text-white">
                  <v.icon size={20} />
                </span>
                <h2 className="mt-4 font-bold text-text">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
