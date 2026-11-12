import Image from "next/image";
import Hero from "../components/Hero";
import Journey from "../components/Journey";
import Gallery from "../components/Gallery";
import { about, products, figures, figuresNote } from "../lib/content";
import { pad, h2, quote, Pin } from "../lib/ui";
import CropFigures from "../components/CropFigures";

export default function Home() {
  const max = Math.max(...figures.map((f) => f.count));
  return (
    <main id="top">
      <Hero />

      <section className={`${pad} grid gap-12 md:grid-cols-[1fr_1.2fr]`}>
        <h2 className={h2}>We are building agriculture that adds value at every step.</h2>
        <div className="space-y-5 md:pt-3">
          <p>{about[0]}</p>
          <p>{about[1]}</p>
          <a href="/about" className="inline-block font-display font-semibold underline decoration-palm decoration-2 underline-offset-4">Read our story</a>
        </div>
      </section>

      <Journey />

      <section className={pad}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className={h2}>What we grow</h2>
          <a href="/products" className={quote}>See all products</a>
        </div>
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <a href={`/products#${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-forest">
                  {p.img ? (
                    <Image src={p.img} alt={p.name} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover object-[center_60%] transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-center font-display text-2xl font-bold text-bone/60">Photo coming soon</div>
                  )}
                  <span className="absolute bottom-3 left-3 flex items-center gap-2 bg-bone px-3 py-1.5 font-display text-sm font-semibold text-forest"><Pin />{p.region}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold group-hover:text-palm">{p.name}</h3>
              </a>
            </li>
          ))}
        </ul>
      </section>

     <CropFigures />

      <section id="gallery" className={pad}>
        <h2 className={h2}>Life on the farm</h2>
        <div className="mt-14"><Gallery /></div>
      </section>

      <section className="bg-leaf/15 px-6 py-20 md:px-[8vw]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">Farmer, landowner or cooperative? Grow with us.</h2>
          <a href="/partner" className={quote}>Apply as a Farmer Partner</a>
        </div>
      </section>
    </main>
  );
}
