import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const live = process.env.NEXT_PUBLIC_SITE_URL;
  if (!live) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/quote/"] }, sitemap: `${live}/sitemap.xml` };
}