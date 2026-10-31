import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { CaseStudy } from "@/lib/queries";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-navy-900 shadow-md transition dark:ring-1 dark:ring-navy-800 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {study.cover_image_url && (
          <Image
            src={study.cover_image_url}
            alt={`Cover image for ${study.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {study.industry_name && (
          <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {study.industry_name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-navy-100">{study.client_name}</p>
        <h3 className="mt-2 text-xl font-bold text-white">{study.title}</h3>
        {study.metric_value && (
          <p className="mt-auto flex items-center gap-2 pt-5 text-emerald-400">
            <TrendingUp className="h-5 w-5 shrink-0" aria-hidden />
            <span className="font-heading text-2xl font-extrabold">{study.metric_value}</span>
            <span className="text-sm text-navy-100">{study.metric_label}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
