# TrendAI Backend - Quick Start (5 Minutes)

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (copy from .env.example)
cp .env.example .env.local

# 3. Edit .env.local - Add your MongoDB connection string
# MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/trendai...

# 4. Start development server
npm run start:dev

# 5. Visit http://localhost:3000/api for Swagger documentation
```

**Done!** Your API is now running locally.

---

## Deploy to Vercel

```bash
# 1. Login to Vercel
vercel login

# 2. Link project
vercel link

# 3. In Vercel Dashboard (Settings → Environment Variables), add:
#    - MONGODB_URI=your_connection_string
#    - JWT_SECRET=random_secret_key
#    - NODE_ENV=production

# 4. Deploy
vercel deploy --prod
```

**Done!** Your API is now live on Vercel.

---

## Get MongoDB Connection String (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster → "Create"
4. Create user: username: `admin`, password: `StrongPassword123!`
5. Network Access → Add IP: `0.0.0.0/0` (allow all)
6. Click "Connect" → "Drivers" → Copy string
7. Replace `<password>` with your password
8. Result: `mongodb+srv://admin:StrongPassword123!@cluster0.mongodb.net/trendai?retryWrites=true&w=majority`

---

## Test API

```bash
# Register user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'

# Login and get token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'

# Get all campaigns
curl http://localhost:3000/campaigns

# Create campaign (needs JWT token)
curl -X POST http://localhost:3000/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Summer Campaign",
    "status": "active",
    "deadline": "2024-12-31"
  }'
```

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login (returns JWT) |
| `GET` | `/campaigns` | List campaigns |
| `POST` | `/campaigns` | Create campaign |
| `PUT` | `/campaigns/:id` | Update campaign |
| `DELETE` | `/campaigns/:id` | Delete campaign |
| `GET` | `/influencers` | List influencers |
| `POST` | `/influencers` | Create influencer |
| `GET` | `/submissions` | List submissions |
| `POST` | `/submissions` | Create submission |

---

## Useful Commands

```bash
npm run start:dev       # Local development (hot reload)
npm run build           # Build for production
npm run start:prod      # Run production build locally
npm run lint            # Check code
npm test                # Run tests
vercel logs --follow    # View Vercel logs in real-time
vercel env ls           # List environment variables
```

---

## Environment Variables

```env
# Required
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/trendai?...

# Recommended
JWT_SECRET=your-random-secret-key-32-chars
JWT_EXPIRES_IN=24h
NODE_ENV=production
PORT=3000
```

---

## Files Changed

- ✅ `api/index.ts` - Created (Vercel entry point)
- ✅ `src/main.ts` - Updated (local dev only)
- ✅ `.env.example` - Created
- ✅ `SETUP.md` - Created (detailed guide)
- ✅ `DEPLOYMENT_SUMMARY.md` - Created (complete info)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 500 Error on Vercel | Check MONGODB_URI in Vercel env vars |
| MongoDB Connection Failed | Verify IP whitelist includes 0.0.0.0/0 |
| "Cannot find module" | Run `npm install` |
| Port 3000 already in use | Use different port: `PORT=3001 npm run start:dev` |
| JWT token invalid | Ensure JWT_SECRET is same on all instances |

---

## Need Help?

Read the full guides:
- **Local Setup:** `SETUP.md`
- **Deployment Details:** `DEPLOYMENT_SUMMARY.md`
- **API Docs:** Visit `http://localhost:3000/api` or `https://your-url/api`

---

**Status:** ✅ Ready to Deploy
