import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/50" />
      <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">{hero.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-100 sm:text-xl">{hero.subheading}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={hero.primary.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              {hero.primary.label}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href={hero.secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {hero.secondary.label}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
