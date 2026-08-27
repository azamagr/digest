import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useArticle } from "../hooks/useArticle";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticlePage() {
  const { slug } = useParams();
  const { article, status, errorMessage, retry } = useArticle(slug);

  useDocumentMeta({
    title: article ? `${article.title} — Digest` : undefined,
    description: article?.excerpt,
  });

  return (
    <main className="max-w-2xl mx-auto px-5 sm:px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to all articles
      </Link>

      {status === "loading" && (
        <div className="mt-8">
          <LoadingState />
        </div>
      )}
      {status === "error" && (
        <div className="mt-8">
          <ErrorState message={errorMessage} onRetry={retry} />
        </div>
      )}

      {status === "success" && article && (
        <article className="mt-6">
          <img
            src={article.coverImageUrl}
            alt={article.coverImageAlt}
            width={800}
            height={450}
            loading="eager"
            fetchPriority="high"
            className="w-full aspect-[16/9] object-cover rounded-lg border border-line"
          />

          <header className="mt-6">
            <div className="flex items-center gap-2 text-xs text-muted font-mono">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingMinutes} min read</span>
            </div>
            <h1 className="font-display font-bold text-3xl mt-2 leading-tight">{article.title}</h1>
          </header>

          <div className="prose-content mt-6 space-y-4 text-ink leading-relaxed">
            {article.content
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>

          {article.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-8" aria-label="Article tags">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-xs font-mono text-muted border border-line rounded-full px-3 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </article>
      )}
    </main>
  );
}
