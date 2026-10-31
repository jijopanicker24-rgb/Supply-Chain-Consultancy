import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTABanner from "@/components/shared/CTABanner";
import DynamicIcon from "@/components/shared/DynamicIcon";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import StatusMessage from "@/components/shared/StatusMessage";
import { pages } from "@/lib/content";
import { getServices } from "@/lib/queries";

const page = pages.services;

export const metadata: Metadata = { title: page.title, description: page.intro };
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader {...page} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {services === null ? (
            <StatusMessage variant="unavailable" />
          ) : services.length === 0 ? (
            <StatusMessage variant="empty" title="Services coming soon" text="We're updating our service list. Please check back soon." />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <FadeIn key={s.slug} delay={(i % 3) * 0.1} className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl dark:bg-navy-900 dark:ring-navy-800"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <DynamicIcon name={s.icon} className="h-7 w-7" />
                    </span>
                    <h2 className="mt-6 text-xl font-bold">{s.title}</h2>
                    <p className="mt-2 flex-1 text-slate-600 dark:text-slate-300">{s.short_description}</p>
                    <span className="mt-6 inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
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
