# TrendAI SaaS - Developer Quick Reference Guide

## Quick Start

### File Structure Overview

```
trendai-backend/
├── src/
│   ├── auth/
│   │   ├── user.schema.ts (UPDATED)
│   │   ├── auth.service.ts (UPDATED)
│   │   ├── jwt.strategy.ts (UPDATED)
│   │   ├── rbac.service.ts (NEW)
│   │   └── decorators/ (NEW)
│   ├── organizations/ (NEW)
│   │   ├── organization.schema.ts
│   │   ├── organizations.service.ts
│   │   ├── organizations.controller.ts
│   │   └── organizations.module.ts
│   ├── payments/ (NEW)
│   ├── compliance/ (NEW)
│   ├── analytics/ (NEW)
│   └── ...
├── scripts/
│   ├── migrate-users.ts (NEW)
│   ├── seed-initial-data.ts (NEW)
│   └── backfill-organization-ids.ts (NEW)
└── ...

trendai-frontend/
├── app/
│   ├── (public)/
│   │   ├── page.tsx (UPDATED - landing page)
│   │   ├── pricing/
│   │   └── features/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── reset-password/
│   │   └── layout.tsx
│   ├── onboarding/ (NEW)
│   ├── dashboard/ (UPDATED)
│   │   ├── campaigns/
│   │   ├── analytics/
│   │   ├── team/
│   │   ├── settings/
│   │   └── billing/
│   └── admin/ (NEW)
├── components/
│   ├── common/ (NEW)
│   ├── auth/ (UPDATED)
│   ├── dashboard/ (UPDATED)
│   ├── campaigns/ (NEW)
│   ├── billing/ (NEW)
│   └── forms/ (NEW)
├── hooks/
│   ├── useAuth.ts (UPDATED)
│   ├── useOrganization.ts (NEW)
│   └── useRole.ts (NEW)
├── lib/
│   ├── api.ts (UPDATED)
│   ├── stripe.ts (NEW)
│   └── permissions.ts (NEW)
└── ...
```

## Schema Changes Summary

### User Schema - Key Additions
```typescript
// OLD → NEW
- Added: organizationId (required)
- Added: role (ENUM with 9 values)
- Added: customPermissions
- Added: emailVerified, emailVerificationToken
- Added: twoFactorEnabled, twoFactorSecret
- Added: passwordResetToken, passwordResetExpiry
- Added: preferences (theme, language, notifications)
- Added: timestamps (createdAt, updatedAt, deletedAt)
```

### New Schemas Required
1. **Organization** - Company/account management
2. **Invitation** - Team member invitations
3. **Payment** - Payment tracking
4. **Submission** - Content submissions
5. **ComplianceLog** - Compliance tracking
6. **CampaignAnalytics** - Analytics aggregation

## Database Migration Steps

### Step 1: Create Migration Scripts

```bash
# Create migration scripts folder
mkdir -p trendai-backend/scripts/migrations

# Files to create:
# - 001-add-organization-collection.ts
# - 002-update-user-schema.ts
# - 003-backfill-organization-ids.ts
# - 004-create-new-collections.ts
```

### Step 2: Run Migrations

```bash
# Development
cd trendai-backend
npm run migrate:dev

# Production
npm run migrate:prod
```

### Step 3: Verify Data

```bash
# Check migration success
npm run verify:migrations

# Rollback if needed
npm run rollback
```

## Role-Based Access Control (RBAC)

### Permission Matrix

```typescript
// Example: Campaign Operations
export const PERMISSIONS = {
  CAMPAIGN: {
    CREATE: ['agency_owner', 'account_manager', 'campaign_manager'],
    READ: ['agency_owner', 'account_manager', 'campaign_manager', 'analyst', 'content_reviewer'],
    UPDATE: ['agency_owner', 'account_manager', 'campaign_manager'],
    DELETE: ['agency_owner', 'account_manager'],
    PUBLISH: ['agency_owner', 'account_manager'],
    APPROVE: ['agency_owner', 'account_manager', 'content_reviewer'],
  },
  PAYMENT: {
    CREATE: ['agency_owner', 'account_manager'],
    PROCESS: ['agency_owner'],
    VIEW: ['agency_owner', 'account_manager', 'analyst'],
  },
  TEAM: {
    MANAGE: ['agency_owner'],
    VIEW: ['agency_owner', 'account_manager'],
  }
};
```

