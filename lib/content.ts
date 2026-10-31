// All site text, links and image URLs live here so content can be edited
// without touching layout code.

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  name: "Insights Consultancy",
  tagline: "Turning Supply Chain Data into Decisions.",
  description:
    "Supply chain consulting in Dubai — demand planning, S&OP, inventory optimization, procurement, logistics and digital transformation across the UAE and GCC.",
  cta: { label: "Book a Consultation", href: "/book" },
  office: {
    name: "Dubai Office",
    // Dummy address: replace with the real office address.
    address: ["Office 000, Sample Tower", "Business Bay, Dubai, UAE"],
    phone: "+971 4 000 0000",
    email: "hello@insightsconsultancy.ae",
    hours: "Sun – Thu, 9:00 – 18:00 GST",
  },
  social: [
    { label: "LinkedIn", short: "in", href: "https://www.linkedin.com" },
    { label: "X", short: "X", href: "https://x.com" },
    { label: "Instagram", short: "IG", href: "https://www.instagram.com" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  headline: site.tagline,
  subheading:
    "Helping businesses across the UAE and GCC plan smarter, cut costs and build resilient supply chains.",
  image: "/images/hero-port.jpg",
  imageAlt: "Aerial view of a Dubai container port at golden hour with cranes, stacked containers and the city skyline",
  primary: site.cta,
  secondary: { label: "Explore Services", href: "/services" },
};

export const stats = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 120, suffix: "+", label: "Clients served" },
  { value: 10, suffix: "", label: "Countries" },
  { value: 20, suffix: "%", label: "Average cost savings" },
];

export const servicesSection = {
  eyebrow: "What we do",
  title: "End-to-end supply chain expertise",
  intro: "Practical, data-driven services that turn complexity into measurable results.",
};

export const services = [
  {
    title: "Demand Planning & Forecasting",
    description: "Statistical and ML-driven forecasts that cut error and keep shelves stocked.",
    image: unsplash("photo-1460925895917-afdab827c52f", 800),
    imageAlt: "Laptop showing forecasting charts and graphs",
    href: "/services",
  },
  {
    title: "Sales & Operations Planning (S&OP)",
    description: "One aligned plan across sales, finance and operations, reviewed every month.",
    image: unsplash("photo-1522071820081-009f0129c71c", 800),
    imageAlt: "Team collaborating around a table during a planning meeting",
    href: "/services",
  },
  {
    title: "Inventory Optimization",
    description: "Right-size safety stock and free up working capital without hurting service.",
    image: unsplash("photo-1553413077-190dd305871c", 800),
    imageAlt: "Warehouse aisle with boxes stacked on high shelving",
    href: "/services",
  },
  {
    title: "Procurement",
    description: "Strategic sourcing and supplier management that lowers total cost of ownership.",
    image: unsplash("photo-1556761175-5973dc0f32e7", 800),
    imageAlt: "Business professionals negotiating in a meeting room",
    href: "/services",
  },
  {
    title: "Warehouse & Logistics",
    description: "Network design, layout and transport planning for faster, cheaper delivery.",
    image: unsplash("photo-1519003722824-194d4455a60c", 800),
    imageAlt: "Freight truck driving on a highway",
    href: "/services",
  },
  {
    title: "Digital Supply Chain Transformation",
    description: "Dashboards, planning tools and automation that make data-driven decisions routine.",
    image: unsplash("photo-1551288049-bebda4e38f71", 800),
    imageAlt: "Analytics dashboard with charts and KPIs on a screen",
    href: "/services",
  },
];

export const processSection = {
  eyebrow: "How we work",
  title: "A proven four-step approach",
  intro: "From first diagnostic to lasting capability, we stay with you until results stick.",
  steps: [
    { icon: "search", title: "Assess", description: "Diagnose your current supply chain with data, interviews and benchmarks." },
    { icon: "pencil", title: "Design", description: "Co-create a future-state model, roadmap and business case." },
    { icon: "rocket", title: "Implement", description: "Roll out processes, tools and training alongside your team." },
    { icon: "refresh", title: "Sustain", description: "Embed KPIs and governance so improvements keep compounding." },
  ] as const,
};

export const caseStudiesSection = {
  eyebrow: "Featured case studies",
  title: "Results our clients can measure",
  linkLabel: "View all case studies",
  href: "/case-studies",
};

