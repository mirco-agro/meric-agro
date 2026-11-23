import AboutHero from "../../../components/AboutHero";
import AboutNav from "../../../components/AboutNav";
import LearnMore from "../../../components/LearnMore";
import { getStory } from "../../../lib/data";
import { pad } from "../../../lib/ui";

export const metadata = { title: "Our Story", description: "How Meric Agro Processing grew from an agricultural investment into a broader agribusiness vision in Oyo State, Nigeria." };

export default async function Story() {
  const s = await getStory();
  return (
    <main>
      <AboutHero title="Our Story" intro={s.heroIntro} img="/images/gallery/plantain-harvest-02.jpg" />
      <AboutNav />
      <section className={`${pad} grid gap-12 md:grid-cols-[0.8fr_1.4fr]`}>
        <h2 className="font-display text-4xl font-extrabold md:sticky md:top-44 md:self-start md:text-5xl">How we got here</h2>
        <ol className="relative border-l-2 border-soil/30 pl-8">
          {s.story.map((x) => (
            <li key={x.label} className="relative pb-12 last:pb-0">
              <span aria-hidden className="absolute -left-[41px] top-2 size-4 rounded-full bg-palm ring-8 ring-bone" />
              <h3 className="font-display text-xl font-bold">{x.label}</h3>
              <p className="mt-2 max-w-xl">{x.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-white px-6 py-24 md:px-[8vw]">
        <h2 className="font-display text-3xl font-bold md:text-5xl">Our long-term strategy</h2>
        <p className="mt-4 max-w-3xl text-xl">{s.strategy}</p>
        <ol className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
          {s.stages.map((x, i) => (
            <li key={x} className={`border-t-4 pt-3 ${i === 0 ? "border-palm" : "border-soil/25"}`}>
              <span className="block text-sm text-soil/70">{i === 0 ? "Today" : "Building toward"}</span>
              <span className="font-display text-lg font-bold">{x}</span>
            </li>
          ))}
        </ol>
      </section>
      <LearnMore current="/about/story" />
    </main>
  );
}