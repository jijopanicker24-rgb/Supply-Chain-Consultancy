import type { Metadata } from "next";
import Image from "next/image";
import { Eye, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";
import StatsBar from "@/components/home/StatsBar";
import CTABanner from "@/components/shared/CTABanner";
import FadeIn from "@/components/shared/FadeIn";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import { aboutPage, pages } from "@/lib/content";

const page = pages.about;

export const metadata: Metadata = { title: page.title, description: page.intro };

const valueIcons = { target: Target, users: Users, shield: ShieldCheck, lightbulb: Lightbulb };

const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => /^[A-Z]/.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export default function AboutPage() {
  const { story, mission, vision, values, team } = aboutPage;

  return (
    <>
      <PageHeader {...page} />

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{story.eyebrow}</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{story.title}</h2>
            {story.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {p}
              </p>
            ))}
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      <StatsBar />

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {[
            { ...mission, icon: Target },
            { ...vision, icon: Eye },
          ].map(({ title, text, icon: Icon }, i) => (
            <FadeIn key={title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl bg-navy-900 p-8 text-white dark:ring-1 dark:ring-navy-800">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold text-white">{title}</h2>
                <p className="mt-3 text-lg text-navy-100">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 px-4 py-24 dark:bg-navy-900/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading {...aboutPage.valuesSection} />
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[v.icon];
              return (
                <FadeIn key={v.title} delay={i * 0.1} className="h-full">
                  <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <Icon className="h-7 w-7" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">{v.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading {...aboutPage.teamSection} />
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person, i) => (
              <FadeIn key={person.name} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
                  <span
                    aria-hidden
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 font-heading text-2xl font-extrabold text-white"
                  >
                    {initials(person.name)}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{person.name}</h3>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{person.role}</p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{person.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
