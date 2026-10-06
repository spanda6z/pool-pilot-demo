import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const paths = [
    "",
    "/books",
    "/launch",
    "/swap",
    "/portfolio",
    "/about",
    "/security",
    "/leaderboard",
    "/verify",
    "/terms",
    "/privacy",
  ];
  return paths.map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: new Date(),
    changeFrequency: p === "" || p === "/books" ? "hourly" : "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
