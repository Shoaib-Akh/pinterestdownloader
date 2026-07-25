# Sprint 2 — Database, Redis Cache & Full API

**Goal:** Connect PostgreSQL + Redis. Add analytics tracking, FAQ/blog APIs, and cache download results.

**Time:** 1–2 days  
**Depends on:** [SPRINT-01-BACKEND-CORE.md](./SPRINT-01-BACKEND-CORE.md)  
**Next sprint:** [SPRINT-03-UI-DESIGN-SYSTEM.md](./SPRINT-03-UI-DESIGN-SYSTEM.md)

---

## Why Not Run Postgres on Your VPS?

Google free e2-micro = **1 GB RAM**.

| Service | RAM Used |
|---------|----------|
| Node.js Express | ~80–150 MB |
| PostgreSQL | ~200–400 MB |
| Redis | ~50–100 MB |
| OS overhead | ~200 MB |
| **Total** | **530–850 MB** ← crashes under load |

**Use free managed services instead:**

| Service | Free Tier | Sign Up |
|---------|-----------|---------|
| **Supabase** (Postgres) | 500 MB, 2 projects | supabase.com |
| **Neon** (Postgres) | 512 MB | neon.tech |
| **Upstash** (Redis) | 10K commands/day | upstash.com |

---

## Database Schema (Use This — Final)

Move schema to `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Download {
  id        String   @id @default(cuid())
  url       String
  pinId     String?
  mediaType String   // image | video | gif | carousel
  quality   String   @default("original")
  country   String?
  browser   String?
  device    String?
  ipHash    String?  // hashed IP for analytics, not raw IP
  createdAt DateTime @default(now())

  @@index([createdAt])
  @@index([mediaType])
}

model Analytics {
  id        String   @id @default(cuid())
  page      String
  views     Int      @default(0)
  downloads Int      @default(0)
  date      DateTime @default(now()) @db.Date

  @@unique([page, date])
}

model Blog {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?
  content     String   @db.Text
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([published])
}

model FAQ {
  id        String   @id @default(cuid())
  question  String
  answer    String   @db.Text
  order     Int      @default(0)
  published Boolean  @default(true)
  createdAt DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## Your Tasks

### Task 1: Setup Prisma in Backend

```bash
cd backend
npm install @prisma/client
npm install -D prisma
npx prisma init
# Paste schema above
npx prisma migrate dev --name init
npx prisma generate
```

Create `backend/src/config/database.ts`:
```typescript
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
```

### Task 2: Setup Redis Cache

```bash
npm install ioredis
```

Create `backend/src/config/redis.ts`:
```typescript
import Redis from 'ioredis';
export const redis = new Redis(process.env.REDIS_URL!);
```

**Cache strategy for downloads:**
```
Key:   download:{pinId}
TTL:   3600 seconds (1 hour)
Value: JSON string of MediaResult
```

Before calling Pinterest API → check Redis.  
After successful extraction → save to Redis.

This makes repeat downloads **instant** (< 10ms vs 2–5 seconds).

### Task 3: Log Every Download

After successful extraction in download controller:
```typescript
await prisma.download.create({
  data: {
    url: inputUrl,
    pinId: result.pinId,
    mediaType: result.type,
    country: req.headers['cf-ipcountry'] || 'Unknown',
    browser: parseBrowser(req.headers['user-agent']),
    ipHash: hashIp(req.ip),
  }
});
```

Also increment analytics:
```typescript
await prisma.analytics.upsert({
  where: { page_date: { page: '/', date: today } },
  update: { downloads: { increment: 1 } },
  create: { page: '/', downloads: 1, date: today }
});
```

### Task 4: Build All Public API Routes

| Method | Route | What It Does |
|--------|-------|--------------|
| POST | `/api/download` | Extract media (Sprint 1 + cache + log) |
| POST | `/api/preview` | Fast metadata only (title + thumbnail) |
| GET | `/api/faq` | Return published FAQs ordered by `order` |
| GET | `/api/blog` | Paginated blog list (`?page=1&limit=10`) |
| GET | `/api/blog/:slug` | Single blog post |
| POST | `/api/contact` | Save contact form message |
| GET | `/api/stats/public` | Public stats: total downloads, today's count |

### Task 5: Seed Initial Data

Create `backend/prisma/seed.ts`:

**6 FAQs** (real content, not lorem ipsum):
1. How to download Pinterest videos on iPhone?
2. Is PinFlow free?
3. Do I need an account?
4. What quality do I get?
5. Is it legal?
6. Why is my link not working?

**1 sample blog post** about "How to save Pinterest images in HD"

Run: `npx prisma db seed`

### Task 6: Upgrade Rate Limiter to Redis

Replace in-memory limiter with Redis-backed:
```
Key:   ratelimit:{ipHash}
TTL:   900 seconds (15 min)
Max:   30 requests
```

Use `express-rate-limit` + Redis store.

### Task 7: Input Validation with Zod

Every route must validate input:

```typescript
// download schema
const downloadSchema = z.object({
  url: z.string().url().refine(
    (url) => url.includes('pinterest.com') || url.includes('pin.it'),
    { message: 'Must be a Pinterest URL' }
  )
});
```

---

## Full API Reference

### POST /api/download
```json
// Request
{ "url": "https://pin.it/abc123" }

// Response 200
{
  "success": true,
  "pinId": "1234567890",
  "title": "Pin title",
  "type": "image",
  "thumbnail": "https://i.pinimg.com/...",
  "mediaUrl": "https://i.pinimg.com/originals/...",
  "cached": false
}
```

### GET /api/stats/public
```json
{
  "totalDownloads": 15420,
  "todayDownloads": 342,
  "supportedTypes": ["image", "video", "gif", "carousel"]
}
```

### GET /api/faq
```json
{
  "data": [
    { "id": "...", "question": "...", "answer": "..." }
  ]
}
```

---

## Verify

```bash
# Migrations applied
npx prisma migrate status
# → All migrations applied

# Seed data exists
curl http://localhost:4000/api/faq
# → returns 6 FAQs

# Cache works (run same pin twice)
curl -X POST http://localhost:4000/api/download -H "Content-Type: application/json" -d '{"url":"REAL_PIN_URL"}'
# First: "cached": false
# Second: "cached": true (much faster)

# Stats endpoint
curl http://localhost:4000/api/stats/public
# → totalDownloads > 0 after test downloads

# Rate limit
# Send 31 requests rapidly → 429 Too Many Requests
```

---

## Done Checklist

- [ ] Supabase/Neon Postgres connected
- [ ] Upstash Redis connected
- [ ] Prisma migrations run
- [ ] Download results cached in Redis (1 hour TTL)
- [ ] Every download logged to DB
- [ ] FAQ + Blog APIs working
- [ ] Seed data loaded
- [ ] Redis rate limiter active
- [ ] All inputs validated with Zod

**Next → [SPRINT-03-UI-DESIGN-SYSTEM.md](./SPRINT-03-UI-DESIGN-SYSTEM.md)**
