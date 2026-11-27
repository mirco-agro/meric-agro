import { defineField, defineType, type FieldDefinition } from "sanity";

const siteSettings = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [
    defineField({ name: "phone", title: "Call number (with country code, no spaces)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "whatsapp", title: "WhatsApp number (with country code, no spaces)", type: "string" }),
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
    defineField({ name: "order", title: "Order on the page (1 comes first; leave empty to put this person last)", type: "number" }),
    defineField({ name: "photo", title: "Photo (portrait, face and shoulders)", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Biography (one paragraph per box)", type: "array", of: [{ type: "text", rows: 4 }] }),
  ],
});

const product = defineType({
  name: "product", title: "Product", type: "document",
  preview: { select: { title: "name", subtitle: "region", media: "photo" } },
  fields: [
    defineField({ name: "legacyImage", type: "string", hidden: true }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Web address (click Generate. Leave it as it is after the product is live.)", type: "slug", options: { source: "name" } }),
    defineField({ name: "order", title: "Order on the page (leave empty to put this product last)", type: "number" }),
    defineField({ name: "photo", title: "Photo (landscape or portrait, bright and clear)", type: "image", options: { hotspot: true }, validation: (r) => r.warning("A product without a photo shows 'Photo coming soon'") }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({ name: "farms", title: "Farms where it is grown", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "who", title: "Typical buyers", type: "text", rows: 2 }),
    defineField({ name: "avail", title: "Availability", type: "string" }),
    defineField({ name: "text", title: "Description", type: "text", rows: 5 }),
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

const s = (name: string, title: string) => defineField({ name, title, type: "string" });
const t = (name: string, title: string, rows = 3) => defineField({ name, title, type: "text", rows });
const strings = (name: string, title: string) => defineField({ name, title, type: "array", of: [{ type: "string" }] });
const items = (name: string, title: string, fields: FieldDefinition[], previewTitle: string) =>
  defineField({ name, title, type: "array", of: [{ type: "object", fields, preview: { select: { title: previewTitle } } }] });
const page = (name: string, title: string, fields: FieldDefinition[]) => defineType({ name, title, type: "document", fields });

const homePage = page("homePage", "Home page", [
  s("heroLine1", "Hero headline, line 1"), s("heroLine2", "Hero headline, line 2 (shown in orange)"), t("heroText", "Hero text under the headline"),
  s("introHeading", "Intro heading"), t("introText1", "Intro paragraph 1", 4), t("introText2", "Intro paragraph 2", 4),
]);
const journey = page("journey", "Journey section", [
  items("stages", "The four stages (keep exactly four)", [
    s("title", "Stage name"), t("text", "Description"), s("status", "Status tag, for example Live today"),
    t("line", "Where we are: one honest sentence. Type {crops} to show the live crop total."),
  ], "title"),
]);
const aboutPage = page("aboutPage", "About page", [
  t("heroIntro", "Opening text under the title"), t("intro", "Intro paragraph"), s("beliefHeading", "Big statement"),
  t("beliefText", "Text under the big statement"), s("videoHeading", "Video section heading"), t("videoText", "Video section text"),
  s("videoId", "YouTube video ID for the farm tour"),
]);
const purposePage = page("purposePage", "Our Purpose page", [
  t("heroIntro", "Opening text under the title"), t("mission", "Mission", 4), t("vision", "Vision", 4),
  items("outcomes", "The four outcomes", [s("title", "Outcome title"), s("tag", "Status tag"), strings("goals", "Goals in this outcome")], "title"),
  s("practiceHeading", "Heading: putting our purpose into practice"), t("practiceText", "Text for that section"),
]);
const storyPage = page("storyPage", "Our Story page", [
  t("heroIntro", "Opening text under the title"),
  items("story", "Story timeline", [s("label", "Heading"), t("text", "Text", 4)], "label"),
  t("strategy", "Long-term strategy text", 4), strings("stages", "Strategy steps, in order"),
]);
const commitment = page("commitment", "Commitment statement", [t("line1", "Big statement"), t("line2", "Paragraph", 4), t("line3", "Closing line", 2)]);
const partnerPage = page("partnerPage", "Farmer Partnership page", [
  strings("intro", "Opening paragraphs"),
  items("models", "Partnership models", [s("name", "Name"), t("text", "Description", 4), t("who", "Suitable for", 2)], "name"),
  items("gains", "What farmers gain", [s("t", "Title"), t("d", "Text", 2)], "t"),
  strings("expects", "What we expect from partners"), t("note", "Note under the benefits", 2),
]);
const contactPage = page("contactPage", "Contact page text", [s("heading", "Page heading"), t("note", "Helper text under the contact details", 2)]);

const seoPages: [string, string][] = [["home", "Home"], ["about", "About Us"], ["purpose", "Our Purpose"], ["story", "Our Story"], ["leadership", "Our Leadership"], ["products", "Products"], ["services", "Services"], ["partner", "Farmer Partnership"], ["contact", "Contact"]];
const seoSettings = defineType({
  name: "seoSettings", title: "Search engine text", type: "document",
  fields: seoPages.flatMap(([k, label]) => [
    defineField({ name: `${k}Title`, title: `${label}: title (about 60 characters)`, type: "string", validation: (r) => r.max(70).warning("Over 70 characters may be cut off on Google") }),
    defineField({ name: `${k}Description`, title: `${label}: description (about 155 characters)`, type: "text", rows: 2, validation: (r) => r.max(170).warning("Over 170 characters may be cut off on Google") }),
  ]),
});

export const schemaTypes = [siteSettings, cropFigures, teamMember, product, service, galleryItem,
  homePage, journey, aboutPage, purposePage, storyPage, commitment, partnerPage, contactPage];