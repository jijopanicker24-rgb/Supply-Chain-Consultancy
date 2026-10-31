import { PencilRuler, RefreshCw, Rocket, Search } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";
import { processSection } from "@/lib/content";

const icons = { search: Search, pencil: PencilRuler, rocket: Rocket, refresh: RefreshCw };

export default function HowWeWork() {
  return (
    <section className="bg-navy-50 px-4 py-24 dark:bg-navy-900/50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading {...processSection} />
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSection.steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <FadeIn key={step.title} delay={i * 0.1} className="h-full">
                <div className="relative h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                  <span className="absolute right-6 top-6 font-heading text-4xl font-extrabold text-navy-100 dark:text-navy-700">
                    0{i + 1}
                  </span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <Icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
