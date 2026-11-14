"use client";
import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".h-line", { yPercent: 115, duration: 1.2, stagger: 0.18, ease: "power4.out", delay: 0.1 });
      gsap.from(".h-sub", { opacity: 0, y: 20, duration: 1, delay: 1, ease: "power2.out" });
      // parallax on desktop only: moving a scaled image blurs it on phones
      if (window.matchMedia("(min-width: 768px)").matches) {
        gsap.to(".h-bg", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  const common = { alt: "Meric Agro farmland at sunset", fill: true, sizes: "100vw", quality: 90, priority: true };
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: "/images/hero.jpg" });
  const { props: { srcSet: mobile, ...img } } = getImageProps({ ...common, src: "/images/hero-mobile.jpg" });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest text-bone">
      <div className="h-bg absolute inset-0 md:-top-[10%] md:h-[120%]">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} />
          <source media="(max-width: 767px)" srcSet={mobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...img} className="object-cover object-[50%_40%] md:object-center" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/35 to-transparent md:via-forest/50 md:to-forest/10" />
      </div>

      <div className="relative w-full px-6 pb-16 pt-20 md:px-[8vw] md:pb-24 md:pt-40">
        <h1 className="font-display text-[clamp(2.5rem,10.5vw,9.5rem)] font-extrabold leading-[0.92] tracking-tight">
          <span className="block overflow-hidden pb-2"><span className="h-line inline-block">Growing value.</span></span>
          <span className="block overflow-hidden pb-2 text-palm"><span className="h-line inline-block">Harvesting the future.</span></span>
        </h1>
        <p className="h-sub mt-5 max-w-xl text-lg md:mt-8 md:text-xl text-bone/90">Oil palm, Cocoa and plantain, grown on our farms in Onipe and Onigambari Ibadan, Oyo State.</p>
        <div className="h-sub mt-6 flex flex-wrap gap-3 font-display md:mt-8 md:gap-4">
          <a href="/products" className="bg-palm px-6 py-3 font-semibold text-bone hover:bg-bone hover:text-forest md:px-7">Request a Quote</a>
          <a href="/contact" className="border-2 border-bone px-6 py-3 font-semibold hover:bg-bone hover:text-forest md:px-7">Discuss a Partnership</a>
        </div>
      </div>
    </section>
  )
}