Created At: 2026-07-26T02:59:41+05:00
Completed At: 2026-07-26T03:04:00+05:00
File Path: `file:///Users/mac/Documents/priterstdowlod/pintersdownloder/sprints/SPRINT-06-ADMIN-DASHBOARD.md`

# Sprint 6 — Admin Dashboard

**Goal:** Build a password-protected admin panel to manage content, view analytics, and monitor the site.

**Time:** 2 days  
**Depends on:** [SPRINT-05-SEO-PAGES.md](./SPRINT-05-SEO-PAGES.md)  
**Next sprint:** [SPRINT-07-DEPLOYMENT.md](./SPRINT-07-DEPLOYMENT.md)

---

## What the Admin Panel Does

| Feature | Why |
|---------|-----|
| Login | Protect admin routes |
| Dashboard stats | See downloads, traffic, top countries |
| Blog manager | Create/edit/delete blog posts |
| FAQ manager | Add/edit/reorder FAQs |
| Contact inbox | Read user messages |
| Download logs | Monitor abuse, debug failures |

---

## Backend: Admin API Routes (Add to Express)

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Email + password → JWT token |
| POST | `/api/auth/logout` | Invalidate token (optional) |
| GET | `/api/auth/me` | Verify current admin session |

**JWT payload:**
```json
{ "userId": "...", "role": "ADMIN", "exp": 1234567890 }
```

Protect all `/api/admin/*` routes with JWT middleware.

**Create first admin user:**
```bash
# backend/src/scripts/createAdmin.ts
# Hash password with bcrypt, insert into User table with role ADMIN
```

### Admin Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/stats` | Dashboard overview |
| GET | `/api/admin/downloads` | Paginated download logs |
| GET | `/api/admin/contacts` | Contact messages |
| PATCH | `/api/admin/contacts/:id` | Mark message as read |
| GET | `/api/admin/blog` | All blog posts (including drafts) |
| POST | `/api/admin/blog` | Create blog post |
| PUT | `/api/admin/blog/:id` | Update blog post |
| DELETE | `/api/admin/blog/:id` | Delete blog post |
| GET | `/api/admin/faq` | All FAQs |
| POST | `/api/admin/faq` | Create FAQ |
| PUT | `/api/admin/faq/:id` | Update FAQ |
| DELETE | `/api/admin/faq/:id` | Delete FAQ |

### Dashboard Stats Response

```json
{
  "totalDownloads": 15420,
  "todayDownloads": 342,
  "weekDownloads": 2100,
  "totalPageViews": 85000,
  "topCountries": [
    { "country": "US", "count": 4200 },
    { "country": "IN", "count": 3100 }
  ],
  "topMediaTypes": [
    { "type": "image", "count": 9000 },
    { "type": "video", "count": 5000 }
  ],
  "recentDownloads": [ /* last 10 */ ]
}
```

---

## Frontend: Admin Pages

```
src/app/admin/
├── layout.tsx          ← sidebar layout, auth guard
├── login/
│   └── page.tsx        ← login form
├── page.tsx            ← dashboard (stats)
├── downloads/
│   └── page.tsx        ← download logs table
├── blog/
│   ├── page.tsx        ← blog list
│   ├── new/
│   │   └── page.tsx    ← create post
│   └── [id]/
│       └── edit/
│           └── page.tsx ← edit post
├── faq/
│   └── page.tsx        ← FAQ manager
└── contacts/
    └── page.tsx        ← contact inbox
```

---

## Your Tasks

### Day 1 — Backend Auth + Admin APIs
- [x] Install `bcryptjs` + `jsonwebtoken` in backend
- [x] Build auth controller (login, JWT middleware)
- [x] Create admin user script (`src/scripts/createAdmin.ts`)
- [x] Build all `/api/admin/*` routes
- [x] Build stats aggregation query

### Day 2 — Frontend Admin UI
- [x] Admin layout with dark sidebar
- [x] Login page
- [x] Dashboard with stat cards
- [x] Download logs table (paginated)
- [x] Blog CRUD (simple textarea for content — markdown)
- [x] FAQ manager (add/edit/delete/reorder)
- [x] Contact inbox

---

## Verify

Frontend:
- [x] `/admin/login` → login works
- [x] `/admin` → dashboard shows stats
- [x] Create blog post → appears on `/blog`
- [x] Edit FAQ → changes appear on `/faq`
- [x] Unauthenticated access to `/admin` → redirects to login

---

## Done Checklist

- [x] JWT auth working
- [x] Admin user created
- [x] Dashboard stats accurate
- [x] Blog CRUD complete
- [x] FAQ CRUD complete
- [x] Contact inbox working
- [x] Download logs viewable
- [x] Admin routes protected

**Next → [SPRINT-07-DEPLOYMENT.md](./SPRINT-07-DEPLOYMENT.md)**
