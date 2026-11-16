"use client";
import { useEffect, useState } from "react";

export default function HeroMedia() {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = c?.saveData || /2g/.test(c?.effectiveType ?? "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!slow && !reduce) setSrc(window.innerWidth >= 768 ? "/videos/hero-desktop.mp4" : "/videos/hero-mobile.mp4");
  }, []);

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet="/videos/hero-desktop-poster.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/videos/hero-mobile-poster.jpg" alt="Drone view of the Meric Agro farm" className="absolute inset-0 size-full object-cover" />
      </picture>
      {src && (
        <video src={src} autoPlay muted loop playsInline preload="auto" aria-hidden onCanPlay={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${ready ? "opacity-100" : "opacity-0"}`} />
      )}
    </>
  );
}