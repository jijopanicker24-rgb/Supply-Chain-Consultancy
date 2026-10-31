import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Dot } from "lucide-react";
import CTABanner from "@/components/shared/CTABanner";
import DynamicIcon from "@/components/shared/DynamicIcon";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { getIndustries } from "@/lib/queries";

const page = pages.industries;

export const metadata: Metadata = { title: page.title, description: page.intro };
export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <PageHeader {...page} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {industries === null ? (
            <StatusMessage variant="unavailable" />
          ) : industries.length === 0 ? (
            <StatusMessage variant="empty" title="Industries coming soon" text="We're updating this page. Please check back soon." />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind, i) => (
                <FadeIn key={ind.slug} delay={(i % 3) * 0.1} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <DynamicIcon name={ind.icon} className="h-7 w-7" />
                    </span>
                    <h2 className="mt-6 text-xl font-bold">{ind.name}</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">{ind.description}</p>
                    {ind.key_challenges.length > 0 && (
                      <>
                        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Key challenges</h3>
                        <ul className="mt-2 flex-1 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                          {ind.key_challenges.map((c) => (
                            <li key={c} className="flex">
                              <Dot className="-ml-2 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {ind.case_study_count > 0 ? (
                      <Link
                        href={`/case-studies?industry=${ind.slug}`}
                        className="mt-6 inline-flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        View {ind.case_study_count} case {ind.case_study_count === 1 ? "study" : "studies"}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    ) : (
                      <Link href="/book" className="mt-6 inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        Talk to a specialist
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
