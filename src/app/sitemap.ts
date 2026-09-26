import type { MetadataRoute } from "next";

const baseUrl = "https://wedora.example.com";
const lastModified = new Date("2025-10-24T16:00:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
