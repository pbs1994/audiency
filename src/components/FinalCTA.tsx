export default function FinalCTA() {
  return (
    <section className="gradient-brand">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Prêt à devenir viral ?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">
          Rejoignez des milliers de créateurs qui ont transformé leur présence
          sociale avec BoostInflu. Démarrez votre croissance aujourd’hui.
        </p>
        <a
          href="#tarifs"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-violet shadow-sm"
        >
          Démarrer maintenant
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
          <span className="flex items-center gap-1.5">✓ Démarrage immédiat</span>
          <span className="flex items-center gap-1.5">✓ Satisfait ou remboursé</span>
          <span className="flex items-center gap-1.5">✓ Aucun mot de passe requis</span>
        </div>
      </div>
    </section>
  );
}
