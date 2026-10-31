import type { Metadata } from "next";
import CTABanner from "@/components/shared/CTABanner";
import FadeIn from "@/components/shared/FadeIn";
import FilterChips from "@/components/shared/FilterChips";
import InsightCard from "@/components/shared/InsightCard";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { getInsights, INSIGHT_CATEGORIES } from "@/lib/queries";

const page = pages.insights;

export const metadata: Metadata = { title: page.title, description: page.intro };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ category?: string | string[] }> };

export default async function InsightsPage({ searchParams }: Props) {
  const raw = (await searchParams).category;
  const active = INSIGHT_CATEGORIES.find((c) => c === raw);
  const insights = await getInsights(active);

  return (
    <>
      <PageHeader {...page} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {insights === null ? (
            <StatusMessage variant="unavailable" />
          ) : (
            <>
              <FilterChips
                basePath="/insights"
                param="category"
                label="Filter articles by category"
                active={active}
                options={INSIGHT_CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
              {insights.length === 0 ? (
                <StatusMessage
                  variant="empty"
                  title="No articles yet"
                  text={active ? `We haven't published any ${active} articles yet. Check back soon!` : "New articles are on the way. Check back soon!"}
                  action={active ? { label: "View all articles", href: "/insights" } : undefined}
                />
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {insights.map((insight, i) => (
                    <FadeIn key={insight.slug} delay={(i % 3) * 0.1} className="h-full">
                      <InsightCard insight={insight} />
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
