"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Item = {
  src?: string;
  video?: string;
  cap: string;
  w: number;
  h: number;
  isShort?: boolean;
};

const photos: Item[] = [
  // drone photos (put the files in public/images/drone/)
  { src: "/images/drone/stills/farm-aerial-01.jpg", cap: "Our farm from above", w: 1800, h: 1013 },
  { src: "/images/drone/stills/farm-aerial-02.jpg", cap: "Plantain rows, aerial view", w: 1800, h: 1013 },
  { video: "AkbYRBlnlLk", cap: "Farm tour", w: 1280, h: 720 },
  { src: "/images/drone/stills/farm-aerial-03.jpg", cap: "Team members walking the rows", w: 1800, h: 1013 },
  { src: "plantain-field-01", cap: "Plantain farm", w: 1200, h: 1600 },
  { src: "plantain-field-02", cap: "Plantain in the field", w: 1200, h: 1600 },
  { src: "plantain-harvest-01", cap: "Harvested plantain bunch", w: 1200, h: 1600 },
  { video: "hmqZdnbby1M", cap: "Plantain farm", w: 1280, h: 720, isShort: true },
  { src: "plantain-harvest-02", cap: "Harvested plantain bunches", w: 1200, h: 1600 },
  { src: "plantain-young-01", cap: "Young plantain", w: 1600, h: 1200 },
  { src: "plantain-young-02", cap: "Young plantain shoot", w: 1200, h: 1600 },
  { src: "plantain-cocoa-01", cap: "Plantain and cocoa grown together", w: 1200, h: 1600 },
  { src: "cocoa-seedling-02", cap: "Young cocoa", w: 1200, h: 1600 },
  { src: "cocoa-seedling-03", cap: "Young cocoa", w: 1200, h: 1600 },
];

const url = (s: string) => (s.startsWith("/") ? s : `/images/gallery/${s}.jpg`);
const thumb = (id: string) =>
`https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = photos.length;

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => ((o ?? 0) + 1) % n);
      if (e.key === "ArrowLeft") setOpen((o) => ((o ?? 0) - 1 + n) % n);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open, n]);

  const cur = open === null ? null : photos[open];

  return (
    <>
      <ul className="columns-2 gap-4 md:columns-3">
        {photos.map((p, i) => (
          <li key={p.video ?? p.src} className="mb-4 break-inside-avoid">
            <button onClick={() => setOpen(i)} aria-label={`${p.video ? "Play video" : "Open photo"}: ${p.cap}`} className="group relative block w-full overflow-hidden bg-forest">
              {p.video ? (
                <div className={`relative ${p.isShort ? "aspect-[9/16]" : "aspect-video"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(p.video)} alt={p.cap} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                    onError={(e) => { const t = e.currentTarget; if (!t.dataset.fb) { t.dataset.fb = "1"; t.src = `https://i.ytimg.com/vi/${p.video}/hqdefault.jpg`; } }} />
                  <span aria-hidden className="absolute inset-0 bg-forest/25" />
                  <span aria-hidden className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-palm text-bone transition-transform group-hover:scale-110 motion-reduce:transition-none">
                    <svg viewBox="0 0 24 24" className="size-6 fill-current"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="absolute left-3 top-3 bg-bone px-2 py-0.5 font-display text-xs font-semibold text-forest">Video</span>
                </div>
              ) : (
                <Image src={url(p.src!)} alt={p.cap} width={p.w} height={p.h} sizes="(min-width:768px) 30vw, 50vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.cap} onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/95 p-4">
          {cur.video ? (
            <iframe onClick={(e) => e.stopPropagation()} className="aspect-video w-[min(92vw,1100px)] border-0" title={cur.cap}
              src={`https://www.youtube-nocookie.com/embed/${cur.video}?autoplay=1&rel=0&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          ) : (
            <Image src={url(cur.src!)} alt={cur.cap} width={cur.w} height={cur.h} className="max-h-[85vh] w-auto object-contain" onClick={(e) => e.stopPropagation()} />
          )}
          <p className="absolute bottom-6 left-0 right-0 text-center font-display text-bone">{cur.cap} ({open! + 1} of {n})</p>
          <button autoFocus onClick={() => setOpen(null)} className="absolute right-5 top-5 border-2 border-bone px-4 py-2 font-display font-semibold text-bone hover:bg-bone hover:text-forest">Close</button>
        </div>
      )}
    </>
  );
}