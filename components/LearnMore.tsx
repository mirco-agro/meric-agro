import Image from "next/image";
import { pad } from "../lib/ui";

const cards = [
  { t: "Our Purpose", href: "/about/purpose", img: "/images/cocoa.jpg" },
  { t: "Our Story", href: "/about/story", img: "/images/gallery/plantain-harvest-02.jpg" },
  { t: "Our Leadership", href: "/about/leadership", img: "/images/gallery/plantain-field-01.jpg" },
];

export default function LearnMore({ current }: { current?: string }) {
  return (
    <section className={`${pad} bg-white`}>
      <h2 className="font-display text-3xl font-extrabold md:text-5xl">Learn more about us</h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.filter((c) => c.href !== current).map((c) => (
          <li key={c.href}>
            <a href={c.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                <Image src={c.img} alt="" fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
              </div>
              <p className="mt-4 font-display text-xl font-bold group-hover:text-palm">{c.t}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
