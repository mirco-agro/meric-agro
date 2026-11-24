import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const live = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (!live) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/quote/", "/api/"] }, sitemap: `${live}/sitemap.xml` };
}