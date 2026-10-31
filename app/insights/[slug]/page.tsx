import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import CTABanner from "@/components/shared/CTABanner";
import FadeIn from "@/components/shared/FadeIn";
import InsightCard from "@/components/shared/InsightCard";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { formatDate, getInsight, getRelatedInsights } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = await getInsight((await params).slug);
  if (!insight) return { title: pages.insights.title };
  return {
    title: insight.title,
    description: insight.excerpt,
    authors: [{ name: insight.author_name }],
    openGraph: {
      type: "article",
      publishedTime: new Date(insight.published_at).toISOString(),
      images: insight.cover_image_url ? [insight.cover_image_url] : undefined,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (insight === undefined) notFound();

  if (insight === null) {
    return (
      <>
        <PageHeader {...pages.insights} />
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <StatusMessage variant="unavailable" />
        </section>
      </>
    );
  }

  const related = (await getRelatedInsights(slug, insight.category)) ?? [];
  // Paragraphs are separated by blank lines in the database.
  const paragraphs = insight.content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <article>
        <header className="bg-navy-950 px-4 pb-16 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All insights
            </Link>
            <Link
              href={`/insights?category=${encodeURIComponent(insight.category)}`}
              className="mt-6 block w-fit rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-600"
            >
              {insight.category}
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl">{insight.title}</h1>
            <p className="mt-4 text-lg text-navy-100">{insight.excerpt}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-100">
              <li className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-400" aria-hidden />
                {insight.author_name}
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" aria-hidden />
                <time dateTime={new Date(insight.published_at).toISOString()}>{formatDate(insight.published_at)}</time>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" aria-hidden />
                {insight.read_minutes} min read
              </li>
            </ul>
          </div>
        </header>

        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {insight.cover_image_url && (
              <div className="relative -mt-4 mb-12 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={insight.cover_image_url}
                  alt={`Illustration for ${insight.title}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-navy-50 px-4 py-20 dark:bg-navy-900/50 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-3xl font-extrabold">Keep reading</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((r, i) => (
                <FadeIn key={r.slug} delay={i * 0.1} className="h-full">
                  <InsightCard insight={r} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
      <CTABanner />
    </>
  );
}
