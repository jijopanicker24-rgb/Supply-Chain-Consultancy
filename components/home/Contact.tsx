import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import FadeIn from "@/components/shared/FadeIn";
import SectionHeading from "@/components/shared/SectionHeading";
import { contactSection, site } from "@/lib/content";

export default function Contact() {
  const details = [
    { icon: MapPin, label: "Address", value: site.office.address.join(", ") },
    { icon: Phone, label: "Phone", value: site.office.phone, href: `tel:${site.office.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: site.office.email, href: `mailto:${site.office.email}` },
    { icon: Clock, label: "Hours", value: site.office.hours },
  ];

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeading {...contactSection} />
        </FadeIn>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <ContactForm />
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-2xl bg-navy-900 p-8 text-white dark:ring-1 dark:ring-navy-800">
              <h3 className="text-xl font-bold text-white">{site.office.name}</h3>
              <ul className="mt-6 space-y-6">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0 break-words">
                      <p className="text-sm text-navy-100">{label}</p>
                      {href ? (
                        <a href={href} className="font-medium hover:text-emerald-400">
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
