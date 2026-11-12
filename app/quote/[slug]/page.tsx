import Image from "next/image";
import { notFound } from "next/navigation";
import QuoteForm from "../../../components/QuoteForm";
import { products } from "../../../lib/content";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export default async function Quote({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <main className="grid gap-16 px-6 pb-24 pt-36 md:grid-cols-[1fr_1.3fr] md:px-[8vw]">
      <aside>
        <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">Request a quote</h1>
        <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-forest">
          <Image src={p.img} alt={p.name} fill priority sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold">{p.name}</h2>
        <p className="mt-3">{p.text}</p>
        <dl className="mt-6 space-y-3 border-t-4 border-soil pt-5 text-base">
          <div><dt className="font-display font-bold">Typical buyers</dt><dd>{p.who}</dd></div>
          <div><dt className="font-display font-bold">Availability</dt><dd>{p.avail}</dd></div>
          <div><dt className="font-display font-bold">Price</dt><dd>Shared on request, based on quantity.</dd></div>
        </dl>
        <a href="/#products" className="mt-6 inline-block font-semibold underline decoration-palm decoration-2 underline-offset-4">Back to products</a>
      </aside>
      <QuoteForm slug={p.slug} product={p.name} />
    </main>
  );
}
