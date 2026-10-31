import Link from "next/link";
import { DatabaseZap, Inbox } from "lucide-react";
import { site } from "@/lib/content";

// Friendly message for an empty list, or when the database can't be reached.
export default function StatusMessage({
  variant,
  title,
  text,
  action,
}: {
  variant: "empty" | "unavailable";
  title?: string;
  text?: string;
  action?: { label: string; href: string };
}) {
  const Icon = variant === "empty" ? Inbox : DatabaseZap;
  const heading = title ?? (variant === "empty" ? "Nothing here yet" : "We couldn't load this content");
  const body =
    text ??
    (variant === "empty"
      ? "Please check back soon."
      : "Our content is temporarily unavailable. Please refresh the page in a moment, or get in touch and we'll help directly.");
  const button = action ?? (variant === "unavailable" ? { label: "Contact us", href: "/contact" } : undefined);

  return (
    <div
      role={variant === "unavailable" ? "alert" : undefined}
      className="mx-auto max-w-xl rounded-2xl bg-white px-6 py-14 text-center shadow-sm ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800"
    >
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <h2 className="text-2xl font-extrabold">{heading}</h2>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{body}</p>
      {button && (
        <Link
          href={button.href}
          className="mt-6 inline-block rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          {button.label}
        </Link>
      )}
      {variant === "unavailable" && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Or call{" "}
          <a href={`tel:${site.office.phone.replace(/\s/g, "")}`} className="font-medium text-emerald-600 dark:text-emerald-400">
            {site.office.phone}
          </a>
        </p>
      )}
    </div>
  );
}
