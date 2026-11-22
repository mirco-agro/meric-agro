"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stage } from "../lib/data";

const colors = ["#0b2b1c", "#3a2216", "#5a2a12", "#12303a"];

export default function Journey({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLElement>(null);
  const n = stages.length;

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
    }, root);

    return () => ctx.revert();
  }, [n]);

  return (
    <section
      ref={root}
      aria-label="From our soil to your market"
      className="group relative h-[100svh] overflow-hidden text-bone data-[static=true]:h-auto data-[static=true]:py-24"
      style={{ background: colors[0] }}
    >
      {colors.slice(1, n).map((c, k) => (
        <div key={c} aria-hidden className={`j-bg${k + 1} absolute inset-0 will-change-[opacity] group-data-[static=true]:hidden`} style={{ background: c, opacity: 0 }} />
      ))}

      <div className="absolute left-10 right-6 top-24 z-10 flex items-start justify-between gap-4 group-data-[static=true]:relative group-data-[static=true]:inset-x-0 group-data-[static=true]:top-0 md:left-[8vw] md:right-[8vw]">
        <h2 className="max-w-[15ch] font-display text-xl font-bold leading-tight md:max-w-none md:text-3xl">
          From our soil to your <span className="text-palm">market.</span>
        </h2>
        <p aria-hidden className="j-step shrink-0 font-display text-sm text-bone/75 group-data-[static=true]:hidden md:text-base">Step 1 of {n}</p>
      </div>

      <div aria-hidden className="absolute bottom-[14%] left-4 top-[26%] w-1 bg-bone/25 group-data-[static=true]:hidden md:left-[5vw]">
        <div className="j-bar h-full w-full origin-top scale-y-0 bg-palm will-change-transform" />
        {stages.map((c, k) => (
          <span key={c.title} data-on={k === 0 ? "true" : "false"} className="j-dot absolute left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/50 transition-all duration-300 data-[on=true]:scale-125 data-[on=true]:bg-palm" style={{ top: `${(k / (n - 1)) * 100}%` }} />
        ))}
      </div>

      {stages.map((c, i) => (
        <div
          key={c.title}
          data-stage
          className={`j-s${i} absolute inset-0 flex items-center pb-8 pl-10 pr-6 pt-36 md:px-[8vw] md:pt-32 group-data-[static=true]:relative group-data-[static=true]:inset-auto group-data-[static=true]:py-12`}
          style={i ? { visibility: "hidden" } : undefined}
        >
          <div className="grid w-full gap-8 md:grid-cols-[1.35fr_1fr] md:items-end md:gap-14">
            <div>
              <h3 className="font-display text-[clamp(2.3rem,7vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight">{c.title}</h3>
              <p className="mt-5 max-w-xl text-base text-bone/85 md:mt-7 md:text-xl">{c.text}</p>
            </div>
            <aside className="border border-bone/25 bg-black/20 p-5 md:p-7">
              <p className="flex items-center justify-between font-display text-sm text-bone/65">
                <span>Where we are</span>
                <span aria-hidden>Step {String(i + 1).padStart(2, "0")}</span>
              </p>
              <span className="mt-4 inline-block bg-palm px-3 py-1 font-display text-sm font-semibold">{c.status}</span>
              <p className="mt-4 text-base leading-relaxed md:text-lg">{c.line}</p>
            </aside>
          </div>
        </div>
      ))}
    </section>
  );
}