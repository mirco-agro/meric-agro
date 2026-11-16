import Image from "next/image";

export default function AboutHero({ title, intro, img }: { title: string; intro?: string; img?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest px-6 pb-20 pt-44 text-bone md:px-[8vw] md:pb-28 md:pt-52">
      {img && (
        <>
          <Image src={img} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/30" />
        </>
      )}
      <div className="relative">
        <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-tight">{title}</h1>
        {intro && <p className="mt-8 max-w-2xl text-xl text-bone/90">{intro}</p>}
      </div>
    </section>
  );
}
