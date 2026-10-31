import Link from "next/link";

// Filter links ("All" + one per option) that set a ?param= in the URL, so filtering works without JavaScript.
export default function FilterChips({
  basePath,
  param,
  options,
  active,
  label,
}: {
  basePath: string;
  param: string;
  options: { value: string; label: string }[];
  active?: string;
  label: string;
}) {
  const chip = (href: string, text: string, isActive: boolean) => (
    <Link
      key={href}
      href={href}
      scroll={false}
      aria-current={isActive ? "true" : undefined}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        isActive
          ? "bg-emerald-500 text-white"
          : "bg-white text-navy-800 ring-1 ring-slate-200 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-navy-900 dark:text-slate-200 dark:ring-navy-800 dark:hover:bg-navy-800"
      }`}
    >
      {text}
    </Link>
  );

  return (
    <nav aria-label={label} className="mb-12 flex flex-wrap justify-center gap-3">
      {chip(basePath, "All", !active)}
      {options.map((o) => chip(`${basePath}?${param}=${encodeURIComponent(o.value)}`, o.label, active === o.value))}
    </nav>
  );
}
