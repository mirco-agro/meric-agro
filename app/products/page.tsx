import Image from "next/image";
import PageHead from "../../components/PageHead";
import { products, upcoming } from "../../lib/content";
import { pad, quote, Pin } from "../../lib/ui";

export const metadata = { title: "Plantain, Cocoa and Oil Palm", description: "Fresh plantain, cocoa and oil palm grown in Oyo State, Nigeria. Request a quote for wholesale and commercial supply." };

export default function Products() {
  return (
    <main>
      <PageHead
        title={<>What we <span className="text-palm">grow</span></>}
        intro="Oil palm, cocoa and plantain from our farms in Onipe and Onigambari, Ibadan, Oyo State, Nigeria. Prices and quantities are discussed on enquiry."
      />
      <section className={pad}>
        <div className="space-y-24">
          {products.map((p, i) => (
            <article id={p.slug} key={p.slug} className={`grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                {p.img ? (
                  <Image src={p.img} alt={p.name} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover object-[center_60%]" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center font-display text-2xl font-bold text-bone/60">Photo coming soon</div>
                )}
                <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-bone px-3 py-2 font-display text-sm font-semibold text-forest"><Pin />{p.region}</span>
              </div>
              <div>
                <h2 className="font-display text-4xl font-bold">{p.name}</h2>
                <p className="mt-4 max-w-lg">{p.text}</p>
                <ul aria-label="Farm locations" className="mt-5 flex flex-wrap items-center gap-2 text-base">
                  <li className="mr-1 flex items-center gap-2 font-display font-semibold"><Pin />Grown at</li>
                  {p.farms.map((f) => <li key={f} className="border border-soil/40 px-3 py-1">{f}</li>)}
                </ul>
                <p className="mt-4 text-base text-soil/70">Price and quantity are discussed on enquiry.</p>
                <a href={`/quote/${p.slug}`} className={`${quote} mt-6`}>Request a Quote</a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-28 border-t-4 border-soil pt-8">
          <h2 className="font-display text-3xl font-bold">In development</h2>
          <p className="mt-2 max-w-xl text-base text-soil/70">These products are part of our future plans and are not yet established production lines.</p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {upcoming.map((u) => <li key={u.name}><h3 className="font-display text-xl font-bold">{u.name}</h3><p className="mt-2">{u.text}</p></li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
