import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://meridiandigital.agency/sitemap.xml",
    host: "https://meridiandigital.agency",
  };
}
