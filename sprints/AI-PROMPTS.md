# pinSsave — AI Prompts (Copy-Paste for Cursor)

Use these prompts one sprint at a time. Paste into Cursor chat after reading the sprint doc.

---

## How To Use

1. Open the sprint file (e.g., `SPRINT-01-BACKEND-CORE.md`)
2. Read "Your Tasks" section
3. Copy the matching prompt below into Cursor
4. Review generated code before accepting
5. Run "Verify" commands from sprint doc

---

## Sprint 0 Prompt — Project Setup

```
Context: pinSsave is a Pinterest media downloader. The frontend is Next.js 14 in /src. 
The backend will be Express in /backend (not built yet).

Tasks:
1. Rename all "PintDown" references to "pinSsave" in src/components and src/app
2. Create .env.example with NEXT_PUBLIC_API_URL=http://localhost:4000
3. Update DownloaderForm.tsx to call process.env.NEXT_PUBLIC_API_URL + '/api/download' instead of '/api/download'
4. Remove src/app/api/download/route.ts (backend will handle this)
5. Add concurrently dev script to run frontend + backend together
6. Update tailwind brand colors from rose/red to indigo: brand-500: #6C63FF

Do not change UI layout yet — only setup and config changes.
Match existing code style. TypeScript strict mode.
```

---

## Sprint 1 Prompt — Backend Core

```
Build the pinSsave Express backend in /backend following sprints/SPRINT-01-BACKEND-CORE.md.

Critical: The Pinterest extractor MUST use Pinterest's internal JSON API, NOT HTML scraping.
Pinterest is a React SPA — cheerio on HTML returns empty results.

Implementation required:
1. backend/src/helpers/unshortenUrl.ts — resolve pin.it to pinterest.com/pin/ID
2. backend/src/helpers/pinterestApi.ts — POST to https://www.pinterest.com/resource/PinResource/get/ with pin ID, parse images.orig.url and videos.video_list
3. backend/src/helpers/extractMedia.ts — orchestrate unshorten → API call → upgrade /736x/ to /originals/
4. backend/src/controllers/download.controller.ts — POST /api/download
5. backend/src/app.ts — Express with helmet, cors, compression, morgan, rate limiter (30 req/15min/IP)
6. GET /api/health endpoint

Tech: Express, TypeScript, axios, zod, winston, dotenv.
Return type:
{
  success: boolean;
  pinId: string;
  title: string;
  type: 'image' | 'video' | 'gif' | 'carousel';
  thumbnail: string;
  mediaUrl: string;
  items?: Array<{ url: string; type: string }>;
  error?: string;
}

mediaUrl must NEVER be empty on success. Test with real Pinterest URLs.
Port 4000. Scripts: dev (nodemon+tsx), build (tsc), start (node dist/app.js).
```

---

## Sprint 2 Prompt — Database & Full API

```
Extend the pinSsave Express backend following sprints/SPRINT-02-DATABASE-API.md.

Add:
1. Prisma schema in backend/prisma/schema.prisma (Download, Analytics, Blog, FAQ, ContactMessage, User models)
2. Redis cache via ioredis — cache download results by pinId, TTL 3600s
3. Log every download to Download table with ipHash (not raw IP)
4. Public routes: GET /api/faq, GET /api/blog, GET /api/blog/:slug, POST /api/contact, GET /api/stats/public
5. Zod validation on all POST routes
6. Redis-backed rate limiter (replace in-memory)
7. prisma/seed.ts with 6 real FAQs and 1 blog post

Cache flow: check Redis before Pinterest API call. Save to Redis after success.
Stats endpoint returns totalDownloads, todayDownloads, supportedTypes.
Do not break existing /api/download from Sprint 1.
```

---

## Sprint 3 Prompt — 2026 UI Design System

