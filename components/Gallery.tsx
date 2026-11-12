"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "plantain-field-01", cap: "Plantain farm", w: 1200, h: 1600 },
  { src: "plantain-field-02", cap: "Plantain in the field", w: 1200, h: 1600 },
  { src: "plantain-field-03", cap: "Plantain with flower stalk", w: 1200, h: 1600 },
  { src: "plantain-harvest-01", cap: "Harvested plantain bunch", w: 1200, h: 1600 },
  { src: "plantain-harvest-02", cap: "Harvested plantain bunches", w: 1200, h: 1600 },
  { src: "plantain-young-01", cap: "Young plantain", w: 1600, h: 1200 },
  { src: "plantain-young-02", cap: "Young plantain shoot", w: 1200, h: 1600 },
  { src: "plantain-cocoa-01", cap: "Plantain and cocoa grown together", w: 1200, h: 1600 },
  { src: "cocoa-seedling-02", cap: "Young cocoa", w: 1200, h: 1600 },
  { src: "cocoa-seedling-03", cap: "Young cocoa", w: 1200, h: 1600 },
];

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
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, n]);

  return (
    <>
      <ul className="columns-2 gap-4 md:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-4 break-inside-avoid">
            <button onClick={() => setOpen(i)} aria-label={`Open photo: ${p.cap}`} className="group relative block w-full overflow-hidden bg-forest">
              <Image src={`/images/gallery/${p.src}.jpg`} alt={p.cap} width={p.w} height={p.h} sizes="(min-width:768px) 30vw, 50vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={photos[open].cap} onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/95 p-4">
          <Image src={`/images/gallery/${photos[open].src}.jpg`} alt={photos[open].cap} width={photos[open].w} height={photos[open].h}
            className="max-h-[85vh] w-auto object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-6 left-0 right-0 text-center font-display text-bone">{photos[open].cap} ({open + 1} of {n})</p>
          <button autoFocus onClick={() => setOpen(null)} className="absolute right-5 top-5 border-2 border-bone px-4 py-2 font-display font-semibold text-bone hover:bg-bone hover:text-forest">Close</button>
        </div>
      )}
    </>
  );
}