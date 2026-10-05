import type { Locale } from "@/lib/i18n";

export default function TopBar({ locale }: { locale: Locale }) {
  return (
    <div className="bg-gradient-to-r from-teal to-green px-4 py-2 text-center text-sm font-medium text-white">
      {locale === "fr"
        ? "🎁 15% de cashback sur chaque commande — crédité automatiquement sur votre solde BoostInflu"
        : "🎁 15% cashback on every order — automatically credited to your BoostInflu balance"}
    </div>
  );
}