export const caseStudies = [
  {
    industry: "FMCG",
    client: "Regional food & beverage distributor",
    result: "Forecast accuracy up from 45% to 68%",
    image: unsplash("photo-1586528116311-ad8dd3c8310d", 900),
    imageAlt: "Distribution warehouse with pallets of goods",
    href: "/case-studies",
  },
  {
    industry: "Retail",
    client: "Multi-brand fashion retailer, GCC",
    result: "Inventory reduced by 22% with 98% service level",
    image: unsplash("photo-1441986300917-64674bd600d8", 900),
    imageAlt: "Modern retail store interior with clothing displays",
    href: "/case-studies",
  },
  {
    industry: "Logistics",
    client: "3PL provider, Jebel Ali",
    result: "Transport costs cut by 18% in six months",
    image: unsplash("photo-1578575437130-527eed3abbec", 900),
    imageAlt: "Stacked shipping containers at a port terminal",
    href: "/case-studies",
  },
];

export const clientsSection = {
  eyebrow: "Trusted by leading businesses",
  title: "What our clients say",
  // Dummy client names: replace with real clients (with permission) before launch.
  logos: ["Sample Foods Co.", "Demo Retail Group", "Example Pharma", "Placeholder Logistics", "Mock Industries", "Dummy Trading"],
};

