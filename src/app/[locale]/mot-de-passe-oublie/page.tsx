import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[locale]/mot-de-passe-oublie">
): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: locale === "fr" ? "Mot de passe oublié | BoostInflu" : "Forgot password | BoostInflu",
  };
}

const T = {
  fr: {
    title: "Mot de passe oublié",
    subtitle: "Entrez votre email pour recevoir un lien de réinitialisation.",
  },
  en: {
    title: "Forgot password",
    subtitle: "Enter your email to receive a reset link.",
  },
};

export default async function ForgotPasswordPage(
  props: PageProps<"/[locale]/mot-de-passe-oublie">
) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="px-5 py-16 sm:px-8">
          <ForgotPasswordForm locale={locale} />
        </div>
      </section>
    </>
  );
}
