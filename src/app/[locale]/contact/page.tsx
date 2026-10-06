import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await props.params;
  const fr = locale === "fr";
  return {
    title: fr ? "Contact | BoostInflu" : "Contact | BoostInflu",
    description: fr ? "Contactez l’équipe BoostInflu pour toute question." : "Contact the BoostInflu team with any question.",
  };
}

const T = {
  fr: {
    title: "Nous contacter",
    subtitle: "Une question avant ou après votre commande ? Notre équipe vous répond rapidement.",
    email: "Email",
    support: "Support",
    supportBody: "Réponse sous 24h ouvrées",
    availability: "Disponibilité",
    availabilityBody: "Support 24/7 pour les commandes en cours",
  },
  en: {
    title: "Contact us",
    subtitle: "A question before or after your order? Our team replies quickly.",
    email: "Email",
    support: "Support",
    supportBody: "Response within 24 business hours",
    availability: "Availability",
    availabilityBody: "24/7 support for orders in progress",
  },
};

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm locale={locale} />

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-violet" />
              <div>
                <p className="font-semibold text-text">{t.email}</p>
                <p className="text-sm text-text-muted">contact@boostinflu.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 shrink-0 text-teal" />
              <div>
                <p className="font-semibold text-text">{t.support}</p>
                <p className="text-sm text-text-muted">{t.supportBody}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-green" />
              <div>
                <p className="font-semibold text-text">{t.availability}</p>
                <p className="text-sm text-text-muted">{t.availabilityBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
