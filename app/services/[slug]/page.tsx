import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import DynamicIcon from "@/components/shared/DynamicIcon";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages, site } from "@/lib/content";
import { getService, getServices } from "@/lib/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService((await params).slug);
  if (!service) return { title: pages.services.title };
  return { title: service.title, description: service.short_description };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (service === undefined) notFound();

  if (service === null) {
    return (
      <>
        <PageHeader {...pages.services} />
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <StatusMessage variant="unavailable" />
        </section>
      </>
    );
  }

  const others = ((await getServices()) ?? []).filter((s) => s.slug !== slug);

  return (
    <>
      <PageHeader title={service.title} intro={service.short_description} image={pages.services.image} imageAlt={pages.services.imageAlt} />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All services
            </Link>
            <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <DynamicIcon name={service.icon} className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-3xl font-extrabold">How we help</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{service.full_description}</p>

            {service.benefits.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl font-extrabold">What you can expect</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-3 rounded-xl bg-navy-50 p-4 dark:bg-navy-900">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                      <span className="text-navy-900 dark:text-slate-200">{b}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-12 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-8 text-white dark:ring-1 dark:ring-navy-700">
              <h2 className="text-2xl font-extrabold text-white">Discuss {service.title.toLowerCase()} with us</h2>
              <p className="mt-2 text-navy-100">Book a free 30-minute call with one of our consultants.</p>
              <Link
                href={site.cta.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                {site.cta.label}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </FadeIn>

          {others.length > 0 && (
            <FadeIn delay={0.1}>
              <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-28 dark:bg-navy-900 dark:ring-navy-800">
                <h2 className="text-lg font-bold">Other services</h2>
                <ul className="mt-4 divide-y divide-slate-100 dark:divide-navy-800">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-3 py-3 font-medium text-navy-800 hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400">
                        <DynamicIcon name={s.icon} className="h-5 w-5 shrink-0 text-emerald-500" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
