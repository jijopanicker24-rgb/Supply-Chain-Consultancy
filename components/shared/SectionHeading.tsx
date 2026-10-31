export default function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{eyebrow}</p>
      <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{intro}</p>}
    </div>
  );
}
