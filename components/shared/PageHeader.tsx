import Image from "next/image";

export default function PageHeader({
  title,
  intro,
  image,
  imageAlt,
}: {
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/60" />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-navy-100">{intro}</p>
      </div>
    </section>
  );
}
