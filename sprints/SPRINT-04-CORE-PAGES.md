# Sprint 4 — Core Pages (Home, Download Result, FAQ)

**Goal:** Build the 3 most important pages, fully connected to your Express backend API.

**Time:** 2 days  
**Depends on:** [SPRINT-03-UI-DESIGN-SYSTEM.md](./SPRINT-03-UI-DESIGN-SYSTEM.md)  
**Next sprint:** [SPRINT-05-SEO-PAGES.md](./SPRINT-05-SEO-PAGES.md)

---

## Pages in This Sprint

| Page | Route | Priority |
|------|-------|----------|
| Home | `/` | 🔴 Critical |
| Download Result | `/download` or inline on home | 🔴 Critical |
| FAQ | `/faq` | 🟡 Important |

---

## Page 1: Home (`/`)

### What It Does
The main landing page. User pastes a Pinterest URL, clicks Download, sees result.

### Sections (Top to Bottom)

| Section | Component | Data Source |
|---------|-----------|-------------|
| Hero + Input | `HeroSection.tsx` | Static + live stats from API |
| Live Stats Bar | `StatsBar.tsx` | `GET /api/stats/public` |
| How It Works | `HowItWorks.tsx` | Static (3 steps) |
| Features Bento | `FeaturesBento.tsx` | Static |
| FAQ Preview | `FAQPreview.tsx` | `GET /api/faq` (first 3) |
| CTA Banner | `CTABanner.tsx` | Static |

### Hero Input Flow

```
User pastes URL
  → clicks Download (or Enter)
  → POST ${NEXT_PUBLIC_API_URL}/api/download
  → loading skeleton shows (1–3 sec)
  → ResultCard appears below input OR navigate to /download?url=...
  → Error toast if failed
```

### Files to Create/Update

```
src/
├── app/
│   └── page.tsx                    ← compose sections
├── components/
│   ├── HeroSection.tsx             ← NEW
│   ├── DownloaderForm.tsx          ← REWRITE (use design system)
│   ├── ResultCard.tsx              ← NEW (extract from DownloaderForm)
│   ├── StatsBar.tsx                ← NEW
│   ├── HowItWorks.tsx              ← NEW
│   ├── FeaturesBento.tsx           ← REWRITE FeaturesSection
│   └── FAQPreview.tsx              ← NEW
└── lib/
    └── api.ts                      ← NEW — axios wrapper for backend
```

### API Client (`src/lib/api.ts`)

```typescript
const API = process.env.NEXT_PUBLIC_API_URL;

export async function downloadMedia(url: string) {
  const res = await fetch(`${API}/api/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  return res.json();
}

export async function getPublicStats() {
  const res = await fetch(`${API}/api/stats/public`, { next: { revalidate: 60 } });
  return res.json();
}

export async function getFAQs() {
  const res = await fetch(`${API}/api/faq`, { next: { revalidate: 3600 } });
  return res.json();
}
```

### SEO Metadata (Home)

```typescript
export const metadata: Metadata = {
  title: 'pinSsave — Download Pinterest Videos, Images & GIFs in HD',
  description: 'Free Pinterest downloader. Save videos, photos, and GIFs in original HD quality. No signup, works on iPhone, Android, and desktop.',
  openGraph: {
    title: 'pinSsave — Pinterest Media Downloader',
    description: '...',
    url: 'https://pinflow.app',
    siteName: 'pinSsave',
    type: 'website',
  },
};
```

---

## Page 2: Download Result

### Option A (Recommended): Inline on Home
Result appears below the input on the same page. Better UX — no page reload.

### Option B: Dedicated Page `/download`
URL: `/download?url=https://pin.it/abc`  
Auto-fetches on page load if `url` param present.  
Good for sharing direct result links.

**Build both:** Inline default + `/download` page for shared links.

### ResultCard Component

```typescript
interface ResultCardProps {
  result: {
    title: string;
    type: 'image' | 'video' | 'gif' | 'carousel';
    thumbnail: string;
    mediaUrl: string;
    items?: Array<{ url: string; type: string }>;
  };
}
```

Features:
- [ ] Preview (image or video with controls)
- [ ] Type badge (IMAGE / VIDEO / GIF)
- [ ] Download button → direct CDN link with `download` attribute
- [ ] Copy link button → clipboard + toast
- [ ] Carousel: show all items with individual download buttons
- [ ] Loading skeleton while fetching

### `/download` Page

```
src/app/download/page.tsx   ← reads ?url= param, fetches, shows ResultCard
```

---

## Page 3: FAQ (`/faq`)

### What It Does
Answers common questions. Important for SEO and reducing support requests.

### Data Source
`GET /api/faq` — dynamic from database (seeded in Sprint 2)

NOT hardcoded in component (current dummy approach).

### Features
- [ ] Full accordion list (all FAQs from API)
- [ ] Search/filter input at top
- [ ] JSON-LD FAQ schema for Google rich snippets
- [ ] Link from home FAQ preview ("See all questions →")

### JSON-LD Schema

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
  }))
};
```

---

## Your Tasks

### Day 1
- [ ] Create `src/lib/api.ts`
- [ ] Build `ResultCard.tsx`
- [ ] Rewrite `DownloaderForm.tsx` → uses API client + design system
- [ ] Build `HeroSection.tsx` with asymmetric layout
- [ ] Build `StatsBar.tsx` (fetches live stats)

### Day 2
- [ ] Build `HowItWorks.tsx` (3 steps with icons)
- [ ] Rewrite features → `FeaturesBento.tsx`
- [ ] Build `/faq` page with dynamic data + JSON-LD
- [ ] Build `/download` page for shared links
- [ ] Connect everything — end-to-end test with real Pinterest URL

---

## Verify (End-to-End Test)

1. Open `http://localhost:3000`
2. Paste a real public Pinterest pin URL
3. Click Download
4. Result card appears with image/video preview
5. Click "Download HD" → file downloads
6. Click "Copy Link" → toast "Copied!"
7. Stats bar shows download count incremented
8. Navigate to `/faq` → all 6 FAQs load from API
9. Search FAQ → filters work
10. Open `/download?url=PINTEREST_URL` → auto-loads result

---

## Done Checklist

- [ ] Home page uses new design system
- [ ] Download works end-to-end (frontend → backend → real media URL)
- [ ] ResultCard with preview, download, copy
- [ ] Live stats from backend API
- [ ] FAQ page dynamic from database
- [ ] JSON-LD FAQ schema present
- [ ] `/download?url=` page works
- [ ] Mobile responsive on all 3 pages
- [ ] Error states handled (invalid URL, network error, private pin)

**Next → [SPRINT-05-SEO-PAGES.md](./SPRINT-05-SEO-PAGES.md)**
