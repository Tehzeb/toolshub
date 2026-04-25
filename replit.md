# ToolsHub

A free toolkit web app with 7 utilities, built on the pnpm monorepo using the React + Vite stack.

## Artifact

- **toolshub** (`artifacts/toolshub`) — main web app at preview path `/`.

## Tools

All tools are client-side only (no backend processing of user files).

| Slug | Page | Notes |
|---|---|---|
| `resume-builder` | `ResumeBuilder.tsx` | 3 templates (modern/classic/creative), live preview, on-device "Polish" enhancer, exports to PDF via `html2canvas` + `jspdf`. |
| `pdf-to-word` | `PdfToWord.tsx` | Uses `pdfjs-dist` for text extraction, `docx` for .docx generation. Text-based PDFs only. |
| `word-to-pdf` | `WordToPdf.tsx` | Uses `mammoth` for text extraction, `jsPDF` for paginated PDF output. |
| `youtube-downloader` | `YoutubeDownloader.tsx` | Detects videoId, shows thumbnail + embedded preview. Direct download is gated behind a "Pro" notice (no third-party API integrated). |
| `social-downloader` | `SocialDownloader.tsx` | Detects Facebook/Instagram URLs. Same Pro-gated download notice. |
| `image-compressor` | `ImageCompressor.tsx` | Real `canvas.toBlob` JPEG/WEBP compression with quality slider and before/after preview. |
| `qr-generator` | `QrGenerator.tsx` | `qrcode` library, configurable colors and size, PNG download. |

## Static pages

- `/` Home — hero + search, category filter, all-tools grid, free vs Pro plans, newsletter signup.
- `/about`, `/contact`, `/privacy` — content pages.
- 404 fallback via `pages/not-found.tsx`.

## Layout shell

- `components/Layout.tsx` wraps all routes with `Navbar`, `Footer`, `CookieBanner`.
- `components/Navbar.tsx` — sticky responsive nav with tools dropdown, search, theme toggle, mobile sheet.
- `components/Footer.tsx` — 4 columns + social icons + ad slot.
- `components/CookieBanner.tsx` — localStorage key `toolshub-cookie-consent`.
- `components/AdSlot.tsx` — placeholder ad container with `.ad-slot` styling (AdSense-ready).
- `components/ToolPageLayout.tsx` — shared chrome for all tool pages (breadcrumb, hero, ads, how-to, FAQ accordion).

## Theming

- Custom `ThemeProvider` in `hooks/use-theme.tsx`, localStorage key `toolshub-theme`. Toggles `.dark` on `<html>`.
- Palette: violet primary (`250 84% 60%`), teal accent (`175 70% 45%`).
- `index.css` defines full light + dark HSL palettes plus `gradient-text`, `gradient-bg`, `ad-slot`, hover-elevate utilities.

## Routing

Wouter with `base={import.meta.env.BASE_URL.replace(/\/$/, "")}` so the app works at any artifact base path.

## SEO & Analytics

- `index.html` has title, description, og tags, and theme-color.
- `hooks/use-document-meta.ts` updates `<title>` and meta tags per page (description, og, twitter card).
- Google Analytics placeholder script in `index.html` head — replace `G-XXXXXXXXXX` with your GA4 Measurement ID.

## Ads (AdSense-ready)

- Google AdSense loader script placeholder in `index.html` head — replace `ca-pub-XXXXXXXXXXXXXXXX` with your Publisher ID.
- `components/AdSlot.tsx` renders an `<ins class="adsbygoogle">` inside a styled placeholder. Each placement uses a unique `slot` ID:
  - **Header banner** (`slot="1111111111"`) — below navbar in `Layout.tsx`.
  - **Sidebar** (`slot="2222222222"`) — vertical, sticky, on tool pages (lg breakpoint and up).
  - **In-article** (`slot="3333333333"`) — bottom of every tool page.
  - **Footer banner** (default slot) — top of footer.
- Placeholders show "Ad" labels until you wire real slot IDs.

## Affiliate / Recommended Tools

- Recommended Tools section on Home featuring Notion, Canva Pro, Grammarly, NordVPN, Adobe Acrobat, Figma.
- Outbound links use `rel="sponsored noopener noreferrer"` and a `?ref=toolshub` query param for tracking.
- Disclosure note shown beneath the section.

## Dev dependencies (added)

`qrcode`, `@types/qrcode`, `jspdf`, `html2canvas`, `docx`, `pdfjs-dist`, `mammoth`, `file-saver`, `@types/file-saver`.

## Known limitations / future work

- YouTube/FB/IG downloaders intentionally show a "Pro" notice instead of direct downloads — reliable extraction requires a paid third-party service.
- PDF→Word doesn't preserve layout (text only); scanned PDFs need OCR (not implemented).
- Word→PDF renders plain text (formatting from .docx not preserved beyond paragraphs).
- Newsletter signup is UI-only (no backend).
- Premium plan section is presentational (no payment integration).
