"use client";
import { usePathname } from "next/navigation";

const tabs = [["Overview", "/about"], ["Our Purpose", "/about/purpose"], ["Our Story", "/about/story"], ["Our Leadership", "/about/leadership"]];

export default function AboutNav() {
  const path = usePathname();
  const here = tabs.find((t) => t[1] === path)?.[0];
  return (
    <div className="sticky top-[64px] z-30 border-b border-soil/15 bg-bone/95 px-6 py-3 backdrop-blur md:px-[8vw]">
      <p className="text-sm">
        <a href="/" className="hover:text-palm">Home</a> / <a href="/about" className="hover:text-palm">About Us</a>
        {here && here !== "Overview" && <> / <strong>{here}</strong></>}
      </p>
      <nav aria-label="About" className="mt-2 flex gap-6 overflow-x-auto font-display">
        {tabs.map(([l, h]) => (
          <a key={h} href={h} aria-current={path === h ? "page" : undefined}
            className={`whitespace-nowrap border-b-2 pb-1 ${path === h ? "border-palm text-palm" : "border-transparent hover:text-palm"}`}>{l}</a>
        ))}
      </nav>
    </div>
  );
}
