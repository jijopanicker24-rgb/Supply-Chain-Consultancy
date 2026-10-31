"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navLinks, site } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Section links stay highlighted on their detail pages (e.g. /services/... highlights Services).
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-navy-800 dark:bg-navy-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isActive(link.href) ? "text-emerald-600 dark:text-emerald-400" : "text-navy-800 dark:text-slate-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={site.cta.href}
            className="hidden rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 xl:inline-block"
          >
            {site.cta.label}
          </Link>

          <button
            type="button"
            className="rounded-md p-2 text-navy-900 xl:hidden dark:text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-6 pt-2 xl:hidden dark:border-navy-800 dark:bg-navy-950" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-slate-100 py-3 font-medium dark:border-navy-800 ${
                isActive(link.href) ? "text-emerald-600 dark:text-emerald-400" : "text-navy-800 dark:text-slate-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={site.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-emerald-500 px-5 py-3 text-center font-semibold text-white"
          >
            {site.cta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
