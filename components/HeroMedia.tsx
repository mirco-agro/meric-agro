"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroMedia({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!c?.saveData && !reduce) setSrc(window.innerWidth >= 768 ? "/videos/hero-desktop.mp4" : "/videos/hero-mobile.mp4");
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = true;
    v.defaultMuted = true;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [src, paused]);

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet="/videos/hero-desktop-poster.jpg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/videos/hero-mobile-poster.jpg" alt="Drone view of the Meric Agro farm" className="absolute inset-0 size-full object-cover" />
      </picture>
      {src && (
        <video ref={ref} src={src} autoPlay muted loop playsInline preload="auto" aria-hidden onPlaying={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${ready ? "opacity-100" : "opacity-0"}`} />
      )}
    </>
  );
}