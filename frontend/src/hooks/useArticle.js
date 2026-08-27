import { useState, useEffect, useCallback } from "react";
import { fetchArticleBySlug } from "../api/articlesApi";

export function useArticle(slug) {
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus("loading");
      try {
        const data = await fetchArticleBySlug(slug);
        if (cancelled) return;
        setArticle(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message || "Couldn't load this article.");
        setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug, reloadToken]);

  return { article, status, errorMessage, retry };
}
