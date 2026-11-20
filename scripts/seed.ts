import { createClient } from "@sanity/client";
import { site, figures, team, products, services } from "../lib/content";
import { bios } from "../lib/about";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: "production",
  apiVersion: "2025-01-01", token: process.env.SANITY_WRITE_TOKEN, useCdn: false,
});

async function main() {
  const s = site as unknown as Record<string, any>;
  const docs: any[] = [
    { _id: "siteSettings", _type: "siteSettings", phone: s.phone, email: s.emailOne ?? s.email, hours: s.hours, instagram: s.instagram, tiktok: s.tiktok,
      places: s.places.map((p: any, i: number) => ({ _key: `p${i}`, ...p })) },
    { _id: "cropFigures", _type: "cropFigures",
      items: figures.map((f, i) => ({ _key: `f${i}`, crop: f.crop, count: f.count, unit: f.label.replace(/^[\d,+]+\s*/, ""), plus: f.label.includes("+") })) },
    ...team.map((m, i) => ({ _id: `team-${m.img}`, _type: "teamMember", legacyId: m.img, name: m.name, role: m.role, order: i + 1,
      bio: (bios[m.img] ?? []) })),
    ...products.map((p, i) => ({ _id: `product-${p.slug}`, _type: "product", legacyImage: p.img, name: p.name, slug: { _type: "slug", current: p.slug },
      order: i + 1, region: p.region, farms: p.farms, who: p.who, avail: p.avail, text: p.text })),
    ...services.map((v, i) => ({ _id: `service-${i + 1}`, _type: "service", name: v.name, who: v.who, order: i + 1 })),
  ];
  for (const d of docs) await client.createOrReplace(d);
  console.log(`Seeded ${docs.length} documents`);
}
main().catch((e) => { console.error(e); process.exit(1); });