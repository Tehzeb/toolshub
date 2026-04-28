import type { Plugin } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

// ─── IMPORTANT: Change this when you get a custom domain ───────
const SITE_URL =
  process.env.SITE_URL || "https://toolshub-mauve.vercel.app";
// ───────────────────────────────────────────────────────────────

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

function generateSitemap(urls: SitemapURL[]): string {
  const today = new Date().toISOString().split("T")[0];

  const urlEntries = urls
    .map(({ loc, lastmod, changefreq, priority }) => {
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod ?? today}</lastmod>
    <changefreq>${changefreq ?? "weekly"}</changefreq>
    <priority>${priority ?? 0.8}</priority>
  </url>`.trimStart();
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function sitemapPlugin(): Plugin {
  return {
    name: "sitemap-plugin",
    closeBundle() {
      // All pages in your ToolsHub website
      const urls: SitemapURL[] = [
        // Homepage — highest priority
        {
          loc: `${SITE_URL}/`,
          changefreq: "daily",
          priority: 1.0,
        },

        // Tool pages — high priority (these are the main content)
        {
          loc: `${SITE_URL}/tools/ai-resume-builder`,
          changefreq: "weekly",
          priority: 0.9,
        },
        {
          loc: `${SITE_URL}/tools/pdf-to-word`,
          changefreq: "weekly",
          priority: 0.9,
        },
        {
          loc: `${SITE_URL}/tools/word-to-pdf`,
          changefreq: "weekly",
          priority: 0.9,
        },
        {
          loc: `${SITE_URL}/tools/youtube-downloader`,
          changefreq: "weekly",
          priority: 0.9,
        },
        {
          loc: `${SITE_URL}/tools/social-video-downloader`,
          changefreq: "weekly",
          priority: 0.9,
        },
        {
          loc: `${SITE_URL}/tools/image-compressor`,
          changefreq: "weekly",
          priority: 0.9,
        },
        {
          loc: `${SITE_URL}/tools/qr-code-generator`,
          changefreq: "weekly",
          priority: 0.9,
        },

        // Main pages — medium priority
        {
          loc: `${SITE_URL}/about`,
          changefreq: "monthly",
          priority: 0.7,
        },
        {
          loc: `${SITE_URL}/contact`,
          changefreq: "monthly",
          priority: 0.7,
        },
        {
          loc: `${SITE_URL}/pricing`,
          changefreq: "monthly",
          priority: 0.7,
        },

        // Legal pages — lower priority but required for AdSense
        {
          loc: `${SITE_URL}/privacy-policy`,
          changefreq: "yearly",
          priority: 0.5,
        },
        {
          loc: `${SITE_URL}/terms`,
          changefreq: "yearly",
          priority: 0.5,
        },
        {
          loc: `${SITE_URL}/cookie-policy`,
          changefreq: "yearly",
          priority: 0.5,
        },
      ];

      // Write sitemap.xml
      const outDir = path.resolve(
        import.meta.dirname,
        "..",
        "dist",
        "public"
      );

      try {
        mkdirSync(outDir, { recursive: true });

        writeFileSync(
          path.join(outDir, "sitemap.xml"),
          generateSitemap(urls),
          "utf-8"
        );
        console.log(
          `✅ sitemap.xml generated with ${urls.length} URLs (base: ${SITE_URL})`
        );

        writeFileSync(
          path.join(outDir, "robots.txt"),
          generateRobotsTxt(),
          "utf-8"
        );
        console.log(`✅ robots.txt generated`);
      } catch (err) {
        console.error("❌ Failed to write sitemap or robots.txt:", err);
      }
    },
  };
}
