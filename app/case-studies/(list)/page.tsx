import type { Metadata } from "next";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import CTABanner from "@/components/shared/CTABanner";
import FadeIn from "@/components/shared/FadeIn";
import FilterChips from "@/components/shared/FilterChips";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { getCaseStudies, getIndustries } from "@/lib/queries";

const page = pages.caseStudies;

export const metadata: Metadata = { title: page.title, description: page.intro };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ industry?: string | string[] }> };

export default async function CaseStudiesPage({ searchParams }: Props) {
  const raw = (await searchParams).industry;
  const industries = await getIndustries();
  // Ignore unknown filter values rather than showing an empty page.
  const active = typeof raw === "string" && industries?.some((i) => i.slug === raw) ? raw : undefined;
  const studies = industries === null ? null : await getCaseStudies(active);
  const activeName = industries?.find((i) => i.slug === active)?.name;

  return (
    <>
      <PageHeader {...page} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {studies === null ? (
            <StatusMessage variant="unavailable" />
          ) : (
            <>
              <FilterChips
                basePath="/case-studies"
                param="industry"
                label="Filter case studies by industry"
                active={active}
                options={(industries ?? []).filter((i) => i.case_study_count > 0).map((i) => ({ value: i.slug, label: i.name }))}
              />
              {studies.length === 0 ? (
                <StatusMessage
                  variant="empty"
                  title="No case studies yet"
                  text={activeName ? `We haven't published a ${activeName} case study yet. Check back soon!` : "Check back soon!"}
                  action={activeName ? { label: "View all case studies", href: "/case-studies" } : undefined}
                />
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {studies.map((s, i) => (
                    <FadeIn key={s.slug} delay={(i % 3) * 0.1} className="h-full">
                      <CaseStudyCard study={s} />
                    </FadeIn>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