### Using RBAC in Code

```typescript
// Using decorator
@UseGuards(JwtAuthGuard, RoleGuard)
@CheckPermission('campaign', 'create')
createCampaign(@Body() dto: CreateCampaignDto) {
  // ...
}

// Programmatic check
async createCampaign(user: User, dto: CreateCampaignDto) {
  const hasPermission = await this.rbacService.hasPermission(
    user,
    'campaign',
    'create'
  );
  if (!hasPermission) throw new ForbiddenException();
}
```

## Key APIs to Implement (Phase Order)

### Phase 1: User Management (PRIORITY)
```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh-token
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/verify-email
POST   /auth/2fa/setup
POST   /auth/2fa/verify
GET    /auth/me

POST   /organizations
GET    /organizations/:id
PUT    /organizations/:id
POST   /organizations/:id/team/invite
GET    /organizations/:id/team
DELETE /organizations/:id/team/:userId
PUT    /organizations/:id/team/:userId/role
GET    /organizations/:id/invitations
POST   /organizations/invitations/:token/accept
```

### Phase 2: Campaign Management
```
POST   /campaigns
GET    /campaigns
GET    /campaigns/:id
PUT    /campaigns/:id
DELETE /campaigns/:id
POST   /campaigns/:id/publish
GET    /campaigns/:id/analytics
POST   /campaigns/:id/influencers
PUT    /campaigns/:id/influencers/:influencerId
DELETE /campaigns/:id/influencers/:influencerId
```

### Phase 3: Content & Submissions
```
POST   /submissions
GET    /submissions/:id
PUT    /submissions/:id
POST   /submissions/:id/approve
POST   /submissions/:id/reject
POST   /submissions/:id/request-revision
POST   /submissions/:id/publish
GET    /submissions/:id/compliance
```

### Phase 4: Payments & Billing
```
POST   /payments
GET    /payments/:id
POST   /payments/:id/schedule
POST   /payments/:id/process
GET    /payments/invoices
GET    /payments/invoices/:id

POST   /subscriptions
GET    /subscriptions/current
PUT    /subscriptions/upgrade
PUT    /subscriptions/downgrade
POST   /subscriptions/cancel
```

### Phase 5: Analytics
```
GET    /analytics/campaigns/:id
GET    /analytics/campaigns/:id/roi
GET    /analytics/dashboard
GET    /analytics/reports/:id
POST   /analytics/reports
```

## Common Tasks

### Add New Endpoint

1. **Create DTO** (`src/module/dto/create-module.dto.ts`)
```typescript
export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email: string;
}
```

2. **Update Service** (`src/module/module.service.ts`)
```typescript
async create(dto: CreateModuleDto, user: User): Promise<Module> {
  // Add organizationId from user context
  return this.moduleModel.create({
    ...dto,
    organizationId: user.organizationId,
    createdBy: user._id,
  });
}
```

3. **Add Controller Route** (`src/module/module.controller.ts`)
```typescript
@Post()
@UseGuards(JwtAuthGuard)
@CheckPermission('module', 'create')
create(@Body() dto: CreateModuleDto, @CurrentUser() user: User) {
  return this.moduleService.create(dto, user);
}
```

4. **Add Tests**
```typescript
// src/module/module.service.spec.ts
describe('ModuleService.create', () => {
  it('should create module for organization', async () => {
    // test
  });
});
```

### Check Permissions

```typescript
// In service
async update(id: string, dto: UpdateDto, user: User) {
  const hasPermission = await this.rbacService.hasPermission(
    user,
    'module',
    'update'
  );
  if (!hasPermission) throw new ForbiddenException();
  
  // or use decorator on controller
}
```

### Enforce Organization Isolation

```typescript
// IMPORTANT: Always filter by organizationId
async get(id: string, user: User): Promise<Module> {
  return this.moduleModel.findOne({
    _id: id,
    organizationId: user.organizationId, // Multi-tenancy
  });
}
```

