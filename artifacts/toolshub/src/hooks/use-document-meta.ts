import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description?: string;
  ogImage?: string;
}

export function useDocumentMeta({ title, description, ogImage }: DocumentMeta) {
  useEffect(() => {
    const fullTitle = title.includes("ToolsHub") ? title : `${title} · ToolsHub`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [name, key] = selector.replace(/[\[\]"']/g, "").split("=");
        el.setAttribute(name, key);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:type"]', "content", "website");
    if (ogImage) {
      setMeta('meta[property="og:image"]', "content", ogImage);
    }
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    if (description) {
      setMeta('meta[name="twitter:description"]', "content", description);
    }
  }, [title, description, ogImage]);
}
