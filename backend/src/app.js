const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Digest API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/articles", articleRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
