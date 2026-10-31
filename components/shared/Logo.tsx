import Link from "next/link";
import { LineChart } from "lucide-react";
import { site } from "@/lib/content";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
        <LineChart className="h-5 w-5" aria-hidden />
      </span>
      <span className={`font-heading text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-navy-900 dark:text-white"}`}>
        {site.name}
      </span>
    </Link>
  );
}
