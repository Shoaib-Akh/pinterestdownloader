# PinFlow — Complete Page Catalog

Every page in the final site, what it does, and why it exists.

---

## Public Pages

### 1. Home — `/`
**Purpose:** Main entry point. User downloads Pinterest media here.  
**Priority:** 🔴 Critical  
**Built in:** Sprint 4

| Section | What It Shows |
|---------|---------------|
| Hero | Headline + URL input + Download button |
| Stats bar | Live download count from API |
| How it works | 3-step guide (Paste → Extract → Download) |
| Features bento | 4–6 feature cards (fast, free, HD, mobile) |
| FAQ preview | First 3 FAQs with link to full FAQ page |
| CTA | "Try it now" button scrolls to input |

**User action:** Paste URL → click Download → see result card

---

### 2. Download Result — `/download?url=...`
**Purpose:** Direct link to a download result. Shareable URL.  
**Priority:** 🔴 Critical  
**Built in:** Sprint 4

**User action:** Opens link → auto-fetches media → shows ResultCard  
**Use case:** User shares download link with friend

---

### 3. FAQ — `/faq`
**Purpose:** Answer common questions. SEO rich snippets.  
**Priority:** 🟡 Important  
**Built in:** Sprint 4

**Data:** Dynamic from `GET /api/faq`  
**Features:** Search filter, accordion, JSON-LD schema  
**SEO value:** Google FAQ rich results in search

---

### 4. About — `/about`
**Purpose:** Build trust. Tell users what PinFlow is.  
**Priority:** 🟢 Nice to have  
**Built in:** Sprint 5

**Content:** Static — what, how, disclaimer (not affiliated with Pinterest)

---

### 5. Privacy Policy — `/privacy`
**Purpose:** Legal requirement (GDPR, CCPA, ad networks).  
**Priority:** 🔴 Required before launch  
**Built in:** Sprint 5

**Must cover:** Data collected, cookies, retention, user rights

---

### 6. Terms of Service — `/terms`
**Purpose:** Legal protection. Limit liability.  
**Priority:** 🔴 Required before launch  
**Built in:** Sprint 5

**Must cover:** Acceptable use, disclaimer, liability limits

---

### 7. DMCA — `/dmca`
**Purpose:** Copyright takedown policy. **Required for downloader sites.**  
**Priority:** 🔴 Required before launch  
**Built in:** Sprint 5

**Must cover:** Takedown process, agent contact, counter-notification

---

### 8. Contact — `/contact`
**Purpose:** User support. Trust signal for Google.  
**Priority:** 🟡 Important  
**Built in:** Sprint 5

**Form fields:** Name, Email, Message  
**Backend:** `POST /api/contact` → saves to database  
**Admin:** Viewable in admin contact inbox

---

### 9. Blog List — `/blog`
**Purpose:** SEO traffic. Long-tail keyword ranking.  
**Priority:** 🟡 Important  
**Built in:** Sprint 5

**Data:** `GET /api/blog?page=1&limit=10`  
**Shows:** Cover image, title, excerpt, date  
**SEO value:** Ranks for "how to download pinterest video" etc.

---

### 10. Blog Post — `/blog/[slug]`
**Purpose:** Individual SEO article page.  
**Priority:** 🟡 Important  
**Built in:** Sprint 5

**Data:** `GET /api/blog/:slug`  
**Shows:** Full markdown content, CTA to download  
**Example slugs:**
- `how-to-download-pinterest-videos-iphone`
- `pinterest-image-downloader-hd-quality`
- `is-downloading-pinterest-legal`

---

### 11. Video Downloader — `/pinterest-video-downloader`
**Purpose:** SEO landing page for "pinterest video downloader" keyword.  
**Priority:** 🟡 Important (SEO)  
**Built in:** Sprint 5

**Unique content:** Video-specific headline, steps, 3 video FAQs  
**Has:** Downloader form (same component)

---

### 12. Image Downloader — `/pinterest-image-downloader`
**Purpose:** SEO landing page for "pinterest image downloader" keyword.  
**Priority:** 🟡 Important (SEO)  
**Built in:** Sprint 5

**Unique content:** Image-specific headline, HD quality explanation

---

### 13. GIF Downloader — `/pinterest-gif-downloader`
**Purpose:** SEO landing page for "pinterest gif downloader" keyword.  
**Priority:** 🟢 Nice to have (SEO)  
**Built in:** Sprint 5

**Unique content:** GIF-specific headline, animated GIF explanation

---

## Admin Pages (Protected)

### 14. Admin Login — `/admin/login`
**Purpose:** Authenticate admin users.  
**Built in:** Sprint 6

**Form:** Email + Password → JWT token

---

### 15. Admin Dashboard — `/admin`
**Purpose:** Overview of site performance.  
**Built in:** Sprint 6

**Shows:**
- Total downloads (all time)
- Today's downloads
- Page views
- Top countries chart
- Top media types
- Recent downloads table

---

### 16. Admin Downloads — `/admin/downloads`
**Purpose:** Monitor all download activity. Debug failures.  
**Built in:** Sprint 6

**Shows:** Paginated table — URL, type, country, date

---

### 17. Admin Blog — `/admin/blog`
**Purpose:** Create, edit, delete blog posts.  
**Built in:** Sprint 6

**Actions:** Create new, edit existing, publish/unpublish, delete

---

### 18. Admin FAQ — `/admin/faq`
**Purpose:** Manage FAQ content without code changes.  
**Built in:** Sprint 6

**Actions:** Add, edit, reorder, publish/unpublish

---

### 19. Admin Contacts — `/admin/contacts`
**Purpose:** Read user contact form submissions.  
**Built in:** Sprint 6

**Shows:** Name, email, message, date, read/unread status

---

## System Routes (Not Pages)

| Route | Purpose |
|-------|---------|
| `/sitemap.xml` | Auto-generated sitemap for Google |
| `/robots.txt` | Crawler instructions |
| `/api/health` | Backend health check (VPS monitoring) |

---

## Page Count Summary

| Category | Count |
|----------|-------|
| Public pages | 13 |
| Admin pages | 6 |
| System routes | 3 |
| **Total** | **22 routes** |

---

## What Each Page Does for Your Business

| Page | Traffic | Trust | Revenue |
|------|---------|-------|---------|
| Home | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| SEO category pages | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Blog | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| FAQ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Privacy/Terms/DMCA | ⭐ | ⭐⭐⭐⭐⭐ | ⭐ (required for ads) |
| Admin | — | — | Operations |

---

## Current Status vs Target

| Page | Current | Target |
|------|---------|--------|
| Home | ✅ Shell (dummy) | Sprint 4 |
| Download Result | ❌ | Sprint 4 |
| FAQ | ✅ Hardcoded dummy | Sprint 4 |
| About | ❌ | Sprint 5 |
| Privacy | ❌ | Sprint 5 |
| Terms | ❌ | Sprint 5 |
| DMCA | ❌ | Sprint 5 |
| Contact | ❌ | Sprint 5 |
| Blog | ❌ | Sprint 5 |
| SEO category pages | ❌ | Sprint 5 |
| Admin (all) | ❌ | Sprint 6 |
