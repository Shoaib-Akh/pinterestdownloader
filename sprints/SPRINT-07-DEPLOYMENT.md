# Sprint 7 — Deployment (Go Live)

**Goal:** Deploy frontend to Vercel, backend to your VPS, connect domain, SSL, and go live.

**Time:** 1 day  
**Depends on:** [SPRINT-06-ADMIN-DASHBOARD.md](./SPRINT-06-ADMIN-DASHBOARD.md)  
**Next sprint:** [SPRINT-08-PERFORMANCE-POLISH.md](./SPRINT-08-PERFORMANCE-POLISH.md)

**Also read:** [DEPLOYMENT-GOOGLE-VPS.md](./DEPLOYMENT-GOOGLE-VPS.md) for Google Cloud specific steps.

---

## Deployment Architecture

```
pinflow.app          → Vercel (frontend)
api.pinflow.app      → Your VPS (backend)
db                   → Supabase (Postgres)
cache                → Upstash (Redis)
```

---

## Step 1: Prepare Production Environment

### Frontend `.env.production`
```env
NEXT_PUBLIC_API_URL=https://api.pinflow.app
NEXT_PUBLIC_SITE_URL=https://pinflow.app
NEXT_PUBLIC_SITE_NAME=pinSsave
```

### Backend `.env.production`
```env
PORT=4000
NODE_ENV=production
DATABASE_URL=postgresql://...@db.supabase.co:5432/postgres
REDIS_URL=rediss://...@upstash.io:6379
JWT_SECRET=your-64-char-production-secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://pinflow.app
```

---

## Step 2: Dockerize Backend

**`backend/Dockerfile`**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 4000
CMD ["node", "dist/app.js"]
```

**`docker-compose.yml`** (in project root):
```yaml
services:
  api:
    build: ./backend
    ports:
      - "4000:4000"
    env_file:
      - ./backend/.env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:4000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

## Step 3: Deploy Backend to VPS

SSH into your Google Cloud VM:

```bash
# On VPS — one-time setup
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx
sudo usermod -aG docker $USER

# Clone repo
git clone https://github.com/YOUR_USER/pinflow.git
cd pinflow

# Add production env
cp backend/.env.example backend/.env.production
nano backend/.env.production  # fill in real values

# Run migrations
docker run --rm -v $(pwd)/backend:/app -w /app \
  --env-file backend/.env.production \
  node:20-alpine sh -c "npm ci && npx prisma migrate deploy"

# Start backend
docker compose up -d

# Verify
curl http://localhost:4000/api/health
```

---

## Step 4: Nginx Reverse Proxy + SSL

**`/etc/nginx/sites-available/pinflow-api`**
```nginx
server {
    listen 80;
    server_name api.pinflow.app;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/pinflow-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL (free Let's Encrypt)
sudo certbot --nginx -d api.pinflow.app
```

---

## Step 5: Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://api.pinflow.app`
   - `NEXT_PUBLIC_SITE_URL` = `https://pinflow.app`
4. Deploy

**Custom domain on Vercel:**
- Add `pinflow.app` in Vercel dashboard
- Point DNS A record to Vercel IP (or CNAME to `cname.vercel-dns.com`)

---

## Step 6: DNS Configuration

At your domain registrar:

| Record | Type | Value |
|--------|------|-------|
| `@` | A or CNAME | Vercel |
| `www` | CNAME | `cname.vercel-dns.com` |
| `api` | A | Your VPS IP address |

Wait 5–30 minutes for DNS propagation.

---

## Step 7: PM2 Alternative (Without Docker)

If you prefer PM2 over Docker on VPS:

```bash
npm install -g pm2
cd backend && npm run build
pm2 start dist/app.js --name pinflow-api
pm2 save
pm2 startup  # auto-start on reboot
```

---

## Step 8: Firewall (Google Cloud)

```bash
# Allow HTTP, HTTPS, SSH only
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

In Google Cloud Console → VPC Network → Firewall:
- Allow TCP 80, 443 from `0.0.0.0/0`
- Allow TCP 22 from your IP only

---

## Verify Production

```bash
# Backend health
curl https://api.pinflow.app/api/health

# Download test
curl -X POST https://api.pinflow.app/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"REAL_PINTEREST_URL"}'

# Frontend loads
curl -I https://pinflow.app
# → 200 OK

# SSL valid
curl -vI https://api.pinflow.app 2>&1 | grep "SSL certificate"
```

Browser test:
1. Open `https://pinflow.app`
2. Paste Pinterest URL → download works
3. Check `/faq`, `/blog`, `/privacy` all load
4. Admin login at `https://pinflow.app/admin`

---

## Done Checklist

- [x] Backend Dockerized
- [x] Backend running on VPS (Docker & PM2 configs prepared)
- [x] Nginx + SSL configuration prepared (`api.pinflow.app`)
- [x] Frontend prepared for Vercel deployment
- [x] Custom domain and DNS architecture configured
- [x] Production env vars template created
- [x] Prisma PostgreSQL provider configured for production DB
- [x] End-to-end download architecture ready
- [x] Admin panel accessibility configured

**Next → [SPRINT-08-PERFORMANCE-POLISH.md](./SPRINT-08-PERFORMANCE-POLISH.md)**
