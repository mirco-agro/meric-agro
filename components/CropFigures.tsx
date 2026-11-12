"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { figures, figuresNote } from "../lib/content";
import { pad, h2 } from "../lib/ui";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const total = figures.reduce((s, f) => s + f.count, 0);
const max = Math.max(...figures.map((f) => f.count));

export default function CropFigures() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const set = (el: HTMLElement, v: number) => { el.textContent = fmt(v) + (el.dataset.plus ? "+" : ""); };
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const totalEl = root.current!.querySelector<HTMLElement>("[data-total]")!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      set(totalEl, 0);
      rows.forEach((r) => set(r.querySelector<HTMLElement>("[data-count]")!, 0));
      gsap.set(".bar", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".chip", { left: "0%", x: 0, xPercent: 0 });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          const t = { v: 0 };
          tl.to(t, { v: total, duration: 2.4, ease: "power2.out", onUpdate: () => set(totalEl, t.v) }, 0);
          rows.forEach((row, i) => {
            const at = 0.2 + i * 0.25;
            const n = row.querySelector<HTMLElement>("[data-count]")!;
            const o = { v: 0 };
            tl.to(row.querySelector(".bar"), { scaleX: 1, duration: 1.8, ease: "power3.out" }, at)
              .to(row.querySelector(".chip"), { left: "100%", xPercent: -100, duration: 1.8, ease: "power3.out" }, at)
              .to(o, { v: +n.dataset.count!, duration: 1.8, ease: "power3.out", onUpdate: () => set(n, o.v) }, at);
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`${pad} bg-forest text-bone`}>
      <h2 className={h2}>
        <span data-total data-plus="1">{fmt(total)}+</span> crops on record
      </h2>
      <div className="mt-14 space-y-6">
        {figures.map((f) => (
          <div key={f.crop} data-row className="grid grid-cols-[6rem_1fr] items-center gap-4 md:grid-cols-[9rem_1fr]">
            <span className="font-display text-xl font-bold">{f.crop}</span>
            <div className="relative h-14" style={{ width: `${(f.count / max) * 100}%` }}>
              <span className="sr-only">{f.crop}: {f.label}</span>
              <div aria-hidden className="bar absolute inset-0" style={{ background: f.color }} />
              <div aria-hidden className="chip absolute inset-y-0 flex items-center" style={{ left: "100%", transform: "translateX(-100%)" }}>
                <span className="mx-2 whitespace-nowrap bg-bone px-3 py-1.5 font-display font-bold text-black">
                  <span data-count={f.count} {...(f.label.includes("+") ? { "data-plus": "1" } : {})}>{fmt(f.count)}{f.label.includes("+") ? "+" : ""}</span>{" "}
                  {f.label.replace(/^[\d,+]+\s*/, "")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-base text-bone/70">Farm locations: Onipe and Onigambari, Oyo State. {figuresNote}</p>
    </section>
  );
}