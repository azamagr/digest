import { useState, useEffect, useCallback } from "react";
import { fetchArticles } from "../api/articlesApi";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const retry = useCallback(() => setReloadToken((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus("loading");
      try {
        const data = await fetchArticles();
        if (cancelled) return;
        setArticles(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message || "Couldn't load articles.");
        setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return { articles, status, errorMessage, retry };
}
