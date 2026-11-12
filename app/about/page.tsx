import Image from "next/image";
import PageHead from "../../components/PageHead";
import { about, mission, vision, strategy, stages, story, goals, commitment, team } from "../../lib/content";
import { pad, h2 } from "../../lib/ui";

export const metadata = { title: "About | Meric Agro Processing" };

export default function About() {
  return (
    <main>
      <PageHead title={<>About <span className="text-palm">Meric Agro</span></>} intro={about[0]} />

      <section className={pad}>
        <p className="max-w-3xl text-xl">{about[1]}</p>

        <div className="mt-24 border-l-8 border-palm pl-6 md:pl-10">
          <p className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">We believe agriculture is more than cultivation.</p>
          <p className="mt-6 max-w-2xl text-xl">It is an opportunity to create economic value, support food security, generate employment and develop sustainable businesses around the resources our land provides.</p>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-3xl font-bold">Our long-term strategy</h2>
          <p className="mt-4 max-w-3xl">{strategy}</p>
          <ol className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
            {stages.map((s, i) => (
              <li key={s} className={`border-t-4 pt-3 ${i === 0 ? "border-palm" : "border-soil/25"}`}>
                <span className="block text-sm text-soil/70">{i === 0 ? "Today" : "Building toward"}</span>
                <span className="font-display text-lg font-bold">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-28 grid gap-12 md:grid-cols-[0.8fr_1.4fr]">
          <h2 className="font-display text-4xl font-extrabold md:sticky md:top-28 md:self-start md:text-5xl">Our story</h2>
          <ol className="relative border-l-2 border-soil/30 pl-8">
            {story.map((s) => (
              <li key={s.label} className="relative pb-12 last:pb-0">
                <span aria-hidden className="absolute -left-[41px] top-2 size-4 rounded-full bg-palm ring-8 ring-bone" />
                <h3 className="font-display text-xl font-bold">{s.label}</h3>
                <p className="mt-2 max-w-xl">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-28 grid gap-6 md:grid-cols-2">
          <div className="bg-forest p-8 text-bone md:p-12"><h2 className="font-display text-3xl font-extrabold">Our mission</h2><p className="mt-5 text-xl leading-relaxed text-bone/90">{mission}</p></div>
          <div className="bg-leaf/15 p-8 md:p-12"><h2 className="font-display text-3xl font-extrabold">Our vision</h2><p className="mt-5 text-xl leading-relaxed">{vision}</p></div>
        </div>

        <div className="mt-28">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">Our goals</h2>
          <ol className="mt-10 border-t-4 border-soil md:columns-2 md:gap-16">
            {goals.map((g, i) => (
              <li key={g} className="flex break-inside-avoid gap-5 border-b border-soil/30 py-6">
                <span className="font-display text-3xl font-extrabold text-palm">{String(i + 1).padStart(2, "0")}</span>
                <span>{g}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${pad} bg-white`}>
        <h2 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{commitment[0]}</h2>
        <p className="mt-10 max-w-2xl text-xl">{commitment[1]}</p>
        <p className="mt-10 font-display text-2xl font-bold text-palm">{about[2]}</p>
      </section>

      <section id="team" className={`${pad} scroll-mt-16`}>
        <h2 className={h2}>The people behind Meric Agro</h2>
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name}>
              <div className="relative aspect-[3/4] overflow-hidden bg-forest">
                <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-7xl font-extrabold text-bone/20">{m.name.split(" ").map((w) => w[0]).join("")}</span>
                <Image src={`/images/team/${m.img}.jpg`} alt={m.name} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{m.name}</h3>
              <p className="text-base text-soil/75">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
