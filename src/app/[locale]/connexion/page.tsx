import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LoginTabs from "./LoginTabs";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/connexion">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Connexion | BoostInflu" : "Login | BoostInflu" };
}

const T = {
  fr: {
    title: "Mon compte",
    subtitle: "Connectez-vous pour suivre vos commandes et votre solde.",
    confirmationFailed: "Ce lien de confirmation est invalide ou a expiré. Merci de réessayer.",
  },
  en: {
    title: "My account",
    subtitle: "Log in to track your orders and balance.",
    confirmationFailed: "This confirmation link is invalid or has expired. Please try again.",
  },
};

export default async function LoginPage(props: PageProps<"/[locale]/connexion">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const { error } = await props.searchParams;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="px-5 py-16 sm:px-8">
          {error === "confirmation_failed" && (
            <p className="mx-auto mb-6 max-w-sm rounded-xl border border-rose/30 bg-rose/10 p-4 text-center text-sm font-medium text-rose">
              {t.confirmationFailed}
            </p>
          )}
          <LoginTabs locale={locale} />
        </div>
      </section>
    </>
  );
}
