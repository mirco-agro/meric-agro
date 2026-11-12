"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "../lib/content";

const nav = [["About", "/about"], ["Products", "/products"], ["Services", "/services"], ["Partnership", "/partner"], ["Contact", "/contact"]];
const mobileNav = [["Home", "/"], ...nav];
const ease = "cubic-bezier(.77,0,.18,1)";
const OPEN = "circle(150% at calc(100% - 46px) 30px)";
const CLOSED = "circle(0px at calc(100% - 46px) 30px)";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const current = path.startsWith("/quote") ? "/products" : path;
  const on = (h: string) => (h === "/" ? current === "/" : current === h || current.startsWith(h + "/"));

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const resize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", key); window.removeEventListener("resize", resize); };
  }, [open]);

  const bar = "absolute right-0 block h-0.5 transition-all duration-500 motion-reduce:transition-none";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-bone transition-colors duration-500 md:px-[8vw] ${open ? "bg-transparent" : "bg-forest/90 backdrop-blur"}`}>
        <a href="/" className="flex items-center gap-3 font-display font-bold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" className="h-9 w-auto" />
          Meric Agro
        </a>

        <nav aria-label="Main" className="hidden gap-8 font-display md:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} aria-current={on(h) ? "page" : undefined}
              className={`relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-palm after:transition-transform after:duration-300 motion-reduce:after:transition-none ${on(h) ? "text-palm after:scale-x-100" : "after:scale-x-0 hover:text-palm hover:after:scale-x-100"}`}>
              {l}
            </a>
          ))}
        </nav>

        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} className="relative size-11 md:hidden">
          <span aria-hidden className={`absolute inset-0 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none ${open ? "scale-100 rotate-90 border-palm opacity-100" : "scale-50 border-bone/30 opacity-0"}`} />
          <span aria-hidden className="absolute left-1/2 top-1/2 block h-4 w-6 -translate-x-1/2 -translate-y-1/2">
            <i className={`${bar} ${open ? "top-[7px] w-6 rotate-45 bg-palm" : "top-0 w-6 bg-bone"}`} />
            <i className={`${bar} top-[7px] bg-bone ${open ? "w-0 opacity-0" : "w-4"}`} />
            <i className={`${bar} ${open ? "top-[7px] w-6 -rotate-45 bg-palm" : "top-[14px] w-5 bg-bone"}`} />
          </span>
        </button>
      </header>

      <div id="mobile-menu" inert={!open} aria-hidden={!open} className="fixed inset-0 z-40 md:hidden">
        <div aria-hidden className="absolute inset-0 bg-palm motion-reduce:transition-none" style={{ clipPath: open ? OPEN : CLOSED, transition: `clip-path 0.9s ${ease}` }} />
        <div aria-hidden className="absolute inset-0 bg-forest motion-reduce:transition-none" style={{ clipPath: open ? OPEN : CLOSED, transition: `clip-path 0.9s ${ease}`, transitionDelay: open ? "130ms" : "0ms" }} />

        <nav aria-label="Mobile" className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28 text-bone">
          <ul>
            {mobileNav.map(([l, h], i) => (
              <li key={h} className="overflow-hidden">
                <a href={h} onClick={() => setOpen(false)} aria-current={on(h) ? "page" : undefined}
                  className={`flex items-center gap-4 py-1.5 font-display text-5xl font-extrabold tracking-tight transition-transform duration-700 motion-reduce:transition-none ${on(h) ? "text-palm" : "text-bone"} ${open ? "translate-y-0" : "translate-y-[115%]"}`}
                  style={{ transitionDelay: open ? `${380 + i * 70}ms` : "0ms", transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}>
                  {l}
                  {on(h) && <span aria-hidden className="h-1 w-10 bg-palm" />}
                </a>
              </li>
            ))}
          </ul>

          <div className={`space-y-5 transition-all duration-700 mt-2 motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: open ? "900ms" : "0ms" }}>
            <a href="/products" onClick={() => setOpen(false)} className="inline-block bg-palm px-7 py-3 font-display font-semibold">Request a Quote</a>
            <p className="text-bone/70 flex flex-col gap-0">
              <a href={`tel:${site.phone}`}>+234 907 885 7329</a>
              <a href={`mailto:${site.emailOne}`}>{site.emailOne}</a>
              <a href={`mailto:${site.emailTwo}`}>{site.emailTwo}</a>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}