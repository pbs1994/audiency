import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ResetPasswordForm from "./ResetPasswordForm";
import { createClient } from "@/lib/supabase/server";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[locale]/reinitialiser-mot-de-passe">
): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: locale === "fr" ? "Nouveau mot de passe | BoostInflu" : "New password | BoostInflu",
  };
}

const T = {
  fr: { title: "Nouveau mot de passe", subtitle: "Choisissez un nouveau mot de passe pour votre compte." },
  en: { title: "New password", subtitle: "Choose a new password for your account." },
};

export default async function ResetPasswordPage(
  props: PageProps<"/[locale]/reinitialiser-mot-de-passe">
) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect(routeHref(locale, "forgotPassword"));

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="px-5 py-16 sm:px-8">
          <ResetPasswordForm locale={locale} />
        </div>
      </section>
    </>
  );
}
