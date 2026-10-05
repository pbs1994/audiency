import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LoginTabs from "./LoginTabs";

export const metadata: Metadata = {
  title: "Connexion | BoostInflu",
};

export default function LoginPage() {
  return (
    <>
      <PageHeader title="Mon compte" subtitle="Connectez-vous pour suivre vos commandes et votre solde." />
      <section className="bg-surface">
        <div className="px-5 py-16 sm:px-8">
          <LoginTabs />
        </div>
      </section>
    </>
  );
}
