const express = require("express");
const { getArticles, getArticleBySlug } = require("../controllers/articleController");

const router = express.Router();

router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

module.exports = router;
