import { useArticles } from "../hooks/useArticles";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import ArticleList from "../components/ArticleList";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function HomePage() {
  const { articles, status, errorMessage, retry } = useArticles();

  useDocumentMeta({
    title: "Digest — short reads worth your time",
    description:
      "A small collection of short, focused articles on productivity, engineering, and creativity.",
  });

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-6 py-10">
      <h1 className="sr-only">Digest — latest articles</h1>

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState message={errorMessage} onRetry={retry} />}
      {status === "success" && <ArticleList articles={articles} />}
    </main>
  );
}
