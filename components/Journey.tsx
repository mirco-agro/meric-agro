"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { core } from "../lib/content";

const colors = ["#0b2b1c", "#3a2216", "#5a2a12", "#12303a"];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const n = core.length;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: `+=${n * 90}%`, scrub: 0.6, pin: true } });
      tl.to(".j-bar", { scaleY: 1, ease: "none", duration: n - 1 }, 0);
      for (let i = 1; i < n; i++) {
        tl.to(root.current, { backgroundColor: colors[i], duration: 0.5 }, i - 0.5);
        tl.to(`.j-s${i - 1}`, { autoAlpha: 0, y: -60, duration: 0.4 }, i - 0.5);
        tl.fromTo(`.j-s${i}`, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.1);
      }
    }, root);
    return () => ctx.revert();
  }, []);
  return (
  <section ref={root} aria-label="From farm to market" className="relative h-screen overflow-hidden text-bone" style={{ background: colors[0] }}>
    <p className="absolute left-10 top-24 font-display text-lg text-bone/70 md:left-[8vw]">From the farm to the market</p>
    <div className="absolute bottom-[18%] left-4 top-[30%] w-1 bg-bone/25 md:left-[5vw]"><div className="j-bar h-full w-full origin-top scale-y-0 bg-palm" /></div>
    {core.map((c, i) => (
      <div key={c.title} className={`j-s${i} absolute inset-0 flex flex-col justify-center pl-10 pr-6 md:px-[8vw]`} style={i ? { visibility: "hidden" } : undefined}>
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-none tracking-tight">{c.title}</h2>
        <p className="mt-6 max-w-xl text-xl text-bone/85">{c.text}</p>
      </div>
    ))}
  </section>
);
}
