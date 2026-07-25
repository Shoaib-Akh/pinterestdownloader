# Sprint 8 — Performance, SEO & Final Polish

**Goal:** Hit Lighthouse 90+ scores, finalize SEO, add monitoring, and ship a production-quality site.

**Time:** 1 day  
**Depends on:** [SPRINT-07-DEPLOYMENT.md](./SPRINT-07-DEPLOYMENT.md)  
**This is the final sprint.**

---

## Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| Lighthouse Performance | ≥ 90 | Image optimization, lazy load |
| Lighthouse SEO | ≥ 95 | Metadata, sitemap, schema |
| Lighthouse Accessibility | ≥ 90 | Alt text, contrast, focus states |
| First Contentful Paint | < 1.5s | Vercel CDN, font display swap |
| API response (cached) | < 50ms | Redis cache |
| API response (fresh) | < 3s | Pinterest API timeout tuning |

---

## Task 1: Frontend Performance

### Image Optimization
- Use Next.js `<Image>` for all static images
- Result card preview: lazy load, max-width 400px
- Blog cover images: WebP format, responsive sizes

### Font Loading
```typescript
// Already in Sprint 3 — verify display: 'swap' is set
const sans = Plus_Jakarta_Sans({ display: 'swap' });
```

### Code Splitting
- `ResultCard` → dynamic import (loads only after download click)
- Admin pages → separate bundle (not loaded on public pages)

```typescript
const ResultCard = dynamic(() => import('@/components/ResultCard'), {
  loading: () => <ResultCardSkeleton />
});
```

### Remove Unused Dependencies
```bash
npm uninstall next-auth  # if not used yet
# Check bundle: npm run build && npx @next/bundle-analyzer
```

---

## Task 2: Backend Performance

### Response Compression
Already have `compression()` middleware — verify it's active.

### Cache Headers
```typescript
// Public stats — cache 60 seconds
res.set('Cache-Control', 'public, max-age=60');

// FAQ — cache 1 hour
res.set('Cache-Control', 'public, max-age=3600');

// Download results — no cache (dynamic)
res.set('Cache-Control', 'no-store');
```

### Connection Pooling
Prisma handles this automatically. Set in `DATABASE_URL`:
```
?connection_limit=5&pool_timeout=10
```
Keep low on free Supabase tier.

---

## Task 3: SEO Final Pass

### Checklist
- [ ] Every page has unique `<title>` and `<meta description>`
- [ ] `/sitemap.xml` submitted to Google Search Console
- [ ] `/robots.txt` allows crawling
- [ ] JSON-LD on FAQ page
- [ ] Open Graph tags on all pages
- [ ] Canonical URLs set
- [ ] No duplicate content between category pages

### Google Search Console Setup
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `pinflow.app`
3. Verify via DNS TXT record
4. Submit sitemap: `https://pinflow.app/sitemap.xml`

### Structured Data
Add to home page:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PinFlow",
  "description": "Free Pinterest media downloader",
  "url": "https://pinflow.app",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

---

## Task 4: Error Monitoring

### Backend Logging
Winston already set up — add file transport for production:
```typescript
new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
```

### Uptime Monitoring (Free)
- [UptimeRobot](https://uptimerobot.com) — ping `https://api.pinflow.app/api/health` every 5 min
- Alert via email if down

### Optional: Sentry (Free Tier)
```bash
npm install @sentry/node  # backend
npm install @sentry/nextjs  # frontend
```
Captures crashes with stack traces.

---

## Task 5: Security Final Pass

- [ ] `helmet()` active on backend
- [ ] CORS restricted to `pinflow.app` only (not `*`)
- [ ] Rate limiter active (30 req/15min)
- [ ] JWT secret is 64+ random chars in production
- [ ] No `.env` files in git (`git log --all -- .env` → empty)
- [ ] Admin password is strong (16+ chars)
- [ ] HTTPS enforced (HTTP redirects to HTTPS)

---

## Task 6: Final QA Checklist

Run through every user flow:

### Public User Flows
- [ ] Home → paste URL → download image → file saves
- [ ] Home → paste URL → download video → MP4 saves
- [ ] Home → paste pin.it link → works
- [ ] Home → paste invalid URL → clear error message
- [ ] Home → paste private pin → clear error message
- [ ] `/faq` → all questions load
- [ ] `/blog` → posts load
- [ ] `/blog/[slug]` → full post renders
- [ ] `/contact` → form submits
- [ ] `/pinterest-video-downloader` → unique content + form works
- [ ] Dark mode toggle works
- [ ] Mobile (375px) — all pages usable

### Admin Flows
- [ ] Login with wrong password → error
- [ ] Login with correct password → dashboard
- [ ] Create blog post → appears on public site
- [ ] Edit FAQ → updates on public site
- [ ] View download logs
- [ ] Logout → cannot access admin without re-login

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO ≥ 95
- [ ] Cached download response < 100ms
- [ ] Fresh download response < 5s

---

## Task 7: Launch Checklist

- [ ] Domain live with SSL
- [ ] Google Search Console verified
- [ ] UptimeRobot monitoring active
- [ ] Privacy Policy + Terms + DMCA pages live
- [ ] Admin account secured
- [ ] Backup strategy for Supabase (automatic on paid, manual export on free)
- [ ] GitHub repo private (if not open source)

---

## You Are Done 🎉

When all checkboxes above are checked, PinFlow is production-ready.

### What You Built
- Full-stack Pinterest downloader
- 13+ pages with SEO
- Admin CMS
- Deployed on Vercel + VPS
- Cached, rate-limited, secure API

### Future Enhancements (Post-Launch)
- User accounts + download history
- Board bulk downloader (BullMQ queue)
- MP3 audio extraction from video pins
- Browser extension
- API keys for developers
- Premium tier ($5/mo)

---

## Done Checklist

- [ ] Lighthouse scores meet targets
- [ ] Google Search Console set up
- [ ] Uptime monitoring active
- [ ] All QA flows pass
- [ ] Security audit complete
- [ ] Site is live at `pinflow.app`

**Congratulations — PinFlow is shipped.**