```
Redesign pinSsave frontend UI following sprints/SPRINT-03-UI-DESIGN-SYSTEM.md.
The current UI looks generic/AI-generated. Make it distinctive and premium for 2026.

Design requirements:
- Font: Plus Jakarta Sans (headings/body) + JetBrains Mono (badges/code)
- Primary color: #6C63FF indigo (NOT Pinterest red, NOT purple gradient)
- Background: subtle dot grid texture, NOT gradient blobs
- Layout: asymmetric hero (text left, preview mockup right), NOT centered everything
- Features: bento grid with varied card sizes, NOT 3x2 identical cards
- Dark mode: next-themes with system preference, no flash on load
- Motion: framer-motion for result card appear + FAQ accordion ONLY

Build in src/components/ui/:
- button.tsx (primary, secondary, ghost)
- input.tsx (with icon slot)
- badge.tsx
- card.tsx
- skeleton.tsx
- toast.tsx

Update tailwind.config.ts colors and globals.css design tokens.
Do not connect to backend yet — design system only.
Brand name: pinSsave everywhere.
```

---

## Sprint 4 Prompt — Core Pages

```
Build pinSsave core pages following sprints/SPRINT-04-CORE-PAGES.md.
Backend runs on NEXT_PUBLIC_API_URL (Express, port 4000).

Create:
1. src/lib/api.ts — fetch wrappers for /api/download, /api/stats/public, /api/faq
2. src/components/ResultCard.tsx — preview, type badge, download button, copy link, carousel support
3. src/components/HeroSection.tsx — asymmetric layout with input
4. src/components/StatsBar.tsx — live stats from API
5. src/components/HowItWorks.tsx — 3 steps
6. src/components/FeaturesBento.tsx — bento grid
7. Rewrite DownloaderForm.tsx — uses api.ts, shows ResultCard on success, skeleton on load
8. src/app/faq/page.tsx — dynamic FAQs from API + JSON-LD FAQPage schema
9. src/app/download/page.tsx — reads ?url= param, auto-fetches, shows ResultCard

End-to-end: paste Pinterest URL → POST to backend → show real media preview → download works.
Handle errors: invalid URL, private pin, network error — show clear messages.
Use design system components from Sprint 3.
```

---

## Sprint 5 Prompt — SEO Pages

```
Build pinSsave SEO and content pages following sprints/SPRINT-05-SEO-PAGES.md.

Static pages (unique content each):
- /about, /privacy, /terms, /dmca

Dynamic pages:
- /contact — form POST to /api/contact
- /blog — list from GET /api/blog with pagination
- /blog/[slug] — single post from GET /api/blog/:slug, render markdown

SEO landing pages (unique H1 and content, NOT duplicates):
- /pinterest-video-downloader
- /pinterest-image-downloader  
- /pinterest-gif-downloader

Each category page has: unique headline, 3 type-specific FAQs, downloader form component.

Add:
- src/app/sitemap.ts — all routes
- src/app/robots.ts — allow all except /admin/
- Unique metadata (title + description) on every page
- Footer links to Privacy, Terms, DMCA, Contact

Legal pages: real content, not lorem ipsum. Include Pinterest disclaimer.
```

---

## Sprint 6 Prompt — Admin Dashboard

```
Build pinSsave admin panel following sprints/SPRINT-06-ADMIN-DASHBOARD.md.

Backend additions:
- POST /api/auth/login — bcrypt password, return JWT
- JWT middleware protecting /api/admin/*
- GET /api/admin/stats — totalDownloads, todayDownloads, topCountries, recentDownloads
- CRUD /api/admin/blog, /api/admin/faq
- GET /api/admin/contacts, PATCH /api/admin/contacts/:id
- GET /api/admin/downloads — paginated
- scripts/createAdmin.ts — CLI to create first admin user

Frontend admin pages in src/app/admin/:
- /admin/login — email + password form
- /admin — dashboard stat cards + recent downloads
- /admin/downloads — paginated table
- /admin/blog — list + /admin/blog/new + /admin/blog/[id]/edit
- /admin/faq — manage FAQs
- /admin/contacts — inbox

Admin layout: dark sidebar, functional design (different from public site).
Auth guard: redirect to /admin/login if no JWT.
Store JWT in localStorage. Include Authorization header on all admin API calls.
```

---

## Sprint 7 Prompt — Deployment

