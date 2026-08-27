const Article = require("../models/Article");

// GET /api/articles
async function getArticles(req, res, next) {
  try {
    const articles = await Article.find()
      .select("-content") // list view never needs full body content
      .sort({ publishedAt: -1 });
    res.json({ success: true, data: articles });
  } catch (err) {
    next(err);
  }
}

// GET /api/articles/:slug
async function getArticleBySlug(req, res, next) {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}

module.exports = { getArticles, getArticleBySlug };
