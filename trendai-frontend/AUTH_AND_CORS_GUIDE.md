# Authentication & CORS Configuration Guide

## Problem 1: Dashboard "Unauthorized" Issue

### What Was Happening
1. User logs in → token stored in localStorage
2. User navigates to dashboard
3. Dashboard component immediately fetches data WITHOUT checking if user is authenticated
4. If token is expired or invalid, API returns 401 Unauthorized
5. Error handler catches 401 and redirects to `/login` → "blip" effect

### The Fix (Frontend)
Added authentication check in `app/dashboard/page.tsx`:
- Waits for `useAuth` hook to validate token
- Shows loading spinner while checking
- Redirects to login if not authenticated
- Only renders Dashboard if user has valid token

**Files Updated:**
- `app/dashboard/page.tsx` - Now checks auth before rendering
- `components/Dashboard.tsx` - Added error handling for failed requests

### How It Works Now
1. User logs in → token stored
2. Navigate to dashboard
3. `useAuth` checks token validity in localStorage
4. If valid → Dashboard renders
5. If invalid/expired → Redirects to login cleanly (no "blip")

---

## Problem 2: CORS Configuration

### Why CORS Fails
- Browsers send preflight OPTIONS request
- Your backend must respond with CORS headers
- Can't use `origin: '*'` with credentials (cookies/tokens)
- Need to dynamically reflect the actual origin

### Why Middleware.ts is Better

#### ✅ Middleware.ts Approach (RECOMMENDED)
```
Benefits:
- Runs at Vercel's edge (very fast)
- Handles preflight before backend loads
- Dynamic origin reflection
- Clean single file
- No backend CORS config needed
```

#### ❌ Multiple vercel.json Rules Approach
```
Issues:
- Only works with static origins
- Can't handle dynamic origin reflection
- Vercel has to match many rules
- More complex maintenance
- Still requires backend handling
```

#### ❌ Backend-Only CORS Approach
```
Issues:
- Slow (requires full backend startup)
- Complex with serverless functions
- Error-prone with origin '*'
- Harder to debug
```

### Implementation

**middleware.ts** (Frontend - Already Created)
```typescript
// Runs at edge, handles all CORS
// Dynamically sets Access-Control-Allow-Origin
// Handles OPTIONS preflight requests
// Set matcher: '/api/:path*' to only run on API calls
```

**Why Remove Backend CORS?**
- Middleware handles it at the edge
- Prevents double-header conflicts
- Faster response times
- Single source of truth

### Setup Instructions

#### Step 1: Verify middleware.ts
- File: `middleware.ts` (at project root)
- Should match `/api/:path*` routes
- Includes all allowed origins

#### Step 2: Clean Up Backend
- Remove `enableCors()` from `api/index.ts` (optional - won't hurt)
- Remove CORS headers from `vercel.json` (optional - middleware takes precedence)

#### Step 3: Test
```bash
# Local development
npm run dev
# Should work with http://localhost:3000

# Deployed
# Should work with https://trendai-5jy1.vercel.app
```

---

## Complete Flow Now

### Authentication Flow
```
1. User logs in
   ↓
2. Frontend receives JWT token
   ↓
3. Token stored in localStorage
   ↓
4. useAuth hook validates token
   ↓
5. User navigates to dashboard
   ↓
6. Dashboard page checks token via useAuth
   ↓
7. If valid → Render Dashboard
   If invalid → Redirect to login (clean, no blip)
   ↓
8. Dashboard makes API requests
   ↓
9. Axios interceptor adds "Authorization: Bearer <token>" header
   ↓
10. Backend validates token
   ↓
11. Returns data if valid, 401 if invalid
   ↓
12. If 401 → Redirect to login (after rendering dashboard)
```

### CORS Flow
```
1. Frontend makes request to backend API
   ↓
2. Preflight OPTIONS request sent
   ↓
3. middleware.ts intercepts at edge
   ↓
4. Checks if origin is in ALLOWED_ORIGINS
   ↓
5. If yes → Reflects origin back in header
   ↓
6. Returns 204 for OPTIONS
   ↓
7. Browser allows actual request (POST/GET/etc)
   ↓
8. Backend receives request with CORS headers valid
   ↓
9. Response includes CORS headers
   ↓
10. Browser allows frontend to read response ✅
```

---

## Files Modified

### Frontend
1. **middleware.ts** (NEW)
   - CORS handling at edge
   - Dynamic origin reflection
   - Preflight request handling

2. **app/dashboard/page.tsx** (UPDATED)
   - Auth check before render
   - Loading state
   - Redirect if not authenticated

3. **components/Dashboard.tsx** (UPDATED)
   - Error handling
   - Better error messages
   - Prevents silent failures

### Backend (No Changes Needed)
- CORS still works via middleware
- Can optionally remove `enableCors()` to reduce code

---

## Allowed Origins

**Current Configuration (middleware.ts):**
```
- https://trendai-5jy1.vercel.app (frontend production)
- https://trendai-backend-lime.vercel.app (backend production)
- http://localhost:3000 (local frontend)
- http://localhost:3001 (local frontend alternate)
```

**To Add More Origins:**
1. Edit `middleware.ts`
2. Add to `ALLOWED_ORIGINS` array
3. Redeploy

---

## Testing

### Local Development
```bash
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:3000/api (proxied or separate)
# Should work without CORS issues
```

### Production
```bash
# Test register
curl -X POST https://trendai-backend-lime.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test"}'

# Test login
curl -X POST https://trendai-backend-lime.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Frontend login
# Visit https://trendai-5jy1.vercel.app/login
# Should work without CORS errors
```

---

## Troubleshooting

### Still Getting CORS Errors
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Try incognito window
4. Check middleware.ts has correct matcher
5. Check origin is in ALLOWED_ORIGINS

### Token Issues
1. Check localStorage has token after login
2. Check token isn't expired (use jwt.io to decode)
3. Check JWT_SECRET on backend (both local & Vercel)
4. Check token format is "Bearer <token>"

### Dashboard Blank
1. Open browser console (F12)
2. Check for errors
3. Verify token is valid
4. Check useAuth hook is working
5. Verify API calls are being made

---

## Summary

**Problems Fixed:**
1. ✅ Dashboard redirects cleanly without "blip"
2. ✅ CORS handled at edge (fastest)
3. ✅ Error handling for failed requests
4. ✅ Auth check before rendering

**Long-term Benefits:**
- middleware.ts handles all CORS (standard approach)
- Edge execution means faster responses
- Single file to maintain CORS
- No conflicts between backend and frontend CORS
- Easy to add new origins
