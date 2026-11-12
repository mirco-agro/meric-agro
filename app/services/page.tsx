import PageHead from "../../components/PageHead";
import { services } from "../../lib/content";
import { pad, quote } from "../../lib/ui";

export const metadata = { title: "Services", description: "Agricultural production, produce supply, sourcing, processing and partnerships for wholesalers, distributors and processors." };

export default function Services() {
  return (
    <main>
      <PageHead title="How we can work together" intro="Whether you need produce, sourcing support or a processing and distribution partner, we welcome the conversation." />
      <section className={pad}>
        <ul className="border-t-4 border-soil">
          {services.map((s) => (
            <li key={s.name} className="grid gap-2 border-b border-soil/30 py-7 md:grid-cols-2 md:gap-16">
              <h2 className="font-display text-2xl font-bold">{s.name}</h2>
              <p><span className="font-semibold">Who we serve: </span>{s.who}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-4">
          <a href="/contact" className={quote}>Discuss a Partnership</a>
          <a href="/partner" className="inline-block border-2 border-soil px-7 py-3 font-display font-semibold hover:bg-soil hover:text-bone">Farmer Partnership Programme</a>
        </div>
      </section>
    </main>
  );
}
