import { getCommitment } from "../lib/data";
import { pad } from "../lib/ui";

export default async function CommitmentBand() {
  const c = await getCommitment();
  return (
    <section className={`${pad} bg-forest text-bone`}>
      <h2 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">{c.line1}</h2>
      <p className="mt-10 max-w-3xl text-xl leading-relaxed text-bone/90 md:text-3xl">{c.line2}</p>
      <p className="mt-10 max-w-3xl font-display text-2xl font-bold text-palm md:text-4xl">{c.line3}</p>
    </section>
  );
}