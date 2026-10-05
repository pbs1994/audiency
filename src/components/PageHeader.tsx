export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-border bg-surface-soft">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <h1 className="text-3xl font-extrabold text-text sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}
