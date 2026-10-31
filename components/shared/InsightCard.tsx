import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate, type Insight } from "@/lib/queries";

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl dark:bg-navy-900 dark:ring-navy-800"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {insight.cover_image_url && (
          <Image
            src={insight.cover_image_url}
            alt={`Illustration for ${insight.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {insight.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <time dateTime={new Date(insight.published_at).toISOString()}>{formatDate(insight.published_at)}</time>
          <span aria-hidden>·</span>
          <Clock className="h-4 w-4" aria-hidden />
          {insight.read_minutes} min read
        </p>
        <h3 className="mt-3 text-xl font-bold">{insight.title}</h3>
        <p className="mt-2 flex-1 text-slate-600 dark:text-slate-300">{insight.excerpt}</p>
        <p className="mt-4 text-sm font-medium text-navy-800 dark:text-slate-300">By {insight.author_name}</p>
      </div>
    </Link>
  );
}
