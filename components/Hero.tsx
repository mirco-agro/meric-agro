"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".h-line", { yPercent: 115, duration: 1.2, stagger: 0.18, ease: "power4.out", delay: 0.1 });
      gsap.from(".h-sub", { opacity: 0, y: 20, duration: 1, delay: 1, ease: "power2.out" });
      const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".h-shade", { opacity: 1, ease: "none", scrollTrigger: st });
      gsap.to(".h-content", { yPercent: -8, ease: "none", scrollTrigger: st });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest text-bone">
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/hero.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-mobile.jpg" alt="Aerial view of the Meric Agro farm in Ibadan, Oyo State" fetchPriority="high" className="absolute inset-0 size-full object-cover" />
        </picture>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-forest/35" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-forest/75 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest via-forest/70 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-forest/80 via-forest/30 to-transparent md:block" />
        <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(60% 50% at 85% 85%, rgba(229,80,27,.55), transparent)" }} />
        <div aria-hidden className="h-shade pointer-events-none absolute inset-0 bg-forest opacity-0" />
      </div>

      <div className="h-content relative w-full px-6 pb-16 pt-28 md:px-[8vw] md:pb-24 md:pt-40">
        <h1 className="font-display text-[clamp(2.5rem,10.5vw,9.5rem)] font-extrabold leading-[0.92] tracking-tight">
          <span className="block overflow-hidden pb-2"><span className="h-line inline-block">Growing value.</span></span>
          <span className="block overflow-hidden pb-2 text-palm"><span className="h-line inline-block">Harvesting the future.</span></span>
        </h1>
        <p className="h-sub mt-5 max-w-xl text-lg text-bone/90 md:mt-8 md:text-xl">Oil palm, cocoa and plantain, grown on our farms in Onipe and Onigambari, Ibadan, Oyo State.</p>
        <div className="h-sub mt-6 flex flex-wrap gap-3 font-display md:mt-8 md:gap-4">
          <a href="/products" className="bg-palm px-6 py-3 font-semibold text-bone hover:bg-bone hover:text-forest md:px-7">Request a Quote</a>
          <a href="/contact" className="border-2 border-bone px-6 py-3 font-semibold hover:bg-bone hover:text-forest md:px-7">Discuss a Partnership</a>
        </div>
      </div>
    </section>
  );
}