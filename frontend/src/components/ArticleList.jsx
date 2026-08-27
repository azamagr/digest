import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  return (
    <div className="space-y-8">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} priority={index === 0} />
      ))}
    </div>
  );
}
