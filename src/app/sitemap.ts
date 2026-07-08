import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { navItems } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...navItems
      .filter((item) => item.href !== "#home")
      .map((item) => ({
        url: `${siteConfig.url}/${item.href}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
