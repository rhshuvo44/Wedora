import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";

const baseUrl = "https://wedora.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(weddingData.wedding.countdownDate),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
