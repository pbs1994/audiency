import PageHeader from "@/components/PageHeader";

export type LegalSection = { title: string; body: string };

/** Shared layout for the legal pages: header + numbered text sections. */
export default function LegalDocument({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 sm:px-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-bold text-text">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
