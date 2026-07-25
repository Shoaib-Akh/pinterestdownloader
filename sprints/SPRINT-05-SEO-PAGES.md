Created At: 2026-07-26T02:42:23+05:00
Completed At: 2026-07-26T03:00:00+05:00
File Path: `file:///Users/mac/Documents/priterstdowlod/pintersdownloder/sprints/SPRINT-05-SEO-PAGES.md`

# Sprint 5 — SEO & Content Pages

**Goal:** Build all remaining public pages for SEO, trust, and legal compliance.

**Time:** 1–2 days  
**Depends on:** [SPRINT-04-CORE-PAGES.md](./SPRINT-04-CORE-PAGES.md)  
**Next sprint:** [SPRINT-06-ADMIN-DASHBOARD.md](./SPRINT-06-ADMIN-DASHBOARD.md)

---

## Pages in This Sprint

| Page | Route | Why It Exists |
|------|-------|---------------|
| About | `/about` | Trust + brand story for SEO |
| Privacy Policy | `/privacy` | Legal requirement (GDPR, ads) |
| Terms of Service | `/terms` | Legal requirement |
| DMCA | `/dmca` | Required for media downloader sites |
| Contact | `/contact` | User support + trust signal |
| Blog List | `/blog` | SEO traffic driver |
| Blog Post | `/blog/[slug]` | Long-tail keyword pages |
| Category: Video | `/pinterest-video-downloader` | SEO landing page |
| Category: Image | `/pinterest-image-downloader` | SEO landing page |
| Category: GIF | `/pinterest-gif-downloader` | SEO landing page |

---

## Page Details

### `/about`
**Purpose:** Tell users who built PinFlow and why. Builds trust.

Content sections:
- What is PinFlow (2 paragraphs)
- How it works (brief)
- Not affiliated with Pinterest disclaimer
- Contact link

Static page — no API needed.

---

### `/privacy`
**Purpose:** Legal compliance. Required before running ads or collecting emails.

Must include:
- What data you collect (IP hash, download logs, cookies)
- How long you keep it
- Third parties (Google Analytics if used)
- User rights (GDPR: access, delete)
- Contact email for privacy requests

Use a generator like [termly.io](https://termly.io) for draft, then customize.

---

### `/terms`
**Purpose:** Limit liability. Required for any web service.

Must include:
- Service description
- Acceptable use (personal use only, no commercial redistribution)
- Disclaimer: not affiliated with Pinterest
- Limitation of liability
- Termination clause

---

### `/dmca`
**Purpose:** Copyright takedown policy. **Critical for downloader sites.**

Must include:
- DMCA agent contact email
- How to submit takedown notice
- Counter-notification process
- Repeat infringer policy

Without this page, you risk hosting provider suspension.

---

### `/contact`
**Purpose:** User support form.

```
Fields: Name, Email, Message
Submit → POST /api/contact
Success → "Message sent! We'll reply within 24 hours."
```

Backend saves to `ContactMessage` table (Sprint 2).

---

### `/blog` and `/blog/[slug]`
**Purpose:** Drive organic SEO traffic.

Data: `GET /api/blog` and `GET /api/blog/:slug`

Blog list page:
- Grid of post cards (cover image, title, excerpt, date)
- Pagination (10 per page)

Blog post page:
- Full content (markdown rendered)
- SEO metadata per post
- "Download Pinterest media" CTA at bottom
- Related posts

**Write 3 real blog posts** (not AI filler):
1. "How to Download Pinterest Videos on iPhone (2026 Guide)"
2. "Pinterest Image Downloader: Save Photos in Original HD Quality"
3. "Is It Legal to Download from Pinterest? What You Need to Know"

---

## SEO Category Landing Pages

These target specific search keywords:

| Route | Target Keyword | Unique Content |
|-------|---------------|----------------|
| `/pinterest-video-downloader` | "pinterest video downloader" | Video-specific hero + steps |
| `/pinterest-image-downloader` | "pinterest image downloader" | Image-specific hero + steps |
| `/pinterest-gif-downloader` | "pinterest gif downloader" | GIF-specific hero + steps |

Each page has:
- Unique H1 (not copy-pasted)
- Downloader form (same component, pre-set type hint)
- 3 unique FAQ items for that media type
- Unique meta description

**Do NOT duplicate home page content** — Google penalizes duplicate pages.

---

## Shared: SEO Infrastructure

### `src/app/sitemap.ts`
```typescript
export default function sitemap() {
  return [
    { url: 'https://pinflow.app', lastModified: new Date(), priority: 1 },
    { url: 'https://pinflow.app/faq', priority: 0.8 },
    { url: 'https://pinflow.app/blog', priority: 0.8 },
    { url: 'https://pinflow.app/pinterest-video-downloader', priority: 0.9 },
    // ... all pages
  ];
}
```

### `src/app/robots.ts`
```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: 'https://pinflow.app/sitemap.xml',
  };
}
```

### Per-Page Metadata Template
Every page must have unique:
- `title` (50–60 chars)
- `description` (150–160 chars)
- `openGraph` image

---

## Your Tasks

### Day 1 — Legal & Trust Pages
- [x] `/about` — static content
- [x] `/privacy` — privacy policy
- [x] `/terms` — terms of service
- [x] `/dmca` — DMCA policy
- [x] `/contact` — form connected to API
- [x] Add all to Footer links

### Day 2 — Blog & SEO Pages
- [x] `/blog` — list from API
- [x] `/blog/[slug]` — dynamic post page
- [x] Write 3 blog posts in admin (or seed file)
- [x] 3 category landing pages
- [x] `sitemap.ts` and `robots.ts`
- [x] Unique metadata on every page

---

## Verify

- [x] All 10 pages load without errors
- [x] Contact form submits and saves to DB
- [x] Blog posts render markdown correctly
- [x] Each page has unique `<title>` tag (check with View Source)
- [x] `/sitemap.xml` lists all pages
- [x] Footer links to Privacy, Terms, DMCA, Contact
- [x] Category pages have unique content (not duplicates)

---

## Done Checklist

- [x] 10 pages built
- [x] Legal pages complete (Privacy, Terms, DMCA)
- [x] Contact form working
- [x] Blog system connected to API
- [x] 3 SEO landing pages
- [x] Sitemap + robots.txt
- [x] Unique SEO metadata per page

**Next → [SPRINT-06-ADMIN-DASHBOARD.md](./SPRINT-06-ADMIN-DASHBOARD.md)**
