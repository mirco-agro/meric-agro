import type { ReactNode } from "react";

export default function PageHead({ title, intro }: { title: ReactNode; intro?: string }) {
  return (
    <section className="bg-forest px-6 pb-20 pt-44 text-bone md:px-[8vw]">
      <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-tight">{title}</h1>
      {intro && <p className="mt-8 max-w-2xl text-xl text-bone/85">{intro}</p>}
    </section>
  );
}
