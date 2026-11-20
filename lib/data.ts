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

export async function getFigures() {
  const d = await get<{ items?: { crop: string; count: number; unit?: string; plus?: boolean }[] }>(`*[_id=="cropFigures"][0]`);
  if (!d?.items?.length) return local.figures;
  return d.items.map((f, i) => ({
    crop: f.crop,
    count: f.count,
    color: colors[i % colors.length],
    label: `${f.count.toLocaleString("en-US")}${f.plus ? "+" : ""} ${f.unit ?? ""}`.trim(),
  }));
}

export async function getTeam() {
  const d = await get<{ legacyId?: string; name: string; role: string; photo?: unknown; bio?: string[] }[]>(`*[_type=="teamMember"]|order(order asc)`);
  if (!d?.length) return local.team.map((m) => ({ name: m.name, role: m.role, photo: `/images/team/${m.img}.jpg`, bio: bios[m.img] ?? [] }));
  return d.map((m) => ({
    name: m.name,
    role: m.role,
    bio: m.bio ?? [],
    photo: m.photo ? img(m.photo, 800) : `/images/team/${m.legacyId}.jpg`,
  }));
}