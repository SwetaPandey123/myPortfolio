import { useEffect } from "react";

export function useSEO({ title, description, keywords, canonical }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Sweta Pandey — Full Stack Developer & Educator`;
    }

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

    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (metaKey) {
        metaKey.setAttribute("content", keywords);
      }
    }

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonical);
      }
    }
  }, [title, description, keywords, canonical]);
}
