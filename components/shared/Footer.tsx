import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { navLinks, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100 dark:border-t dark:border-navy-800">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">{site.tagline}</p>
          <div className="mt-6 flex gap-3">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">Quick links</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-emerald-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">{site.office.name}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              <span>{site.office.address.join(", ")}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              <a href={`tel:${site.office.phone.replace(/\s/g, "")}`} className="hover:text-emerald-400">
                {site.office.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              <a href={`mailto:${site.office.email}`} className="hover:text-emerald-400">
                {site.office.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-800 py-6 text-center text-xs text-navy-100/70">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
