import type { Locale } from "@/lib/i18n";

const EVENTS_FR = [
  "5 200 vues livrées · TikTok · il y a 3 min",
  "1 100 j’aime livrés · Instagram · il y a 1 min",
  "480 abonnés livrés · YouTube · il y a 6 min",
  "9 800 vues livrées · TikTok · il y a 2 min",
  "260 abonnés livrés · Facebook · il y a 4 min",
  "1 450 j’aime livrés · Instagram · il y a 5 min",
];

const EVENTS_EN = [
  "5,200 views delivered · TikTok · 3 min ago",
  "1,100 likes delivered · Instagram · 1 min ago",
  "480 subscribers delivered · YouTube · 6 min ago",
  "9,800 views delivered · TikTok · 2 min ago",
  "260 followers delivered · Facebook · 4 min ago",
  "1,450 likes delivered · Instagram · 5 min ago",
];

function Events({ locale }: { locale: Locale }) {
  const events = locale === "fr" ? EVENTS_FR : EVENTS_EN;
  return (
    <>
      {events.map((e, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap px-4">
          <span className="h-1 w-1 rounded-full bg-teal" />
          <span>{e}</span>
        </span>
      ))}
    </>
  );
}

export default function TickerTape({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-4 overflow-hidden bg-navy py-2 text-xs text-on-navy-muted">
      <span className="flex shrink-0 items-center gap-1.5 border-r border-navy-line pl-4 pr-4 font-semibold text-green">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute h-full w-full rounded-full bg-green animate-pulse-dot" />
        </span>
        {locale === "fr" ? "EN DIRECT" : "LIVE"}
      </span>
      <div className="flex w-max animate-marquee">
        <Events locale={locale} />
        <Events locale={locale} />
      </div>
    </div>
  );
}
