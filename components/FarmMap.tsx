"use client";
import { useState } from "react";

type Point = { label: string; text: string; coords: string; satellite: boolean };

export default function FarmMap({ points }: { points: Point[] }) {
  const [i, setI] = useState(0);
  const p = points[i];
  const q = p.coords.trim() || p.text;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${p.satellite ? 16 : 17}${p.satellite ? "&t=k" : ""}&output=embed`;
  const open = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  return (
    <div>
      <div role="tablist" aria-label="Locations" className="flex flex-wrap gap-2 font-display">
        {points.map((x, k) => (
          <button key={x.text} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`border-2 px-4 py-2 text-sm font-semibold ${k === i ? "border-palm bg-palm text-bone" : "border-soil hover:bg-soil hover:text-bone"}`}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="relative mt-4 aspect-[4/3] overflow-hidden bg-forest md:aspect-[16/9]">
        <iframe key={src} title={`Map: ${p.label}`} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="absolute inset-0 size-full border-0" />
      </div>
      <p className="mt-3 text-base">
        {p.text}{" "}
        <a href={open} target="_blank" rel="noreferrer" className="font-semibold underline decoration-palm decoration-2 underline-offset-4">Open in Google Maps</a>
      </p>
    </div>
  );
}