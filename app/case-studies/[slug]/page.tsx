import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Lightbulb, Target, TrendingUp } from "lucide-react";
import CTABanner from "@/components/shared/CTABanner";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { getCaseStudy } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getCaseStudy((await params).slug);
  if (!study) return { title: pages.caseStudies.title };
  return {
    title: study.title,
    description: `${study.client_name}: ${study.results}`,
    openGraph: study.cover_image_url ? { images: [study.cover_image_url] } : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = await getCaseStudy((await params).slug);
  if (study === undefined) notFound();

  if (study === null) {
    return (
      <>
        <PageHeader {...pages.caseStudies} />
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <StatusMessage variant="unavailable" />
        </section>
      </>
    );
  }

  const sections = [
    { icon: Target, title: "The challenge", text: study.challenge },
    { icon: Lightbulb, title: "Our approach", text: study.solution },
    { icon: CheckCircle2, title: "The results", text: study.results },
  ];

  return (
    <>
      <PageHeader
        title={study.title}
        intro={study.client_name}
        image={study.cover_image_url ?? pages.caseStudies.image}
        imageAlt={`Cover image for ${study.title}`}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All case studies
          </Link>

          {study.metric_value && (
            <FadeIn className="mt-8">
              <div className="flex flex-col items-start gap-4 rounded-2xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center sm:gap-6 dark:ring-1 dark:ring-navy-800">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
                  <TrendingUp className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <p className="font-heading text-4xl font-extrabold text-emerald-400">{study.metric_value}</p>
                  <p className="mt-1 text-navy-100">{study.metric_label}</p>
                </div>
                {study.industry_name && (
                  <Link
                    href={`/case-studies?industry=${study.industry_slug}`}
                    className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-600 sm:ml-auto"
                  >
                    {study.industry_name}
                  </Link>
                )}
              </div>
            </FadeIn>
          )}

          <div className="mt-12 space-y-12">
            {sections.map(({ icon: Icon, title, text }) => (
              <FadeIn key={title}>
                <h2 className="flex items-center gap-3 text-2xl font-extrabold">
                  <Icon className="h-6 w-6 text-emerald-500" aria-hidden />
                  {title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
