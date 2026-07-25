# Google Free VPS — Complete Guide for PinFlow Backend

Should you use Google Cloud free tier for your backend? **Yes — with the right setup.**

---

## Quick Verdict

| Question | Answer |
|----------|--------|
| Is Google free VPS good for PinFlow backend? | ✅ **Yes** — for Express API only |
| Can I run everything on it? | ❌ **No** — not Postgres + Redis + Node together |
| Best setup? | Backend on VPS, DB on Supabase, Cache on Upstash, Frontend on Vercel |
| Monthly cost? | **$0** if you stay within free limits |

---

## Google Cloud Always Free Tier (2026)

### What's Free Forever

| Resource | Free Limit | Enough for PinFlow? |
|----------|-----------|---------------------|
| e2-micro VM | 1 instance, 30 GB disk | ✅ Yes (backend only) |
| Outbound traffic | 1 GB/month (North America) | ⚠️ Tight — monitor usage |
| Cloud Storage | 5 GB | ✅ Optional for logs |
| Cloud Functions | 2M invocations/month | ❌ Not needed |

### e2-micro Specs
```
vCPU:    0.25 (burst to 2)
RAM:     1 GB
Disk:    30 GB standard persistent disk
OS:      Ubuntu 22.04 LTS (recommended)
Region:  us-central1, us-east1, or us-west1 (free tier regions)
```

### What 1 GB RAM Means in Practice

```
Ubuntu 22.04 OS:        ~250 MB
Docker daemon:          ~100 MB
Node.js Express app:    ~120 MB
Nginx:                  ~20 MB
─────────────────────────────────
Total used:             ~490 MB
Available headroom:     ~510 MB  ✅ OK
```

If you also add PostgreSQL (~300 MB) + Redis (~80 MB):
```
Total:                  ~870 MB  ❌ Will crash under load
```

**This is why DB and Redis must be external free services.**

---

## Recommended Architecture (All Free)

```
┌─────────────────────────────────────────────────────────┐
│                    FREE TIER STACK                       │
├─────────────────┬───────────────────┬───────────────────┤
│ Vercel          │ Google e2-micro   │ Supabase          │
│ (Frontend)      │ (Backend API)     │ (PostgreSQL)      │
│ pinflow.app     │ api.pinflow.app   │ 500 MB DB         │
│ $0/month        │ $0/month          │ $0/month          │
├─────────────────┴───────────────────┴───────────────────┤
│ Upstash Redis (Cache) — $0/month, 10K commands/day      │
└─────────────────────────────────────────────────────────┘
```

**Total monthly cost: $0**

---

## Step-by-Step: Create Google Cloud VPS

