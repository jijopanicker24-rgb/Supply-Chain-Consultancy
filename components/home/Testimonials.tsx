import Image from "next/image";
import { Building2, Quote } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";
import { clientsSection, testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="bg-navy-50 px-4 py-24 dark:bg-navy-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {clientsSection.eyebrow}
          </p>
          <ul className="mb-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {clientsSection.logos.map((logo) => (
              <li key={logo} className="flex items-center gap-2 text-lg font-bold text-slate-400 dark:text-slate-500">
                <Building2 className="h-6 w-6" aria-hidden />
                {logo}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn>
          <SectionHeading eyebrow="Testimonials" title={clientsSection.title} />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                <Quote className="h-8 w-8 text-emerald-500" aria-hidden />
                <blockquote className="mt-4 flex-1 text-slate-700 dark:text-slate-300">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading font-bold text-navy-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
