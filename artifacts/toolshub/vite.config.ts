import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { sitemapPlugin } from "./scripts/sitemap-plugin";

const rawPort = process.env.PORT;
const parsedPort = rawPort ? Number(rawPort) : NaN;
const port =
  !Number.isNaN(parsedPort) && parsedPort > 0 ? parsedPort : 5173;

const basePath = process.env.BASE_PATH || "/";

// Detect if running inside Replit environment
const isReplit = process.env.REPL_ID !== undefined;

// Conditionally load Replit-only plugins so Vercel build never crashes
const replitDevPlugins: any[] = [];

if (isReplit && process.env.NODE_ENV !== "production") {
  try {
    const { default: runtimeErrorOverlay } = await import(
      "@replit/vite-plugin-runtime-error-modal"
    );
    replitDevPlugins.push(runtimeErrorOverlay());
  } catch {
    // package not available outside Replit — skip silently
  }

  try {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    replitDevPlugins.push(
      cartographer({ root: path.resolve(import.meta.dirname, "..") })
    );
  } catch {
    // package not available outside Replit — skip silently
  }

  try {
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    replitDevPlugins.push(devBanner());
  } catch {
    // package not available outside Replit — skip silently
  }
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin(),
    ...replitDevPlugins,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "attached_assets"
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
