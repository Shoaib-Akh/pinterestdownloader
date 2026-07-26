# Sprint 0 — Project Setup & Cleanup

**Goal:** Clean project structure, fix brand, create env templates, make `npm run dev` work for both frontend and backend.

**Time:** 2–4 hours  
**Depends on:** Nothing — start here  
**Next sprint:** [SPRINT-01-BACKEND-CORE.md](./SPRINT-01-BACKEND-CORE.md)

---

## What You Will Have After This Sprint

```
pintersdownloder/
├── frontend/          ← move current Next.js app here (or keep root — see below)
├── backend/           ← new Express TypeScript app
├── sprints/           ← these docs
├── docker-compose.yml ← created in Sprint 7, stub env now
├── .env.example       ← root template
├── MASTER_PROMPT.md
└── package.json       ← root scripts to run both
```

---

## Decision: Folder Structure

**Option A (Recommended — Monorepo):**
```
pintersdownloder/
├── apps/
│   ├── web/       ← Next.js frontend
│   └── api/       ← Express backend
```

**Option B (Keep current — simpler for now):**
```
pintersdownloder/
├── src/           ← frontend (already exists)
├── backend/       ← backend (you build in Sprint 1)
```

Use **Option B** if you want less migration work. The sprints assume Option B unless you prefer A.

---

## Your Tasks

### 1. Fix Brand Name Everywhere

Pick **pinSsave** (recommended). Search and replace:

| Old | New |
|-----|-----|
| PintDown | pinSsave |
| pintdown | pinflow |
| Pint Down | pinSsave |

Files to update:
- [ ] `src/components/Header.tsx`
- [ ] `src/components/Footer.tsx`
- [ ] `src/components/DownloaderForm.tsx`
- [ ] `src/app/layout.tsx` (metadata title/description)

### 2. Create Environment Files

**`.env.example`** (root — frontend):
```env
# Frontend (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=pinSsave
```

**`backend/.env.example`** (backend — create folder in Sprint 1):
```env
# Backend (Express)
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/pinflow
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-this-to-a-64-char-random-string
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
PINTEREST_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
```

Copy to `.env` and `backend/.env` — **never commit `.env` files**.

### 3. Add Root Run Scripts

Update root `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:backend": "cd backend && npm run dev",
    "dev:all": "concurrently \"npm run dev\" \"npm run dev:backend\"",
    "build": "next build",
    "lint": "next lint"
  }
}
```

Install concurrently: `npm install -D concurrently`

### 4. Remove Dead / Misleading Code

- [ ] Delete or disable `src/app/api/download/route.ts` — downloads will go through Express backend, not Next.js API route (avoids duplicate logic)
- [ ] Update `DownloaderForm.tsx` to call `process.env.NEXT_PUBLIC_API_URL + '/api/download'` instead of `/api/download`
- [ ] Remove unused `next-auth` from package.json if not used yet (add back in Sprint 6)

### 5. Fix TypeScript Paths

Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 6. Create `.gitignore` Entries

```
.env
.env.local
backend/.env
backend/logs/
node_modules/
.next/
dist/
```

---

## Verify (All Must Pass)

```bash
# Frontend starts
npm run dev
# → http://localhost:3000 loads (UI only, download won't work yet)

# No TypeScript errors
npm run build
# → ✓ Compiled successfully

# Brand is consistent
grep -r "PintDown" src/
# → should return nothing (or only in comments you haven't updated yet)
```

---

## Common Problems

| Problem | Fix |
|---------|-----|
| Port 3000 in use | Kill old process: `lsof -ti:3000 \| xargs kill -9` |
| Build fails on types | Run `npm install` and check `@/types/index.ts` |
| `.env` not loading | Restart dev server after creating `.env` |

---

## Done Checklist

- [ ] Brand = pinSsave everywhere in frontend
- [ ] `.env.example` created
- [ ] Frontend builds without errors
- [ ] DownloaderForm points to `NEXT_PUBLIC_API_URL` (backend not built yet — that's Sprint 1)
- [ ] Old Next.js `/api/download` route removed or marked deprecated

**Next → [SPRINT-01-BACKEND-CORE.md](./SPRINT-01-BACKEND-CORE.md)**
