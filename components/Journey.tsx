"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { core } from "../lib/content";

const colors = ["#0b2b1c", "#3a2216", "#5a2a12", "#12303a"];

const meta = [
  { status: "Live today", line: "31,000+ oil palm, cocoa and plantain crops on record across our farms in Onipe and Onigambari, Ibadan, Oyo State.", audience: "buyers", cta: "Request a Quote", href: "/products" },
  { status: "Growing", line: "Building relationships with farmers and suppliers beyond our own farms.", audience: "farmers and landowners", cta: "Join the partnership programme", href: "/partner" },
  { status: "In development", line: "Plans for palm oil, cocoa and plantain products. Not yet established production lines.", audience: "processors and brands", cta: "Discuss a partnership", href: "/contact" },
  { status: "Building", line: "Supply relationships with wholesalers, distributors, retailers and food manufacturers.", audience: "wholesalers and distributors", cta: "Talk to us", href: "/contact" },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const el = root.current!;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.static = "true";
      el.querySelectorAll<HTMLElement>("[data-stage]").forEach((s) => (s.style.visibility = "visible"));
      return;
    }

    const ctx = gsap.context(() => {
      const n = core.length;
      const label = el.querySelector<HTMLElement>(".j-step")!;
      const dots = gsap.utils.toArray<HTMLElement>(".j-dot", el);
      let cur = -1;
      const mark = (i: number) => {
        if (i === cur) return;
        cur = i;
        label.textContent = `Step ${i + 1} of ${n}`;
        dots.forEach((d, k) => (d.dataset.on = String(k <= i)));
      };
      mark(0);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el, start: "top top", end: `+=${n * 80}%`, scrub: true, pin: true, anticipatePin: 1,
          onUpdate: (s) => mark(Math.min(n - 1, Math.floor(s.progress * n))),
        },
      });

      tl.to(".j-bar", { scaleY: 1, duration: n - 1 }, 0);
      for (let i = 1; i < n; i++) {
        tl.to(`.j-bg${i}`, { opacity: 1, duration: 0.5 }, i - 0.3)
          .to(`.j-s${i - 1}`, { autoAlpha: 0, y: -40, duration: 0.25, ease: "power1.in" }, i - 0.3)
          .fromTo(`.j-s${i}`, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, i - 0.05);
      }
      tl.to({}, { duration: 1 - (n - 1 + 0) + 1 - 1 }, n); // no-op spacer, keeps total length = n
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-label="From our soil to your market"
      className="group relative h-[100svh] overflow-hidden text-bone data-[static=true]:h-auto data-[static=true]:py-24"
      style={{ background: colors[0] }}
    >
      {colors.slice(1).map((c, k) => (
        <div key={c} aria-hidden className={`j-bg${k + 1} absolute inset-0 will-change-[opacity] group-data-[static=true]:hidden`} style={{ background: c, opacity: 0 }} />
      ))}

      <div className="absolute left-10 right-6 top-24 z-10 flex items-start justify-between gap-4 group-data-[static=true]:relative group-data-[static=true]:inset-x-0 group-data-[static=true]:top-0 md:left-[8vw] md:right-[8vw]">
        <h2 className="max-w-[15ch] font-display text-xl font-bold leading-tight md:max-w-none md:text-3xl">
          From our soil to your <span className="text-palm">market.</span>
        </h2>
        <p aria-hidden className="j-step shrink-0 font-display text-sm text-bone/75 group-data-[static=true]:hidden md:text-base">Step 1 of {core.length}</p>
      </div>

      <div aria-hidden className="absolute bottom-[14%] left-4 top-[26%] w-1 bg-bone/25 group-data-[static=true]:hidden md:left-[5vw]">
        <div className="j-bar h-full w-full origin-top scale-y-0 bg-palm will-change-transform" />
        {core.map((c, k) => (
          <span key={c.title} data-on={k === 0 ? "true" : "false"} className="j-dot absolute left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/50 transition-all duration-300 data-[on=true]:scale-125 data-[on=true]:bg-palm" style={{ top: `${(k / (core.length - 1)) * 100}%` }} />
        ))}
      </div>

      {core.map((c, i) => (
        <div
          key={c.title}
          data-stage
          className={`j-s${i} absolute inset-0 flex flex-col justify-center pb-6 pl-10 pr-6 pt-32 md:px-[8vw] md:pt-28 group-data-[static=true]:relative group-data-[static=true]:inset-auto group-data-[static=true]:py-12`}
          style={i ? { visibility: "hidden" } : undefined}
        >
          <h3 className="font-display text-[clamp(2.3rem,8vw,7rem)] font-extrabold leading-[0.95] tracking-tight">{c.title}</h3>
          <p className="mt-4 max-w-xl text-base text-bone/85 md:mt-6 md:text-xl">{c.text}</p>
          <dl className="mt-6 grid max-w-3xl gap-4 border-t border-bone/25 pt-5 text-base md:mt-8 md:grid-cols-2 md:gap-10">
            <div>
              <dt className="font-display text-sm text-bone/60">Where we are</dt>
              <dd className="mt-1.5">
                <span className="mr-2 inline-block bg-palm px-2.5 py-0.5 font-display text-sm font-semibold">{meta[i].status}</span>
                {meta[i].line}
              </dd>
            </div>
            <div>
              <dt className="font-display text-sm text-bone/60">For {meta[i].audience}</dt>
              <dd className="mt-1.5">
                <a href={meta[i].href} className="inline-block border-2 border-bone px-5 py-2.5 font-display font-semibold hover:bg-bone hover:text-forest">{meta[i].cta}</a>
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </section>
  );
}