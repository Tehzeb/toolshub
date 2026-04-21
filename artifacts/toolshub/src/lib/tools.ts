import {
  FileText,
  FileType,
  FileDown,
  Youtube,
  Share2,
  Image as ImageIcon,
  QrCode,
  type LucideIcon,
} from "lucide-react";

export type ToolCategory =
  | "Documents"
  | "Media"
  | "AI"
  | "Downloaders"
  | "Images"
  | "Generators";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  accent: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "resume-builder",
    name: "AI Resume Builder",
    tagline: "Craft a polished resume in minutes",
    description:
      "Build a beautiful, ATS-friendly resume with three modern templates and AI-assisted writing.",
    category: "AI",
    icon: FileText,
    accent: "from-violet-500 to-indigo-500",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    tagline: "Convert PDFs into editable Word documents",
    description:
      "Drop a PDF and get back a fully editable .docx file. Runs entirely in your browser.",
    category: "Documents",
    icon: FileType,
    accent: "from-rose-500 to-pink-500",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    tagline: "Turn .docx files into clean PDFs",
    description:
      "Upload a Word document and download a crisp, shareable PDF in seconds.",
    category: "Documents",
    icon: FileDown,
    accent: "from-sky-500 to-blue-500",
  },
  {
    slug: "youtube-downloader",
    name: "YouTube Downloader",
    tagline: "Preview and grab YouTube video info",
    description:
      "Paste a YouTube link to instantly preview the video, thumbnail, and pick your quality.",
    category: "Downloaders",
    icon: Youtube,
    accent: "from-red-500 to-orange-500",
  },
  {
    slug: "social-downloader",
    name: "Social Video Downloader",
    tagline: "Facebook & Instagram video preview",
    description:
      "Paste a Facebook or Instagram URL to preview the post and prepare your download.",
    category: "Downloaders",
    icon: Share2,
    accent: "from-fuchsia-500 to-purple-500",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Shrink images without losing quality",
    description:
      "Drag and drop a JPG, PNG, or WEBP image and reduce its size with a quality slider.",
    category: "Images",
    icon: ImageIcon,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    tagline: "Make custom QR codes in any color",
    description:
      "Create QR codes for any URL or text with custom colors and sizes. Download as PNG.",
    category: "Generators",
    icon: QrCode,
    accent: "from-amber-500 to-yellow-500",
  },
];

export const CATEGORIES: { name: ToolCategory; description: string }[] = [
  { name: "Documents", description: "Convert and edit document files" },
  { name: "Media", description: "Audio and video utilities" },
  { name: "AI", description: "Smart writing and document tools" },
  { name: "Downloaders", description: "Save videos and content" },
  { name: "Images", description: "Compress, resize, and edit pictures" },
  { name: "Generators", description: "Create QR codes and more" },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
