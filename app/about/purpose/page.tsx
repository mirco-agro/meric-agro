import Image from "next/image";
import AboutHero from "../../../components/AboutHero";
import AboutNav from "../../../components/AboutNav";
import CommitmentBand from "../../../components/CommitmentBand";
import LearnMore from "../../../components/LearnMore";
import { mission, vision, partner } from "../../../lib/content";
import { outcomes } from "../../../lib/about";
import { pad, quote } from "../../../lib/ui";

export const metadata = { title: "Our Purpose", description: "Our mission, vision and the outcomes Meric Agro Processing intends to achieve for farmers, buyers, communities and Nigerian agriculture." };

export default function Purpose() {
  return (
    <main>
      <AboutHero title="Our Purpose" intro="Building a Nigerian agribusiness that creates value from cultivation through to the finished product." img="/images/gallery/plantain-field-03.jpg" />
      <AboutNav />

      <section className={`${pad} grid gap-6 md:grid-cols-2`}>
        <div className="bg-forest p-8 text-bone md:p-12"><h2 className="font-display text-3xl font-extrabold">Our mission</h2><p className="mt-5 text-xl leading-relaxed text-bone/90">{mission}</p></div>
        <div className="bg-leaf/15 p-8 md:p-12"><h2 className="font-display text-3xl font-extrabold">Our vision</h2><p className="mt-5 text-xl leading-relaxed">{vision}</p></div>
      </section>

      <section className="px-6 pb-24 md:px-[8vw] md:pb-32">
        <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Four outcomes we intend to achieve</h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <li key={o.title} className="flex flex-col bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                {o.img && <Image src={o.img} alt="" fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />}
                <span className="absolute left-3 top-3 bg-palm px-2.5 py-0.5 font-display text-sm font-semibold text-bone">{o.tag}</span>
              </div>
              <div className="flex-1 p-5">
                <h3 className="font-display text-xl font-bold leading-tight">{o.title}</h3>
                <ul className="mt-3 space-y-3 text-base">{o.goals.map((g) => <li key={g} className="border-l-4 border-palm pl-3">{g}</li>)}</ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid items-center gap-10 bg-leaf/15 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-[8vw]">
        <div className="relative aspect-[4/3] overflow-hidden bg-forest">
          <Image src="/images/gallery/plantain-young-01.jpg" alt="" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">Putting our purpose into practice</h2>
          <p className="mt-5 max-w-lg text-xl">{partner.intro[1]}</p>
          <a href="/partner" className={`${quote} mt-8`}>Farmer Partnership Programme</a>
        </div>
      </section>

      <CommitmentBand />
      <LearnMore current="/about/purpose" />
    </main>
  );
}
