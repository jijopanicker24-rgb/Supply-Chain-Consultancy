import type { Metadata } from "next";
import { AlertCircle, Mail, Phone } from "lucide-react";
import BookingForm, { type Option } from "@/components/shared/BookingForm";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import { bookingSection, pages, site } from "@/lib/content";
import { sql } from "@/lib/db";

const page = pages.book;

export const metadata: Metadata = { title: page.title, description: page.intro };

// Options come from the database on every request.
export const dynamic = "force-dynamic";

async function loadOptions(): Promise<{ industries: Option[]; services: Option[] } | null> {
  try {
    const [industries, services] = await Promise.all([
      sql<Option>`SELECT slug AS value, name AS label FROM industries ORDER BY display_order, name`,
      sql<Option>`SELECT slug AS value, title AS label FROM services WHERE is_active ORDER BY display_order, title`,
    ]);
    return { industries, services };
  } catch (error) {
    console.error("[book] could not load booking options:", error);
    return null;
  }
}

export default async function BookPage() {
  const { expect } = bookingSection;
  const options = await loadOptions();

  return (
    <>
      <PageHeader {...page} />
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading eyebrow={bookingSection.eyebrow} title={bookingSection.title} intro={bookingSection.intro} />
          </FadeIn>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <FadeIn className="lg:col-span-3">
              {options ? (
                <BookingForm {...options} />
              ) : (
                <div role="alert" className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                  <AlertCircle className="mx-auto h-10 w-10 text-emerald-500" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold">{bookingSection.unavailable.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{bookingSection.unavailable.text}</p>
                </div>
              )}
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-2">
              <div className="h-full rounded-2xl bg-navy-900 p-8 text-white dark:ring-1 dark:ring-navy-800">
                <h3 className="text-xl font-bold text-white">{expect.title}</h3>
                <ol className="mt-6 space-y-6">
                  {expect.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 font-heading font-bold">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold">{step.title}</p>
                        <p className="mt-1 text-sm text-navy-100">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 border-t border-navy-700 pt-6">
                  <p className="text-sm text-navy-100">Prefer to talk now?</p>
                  <ul className="mt-3 space-y-3">
                    <li className="flex items-center gap-3">
                      <Phone className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                      <a href={`tel:${site.office.phone.replace(/\s/g, "")}`} className="font-medium hover:text-emerald-400">
                        {site.office.phone}
                      </a>
                    </li>
                    <li className="flex min-w-0 items-center gap-3">
                      <Mail className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                      <a href={`mailto:${site.office.email}`} className="min-w-0 break-words font-medium hover:text-emerald-400">
                        {site.office.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
