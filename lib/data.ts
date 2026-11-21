import { projectId, dataset, apiVersion } from "../sanity/lib/client";
import { img } from "../sanity/lib/image";
import * as local from "./content";
import { bios } from "./about";

async function get<T>(query: string): Promise<T | null> {
  try {
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return ((await res.json()) as { result: T }).result;
  } catch {
    return null;
  }
}

const colors = ["#a8b83a", "#6b3a22", "#e5501b", "#3f8f4a", "#12303a"];

/* ---------- site settings ---------- */
export type Site = {
  name: string; tagline: string; phone: string; emailOne: string; hours: string;
  instagram: string; tiktok: string; x?: string; places: { label: string; text: string }[];
};

export async function getSite(): Promise<Site> {
  const base = local.site as unknown as Site;
  const s = await get<{ phone?: string; email?: string; hours?: string; instagram?: string; tiktok?: string; x?: string; places?: { label: string; text: string }[] }>(`*[_id=="siteSettings"][0]`);
  if (!s) return base;
  return {
    ...base,
    phone: s.phone || base.phone,
    emailOne: s.email || base.emailOne,
    hours: s.hours || base.hours,
    instagram: s.instagram || base.instagram,
    tiktok: s.tiktok || base.tiktok,
    x: s.x || base.x,
    places: s.places?.length ? s.places.map(({ label, text }) => ({ label, text })) : base.places,
  };
}

/* ---------- crop figures and team (stage 1) ---------- */
export async function getFigures() {
  const d = await get<{ items?: { crop: string; count: number; unit?: string; plus?: boolean }[] }>(`*[_id=="cropFigures"][0]`);
  if (!d?.items?.length) return local.figures;
  return d.items.map((f, i) => ({
    crop: f.crop, count: f.count, color: colors[i % colors.length],
    label: `${f.count.toLocaleString("en-US")}${f.plus ? "+" : ""} ${f.unit ?? ""}`.trim(),
  }));
}

export async function getTeam() {
  const d = await get<{ legacyId?: string; name: string; role: string; photo?: unknown; bio?: string[] }[]>(`*[_type=="teamMember"]|order(order asc)`);
  if (!d?.length) return local.team.map((m) => ({ name: m.name, role: m.role, photo: `/images/team/${m.img}.jpg`, bio: bios[m.img] ?? [] }));
  return d.map((m) => ({ name: m.name, role: m.role, bio: m.bio ?? [], photo: m.photo ? img(m.photo, 800) : `/images/team/${m.legacyId}.jpg` }));
}

/* ---------- products ---------- */
export type Product = { slug: string; name: string; region: string; farms: string[]; who: string; avail: string; text: string; img: string };

export async function getProducts(): Promise<Product[]> {
  const d = await get<{ slug?: { current: string }; name: string; region?: string; farms?: string[]; who?: string; avail?: string; text?: string; photo?: unknown; legacyImage?: string }[]>(`*[_type=="product"]|order(order asc)`);
  if (!d?.length) return local.products as Product[];
  return d
    .map((p) => ({
      slug: p.slug?.current ?? "", name: p.name, region: p.region ?? "", farms: p.farms ?? [], who: p.who ?? "",
      avail: p.avail ?? "", text: p.text ?? "", img: p.photo ? img(p.photo, 1400) : p.legacyImage ?? "",
    }))
    .filter((p) => p.slug);
}

/* ---------- services ---------- */
export async function getServices() {
  const d = await get<{ name: string; who?: string }[]>(`*[_type=="service"]|order(order asc)`);
  if (!d?.length) return local.services;
  return d.map((s) => ({ name: s.name, who: s.who ?? "" }));
}

/* ---------- gallery ---------- */

export type GalleryItem = { src?: string; video?: string; isShort?: boolean; cap: string; w: number; h: number };

export const localGallery: GalleryItem[] = [
  { src: "/images/drone/farm-aerial-01.jpg", cap: "Our farm from above", w: 1800, h: 1013 },
  { src: "/images/drone/farm-oblique-04.jpg", cap: "Plantain rows, aerial view", w: 1800, h: 1013 },
  { src: "/images/drone/farm-workers-06.jpg", cap: "Team members walking the rows", w: 1800, h: 1013 },
  { src: "/images/gallery/plantain-field-01.jpg", cap: "Plantain farm", w: 1200, h: 1600 },
  { src: "/images/gallery/plantain-field-02.jpg", cap: "Plantain in the field", w: 1200, h: 1600 },
  { src: "/images/gallery/plantain-field-03.jpg", cap: "Plantain with flower stalk", w: 1200, h: 1600 },
  { src: "/images/gallery/plantain-harvest-01.jpg", cap: "Harvested plantain bunch", w: 1200, h: 1600 },
  { src: "/images/gallery/plantain-harvest-02.jpg", cap: "Harvested plantain bunches", w: 1200, h: 1600 },
  { src: "/images/gallery/plantain-young-01.jpg", cap: "Young plantain", w: 1600, h: 1200 },
  { src: "/images/gallery/plantain-young-02.jpg", cap: "Young plantain shoot", w: 1200, h: 1600 },
  { src: "/images/gallery/plantain-cocoa-01.jpg", cap: "Plantain and cocoa grown together", w: 1200, h: 1600 },
  { src: "/images/gallery/cocoa-seedling-02.jpg", cap: "Young cocoa", w: 1200, h: 1600 },
  { src: "/images/gallery/cocoa-seedling-03.jpg", cap: "Young cocoa", w: 1200, h: 1600 },
];

export async function getGallery(): Promise<GalleryItem[]> {
  const d = await get<{ caption?: string; video?: string; isShort?: boolean; url?: string; w?: number; h?: number }[]>(
  `*[_type=="galleryItem"]|order(order asc){caption, video, isShort, "url": photo.asset->url, "w": photo.asset->metadata.dimensions.width, "h": photo.asset->metadata.dimensions.height}`
);
// ...
  if (!d?.length) return localGallery;
  const items: GalleryItem[] = d
    .filter((i) => i.video || i.url)
    .map((i) => (i.video
      ? { video: i.video, isShort: !!i.isShort, cap: i.caption ?? "", w: 1280, h: 720 }
      : { src: `${i.url}?w=1400&auto=format`, cap: i.caption ?? "", w: i.w ?? 1200, h: i.h ?? 800 }));
  return items.length ? items : localGallery;
}