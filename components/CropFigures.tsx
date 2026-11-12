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
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = root.current!;
    const ease = gsap.parseEase("power3.out");
    const clamp = gsap.utils.clamp(0, 1);
    const totalEl = el.querySelector<HTMLElement>("[data-total]")!;
    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-row]")).map((row) => {
      const num = row.querySelector<HTMLElement>("[data-count]")!;
      return {
        bar: row.querySelector<HTMLElement>(".bar")!,
        chip: row.querySelector<HTMLElement>(".chip")!,
        num,
        count: +num.dataset.count!,
        plus: !!num.dataset.plus,
        shown: -1,
        travel: 0,
      };
    });

    // lock sizes first, so changing digits can never reflow the page
    totalEl.style.display = "inline-block";
    totalEl.style.minWidth = `${totalEl.getBoundingClientRect().width}px`;
    rows.forEach((r) => {
      const w = r.chip.getBoundingClientRect().width;
      r.chip.style.width = `${w}px`;
      r.travel = r.chip.parentElement!.getBoundingClientRect().width - w;
    });

    let totalShown = -1;
    const render = (p: number) => {
      const t = Math.round(total * ease(clamp(p)));
      if (t !== totalShown) { totalShown = t; totalEl.textContent = `${fmt(t)}+`; }
      rows.forEach((r, i) => {
        const rp = ease(clamp((p - i * 0.12) / 0.76));
        r.bar.style.transform = `scaleX(${rp})`;
        r.chip.style.transform = `translate3d(${-(1 - rp) * r.travel}px,0,0)`;
        const v = Math.round(r.count * rp);
        if (v !== r.shown) { r.shown = v; r.num.textContent = fmt(v) + (r.plus ? "+" : ""); }
      });
    };

    const finish = () => {
      render(1);
      totalEl.style.minWidth = "";
      rows.forEach((r) => { r.bar.style.transform = ""; r.chip.style.transform = ""; r.chip.style.width = ""; });
    };

    render(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const s = { p: 0 };
        gsap.to(s, { p: 1, duration: 2.6, ease: "none", onUpdate: () => render(s.p), onComplete: finish });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={root} className={`${pad} bg-forest text-bone`}>
      <h2 className={h2}>
        <span data-total className="tabular-nums">{fmt(total)}+</span> crops on record
      </h2>
      <div className="mt-14 space-y-6">
        {figures.map((f) => (
          <div key={f.crop} data-row className="grid grid-cols-[6rem_1fr] items-center gap-4 md:grid-cols-[9rem_1fr]">
            <span className="font-display text-xl font-bold">{f.crop}</span>
            <div className="relative h-14" style={{ width: `${(f.count / max) * 100}%` }}>
              <span className="sr-only">{f.crop}: {f.label}</span>
              <div aria-hidden className="bar absolute inset-0 origin-left will-change-transform" style={{ background: f.color }} />
              <div aria-hidden className="chip absolute inset-y-0 right-0 flex items-center will-change-transform">
                <span className="mx-2 whitespace-nowrap bg-bone px-3 py-1.5 font-display font-bold tabular-nums text-black">
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