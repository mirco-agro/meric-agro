import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: "production",
  apiVersion: "2025-01-01", token: process.env.SANITY_WRITE_TOKEN, useCdn: false,
});

// file paths are relative to public/images/
const items: [string, string][] = [
  ["drone/farm-aerial-01.jpg", "Our farm from above"],
  ["drone/farm-oblique-04.jpg", "Plantain rows, aerial view"],
  ["drone/farm-workers-06.jpg", "Team members walking the rows"],
  ["gallery/plantain-field-01.jpg", "Plantain farm"],
  ["gallery/plantain-field-02.jpg", "Plantain in the field"],
  ["gallery/plantain-field-03.jpg", "Plantain with flower stalk"],
  ["gallery/plantain-harvest-01.jpg", "Harvested plantain bunch"],
  ["gallery/plantain-harvest-02.jpg", "Harvested plantain bunches"],
  ["gallery/plantain-young-01.jpg", "Young plantain"],
  ["gallery/plantain-young-02.jpg", "Young plantain shoot"],
  ["gallery/plantain-cocoa-01.jpg", "Plantain and cocoa grown together"],
  ["gallery/cocoa-seedling-02.jpg", "Young cocoa"],
  ["gallery/cocoa-seedling-03.jpg", "Young cocoa"],
];

async function main() {
  let order = 1;
  for (const [file, caption] of items) {
    const path = join(process.cwd(), "public", "images", file);
    if (!existsSync(path)) { console.log("skipped (file not found):", file); continue; }
    const asset = await client.assets.upload("image", createReadStream(path), { filename: file.split("/").pop() });
    await client.createOrReplace({
      _id: `gallery-${order}`, _type: "galleryItem", caption, order,
      photo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    });
    console.log("added:", caption);
    order++;
  }
}
main().catch((e) => { console.error(e); process.exit(1); });