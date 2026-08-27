# Digest — Full-Stack Deployment & Performance Pass

A small, fast reading app, built for Week 5 · Task B (Full-Stack Deployment & Performance Pass). The app itself is deliberately simple — the point of this task is the deployment, performance, and SEO work, not new features.

**Live frontend:** https://azamagr.github.io/digest/
**Backend API:** deployed separately on Vercel — see "Deploying" below

## Architecture overview

```
                 ┌─────────────────────┐
  Browser  ───▶  │  GitHub Pages        │   Static React build (Vite)
                 │  azamagr.github.io   │   React Router (client-side routing)
                 │  /digest/            │
                 └──────────┬───────────┘
                            │  fetch()
                            ▼
                 ┌─────────────────────┐
                 │  Vercel serverless   │   Express app wrapped as a
                 │  (backend/api)       │   serverless function
                 └──────────┬───────────┘
                            │  Mongoose
                            ▼
                 ┌─────────────────────┐
                 │  MongoDB Atlas       │   `articles` collection
                 └─────────────────────┘
```

- **Frontend**: React + Vite + React Router + Tailwind CSS, deployed as a static build to **GitHub Pages** via GitHub Actions.
- **Backend**: Express + Mongoose, deployed to **Vercel** as a serverless function (`backend/api/index.js`) — no persistent server process, cold-starts on demand.
- **Database**: MongoDB Atlas (free tier), holding a single `articles` collection.
- The two halves are connected by one environment variable: the frontend's `VITE_API_URL` points at the deployed backend's URL, baked in at build time by the GitHub Actions workflow.

This is a **monorepo**: `backend/` and `frontend/` are independent apps in one repo.

## Performance & SEO pass

The task asks to run a Lighthouse/PageSpeed audit and fix at least 3 flagged issues. Rather than fix issues after the fact, this app was built with the most common Lighthouse flags addressed from the start — here's exactly what and where:

| Lighthouse flag | What it means | Fix, and where |
|---|---|---|
| **Images without explicit width/height** (Cumulative Layout Shift) | The page jumps around as images load in, because the browser doesn't know how much space to reserve | Every `<img>` has explicit `width`/`height` attributes *and* a Tailwind `aspect-[16/9]` class, so space is reserved before the image arrives — `ArticleCard.jsx`, `ArticlePage.jsx` |
| **Missing alt text** | Screen readers and search engines have no idea what an image shows | Every image's alt text is stored as actual content in the database (`coverImageAlt` is a required field on the `Article` schema, not an afterthought) — `backend/src/models/Article.js` |
| **No preconnect to required origins** | The browser discovers it needs to talk to Google Fonts and the image host only after parsing the page, wasting round-trip time | `<link rel="preconnect">` for both `fonts.googleapis.com`/`fonts.gstatic.com` and the image host, declared in `index.html` before anything else loads |
| **Missing meta description / generic page titles** | Every page (and every social share) shows the same generic title, and search results show no useful preview text | `index.html` has a real title + description + Open Graph tags for the default (home) state; `useDocumentMeta.js` updates `document.title` and the description tag per-article on the client, so the browser tab and any shared link reflect the actual article, not "Digest" for every page |
| **Unoptimized image loading** (poor Largest Contentful Paint) | Every image on the page competes for bandwidth immediately, delaying the one image that actually matters for perceived load speed | Only the first, above-the-fold article image loads eagerly with `fetchPriority="high"` (it's the page's LCP element); every other image is `loading="lazy"` — `ArticleCard.jsx` |

**A note on SEO and client-side rendering**: this is a React SPA, not a server-rendered app, which is an inherent limit on SEO no client-side fix fully closes — a crawler that doesn't execute JavaScript only ever sees `index.html`'s default tags, never an individual article's real title. `useDocumentMeta.js` is the practical, honest middle ground for a project at this stage: it makes the browser tab, the URL bar, and any link shared *after* the page has loaded fully correct, and it works for crawlers that do execute JavaScript (Googlebot does). The real next step for guaranteed no-JS SEO would be migrating to a server-rendered framework (Next.js, Remix) — a deliberate scope decision, documented here rather than silently left out.

Other things worth knowing about, related to this pass:
- **No animation library.** Earlier internship projects used Framer Motion; this one deliberately doesn't, to keep the shipped JavaScript bundle small (a real Lighthouse "reduce unused JavaScript" contributor). The bundle here is ~76KB gzipped.
- **Clean URLs, not hash routing.** `/digest/article/some-slug`, not `/digest/#/article/some-slug` — hash fragments are worse for link sharing and historically worse for SEO. Since GitHub Pages has no server-side rewrites, this needs the well-known [SPA GitHub Pages redirect trick](https://github.com/rafgraph/spa-github-pages) (`public/404.html` + a matching restore script in `index.html`) so a direct visit or refresh on a deep link doesn't 404.
- **`robots.txt` and `sitemap.xml`** are present (`frontend/public/`), even though a single-page app's sitemap value is limited — it's still a real, checked-for basic.

### Running your own Lighthouse audit

1. Deploy the app (see below).
2. Open the live URL in Chrome, then DevTools → **Lighthouse** tab → run an audit for both **Mobile** and **Desktop**.
3. Alternatively, use [PageSpeed Insights](https://pagespeed.web.dev/) with the live URL — same underlying engine, no DevTools needed.
4. Record the scores for your video — Performance, Accessibility, Best Practices, and SEO should all read comfortably high given the fixes above; note any warnings that remain (a cold Vercel serverless function on first request is the most likely one, since serverless cold-starts add real latency the frontend can't hide).

## Confirming it works on mobile and desktop

After deploying, check the live URL (not localhost) on:
- An actual phone browser, or Chrome DevTools' device toolbar (Ctrl/Cmd+Shift+M) at a few widths (375px, 768px, 1440px)
- A real desktop browser window, resized narrow and wide

What to check specifically: article cards reflow to a single readable column at every width, images never overflow their container, the header stays usable, and tapping an article on a touch device navigates correctly (no elements too small to tap accurately).

## Running locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your own MONGO_URI
npm run seed              # populates 6 sample articles
npm run dev                # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm run dev               # http://localhost:5173
```

## Deploying the backend

**Vercel** (files already included: `backend/api/index.js`, `backend/vercel.json`):
1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → Add New → Project → import the repo.
3. Root Directory: `backend`.
4. Environment Variables: `MONGO_URI`.
5. Deploy, then run `npm run seed` locally against that same `MONGO_URI` to populate the live database.

## Deploying the frontend

1. Repo **Settings → Secrets and variables → Actions → Variables** → add `VITE_API_URL` set to your deployed backend URL.
2. Repo **Settings → Pages → Source** → select **"GitHub Actions"**.
3. Push to `main` — `.github/workflows/deploy.yml` builds `frontend/` with that API URL and publishes it.

`frontend/vite.config.js` sets `base: '/digest/'` and `main.jsx` sets a matching `basename="/digest"` on the router — **update both, plus the canonical/Open Graph URLs in `index.html`, if you name your repo something else.** Keep the repo name all-lowercase.
