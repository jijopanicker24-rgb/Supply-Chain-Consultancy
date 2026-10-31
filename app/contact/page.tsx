import type { Metadata } from "next";
import Contact from "@/components/home/Contact";
import PageHeader from "@/components/shared/PageHeader";
import { pages } from "@/lib/content";

const page = pages.contact;

export const metadata: Metadata = { title: page.title, description: page.intro };

export default function ContactPage() {
  return (
    <>
      <PageHeader {...page} />
      <Contact />
    </>
  );
}