### Handle Subscription Limits

```typescript
async createCampaign(dto: CreateCampaignDto, user: User) {
  const org = await this.orgsService.getOrganization(user.organizationId);
  
  if (org.currentUsage.activeCampaigns >= org.limits.activeCampaigns) {
    throw new PaymentRequiredException('Upgrade to create more campaigns');
  }
  
  const campaign = await this.createCampaign(dto);
  
  // Track usage
  await this.billingService.trackUsage(
    org._id,
    'activeCampaigns',
    1
  );
  
  return campaign;
}
```

## Frontend Patterns

### Using Auth Hook

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!token) {
    router.push('/login');
    return null;
  }
  
  return <Dashboard user={user} />;
}
```

### Protected Components

```typescript
import { useRole } from '@/hooks/useRole';

export function PaymentActions() {
  const { can } = useRole();
  
  if (!can('payment', 'process')) {
    return null; // Hide for non-admins
  }
  
  return <ProcessPaymentButton />;
}
```

### API Calls with Auth

```typescript
const response = await api.post('/campaigns', {
  name: 'Summer Campaign',
  budget: 5000,
});
// Token automatically added from localStorage
```

## Testing Checklist

### Unit Tests Required
- [ ] Each service method (happy path + error cases)
- [ ] RBAC permission checking
- [ ] Validation logic
- [ ] Business logic calculations

### Integration Tests
- [ ] Multi-step workflows (signup → org create → invite → campaign)
- [ ] Permission enforcement across endpoints
- [ ] Organization isolation (user sees only their org's data)
- [ ] Subscription limit enforcement

### E2E Tests
- [ ] Complete user journey from signup to campaign completion
- [ ] Payment flow
- [ ] Content approval workflow
- [ ] Multi-user collaboration

## Environment Variables

### Backend (.env.local)
```
# Database
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=604800

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=noreply@trendai.app

# Environment
NODE_ENV=development
PORT=3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Common Errors & Solutions

### Error: "organizationId is required"
**Cause:** User doesn't have organizationId after login
**Solution:** Ensure JWT includes organizationId, update token payload

### Error: "Permission denied"
**Cause:** User role doesn't have permission
**Solution:** Check RBAC matrix, verify role assignment, check decorator

### Error: "Subscription limit exceeded"
**Cause:** User tier doesn't allow this action
**Solution:** Show upgrade prompt, check org.subscriptionTier

### Error: "Invalid invitation token"
**Cause:** Token expired or already used
**Solution:** Resend invitation, check token expiry logic

## Performance Tips

1. **Database Indexing**
   - Add index on organizationId (multi-tenancy)
   - Add index on userId + organizationId
   - Add index on status (for filtering)
   - Add index on dates (for range queries)

2. **API Optimization**
   - Implement pagination (limit 50 per page)
   - Use select() to fetch only needed fields
   - Cache frequently accessed data
   - Use lean() for read-only queries

3. **Frontend Optimization**
   - Code split route components
   - Lazy load heavy charts
   - Cache API responses with SWR
   - Optimize images

## Deployment Checklist

Before deploying to production:
- [ ] All tests passing
- [ ] Environment variables set in Vercel
- [ ] Database backups configured
- [ ] Monitoring/alerting setup
- [ ] Error tracking (Sentry) configured
- [ ] CDN configured
- [ ] Email tested (SendGrid)
- [ ] Stripe webhook configured
- [ ] CORS origins updated
- [ ] SSL certificates installed

## Quick Links

- **Docs:** `/SAAS_IMPLEMENTATION_PLAN.md`
- **Checklist:** `/IMPLEMENTATION_CHECKLIST.md`
- **Stripe Docs:** https://stripe.com/docs/api
- **NestJS Docs:** https://docs.nestjs.com
- **Next.js Docs:** https://nextjs.org/docs
- **MongoDB Docs:** https://docs.mongodb.com

---

## Support

For questions or clarifications:
1. Check the SAAS_IMPLEMENTATION_PLAN.md
2. Review relevant test files
3. Check git commit history for examples
4. Ask in standup/sync meetings
