import { projectId, dataset, apiVersion } from "../sanity/lib/client";
import { img } from "../sanity/lib/image";
import * as local from "./content";
import { bios, outcomes as localOutcomes } from "./about";


const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
async function get<T>(query: string): Promise<T | null> {
  try {
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, { next: { revalidate: 300, tags: ["sanity"] } });
    if (!res.ok) return null;
    return ((await res.json()) as { result: T }).result;
  } catch {
    return null;
  }
}



const colors = ["#a8b83a", "#6b3a22", "#e5501b", "#3f8f4a", "#12303a"];

/* ---------- site settings ---------- */
export type Site = {
  name: string; tagline: string; phone: string; whatsapp: string; emailOne: string; hours: string;
  instagram: string; tiktok: string; x?: string; places: { label: string; text: string }[];
};

export async function getSite(): Promise<Site> {
  const base = local.site as unknown as Site;
  const s = await get<{ phone?: string; email?: string; hours?: string; instagram?: string; whatsapp?: string; tiktok?: string; x?: string; places?: { label: string; text: string }[] }>(`*[_id=="siteSettings"][0]`);
  if (!s) return base;
  return {
    ...base,
    phone: s.phone || base.phone,
    whatsapp: s.whatsapp || base.whatsapp,
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
  const d = await get<{ legacyId?: string; name: string; role: string; photo?: unknown; bio?: string[] }[]>(`*[_type=="teamMember"]|order(coalesce(order, 999) asc, name asc)`);
  if (!d?.length) return local.team.map((m) => ({ name: m.name, role: m.role, photo: `/images/team/${m.img}.jpg`, bio: bios[m.img] ?? [] }));
  return d.map((m) => ({
    name: m.name, role: m.role, bio: m.bio ?? [],
    photo: m.photo ? img(m.photo, 800) : m.legacyId ? `/images/team/${m.legacyId}.jpg` : "",
  }));
}

/* ---------- products ---------- */
export type Product = { slug: string; name: string; region: string; farms: string[]; who: string; avail: string; text: string; img: string };

export async function getProducts(): Promise<Product[]> {
  const d = await get<{ slug?: { current: string }; name: string; region?: string; farms?: string[]; who?: string; avail?: string; text?: string; photo?: unknown; legacyImage?: string }[]>(`*[_type=="product"]|order(coalesce(order, 999) asc, name asc)`);
  if (!d?.length) return local.products as Product[];
  return d.map((p) => ({
    slug: p.slug?.current || slugify(p.name), name: p.name, region: p.region ?? "", farms: p.farms ?? [], who: p.who ?? "",
    avail: p.avail ?? "", text: p.text ?? "", img: p.photo ? img(p.photo, 1400) : p.legacyImage ?? "",
  }));
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
  { src: "/images/drone/stills/farm-aerial-01.jpg", cap: "Our farm from above", w: 1800, h: 1013 },
{ src: "/images/drone/stills/farm-aerial-02.jpg", cap: "Plantain rows, aerial view", w: 1800, h: 1013 },
{ src: "/images/drone/stills/farm-aerial-03.jpg", cap: "Team members walking the rows", w: 1800, h: 1013 },
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

/* ---------- page text (stage 3) ---------- */
const val = <T,>(a: T | null | undefined, b: T): T =>
  a == null || (typeof a === "string" && !a.trim()) || (Array.isArray(a) && !a.length) ? b : a;

export async function getHome() {
  const d = await get<Record<string, string>>(`*[_id=="homePage"][0]`);
  return {
    heroLine1: val(d?.heroLine1, "Growing value."), heroLine2: val(d?.heroLine2, "Harvesting the future."),
    heroText: val(d?.heroText, "Oil palm, cocoa and plantain, grown on our farms in Onipe and Onigambari, Ibadan, Oyo State."),
    introHeading: val(d?.introHeading, "We are building agriculture that adds value at every step."),
    introText1: val(d?.introText1, local.about[0]), introText2: val(d?.introText2, local.about[1]),
  };
}

export type Stage = { title: string; text: string; status: string; line: string };
const journeyMeta = [
  { status: "Live today", line: "{crops} oil palm, cocoa and plantain crops on record across our farms in Onipe and Onigambari, Ibadan, Oyo State." },
  { status: "Growing", line: "Building relationships with farmers and suppliers beyond our own farms." },
  { status: "In development", line: "Plans for palm oil, cocoa and plantain products. Not yet established production lines." },
  { status: "Building", line: "Supply relationships with wholesalers, distributors, retailers and food manufacturers." },
];

export async function getJourney(): Promise<Stage[]> {
  const [d, figs] = await Promise.all([get<{ stages?: Partial<Stage>[] }>(`*[_id=="journey"][0]`), getFigures()]);
  const crops = `${(Math.floor(figs.reduce((s, f) => s + f.count, 0) / 1000) * 1000).toLocaleString("en-US")}+`;
  const fallback: Stage[] = local.core.map((c, i) => ({ title: c.title, text: c.text, ...journeyMeta[i] }));
  const list: Stage[] = d?.stages && d.stages.length >= 4
    ? d.stages.slice(0, 4).map((s, i) => ({ title: s.title ?? fallback[i].title, text: s.text ?? "", status: s.status ?? "", line: s.line ?? "" }))
    : fallback;
  return list.map((s) => ({ ...s, line: s.line.replace("{crops}", crops) }));
}

export async function getAbout() {
  const d = await get<Record<string, string>>(`*[_id=="aboutPage"][0]`);
  return {
    heroIntro: val(d?.heroIntro, local.about[0]), intro: val(d?.intro, local.about[1]),
    beliefHeading: val(d?.beliefHeading, "We believe agriculture is more than cultivation."),
    beliefText: val(d?.beliefText, "It is an opportunity to create economic value, support food security, generate employment and develop sustainable businesses around the resources our land provides."),
    videoHeading: val(d?.videoHeading, "See our farm from above"),
    videoText: val(d?.videoText, "A drone tour of our plantain and cocoa fields in Ibadan, Oyo State."),
    videoId: val(d?.videoId, local.farmVideo.id),
  };
}

export async function getPurpose() {
  const d = await get<{ heroIntro?: string; mission?: string; vision?: string; outcomes?: { title: string; tag?: string; goals?: string[] }[]; practiceHeading?: string; practiceText?: string }>(`*[_id=="purposePage"][0]`);
  return {
    heroIntro: val(d?.heroIntro, "Building a Nigerian agribusiness that creates value from cultivation through to the finished product."),
    mission: val(d?.mission, local.mission), vision: val(d?.vision, local.vision),
    outcomes: d?.outcomes?.length
      ? d.outcomes.map((o, i) => ({ title: o.title, tag: o.tag ?? "", goals: o.goals ?? [], img: localOutcomes[i]?.img ?? "" }))
      : localOutcomes,
    practiceHeading: val(d?.practiceHeading, "Putting our purpose into practice"),
    practiceText: val(d?.practiceText, local.partner.intro[1]),
  };
}

export async function getStory() {
  const d = await get<{ heroIntro?: string; story?: { label: string; text: string }[]; strategy?: string; stages?: string[] }>(`*[_id=="storyPage"][0]`);
  return {
    heroIntro: val(d?.heroIntro, "From an agricultural investment to an integrated agribusiness vision."),
    story: val(d?.story, local.story), strategy: val(d?.strategy, local.strategy), stages: val(d?.stages, local.stages),
  };
}

export async function getCommitment() {
  const d = await get<Record<string, string>>(`*[_id=="commitment"][0]`);
  return { line1: val(d?.line1, local.commitment[0]), line2: val(d?.line2, local.commitment[1]), line3: val(d?.line3, local.about[2]) };
}

export async function getPartner() {
  const d = await get<{ intro?: string[]; models?: { name: string; text: string; who: string }[]; gains?: { t: string; d: string }[]; expects?: string[]; note?: string }>(`*[_id=="partnerPage"][0]`);
  return {
    intro: val(d?.intro, local.partner.intro), models: val(d?.models, local.partner.models), gains: val(d?.gains, local.partner.gains),
    expects: val(d?.expects, local.partner.expects), note: val(d?.note, local.partner.note),
  };
}

export async function getContact() {
  const d = await get<{ heading?: string; note?: string }>(`*[_id=="contactPage"][0]`);
  return {
    heading: val(d?.heading, "Let’s create value across the agricultural value chain."),
    note: val(d?.note, "Looking for a price? Use the Request a Quote button on a product."),
  };
}

export async function getSeoMeta(key: string, fallback: { title: string; description: string }) {
  const d = await get<Record<string, string>>(`*[_id=="seoSettings"][0]`);
  return { title: d?.[`${key}Title`]?.trim() || fallback.title, description: d?.[`${key}Description`]?.trim() || fallback.description };
}