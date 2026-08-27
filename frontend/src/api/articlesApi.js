const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handleResponse(res) {
  const body = await res.json();
  if (!res.ok || body.success === false) {
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }
  return body.data;
}

export async function fetchArticles() {
  const res = await fetch(`${API_URL}/api/articles`);
  return handleResponse(res);
}

export async function fetchArticleBySlug(slug) {
  const res = await fetch(`${API_URL}/api/articles/${slug}`);
  return handleResponse(res);
}
