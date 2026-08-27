import { useEffect } from "react";

const DEFAULT_TITLE = "Digest — short reads worth your time";
const DEFAULT_DESCRIPTION =
  "Digest is a small collection of short, focused articles on productivity, engineering, and creativity.";

// A client-rendered SPA can't get true per-route SEO without server-side
// rendering — search engine crawlers that don't execute JavaScript only
// ever see index.html's default tags. This hook is the practical middle
// ground: it makes every page correct for the browser tab, for social
// link previews shared after the page has loaded, and for any crawler
// that does execute JS (Googlebot does). Full SSR/SSG (e.g. migrating to
// Next.js) would be the next step for guaranteed no-JS crawler visibility.
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    const previousContent = meta.getAttribute("content");
    meta.setAttribute("content", description || DEFAULT_DESCRIPTION);

    return () => {
      document.title = DEFAULT_TITLE;
      if (previousContent) meta.setAttribute("content", previousContent);
    };
  }, [title, description]);
}
