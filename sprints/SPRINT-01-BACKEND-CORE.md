# Sprint 1 — Backend Core (Express + Working Pinterest Extractor)

**Goal:** Build a standalone Express API with a **real, working** Pinterest media extractor.  
This is the most important sprint. Without this, the site is useless.

**Time:** 1–2 days  
**Depends on:** [SPRINT-00-SETUP.md](./SPRINT-00-SETUP.md)  
**Next sprint:** [SPRINT-02-DATABASE-API.md](./SPRINT-02-DATABASE-API.md)

---

## Why the Current Extractor Fails

The dummy `pinterestExtractor.ts` uses `axios` + `cheerio` on the HTML page.  
**Pinterest is a React SPA** — the initial HTML has no `og:image`, no media URLs, only JavaScript bundles.

### What Actually Works (2026)

| Method | Reliability | Use |
|--------|-------------|-----|
| Pinterest internal JSON API | ⭐⭐⭐⭐⭐ | Primary |
| `pin.it` redirect follow | ⭐⭐⭐⭐⭐ | URL resolution |
| oEmbed endpoint | ⭐⭐⭐ | Fallback for images |
| HTML cheerio scraping | ⭐ | Do NOT rely on this |

---

## Backend Folder Structure (Build This)

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts              # Zod-validated env vars
│   │   └── logger.ts           # Winston logger
│   ├── helpers/
│   │   ├── unshortenUrl.ts     # pin.it → pinterest.com/pin/ID
│   │   ├── pinterestApi.ts     # Internal Pinterest JSON API calls
│   │   └── extractMedia.ts     # Main extraction orchestrator
│   ├── controllers/
│   │   └── download.controller.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts      # Basic in-memory first, Redis in Sprint 2
│   │   └── validateRequest.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── download.routes.ts
│   ├── types/
│   │   └── media.types.ts
│   ├── utils/
│   │   └── apiResponse.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── .env
```

---

## Your Tasks

### Task 1: Initialize Backend

```bash
mkdir -p backend/src/{config,helpers,controllers,middlewares,routes,types,utils}
cd backend
npm init -y
npm install express cors helmet compression morgan axios cheerio zod dotenv winston
npm install -D typescript @types/node @types/express @types/cors @types/morgan tsx nodemon
npx tsc --init
```

**`backend/package.json` scripts:**
```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js"
  }
}
```

### Task 2: Build URL Unshortener

**`backend/src/helpers/unshortenUrl.ts`**

Logic:
1. If URL contains `pin.it` → `GET` with `maxRedirects: 5`, read final URL
2. If URL contains `pinterest.com/pin/` → extract pin ID with regex `/pin\/(\d+)/`
3. Return canonical: `https://www.pinterest.com/pin/{ID}/`

### Task 3: Build Pinterest Internal API Extractor

**`backend/src/helpers/pinterestApi.ts`**

Pinterest exposes data via POST to:
```
https://www.pinterest.com/resource/PinResource/get/
```

Request body (form-urlencoded):
```json
{
  "options": {
    "id": "PIN_ID_HERE",
    "field_set_key": "detailed"
  },
  "context": {}
}
```

Headers required:
```
User-Agent: Chrome 131
X-Requested-With: XMLHttpRequest
Accept: application/json
Referer: https://www.pinterest.com/
```

Parse response for:
- `images.orig.url` → original HD image
- `images.736x.url` → fallback
- `videos.video_list.V_720P` or `V_HLSV4` → video MP4 URL
- `title` → pin title
- `story_pin_data` → carousel items (multiple images)

### Task 4: Build Main Extractor

**`backend/src/helpers/extractMedia.ts`**

```typescript
export interface MediaResult {
  success: boolean;
  pinId: string;
  title: string;
  type: 'image' | 'video' | 'gif' | 'carousel';
  thumbnail: string;
  mediaUrl: string;
  items?: Array<{ url: string; type: string }>; // carousel
  error?: string;
}
```

Flow:
```
Input URL
  → unshortenUrl()
  → extract pinId
  → pinterestApi.getPin(pinId)
  → upgrade image URLs (/736x/ → /originals/)
  → detect GIF (.gif extension)
  → detect video (video_list present)
  → return MediaResult
```

### Task 5: Express App + Download Route

**`POST /api/download`**

Request:
```json
{ "url": "https://pin.it/xxxxx" }
```

Response (success):
```json
{
  "success": true,
  "pinId": "123456789",
  "title": "Beautiful sunset photo",
  "type": "image",
  "thumbnail": "https://i.pinimg.com/originals/xx/yy/zz/photo.jpg",
  "mediaUrl": "https://i.pinimg.com/originals/xx/yy/zz/photo.jpg"
}
```

Response (error):
```json
{
  "success": false,
  "error": "Invalid Pinterest URL or private pin"
}
```

**`GET /api/health`** → `{ "status": "ok", "timestamp": "..." }`

### Task 6: Middleware Stack

Apply in `app.ts` in this order:
1. `helmet()`
2. `cors({ origin: process.env.CORS_ORIGIN })`
3. `compression()`
4. `morgan('combined')`
5. `express.json({ limit: '1mb' })`
6. Routes
7. Error handler (last)

### Task 7: Rate Limiter (Basic)

In-memory: max **30 requests per 15 minutes per IP** on `/api/download`.  
Upgrade to Redis in Sprint 2.

---

## Verify (All Must Pass)

```bash
# Start backend
cd backend && npm run dev
# → Server running on port 4000

# Health check
curl http://localhost:4000/api/health
# → {"status":"ok"}

# Test with a REAL public Pinterest pin (find one on pinterest.com)
curl -X POST http://localhost:4000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.pinterest.com/pin/PASTE_REAL_PIN_ID/"}'
# → success: true, mediaUrl: "https://i.pinimg.com/..."

# Test pin.it short link
curl -X POST http://localhost:4000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://pin.it/PASTE_SHORT_LINK"}'
# → success: true

# Test invalid URL
curl -X POST http://localhost:4000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'
# → success: false, error message
```

**Critical:** `mediaUrl` must NOT be empty. If it is, the extractor is still broken.

---

## What the Backend Does (Explain Simply)

| Part | Job |
|------|-----|
| **Express** | Web server that receives HTTP requests |
| **unshortenUrl** | Converts `pin.it/abc` → full Pinterest URL |
| **pinterestApi** | Talks to Pinterest's hidden JSON API (not HTML scraping) |
| **extractMedia** | Picks best quality image/video URL |
| **rateLimiter** | Stops abuse — max 30 downloads per IP per 15 min |
| **CORS** | Only allows your frontend domain to call the API |

---

## Common Problems

| Problem | Fix |
|---------|-----|
| Empty mediaUrl | You're scraping HTML — switch to PinResource API |
| 403 from Pinterest | Rotate User-Agent, add Referer header |
| Timeout | Set axios timeout to 15000ms, retry once |
| pin.it not resolving | Use `maxRedirects: 10`, follow redirects manually if needed |
| Private pin | Return clear error: "This pin is private or unavailable" |

---

## Done Checklist

- [ ] Express server runs on port 4000
- [ ] `POST /api/download` returns real media URLs
- [ ] `pin.it` short links work
- [ ] Image pins return `/originals/` URLs
- [ ] Video pins return `.mp4` URL
- [ ] Invalid URLs return proper error (not crash)
- [ ] Rate limiter active
- [ ] Winston logs errors to console (file logging in Sprint 2)

**Next → [SPRINT-02-DATABASE-API.md](./SPRINT-02-DATABASE-API.md)**
