import { useEffect } from "react";

export function useSEO({ title, description, keywords, canonical }) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | Sweta Pandey — Full Stack Developer & Educator`;
    }

    // Description Meta
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      } else {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        metaDesc.content = description;
        document.head.appendChild(metaDesc);
      }
    }

    // Keywords Meta
    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (metaKey) {
        metaKey.setAttribute("content", keywords);
      }
    }

    // Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonical);
      }
    }
  }, [title, description, keywords, canonical]);
}