### Step 1: Create Google Cloud Account
1. Go to [cloud.google.com](https://cloud.google.com)
2. Sign up (requires credit card for verification — won't be charged on free tier)
3. Create new project: `pinflow-prod`

### Step 2: Create e2-micro VM
1. Console → Compute Engine → VM Instances → Create
2. Settings:
   ```
   Name:           pinflow-api
   Region:         us-central1 (Iowa) — free tier
   Zone:           us-central1-a
   Machine type:   e2-micro (0.25 vCPU, 1 GB)
   Boot disk:      Ubuntu 22.04 LTS, 30 GB standard persistent disk
   Firewall:       ✅ Allow HTTP, ✅ Allow HTTPS
   ```
3. Click Create
4. Note the **External IP** (e.g., `34.123.45.67`)

### Step 3: SSH Into VM
```bash
# From Google Cloud Console → SSH button
# Or from terminal:
gcloud compute ssh pinflow-api --zone=us-central1-a
```

### Step 4: Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Nginx + Certbot (SSL)
sudo apt install -y nginx certbot python3-certbot-nginx

# Install Git
sudo apt install -y git
```

### Step 5: Deploy Backend
```bash
git clone https://github.com/YOUR_USER/pinflow.git
cd pinflow
cp backend/.env.example backend/.env.production
nano backend/.env.production  # fill in Supabase + Upstash URLs

docker compose up -d
curl http://localhost:4000/api/health  # should return {"status":"ok"}
```

### Step 6: Configure Nginx + SSL
```bash
sudo nano /etc/nginx/sites-available/pinflow-api
```

```nginx
server {
    listen 80;
    server_name api.pinflow.app;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/pinflow-api /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.pinflow.app
```

### Step 7: Point DNS
At your domain registrar, add:
```
Type: A
Name: api
Value: 34.123.45.67  (your VPS IP)
TTL: 300
```

---

## Free Database: Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy connection string:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   ```
3. Add to `backend/.env.production` as `DATABASE_URL`
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

**Free tier limits:** 500 MB storage, 2 projects, pauses after 1 week inactivity (just visit dashboard to wake it)

---

## Free Redis: Upstash Setup

1. Go to [upstash.com](https://upstash.com) → Create database
2. Region: choose closest to your VPS (us-central1)
3. Copy Redis URL:
   ```
   rediss://default:[PASSWORD]@[HOST].upstash.io:6379
   ```
4. Add to `backend/.env.production` as `REDIS_URL`

**Free tier limits:** 10,000 commands/day, 256 MB — enough for ~500 cached downloads/day

---

## Free Frontend: Vercel Setup

1. Push code to GitHub
2. [vercel.com](https://vercel.com) → Import project
3. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.pinflow.app
   NEXT_PUBLIC_SITE_URL=https://pinflow.app
   ```
4. Deploy → automatic on every git push

---

## Monitoring Your Free Tier Usage

### Google Cloud — Avoid Unexpected Charges

Set billing alert at $0:
1. Console → Billing → Budgets & alerts
2. Create budget: $1 threshold → email alert

Watch egress (outbound traffic):
```bash
# On VPS — check network usage
vnstat -d
```

Each download API call ≈ 2–5 KB response.  
1 GB/month ≈ 200,000–500,000 API calls/month. **Plenty for starting out.**

### When to Upgrade

| Signal | Action |
|--------|--------|
| RAM consistently > 850 MB | Upgrade to e2-small ($12/mo) |
| Egress > 1 GB/month | Add Cloudflare CDN in front |
| Upstash > 10K commands/day | Upgrade Upstash ($10/mo) |
| Supabase paused often | Upgrade Supabase ($25/mo) or switch to Neon |

---

## Alternative Free VPS Options

| Provider | Free Tier | vs Google |
|----------|-----------|-----------|
| **Google Cloud** e2-micro | 1 GB RAM, 30 GB disk | ✅ Recommended — reliable |
| **Oracle Cloud** ARM | 4 OCPU, 24 GB RAM | ⭐ Better specs but harder setup |
| **AWS** t2.micro | 1 GB RAM, 12 months only | ❌ Expires after 12 months |
| **Azure** B1s | 1 GB RAM, 12 months only | ❌ Expires after 12 months |
| **Railway** | $5 credit/month | ❌ Not truly free long-term |

**Oracle Cloud** gives more RAM (24 GB!) but account approval is harder and setup is more complex. Google is easier for beginners.

---

## Common Problems on Google VPS

| Problem | Cause | Fix |
|---------|-------|-----|
| VM stops unexpectedly | Out of memory | Move Postgres/Redis off VPS |
| Can't SSH | Firewall blocking port 22 | GCP Console → Firewall → allow TCP 22 |
| SSL cert fails | DNS not propagated | Wait 30 min, retry certbot |
| API returns 502 | Docker container crashed | `docker compose logs api` |
| Slow API responses | No Redis cache | Set up Upstash (Sprint 2) |
| Supabase connection refused | Wrong connection string | Check Supabase dashboard → Settings → Database |

---

## Security on VPS

```bash
# Firewall — only allow needed ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# Disable password SSH — use key only
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
sudo systemctl restart sshd

# Auto security updates
sudo apt install -y unattended-upgrades
```

---

## Summary: Your Action Plan

1. ✅ Create Google Cloud account
2. ✅ Create e2-micro VM in us-central1
3. ✅ Create Supabase project (Postgres)
4. ✅ Create Upstash database (Redis)
5. ✅ Deploy backend with Docker
6. ✅ Configure Nginx + SSL for `api.pinflow.app`
7. ✅ Deploy frontend to Vercel
8. ✅ Point DNS for both domains
9. ✅ Set billing alert at $1
10. ✅ Set up UptimeRobot to monitor `/api/health`

**Total cost: $0/month** — until you outgrow free tiers.
