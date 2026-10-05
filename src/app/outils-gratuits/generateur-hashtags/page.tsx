import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HashtagGenerator from "./HashtagGenerator";

export const metadata: Metadata = {
  title: "Générateur de hashtags | BoostInflu",
  description: "Générez des suggestions de hashtags à partir d’un mot-clé.",
};

export default function HashtagGeneratorPage() {
  return (
    <>
      <PageHeader
        title="Générateur de hashtags"
        subtitle="Entrez un mot-clé pour obtenir des suggestions de hashtags à utiliser."
      />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <HashtagGenerator />
        </div>
      </section>
    </>
  );
}
