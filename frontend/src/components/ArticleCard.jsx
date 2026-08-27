import { Link } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleCard({ article, priority = false }) {
  return (
    <article className="border-b border-line pb-8">
      <Link to={`/article/${article.slug}`} className="group block">
        <img
          src={article.coverImageUrl}
          alt={article.coverImageAlt}
          width={800}
          height={450}
          // Only the first (above-the-fold) card loads eagerly at high
          // priority, since that image is the page's Largest Contentful
          // Paint element. Every card below it lazy-loads — the browser
          // never fetches images the visitor may never scroll to.
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="w-full aspect-[16/9] object-cover rounded-lg border border-line"
        />

        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs text-muted font-mono">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>

          <h2 className="font-display font-semibold text-xl mt-2 group-hover:text-wine transition-colors">
            {article.title}
          </h2>
          <p className="text-muted mt-1.5 leading-relaxed">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
