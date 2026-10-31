import CaseStudies from "@/components/home/CaseStudies";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import Services from "@/components/home/Services";
import StatsBar from "@/components/home/StatsBar";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/shared/CTABanner";

// Featured case studies are read from the database on every request.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Services />
      <HowWeWork />
      <CaseStudies />
      <Testimonials />
      <CTABanner />
      <Contact />
    </>
  );
}
