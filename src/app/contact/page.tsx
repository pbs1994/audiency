import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | BoostInflu",
  description: "Contactez l’équipe BoostInflu pour toute question.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Nous contacter"
        subtitle="Une question avant ou après votre commande ? Notre équipe vous répond rapidement."
      />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-violet" />
              <div>
                <p className="font-semibold text-text">Email</p>
                <p className="text-sm text-text-muted">contact@boostinflu.fr</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 shrink-0 text-teal" />
              <div>
                <p className="font-semibold text-text">Support</p>
                <p className="text-sm text-text-muted">Réponse sous 24h ouvrées</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-green" />
              <div>
                <p className="font-semibold text-text">Disponibilité</p>
                <p className="text-sm text-text-muted">Support 24/7 pour les commandes en cours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
