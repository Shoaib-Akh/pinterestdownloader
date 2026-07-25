# PinFlow — Master Execution Prompt (2026 Edition)

> **Read this file first.** Everything else lives in the `sprints/` folder.
> Work one sprint at a time. Do not skip ahead.

---

## What This Project Is

**PinFlow** is a production Pinterest media downloader website.

- **Frontend** (Next.js) → lives on **Vercel** (free, fast CDN)
- **Backend** (Express API) → lives on **your VPS** (Google Cloud free tier or similar)
- **Database** (PostgreSQL) → **Supabase** or **Neon** (free tier — do NOT run Postgres on a 1 GB VPS)
- **Cache** (Redis) → **Upstash Redis** (free tier) or Redis on VPS if you upgrade RAM

You build the backend on your server. The frontend calls your backend API.

---

## Current State (Honest Audit)

| Item | Status |
|------|--------|
| Homepage UI shell | ✅ Exists (dummy — looks AI-generated) |
| Pinterest extractor | ❌ Broken — returns empty URLs |
| Express backend | ❌ Not built (only a markdown spec) |
| Database wired up | ❌ Schema exists, not connected |
| Auth / Admin | ❌ Not built |
| Extra pages (13 planned) | ❌ Only 1 page exists |
| Docker / Deploy config | ❌ Missing |

**Conclusion:** You have a UI mockup. Follow the sprints below to make it real.

---

## Sprint Map — Do This In Order

| Sprint | File | You Build | Time Est. |
|--------|------|-----------|-----------|
| **0** | [sprints/SPRINT-00-SETUP.md](./sprints/SPRINT-00-SETUP.md) | Fix project structure, env files, brand, run scripts | 2–4 hrs |
| **1** | [sprints/SPRINT-01-BACKEND-CORE.md](./sprints/SPRINT-01-BACKEND-CORE.md) | Express server + **working** Pinterest extractor | 1–2 days |
| **2** | [sprints/SPRINT-02-DATABASE-API.md](./sprints/SPRINT-02-DATABASE-API.md) | PostgreSQL, Redis cache, all API routes | 1–2 days |
| **3** | [sprints/SPRINT-03-UI-DESIGN-SYSTEM.md](./sprints/SPRINT-03-UI-DESIGN-SYSTEM.md) | 2026 design system (NOT generic AI look) | 1 day |
| **4** | [sprints/SPRINT-04-CORE-PAGES.md](./sprints/SPRINT-04-CORE-PAGES.md) | Home, Download Result, FAQ — wired to backend | 2 days |
| **5** | [sprints/SPRINT-05-SEO-PAGES.md](./sprints/SPRINT-05-SEO-PAGES.md) | About, Privacy, Terms, Blog, Contact | 1–2 days |
| **6** | [sprints/SPRINT-06-ADMIN-DASHBOARD.md](./sprints/SPRINT-06-ADMIN-DASHBOARD.md) | Admin login, stats, blog/FAQ manager | 2 days |
| **7** | [sprints/SPRINT-07-DEPLOYMENT.md](./sprints/SPRINT-07-DEPLOYMENT.md) | Google VPS, Docker, Nginx, SSL, go live | 1 day |
| **8** | [sprints/SPRINT-08-PERFORMANCE-POLISH.md](./sprints/SPRINT-08-PERFORMANCE-POLISH.md) | Speed, SEO, monitoring, final QA | 1 day |

**Total:** ~10–14 days of focused work.

---

## Reference Docs (Read When Needed)

| File | Purpose |
|------|---------|
| [sprints/PAGE-CATALOG.md](./sprints/PAGE-CATALOG.md) | Every page — what it does, why it exists |
| [sprints/DEPLOYMENT-GOOGLE-VPS.md](./sprints/DEPLOYMENT-GOOGLE-VPS.md) | Google free VPS — good or bad? Full setup |
| [sprints/AI-PROMPTS.md](./sprints/AI-PROMPTS.md) | Copy-paste prompts for Cursor/AI per sprint |
| [sprints/README.md](./sprints/README.md) | Sprint folder index |

