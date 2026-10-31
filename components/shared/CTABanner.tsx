import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { ctaBanner } from "@/lib/content";

export default function CTABanner() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 px-6 py-14 text-center shadow-xl sm:px-12 dark:ring-1 dark:ring-navy-700">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{ctaBanner.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-100">{ctaBanner.text}</p>
        <Link
          href={ctaBanner.button.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          {ctaBanner.button.label}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </FadeIn>
    </section>
  );
}
