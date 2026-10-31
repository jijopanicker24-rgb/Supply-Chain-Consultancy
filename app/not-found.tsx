import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "@/lib/content";

export const metadata: Metadata = { title: notFound.title };

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24 text-center">
      <div className="max-w-lg">
        <p className="font-heading text-7xl font-extrabold text-emerald-500">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">{notFound.title}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{notFound.text}</p>
        <Link
          href={notFound.button.href}
          className="mt-8 inline-block rounded-full bg-navy-900 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-navy-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          {notFound.button.label}
        </Link>
      </div>
    </section>
  );
}
