import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
      <footer className="max-w-2xl mx-auto px-5 sm:px-6 py-10 text-xs text-muted font-mono border-t border-line mt-10">
        Digest · Express + MongoDB backend · Week 5 internship task
      </footer>
    </div>
  );
}
