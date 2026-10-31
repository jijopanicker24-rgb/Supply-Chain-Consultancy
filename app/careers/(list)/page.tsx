import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusMessage from "@/components/shared/StatusMessage";
import { careersSection, pages, site } from "@/lib/content";
import { formatDate, getOpenJobs } from "@/lib/queries";

const page = pages.careers;

export const metadata: Metadata = { title: page.title, description: page.intro };
export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await getOpenJobs();

  return (
    <>
      <PageHeader {...page} />

      <section className="bg-navy-50 px-4 py-24 dark:bg-navy-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading eyebrow={careersSection.eyebrow} title={careersSection.title} intro={careersSection.intro} />
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {careersSection.perks.map((perk, i) => (
              <FadeIn key={perk.title} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                  <h3 className="text-lg font-bold">{perk.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{perk.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <SectionHeading eyebrow="Open positions" title="Find your next role" />
          </FadeIn>
          {jobs === null ? (
            <StatusMessage variant="unavailable" />
          ) : jobs.length === 0 ? (
            <StatusMessage
              variant="empty"
              title="No open positions right now"
              text="No open positions right now. Check back soon!"
              action={{ label: "Send us your CV", href: `mailto:${site.office.email}?subject=Speculative%20application` }}
            />
          ) : (
            <ul className="space-y-5">
              {jobs.map((job, i) => (
                <li key={job.slug}>
                  <FadeIn delay={i * 0.05}>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center dark:bg-navy-900 dark:ring-navy-800"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">{job.department}</p>
                        <h3 className="mt-1 text-xl font-bold">{job.title}</h3>
                        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                          <li className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" aria-hidden />
                            {job.location}
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" aria-hidden />
                            {job.employment_type}
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" aria-hidden />
                            Posted {formatDate(job.posted_at)}
                          </li>
                        </ul>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-emerald-600">
                        View &amp; apply
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
