import Image from "next/image";
import AboutHero from "../../components/AboutHero";
import AboutNav from "../../components/AboutNav";
import CommitmentBand from "../../components/CommitmentBand";
import LearnMore from "../../components/LearnMore";
import YouTubeEmbed from "../../components/YouTubeEmbed";
import { about, core, stages, farmVideo } from "../../lib/content";
import { pad } from "../../lib/ui";

export const metadata = { title: "About Us", description: "Meric Agro Processing is an Ibadan agribusiness building a value chain from farm to market: production, sourcing, processing and distribution." };

const cards = [
  { img: "/images/gallery/plantain-field-02.jpg", tag: "Live today" },
  { img: "/images/gallery/plantain-cocoa-01.jpg", tag: "Growing" },
  { img: "", tag: "In development" },
  { img: "", tag: "Building" },
];

export default function About() {
  return (
    <main>
      <AboutHero title="About Meric Agro" intro={about[0]} img="/images/drone/stills/farm-about.jpg" />
      <AboutNav />

      <section className={pad}>
        <p className="max-w-3xl text-xl">{about[1]}</p>
        <div className="mt-20 border-l-8 border-palm pl-6 md:pl-10">
          <p className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">We believe agriculture is more than cultivation.</p>
          <p className="mt-6 max-w-2xl text-xl">It is an opportunity to create economic value, support food security, generate employment and develop sustainable businesses around the resources our land provides.</p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-[8vw] md:pb-32">
        <div className="text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">See our farm from above</h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl">A drone tour of our plantain and cocoa fields in Ibadan, Oyo State.</p>
        </div>
        <div className="mx-auto mt-10 max-w-5xl"><YouTubeEmbed id={farmVideo.id} title={farmVideo.title} /></div>
      </section>

      <section className="px-6 pb-24 md:px-[8vw] md:pb-32">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">Every step of the value chain</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {core.map((c, i) => (
            <li key={c.title} className="flex flex-col bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                {cards[i].img ? <Image src={cards[i].img} alt="" fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" /> : <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-6xl font-extrabold text-bone/15">{String(i + 1).padStart(2, "0")}</span>}
                <span className="absolute left-3 top-3 bg-palm px-2.5 py-0.5 font-display text-sm font-semibold text-bone">{cards[i].tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-base">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <h2 className="font-display text-3xl font-bold">Where we are heading</h2>
          <ol className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6">
            {stages.map((s, i) => (
              <li key={s} className={`border-t-4 pt-3 ${i === 0 ? "border-palm" : "border-soil/25"}`}>
                <span className="block text-sm text-soil/70">{i === 0 ? "Today" : "Building toward"}</span>
                <span className="font-display text-lg font-bold">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CommitmentBand />
      <LearnMore />
    </main>
  );
}