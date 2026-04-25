import type { Plugin } from "vite";

const TOOL_SLUGS = [
  "resume-builder",
  "pdf-to-word",
  "word-to-pdf",
  "youtube-downloader",
  "social-downloader",
  "image-compressor",
  "qr-generator",
];

const STATIC_PATHS = ["/", "/about", "/contact", "/privacy", "/privacy-policy", "/terms"];

interface Options {
  /** Public site URL, e.g. "https://toolshub.app". Falls back to SITE_URL env var, then a placeholder. */
  siteUrl?: string;
}

function buildSitemap(siteUrl: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const base = siteUrl.replace(/\/$/, "");

  const entries = [
    ...STATIC_PATHS.map((p) => ({
      loc: `${base}${p}`,
      priority: p === "/" ? "1.0" : "0.7",
      changefreq: p === "/" ? "weekly" : "monthly",
    })),
    ...TOOL_SLUGS.map((slug) => ({
      loc: `${base}/tool/${slug}`,
      priority: "0.9",
      changefreq: "monthly",
    })),
  ];

  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");
  return `# robots.txt for ToolsHub
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`;
}

export function sitemapPlugin(options: Options = {}): Plugin {
  const siteUrl =
    options.siteUrl ||
    process.env.SITE_URL ||
    "https://toolshub.app";

  return {
    name: "toolshub:sitemap",

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const url = req.url.split("?")[0].replace(/\/+$/, "");
        if (url.endsWith("/sitemap.xml")) {
          res.setHeader("Content-Type", "application/xml");
          res.end(buildSitemap(siteUrl));
          return;
        }
        if (url.endsWith("/robots.txt")) {
          res.setHeader("Content-Type", "text/plain");
          res.end(buildRobots(siteUrl));
          return;
        }
        next();
      });
    },

    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(siteUrl),
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: buildRobots(siteUrl),
      });
    },
  };
}
