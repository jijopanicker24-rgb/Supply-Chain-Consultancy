import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, CheckCircle2, Clock, MapPin, Users } from "lucide-react";
import ApplyForm from "@/components/shared/ApplyForm";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { formatDate, getOpenJob } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getOpenJob((await params).slug);
  if (!job) return { title: pages.careers.title };
  return { title: `${job.title} (${job.location})`, description: job.description.slice(0, 155) };
}

export default async function JobPage({ params }: Props) {
  const job = await getOpenJob((await params).slug);
  if (job === undefined) notFound();

  if (job === null) {
    return (
      <>
        <PageHeader {...pages.careers} />
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <StatusMessage variant="unavailable" />
        </section>
      </>
    );
  }

  const facts = [
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Briefcase, label: "Type", value: job.employment_type },
    { icon: Users, label: "Department", value: job.department },
    { icon: Clock, label: "Posted", value: formatDate(job.posted_at) },
  ];

  return (
    <>
      <PageHeader title={job.title} intro={`${job.department} · ${job.location} · ${job.employment_type}`} image={pages.careers.image} imageAlt={pages.careers.imageAlt} />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All open positions
            </Link>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl bg-navy-50 p-4 dark:bg-navy-900">
                  <dt className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Icon className="h-4 w-4 text-emerald-500" aria-hidden />
                    {label}
                  </dt>
                  <dd className="mt-1 font-semibold text-navy-900 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-10 text-2xl font-extrabold">About the role</h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{job.description}</p>
            {job.requirements.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-extrabold">What we're looking for</h2>
                <ul className="mt-4 space-y-3">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-3">
            <ApplyForm jobSlug={job.slug} jobTitle={job.title} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
