import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";
import { caseStudies, caseStudiesSection } from "@/lib/content";
import { getFeaturedCaseStudies } from "@/lib/queries";

export default async function CaseStudies() {
  // Featured case studies from the database; the static examples are a fallback if it can't be reached.
  const featured = await getFeaturedCaseStudies(3);

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading eyebrow={caseStudiesSection.eyebrow} title={caseStudiesSection.title} />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-3">
          {featured?.length
            ? featured.map((s, i) => (
                <FadeIn key={s.slug} delay={i * 0.1} className="h-full">
                  <CaseStudyCard study={s} />
                </FadeIn>
              ))
            : caseStudies.map((c, i) => (
                <FadeIn key={c.result} delay={i * 0.1} className="h-full">
                  <Link
                    href={c.href}
                    className="group block h-full overflow-hidden rounded-2xl bg-navy-900 shadow-md transition dark:ring-1 dark:ring-navy-800 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.imageAlt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        {c.industry}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-navy-100">{c.client}</p>
                      <h3 className="mt-2 flex gap-2 text-xl font-bold text-white">
                        <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                        {c.result}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={caseStudiesSection.href}
            className="inline-flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {caseStudiesSection.linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
