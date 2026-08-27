const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    coverImageAlt: { type: String, required: true }, // enforced at the schema level on purpose
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now },
    readingMinutes: { type: Number, default: 4 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
