import Image from "next/image";
import type { CSSProperties } from "react";

const cards = [
  { t: "Our Purpose", d: "Our mission, vision and the outcomes we intend to achieve.", href: "/about/purpose", img: "/images/cocoa.jpg" },
  { t: "Our Story", d: "How an agricultural investment became an agribusiness vision.", href: "/about/story", img: "/images/gallery/plantain-harvest-02.jpg" },
  { t: "Our Leadership", d: "The people behind Meric Agro.", href: "/about/leadership", img: "/images/gallery/plantain-field-01.jpg" },
];

export default function LearnMore({ current }: { current?: string }) {
  const list = cards.filter((c) => c.href !== current);
  return (
    <section className="bg-bone px-6 py-16 md:px-[8vw] md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">Keep exploring</h2>
          <p className="max-w-sm text-base text-soil/75 md:text-lg">More about who we are and where we are heading.</p>
        </div>
        <ul className="mt-8 grid gap-4 md:mt-10 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] md:gap-5" style={{ "--n": list.length } as CSSProperties}>
          {list.map((c, i) => (
            <li key={c.href}>
              <a href={c.href} className="group relative block aspect-[4/3] overflow-hidden bg-forest md:aspect-[5/4] lg:aspect-[4/3]">
                <Image src={c.img} alt="" fill sizes="(min-width:1152px) 380px, (min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
                <span aria-hidden className="absolute left-4 top-4 font-display text-xs text-bone/80">{String(i + 1).padStart(2, "0")}</span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-bone md:p-5">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold leading-tight">{c.t}</h3>
                    <p className="mt-1.5 max-w-[16rem] text-sm text-bone/85">{c.d}</p>
                  </div>
                  <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-bone/70 transition-colors group-hover:border-palm group-hover:bg-palm">
                    <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}