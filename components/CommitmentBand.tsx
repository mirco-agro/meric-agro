import { about, commitment } from "../lib/content";
import { pad } from "../lib/ui";

export default function CommitmentBand() {
  return (
    <section className={`${pad} bg-forest text-bone`}>
      <h2 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">{commitment[0]}</h2>
      <p className="mt-10 max-w-3xl text-xl leading-relaxed text-bone/90 md:text-3xl">{commitment[1]}</p>
      <p className="mt-10 max-w-3xl font-display text-2xl font-bold text-palm md:text-4xl">{about[2]}</p>
    </section>
  );
}
