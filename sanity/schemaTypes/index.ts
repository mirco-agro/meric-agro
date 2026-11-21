import { defineField, defineType } from "sanity";

const siteSettings = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone / WhatsApp (with country code, no spaces)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Public email address", type: "string", validation: (r) => r.required() }),
    defineField({ name: "hours", title: "Opening hours", type: "string" }),
    defineField({ name: "instagram", title: "Instagram link", type: "url" }),
    defineField({ name: "tiktok", title: "TikTok link", type: "url" }),
    defineField({ name: "x", title: "X (Twitter) link", type: "url" }),
    defineField({
      name: "places", title: "Addresses", type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "label", title: "Label (Office or Farm)", type: "string" }),
        defineField({ name: "text", title: "Address", type: "string" }),
      ] }],
    }),
  ],
});

const cropFigures = defineType({
  name: "cropFigures", title: "Crop figures", type: "document",
  fields: [
    defineField({
      name: "items", title: "Crops on record", type: "array", validation: (r) => r.min(1).max(5),
      of: [{ type: "object",
        preview: { select: { title: "crop", subtitle: "count" } },
        fields: [
          defineField({ name: "crop", title: "Crop", type: "string", validation: (r) => r.required() }),
          defineField({ name: "count", title: "Number on record", type: "number", validation: (r) => r.required().integer().min(0) }),
          defineField({ name: "unit", title: "Unit (stands or trees)", type: "string", initialValue: "stands" }),
          defineField({ name: "plus", title: "Show a + after the number", type: "boolean", initialValue: false }),
        ] }],
    }),
  ],
});

const teamMember = defineType({
  name: "teamMember", title: "Team member", type: "document",
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
  fields: [
    defineField({ name: "legacyId", type: "string", hidden: true }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Position", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order on the page (1 comes first)", type: "number" }),
    defineField({ name: "photo", title: "Photo (portrait)", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Biography (one paragraph per box)", type: "array", of: [{ type: "text", rows: 4 }] }),
  ],
});

const product = defineType({
  name: "product", title: "Product", type: "document",
  preview: { select: { title: "name", subtitle: "region", media: "photo" } },
  fields: [
    defineField({ name: "legacyImage", type: "string", hidden: true }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order on the page", type: "number" }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({ name: "farms", title: "Farms where it is grown", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "who", title: "Typical buyers", type: "text", rows: 2 }),
    defineField({ name: "avail", title: "Availability", type: "string" }),
    defineField({ name: "text", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
  ],
});

const service = defineType({
  name: "service", title: "Service", type: "document",
  preview: { select: { title: "name" } },
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "who", title: "Who we serve", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Order on the page", type: "number" }),
  ],
});

const galleryItem = defineType({
  name: "galleryItem", title: "Gallery item", type: "document",
  preview: { select: { title: "caption", media: "photo" } },
  fields: [
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "video", title: "YouTube video ID (instead of a photo)", type: "string" }),
    defineField({ name: "isShort", title: "This is a vertical video (YouTube Short)", type: "boolean", initialValue: false, hidden: ({ document }) => !document?.video }),
    defineField({ name: "caption", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order (1 comes first)", type: "number" }),
  ],
});

export const schemaTypes = [siteSettings, cropFigures, teamMember, product, service, galleryItem];