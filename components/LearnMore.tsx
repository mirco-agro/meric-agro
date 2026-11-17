import Image from "next/image";
import type { CSSProperties } from "react";
import { pad } from "../lib/ui";

const cards = [
  { t: "Our Purpose", d: "Our mission, vision and the outcomes we intend to achieve.", href: "/about/purpose", img: "/images/cocoa.jpg" },
  { t: "Our Story", d: "How an agricultural investment became an agribusiness vision.", href: "/about/story", img: "/images/gallery/plantain-harvest-02.jpg" },
  { t: "Our Leadership", d: "The people behind Meric Agro.", href: "/about/leadership", img: "/images/gallery/plantain-field-01.jpg" },
];

export default function LearnMore({ current }: { current?: string }) {
  const list = cards.filter((c) => c.href !== current);
  return (
    <section className={`${pad} bg-bone`}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Keep exploring</h2>
        <p className="max-w-sm text-lg text-soil/75">More about who we are and where we are heading.</p>
      </div>
      <ul className="mt-12 grid gap-5 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ "--n": list.length } as CSSProperties}>
        {list.map((c, i) => (
          <li key={c.href}>
            <a href={c.href} className="group relative block aspect-[4/3] overflow-hidden bg-forest md:aspect-[3/4]">
              <Image src={c.img} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
              <span aria-hidden className="absolute left-5 top-5 font-display text-sm text-bone/80">{String(i + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-bone md:p-7">
                <div>
                  <h3 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">{c.t}</h3>
                  <p className="mt-2 max-w-xs text-base text-bone/85">{c.d}</p>
                </div>
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-bone/70 transition-colors group-hover:border-palm group-hover:bg-palm">
                  <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}