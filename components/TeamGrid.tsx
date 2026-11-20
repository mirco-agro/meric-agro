"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Member = { name: string; role: string; photo: string; bio: string[] };

export default function TeamGrid({ members }: { members: Member[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const m = open === null ? null : members[open];

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [open]);

  const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");

  return (
    <>
      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {members.map((p, i) => (
          <li key={p.name}>
            <div className="relative aspect-[4/5] overflow-hidden bg-forest">
              <span aria-hidden className="absolute inset-0 flex items-center justify-center font-display text-5xl font-extrabold text-bone/20">{initials(p.name)}</span>
              <Image src={p.photo} alt={p.name} fill sizes="(min-width:768px) 220px, 45vw" className="object-cover" />
            </div>
            <h3 className="mt-3 font-display text-lg font-bold leading-tight">{p.name}</h3>
            <p className="mt-1 text-sm leading-snug text-soil/75">{p.role}</p>
            {p.bio.length > 0 && (
              <button type="button" onClick={() => setOpen(i)} className="mt-2 font-display text-sm font-semibold underline decoration-palm decoration-2 underline-offset-4 hover:text-palm">View bio</button>
            )}
          </li>
        ))}
      </ul>

      {m && (
        <div role="dialog" aria-modal="true" aria-label={`${m.name}, biography`} onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-forest/85 md:items-center md:p-8">
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90svh] w-full max-w-4xl overflow-y-auto bg-bone md:grid md:grid-cols-[15rem_1fr]">
            <div className="relative aspect-[4/5] bg-forest md:aspect-auto md:min-h-[22rem]">
              <Image src={m.photo} alt="" fill sizes="(min-width:768px) 240px, 100vw" className="object-cover" />
            </div>
            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-extrabold leading-tight">{m.name}</h3>
                  <p className="mt-1 text-soil/75">{m.role}</p>
                </div>
                <button type="button" autoFocus onClick={() => setOpen(null)} className="shrink-0 border-2 border-soil px-4 py-2 font-display text-sm font-semibold hover:bg-soil hover:text-bone">Close</button>
              </div>
              <div className="mt-6 space-y-4">{m.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}