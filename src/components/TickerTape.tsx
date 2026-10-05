const EVENTS = [
  "5 200 vues livrées · TikTok · il y a 3 min",
  "1 100 j’aime livrés · Instagram · il y a 1 min",
  "480 abonnés livrés · YouTube · il y a 6 min",
  "9 800 vues livrées · TikTok · il y a 2 min",
  "260 abonnés livrés · Facebook · il y a 4 min",
  "1 450 j’aime livrés · Instagram · il y a 5 min",
];

function Events() {
  return (
    <>
      {EVENTS.map((e, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap px-4">
          <span className="h-1 w-1 rounded-full bg-teal" />
          <span>{e}</span>
        </span>
      ))}
    </>
  );
}

export default function TickerTape() {
  return (
    <div className="flex items-center gap-4 overflow-hidden bg-navy py-2 text-xs text-on-navy-muted">
      <span className="flex shrink-0 items-center gap-1.5 border-r border-navy-line pl-4 pr-4 font-semibold text-green">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute h-full w-full rounded-full bg-green animate-pulse-dot" />
        </span>
        EN DIRECT
      </span>
      <div className="flex w-max animate-marquee">
        <Events />
        <Events />
      </div>
    </div>
  );
}