---

## Architecture (Final Target)

```
  USER BROWSER
       │
       ▼
┌──────────────────┐
│  Vercel (Free)   │  ← Next.js 15 frontend
│  pinflow.app     │     Static + SSR pages
└────────┬─────────┘
         │ HTTPS REST
         ▼
┌──────────────────┐
│  Your VPS        │  ← Express.js backend (port 4000)
│  api.pinflow.app │     Pinterest scraper lives HERE
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│ Upstash│ │ Supabase │  ← Free tiers (recommended)
│ Redis  │ │ Postgres │
└────────┘ └──────────┘
```

---

## Google Free VPS — Quick Answer

**Yes, it works — but only for the backend API, not everything.**

| Service | Put It Where | Why |
|---------|--------------|-----|
| Frontend (Next.js) | **Vercel** (free) | Fast CDN, zero server config |
| Backend (Express) | **Google e2-micro** (free) | Always-free tier, enough for API |
| PostgreSQL | **Supabase / Neon** (free) | 1 GB VPS cannot run Postgres reliably |
| Redis | **Upstash** (free) | Saves VPS RAM |
| Media files | **Direct CDN links** | Never store Pinterest media on your server |

**Google Cloud Always Free limits:**
- 1× e2-micro VM (0.25–2 vCPU burst, **1 GB RAM**)
- 30 GB disk
- 1 GB/month egress (outbound traffic) in some regions

**Verdict:** Good for backend. Bad if you try to run Postgres + Redis + Node on the same 1 GB machine.

Full details → [sprints/DEPLOYMENT-GOOGLE-VPS.md](./sprints/DEPLOYMENT-GOOGLE-VPS.md)

---

## Brand Decision (Pick One — Do Not Mix)

| Option | Name | Primary Color | Feel |
|--------|------|---------------|------|
| **A (Recommended)** | **PinFlow** | `#6C63FF` Indigo | Premium, modern, not Pinterest-red clone |
| B | PintDown | `#E60023` Red | Direct pintdown.site clone |

Use **PinFlow** unless you specifically want a pintdown clone look.

---

## How To Use These Sprints

1. Open the sprint file for your current sprint.
2. Complete every checkbox in **"Your Tasks"**.
3. Run the **"Verify"** commands — all must pass before moving on.
4. Use the matching prompt from [sprints/AI-PROMPTS.md](./sprints/AI-PROMPTS.md) if you use Cursor AI.
5. Mark sprint done. Open next sprint.

---

## Questions You Might Have

**Q: Can I use Next.js API routes instead of Express on VPS?**
A: No for production. Pinterest scraping needs a persistent server with custom headers, Redis cache, and queue workers. Vercel serverless functions timeout at 10–60 seconds and get cold starts. Express on VPS is the right choice.

**Q: Do I need Docker?**
A: Strongly recommended for Sprint 7. Makes deploy repeatable. One `docker compose up` and backend runs.

**Q: Why is the current UI "AI-generated looking"?**
A: Generic rose/red palette, centered hero, 6 identical feature cards, system font, no real brand identity. Sprint 3 fixes this with a proper 2026 design system.

**Q: What makes the extractor actually work?**
A: Pinterest is a React SPA. Simple `cheerio` + `axios` fails. Sprint 1 uses Pinterest's internal JSON API (`/resource/PinResource/get/`) and proper redirect handling for `pin.it` links.

---

## Deprecated Files (Do Not Follow These)

These old prompts are replaced by this master doc + sprints:

- ~~`PINTDOWN_CLONE_BLUEPRINT.md`~~ → use `MASTER_PROMPT.md`
- ~~`PROMPT_MASTER_BLUEPRINT.md`~~ → merged into sprints
- ~~`backend/BACKEND_PROMPT.md`~~ → use `sprints/SPRINT-01` and `SPRINT-02`

---

**Start here → [sprints/SPRINT-00-SETUP.md](./sprints/SPRINT-00-SETUP.md)**
