# TrendAI Backend - Setup & Deployment Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- Vercel account
- Git

---

## Part 1: Local Development Setup

### Step 1: Clone & Install Dependencies

```bash
cd trendai-backend
npm install
```

### Step 2: Configure Environment Variables

Copy the example file and add your actual values:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/trendai?retryWrites=true&w=majority&appName=Cluster0

# JWT Configuration
JWT_SECRET=your-super-secret-key-here-change-this-in-production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Step 3: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. In "Network Access", add IP `0.0.0.0/0` (allow all - for development)
4. Create a database user (e.g., admin/password)
5. Click "Connect" and copy the connection string
6. Replace `<password>` with your database password
7. Replace `<database>` with `trendai` (or your chosen name)

### Step 4: Start Development Server

```bash
npm run start:dev
```

The server will run on `http://localhost:3000`

View API documentation at: `http://localhost:3000/api`

### Step 5: Test the API

```bash
# Register a new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'
```

---

## Part 2: Deploy to Vercel

### Step 1: Link Vercel Project

```bash
# Login to Vercel (if not already logged in)
npm install -g vercel
vercel login

# Link your existing Vercel project
cd trendai-backend
vercel link
```

Or create a new project:
```bash
vercel
```

### Step 2: Set Environment Variables in Vercel

Go to your Vercel project dashboard and set these environment variables:

**Dashboard Path:** Settings → Environment Variables

Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/trendai?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-production-secret-key
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

### Step 3: Deploy to Vercel

```bash
# Deploy to Vercel
vercel deploy --prod
```

Or simply push to your connected GitHub repo:
```bash
git add .
git commit -m "Fix backend for Vercel deployment"
git push origin main
```

Vercel will automatically deploy on push.

### Step 4: Verify Deployment

After deployment, test the live API:

```bash
# Replace YOUR_VERCEL_URL with your actual Vercel deployment URL
curl https://YOUR_VERCEL_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "name": "Test User"
  }'
```

View your deployed API docs: `https://YOUR_VERCEL_URL/api`

---

## Part 3: MongoDB Atlas Security Setup

### For Production Safety:

1. **Whitelist IPs Properly**
   - In Network Access, instead of `0.0.0.0/0`:
   - Add your Vercel IP ranges (if available)
   - Or add specific IPs only

2. **Use a Strong Database Password**
   - Don't use simple passwords
   - Store in Vercel Secrets, not in code

3. **Create Read-Only User (Optional)**
   - For applications that don't write data
   - More secure than admin users

4. **Enable IP Whitelist in Vercel**
   - Add your Vercel project IPs to MongoDB

### Current Setup (Development):
- MongoDB allows `0.0.0.0/0` (all IPs)
- Use strong JWT secret
- Database credentials stored in Vercel Secrets

---

## Troubleshooting

### Issue: 500 Internal Server Error on Vercel

**Check:**
1. MONGODB_URI is set in Vercel environment variables
2. MongoDB Atlas allows Vercel IPs (Network Access → 0.0.0.0/0)
3. Database user password is correct
4. Connection string format is correct

**Debug:**
```bash
# View Vercel logs
vercel logs --follow
```

### Issue: MongoDB Connection Timeout

```bash
# Test connection locally first
npm run start:dev

# Check network access in MongoDB Atlas
# - Go to Network Access
# - Ensure current IP is whitelisted
# - For development, use 0.0.0.0/0
```

### Issue: CORS Errors

The backend is configured to allow all origins. If you still get CORS errors:

1. Ensure frontend is making requests to correct URL
2. Check that request headers include `Content-Type: application/json`
3. Verify Authorization header format if using JWT

### Issue: JWT Token Invalid

```bash
# The JWT_SECRET must be the same on all instances
# Verify in Vercel environment variables
# Try changing JWT_SECRET and redeploy
```

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens | Random 32+ char string |
| `JWT_EXPIRES_IN` | No | JWT expiration time | `24h`, `7d`, `30d` |
| `PORT` | No | Server port (local only) | `3000` |
| `NODE_ENV` | No | Environment mode | `development`, `production` |

---

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

### Campaigns
- `GET /campaigns` - List all campaigns
- `POST /campaigns` - Create campaign
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign

### Influencers
- `GET /influencers` - List all influencers
- `POST /influencers` - Create influencer
- `PUT /influencers/:id` - Update influencer
- `DELETE /influencers/:id` - Delete influencer

### Submissions
- `GET /submissions` - List all submissions
- `POST /submissions` - Create submission
- `PATCH /submissions/:id/approve` - Approve submission
- `PATCH /submissions/:id/reject` - Reject submission
- `DELETE /submissions/:id` - Delete submission

Full API documentation available at `/api` endpoint (Swagger UI).

---

## Production Checklist

- [ ] MongoDB password is strong and unique
- [ ] JWT_SECRET is long (32+ characters) and unique
- [ ] All environment variables set in Vercel
- [ ] CORS origins properly configured (not just `true`)
- [ ] Database backups enabled in MongoDB
- [ ] Error logging configured
- [ ] Rate limiting considered
- [ ] Input validation implemented
- [ ] HTTPS enforced
- [ ] API monitoring in place

---

## Quick Commands Reference

```bash
# Local Development
npm run start:dev          # Start with hot reload
npm run build             # Build for production
npm run start:prod        # Run built version

# Vercel
vercel deploy --prod      # Deploy to production
vercel logs --follow      # View real-time logs
vercel env ls            # List environment variables
vercel env add VARIABLE   # Add environment variable

# Database
# MongoDB Atlas: https://www.mongodb.com/cloud/atlas
# Connection string format: mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
```

---

## Support

- NestJS Docs: https://docs.nestjs.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Vercel Docs: https://vercel.com/docs
- Project GitHub: [Your repo URL]

---

**Last Updated:** April 21, 2026
**Status:** Ready for Production