```
Prepare pinSsave for production deployment following sprints/SPRINT-07-DEPLOYMENT.md.

Create:
1. backend/Dockerfile — multi-stage Node 20 alpine build
2. docker-compose.yml — api service on port 4000 with healthcheck
3. backend/.env.production.example — all required vars documented
4. Nginx config template for api.pinflow.app reverse proxy
5. GitHub Actions workflow .github/workflows/deploy.yml — on push to main: build Docker, SSH deploy to VPS

Production env vars:
- DATABASE_URL (Supabase)
- REDIS_URL (Upstash)
- JWT_SECRET (64 char random)
- CORS_ORIGIN=https://pinflow.app

Add to backend: graceful shutdown, production Winston file logging.
Frontend: .env.production with NEXT_PUBLIC_API_URL=https://api.pinflow.app
Document deployment steps in README.md.
```

---

## Sprint 8 Prompt — Performance & Polish

```
Final performance and SEO polish for pinSsave following sprints/SPRINT-08-PERFORMANCE-POLISH.md.

Frontend:
- dynamic import ResultCard (code split)
- Next.js Image for all static images
- Verify font display: swap
- Add WebApplication JSON-LD schema to home page
- Verify sitemap.ts and robots.ts are complete

Backend:
- Cache-Control headers: stats=60s, faq=3600s, download=no-store
- Prisma connection_limit=5 in DATABASE_URL
- Production Winston file transport (logs/error.log)

QA: Test all user flows listed in Sprint 8 checklist.
Target: Lighthouse Performance ≥90, SEO ≥95, Accessibility ≥90.
Fix any failing items.
```

---

## Full Project Prompt (Give to New AI Session)

Use this when starting fresh or handing off to another developer/AI:

```
You are building pinSsave — a production Pinterest media downloader website.

READ FIRST: MASTER_PROMPT.md and sprints/ folder in the project root.

Architecture:
- Frontend: Next.js 14 App Router, TypeScript, Tailwind, on Vercel
- Backend: Express.js TypeScript API on Google Cloud VPS (port 4000)
- Database: PostgreSQL via Supabase (Prisma ORM)
- Cache: Redis via Upstash
- Brand: pinSsave, primary color #6C63FF indigo

Current state: UI shell exists but is dummy/non-functional. Backend not built.
Pinterest extractor must use PinResource internal JSON API, NOT HTML scraping.

Work sprint by sprint starting from sprints/SPRINT-00-SETUP.md.
Do not skip sprints. Verify each sprint before moving to next.

Key rules:
- mediaUrl must never be empty on successful extraction
- No generic AI-looking UI (no purple gradients, no centered hero spam)
- All pages need unique SEO metadata
- Admin routes JWT protected
- Rate limit: 30 requests per 15 min per IP
- Never store raw IP addresses — hash them
- DMCA page required before launch
```

---

## Troubleshooting Prompts

### Extractor returns empty mediaUrl
```
The Pinterest extractor in backend/src/helpers/ is returning success:true but empty mediaUrl.
Pinterest is a React SPA — HTML scraping with cheerio does not work.

Fix: Use Pinterest internal API:
POST https://www.pinterest.com/resource/PinResource/get/
Body: {"options":{"id":"PIN_ID","field_set_key":"detailed"},"context":{}}
Headers: User-Agent Chrome 131, X-Requested-With: XMLHttpRequest, Referer: https://www.pinterest.com/

Parse response.data.resource_response.data for:
- images.orig.url (HD image)
- videos.video_list.V_720P.url (video)
- story_pin_data.pages (carousel)

Show me the fixed pinterestApi.ts and extractMedia.ts.
```

### CORS error from frontend
```
Frontend on localhost:3000 gets CORS error calling backend on localhost:4000.

Fix backend/src/app.ts cors config:
cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true })

Also verify CORS_ORIGIN is set in backend/.env.
Show me the fix.
```

### UI looks AI-generated
```
The pinSsave UI looks generic and AI-generated. Redesign following 2026 principles:

REMOVE: centered hero, 6 identical feature cards, purple/rose gradients, system fonts
ADD: Plus Jakarta Sans font, #6C63FF indigo brand, asymmetric hero layout, bento feature grid, dot grid background, next-themes dark mode

Reference: sprints/SPRINT-03-UI-DESIGN-SYSTEM.md
Rewrite HeroSection, FeaturesBento, Header, and globals.css.
```
