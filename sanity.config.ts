import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { projectId, dataset } from "./sanity/lib/client";

// content the client may edit but not add or delete
const locked = ["siteSettings", "cropFigures", "teamMember", "product", "service",
  "homePage", "journey", "aboutPage", "purposePage", "storyPage", "commitment", "partnerPage", "contactPage"];
export default defineConfig({
  name: "meric-agro", title: "Meric Agro", projectId, dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes, templates: (t) => t.filter((x) => !locked.includes(x.schemaType)) },
  document: {
    actions: (prev, { schemaType }) =>
      locked.includes(schemaType) ? prev.filter(({ action }) => !["delete", "duplicate", "unpublish"].includes(action ?? "")) : prev,
  },
});