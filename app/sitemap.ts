import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://meric-agro.com";
  const pages = ["", "/about", "/about/purpose", "/about/story", "/about/leadership", "/products", "/services", "/partner", "/contact", "/privacy"];
  return pages.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: p === "" ? "weekly" : "monthly", priority: p === "" ? 1 : 0.8 }));
}