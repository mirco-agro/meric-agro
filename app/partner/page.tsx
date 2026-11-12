import ApplicationForm from "../../components/ApplicationForm";
import { partner } from "../../lib/content";

const pad = "px-6 py-24 md:px-[8vw] md:py-28";
const h2 = "font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl";

export const metadata = { title: "Farmer Partnership Programme | Meric Agro Processing" };

export default function Partner() {
  return (
    <main>
      <section className="bg-forest px-6 pb-24 pt-44 text-bone md:px-[8vw]">
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.92] tracking-tight">Growing together.<br /><span className="text-palm">Creating shared value.</span></h1>
        <div className="mt-10 grid max-w-5xl gap-6 text-xl text-bone/85 md:grid-cols-2">{partner.intro.map((p) => <p key={p}>{p}</p>)}</div>
        <a href="#apply" className="mt-10 inline-block bg-palm px-8 py-3 font-display font-semibold hover:bg-bone hover:text-forest">Apply as a Farmer Partner</a>
      </section>

      <section className={pad}>
        <h2 className={h2}>Four ways to partner</h2>
        <ul className="mt-14 border-t-4 border-soil">
          {partner.models.map((m) => (
            <li key={m.name} className="grid gap-4 border-b border-soil/30 py-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
              <h3 className="font-display text-2xl font-bold">{m.name}</h3>
              <div><p>{m.text}</p><p className="mt-3"><span className="font-semibold">Suitable for: </span>{m.who}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${pad} grid gap-16 bg-white md:grid-cols-2`}>
        <div>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">What farmers gain</h2>
          <dl className="mt-8 space-y-5">{partner.gains.map((g) => <div key={g.t}><dt className="font-display font-bold">{g.t}</dt><dd>{g.d}</dd></div>)}</dl>
          <p className="mt-8 text-base text-soil/70">{partner.note}</p>
        </div>
        <div>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">What we expect from partners</h2>
          <p className="mt-4">Successful partnerships need commitment, transparency and shared responsibility.</p>
          <ol className="mt-6 list-decimal space-y-3 pl-6">{partner.expects.map((e) => <li key={e}>{e}</li>)}</ol>
        </div>
      </section>

      <section id="apply" className={`${pad} grid scroll-mt-16 gap-16 md:grid-cols-[1fr_1.4fr]`}>
        <div>
          <h2 className={h2}>Become a Meric Agro farmer partner</h2>
          <p className="mt-6 max-w-md">Tell us about your farm and the partnership you have in mind. Our team will review your information and contact you if there is a suitable opportunity for further discussion.</p>
        </div>
        <ApplicationForm />
      </section>
    </main>
  );
}