// Dummy testimonials: replace with real, approved client quotes before launch.
export const testimonials = [
  {
    quote:
      "Insights Consultancy transformed our planning process. We finally have one number the whole business trusts.",
    name: "John Doe",
    role: "COO, Sample Foods Co.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote:
      "Their inventory work released millions in working capital while our availability actually improved.",
    name: "Jane Doe",
    role: "Supply Chain Director, Demo Retail Group",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    quote:
      "Practical, hands-on and data-driven. They worked side by side with our team until the results were delivered.",
    name: "Alex Sample",
    role: "Head of Logistics, Placeholder Logistics",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
];

export const ctaBanner = {
  title: "Ready to transform your supply chain?",
  text: "Talk to our consultants about where data can unlock savings and resilience in your operations.",
  button: site.cta,
};

export const contactSection = {
  eyebrow: "Contact us",
  title: "Let's talk about your supply chain",
  intro: "Tell us a little about your business and we will get back to you within one working day.",
  successMessage: "Thank you! Your message has been sent. We'll be in touch shortly.",
  submitLabel: "Send Message",
};

// Form value for the "Other" / "Not sure yet" options, saved as an empty (NULL) choice.
export const NO_CHOICE = "none";

export const bookingSection = {
  eyebrow: "Book a consultation",
  title: "Schedule a free 30-minute call",
  intro: "Pick a time that suits you and one of our consultants will confirm your slot within 24 hours.",
  successMessage: "Thanks! Our team will contact you within 24 hours to confirm your consultation.",
  submitLabel: "Request Consultation",
  // Industries and services come from the database; these extra options are stored as "no choice".
  otherIndustryLabel: "Other",
  otherServiceLabel: "Not sure yet",
  unavailable: {
    title: "Online booking is temporarily unavailable",
    text: "We couldn't load the booking form just now. Please call or email us and we'll arrange your consultation.",
  },
  companySizes: ["1–50 employees", "51–200 employees", "201–1,000 employees", "1,000+ employees"],
  times: ["Morning (9:00 – 12:00)", "Afternoon (12:00 – 15:00)", "Late afternoon (15:00 – 18:00)"],
  timeZoneNote: "All times are Gulf Standard Time (GST). We meet Sunday to Thursday.",
  expect: {
    title: "What to expect",
    steps: [
      { title: "We confirm your slot", description: "A consultant emails you within 24 hours to confirm the date and time." },
      { title: "A focused 30-minute call", description: "We discuss your goals, current challenges and the data you already have." },
      { title: "Clear next steps", description: "You leave with practical recommendations, with no obligation to continue." },
    ],
  },
};

export const careersSection = {
  eyebrow: "Why join us",
  title: "Build the supply chains of the region",
  intro: "Work on real problems for leading GCC businesses, alongside practitioners who care about results.",
  perks: [
    { title: "Meaningful projects", description: "Work with retailers, manufacturers and energy companies across the UAE and GCC." },
    { title: "Learn fast", description: "Structured coaching, certifications and a training budget every year." },
    { title: "Flexible working", description: "Hybrid working from our Dubai and Abu Dhabi offices, Sunday to Thursday." },
    { title: "Competitive package", description: "Tax-free salary, annual bonus, health insurance and annual flights home." },
  ],
};

// Dummy story, values and team: replace with your real company details before launch.
export const aboutPage = {
  story: {
    eyebrow: "Our story",
    title: "Practitioners first, consultants second",
    paragraphs: [
      "Insights Consultancy was founded in Dubai by supply chain leaders who had spent their careers running planning, procurement and logistics teams across the GCC. We saw the same pattern again and again: businesses had plenty of data, but too little of it was turned into better decisions.",
      "Today our team of consultants, analysts and technologists helps retailers, manufacturers, distributors and energy companies plan smarter, hold less stock and serve customers better. We stay hands-on until the results are measurable, and we leave our clients' teams more capable than we found them.",
    ],
    image: "/images/dubai-office.jpg",
    imageAlt: "Bright modern Dubai office lounge with green chairs and a city view",
  },
  mission: {
    title: "Our mission",
    text: "To help businesses across the UAE and GCC turn supply chain data into confident, everyday decisions.",
  },
  vision: {
    title: "Our vision",
    text: "A region known for the most resilient, efficient and sustainable supply chains in the world.",
  },
  valuesSection: { eyebrow: "What we stand for", title: "Our values" },
  values: [
    { icon: "target", title: "Results over reports", description: "We measure success by the improvements our clients see, not the slides we produce." },
    { icon: "users", title: "Side by side", description: "We work alongside your team and transfer our skills so improvements last." },
    { icon: "shield", title: "Honest advice", description: "We tell you what the data says, even when it isn't what anyone hoped to hear." },
    { icon: "lightbulb", title: "Practical innovation", description: "We use new tools and AI where they add value, and keep things simple where they don't." },
  ] as const,
  teamSection: { eyebrow: "Our people", title: "Meet the leadership team" },
  team: [
    { name: "Sara Al Mansoori", role: "Managing Partner", bio: "20 years leading demand planning and S&OP for regional retailers." },
    { name: "Omar Haddad", role: "Partner, Inventory & Operations", bio: "Former operations director for a GCC food distributor." },
    { name: "Fatima Qureshi", role: "Partner, Procurement", bio: "Specialist in strategic sourcing and in-country value programmes." },
    { name: "Daniel Okafor", role: "Director, Digital & Analytics", bio: "Builds planning tools, dashboards and data platforms that teams actually use." },
  ],
};

export const notFound = {
  title: "Page not found",
  text: "Sorry, the page you are looking for doesn't exist or has been moved.",
  button: { label: "Back to Home", href: "/" },
};

export type PageKey =
  | "services"
  | "industries"
  | "caseStudies"
  | "insights"
  | "about"
  | "careers"
  | "contact"
  | "book";

export const pages: Record<PageKey, { title: string; intro: string; image: string; imageAlt: string }> = {
  services: {
    title: "Our Services",
    intro: "Data-driven consulting across planning, procurement, logistics and digital transformation.",
    image: "/images/warehouse.jpg",
    imageAlt: "Modern distribution warehouse with long aisles of pallet racking and a forklift",
  },
  industries: {
    title: "Industries",
    intro: "Sector expertise across FMCG, retail, healthcare, manufacturing and logistics.",
    image: "/images/industrial-zone.jpg",
    imageAlt: "Aerial view of an industrial zone with factories, storage tanks and trucks at sunrise",
  },
  caseStudies: {
    title: "Case Studies",
    intro: "Real projects, real numbers — see how we've helped clients across the GCC.",
    image: "/images/container-terminal.jpg",
    imageAlt: "Stacks of shipping containers and a gantry crane at a container terminal",
  },
  insights: {
    title: "Insights",
    intro: "Articles, reports and perspectives on the future of supply chains in the region.",
    image: "/images/analytics-office.jpg",
    imageAlt: "Supply chain analytics dashboards on screens in an office overlooking Dubai",
  },
  about: {
    title: "About Us",
    intro: "A Dubai-based team of supply chain practitioners, analysts and technologists.",
    image: "/images/dubai-skyline.jpg",
    imageAlt: "Dubai skyline with the Burj Khalifa at dusk",
  },
  careers: {
    title: "Careers",
    intro: "Join a team that turns supply chain data into decisions for leading businesses.",
    image: "/images/consulting-team.jpg",
    imageAlt: "Team of consultants discussing supply chain charts in a Dubai meeting room",
  },
  contact: {
    title: "Contact Us",
    intro: "Book a consultation or send us a message — we respond within one working day.",
    image: "/images/dubai-office.jpg",
    imageAlt: "Bright modern office lounge with green chairs and a view over Dubai",
  },
  book: {
    title: "Book a Consultation",
    intro: "Talk to a supply chain specialist about your goals. The first call is free, with no obligation.",
    image: "/images/consulting-team.jpg",
    imageAlt: "Consultants meeting around a table and reviewing supply chain data",
  },
};
