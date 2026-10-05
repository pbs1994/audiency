import type { LucideIcon } from "lucide-react";

export default function SectionBadge({
  icon: Icon,
  children,
  tone = "violet",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  tone?: "violet" | "green" | "orange" | "rose";
}) {
  const tones: Record<string, string> = {
    violet: "bg-violet/10 text-violet",
    green: "bg-green/10 text-green",
    orange: "bg-orange/10 text-orange",
    rose: "bg-rose/10 text-rose",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${tones[tone]}`}
    >
      <Icon size={14} />
      {children}
    </span>
  );
}
