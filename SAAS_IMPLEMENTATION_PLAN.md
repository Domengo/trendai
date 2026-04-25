# TrendAI SaaS: Comprehensive Implementation Plan

## Executive Summary

This document outlines the complete transformation of TrendAI into a professional, profitable SaaS platform for influencer campaign management. The plan includes user management, RBAC, monetization strategies, competitive analysis, and detailed implementation roadmaps for both backend and frontend.

---

## Table of Contents

1. [Market Analysis](#market-analysis)
2. [Monetization Strategy](#monetization-strategy)
3. [Feature Differentiation](#feature-differentiation)
4. [User Roles & Permissions](#user-roles--permissions)
5. [Database Schema Changes](#database-schema-changes)
6. [Backend Implementation](#backend-implementation)
7. [Frontend Implementation](#frontend-implementation)
8. [Security & Compliance](#security--compliance)
9. [Implementation Roadmap](#implementation-roadmap)

---

## Market Analysis

### Competing Products

#### 1. **AspireIQ (now part of Sprout Social)**
- **Market Position:** Enterprise-level influencer marketing platform
- **Pricing:** $5,000-$50,000/month
- **Features:** Campaign management, influencer discovery, relationship management, reporting
- **Gap:** Expensive, limited for SMBs

#### 2. **HubSpot + Creator Studio**
- **Market Position:** All-in-one marketing platform with influencer module
- **Pricing:** $45-$3,200/month
- **Features:** CRM, content calendar, performance tracking
- **Gap:** Too broad, influencer tools aren't the focus

#### 3. **Linktree Analytics**
- **Market Position:** Creator-focused platform
- **Pricing:** Free-$60/month
- **Features:** Link management, analytics, promotion
- **Gap:** Not focused on campaign management from brand perspective

#### 4. **Later (Sprout Social)**
- **Market Position:** Social media scheduling & analytics
- **Pricing:** $25-$739/month
- **Features:** Content calendar, posting, analytics
- **Gap:** Limited influencer collaboration features

#### 5. **Creator.co**
- **Market Position:** Influencer marketplace + management
- **Pricing:** Free-$500+/month
- **Features:** Creator discovery, proposal management, payments
- **Gap:** Lacks advanced campaign analytics and strategy tools

### TrendAI Market Opportunity

**Target Market:**
- Small to mid-sized agencies (5-50 employees)
- Brands with $100K-$10M annual marketing budget
- E-commerce brands with influencer marketing programs
- Emerging DTC brands

**Pricing Sweet Spot:** $99-$999/month

**Market Gap:** A SaaS that makes influencer campaign management accessible and affordable for growing brands

---

## Monetization Strategy

### 1. **Tiered Subscription Model** (Primary Revenue)

#### Tier 1: **Starter** - $99/month
- Target: Small businesses, freelancers
- Limits: 5 active campaigns, 50 influencers, 1 team member
- Features:
  - Basic campaign management
  - Influencer database (limited)
  - Basic analytics
  - Email support (24-48hr response)

#### Tier 2: **Professional** - $299/month
- Target: Growing agencies, mid-market brands
- Limits: Unlimited campaigns, 500 influencers, 10 team members
- Features:
  - Advanced campaign management
  - Custom audience targeting
  - Performance analytics & dashboards
  - Influencer relationship management
  - ROI tracking
  - API access (100 calls/min)
  - Slack integration
  - Priority email & chat support

#### Tier 3: **Enterprise** - Custom pricing ($999+/month)
- Target: Large agencies, enterprise brands
- Limits: Unlimited everything
- Features:
  - Everything in Professional
  - Dedicated account manager
  - Custom integrations
  - SLA guarantee (99.9% uptime)
  - Advanced security features
  - White-label option
  - Phone support
  - Custom training

### 2. **Add-on Services** (Secondary Revenue)

- **Influencer Discovery Module:** +$99/month
  - AI-powered influencer recommendations
  - Audience analysis
  - Fake follower detection
  - Competitor analysis

- **Advanced Analytics:** +$49/month
  - Real-time campaign tracking
  - ROI attribution modeling
  - Sentiment analysis
  - Competitor benchmarking

- **Managed Services:** $500-$5,000
  - Campaign strategy consultation
  - Influencer outreach
  - Content approval workflow
  - Performance optimization

### 3. **Marketplace Revenue** (Tertiary)

- **Influencer Marketplace Fees:** 10% commission on influencer payouts
- **Agency Directory Listing:** $9.99/month to be featured
- **Premium Profile Upgrades:** $29/month for influencers to verify credentials

### 4. **Enterprise Licensing**

- **White-label SaaS:** $2,000-$5,000/month
- **Custom API Access:** $500-$2,000/month based on usage
- **Data Licensing:** Anonymous campaign performance benchmarks

---

## Feature Differentiation

### What Competitors Do

| Feature | AspireIQ | HubSpot | Later | Creator.co | TrendAI Goal |
|---------|----------|---------|-------|------------|--------------|
| Campaign Management | ✓ | ✓ | ✓ | ✓ | ✓ Better UX |
| Influencer Discovery | ✓ | Limited | ✓ | ✓ | ✓ AI-powered |
| ROI Tracking | ✓ | ✓ | Limited | ✓ | ✓ Advanced |
| Content Approval | Limited | ✓ | Limited | ✓ | ✓ Built-in |
| Payments | ✓ | Limited | No | ✓ | ✓ Integrated |
| Team Collaboration | ✓ | ✓ | ✓ | Limited | ✓ Advanced |
| Mobile App | No | ✓ | ✓ | ✓ | Plan for Y2 |
| Affordable | No | No | Yes | Yes | ✓ Yes |

### TrendAI Unique Features

#### 1. **AI-Powered Campaign Optimization** (Differentiator)
- Machine learning models predict campaign success
- Automatic influencer matching based on audience
- Real-time performance recommendations
- Budget optimization suggestions

#### 2. **Integrated Payment System** (Differentiator)
- Built-in payment processing for influencers
- Multi-currency support
- Milestone-based payments
- Dispute resolution dashboard

#### 3. **Content Approval Workflow** (Differentiator)
- Drag-and-drop workflow builder
- Pre-flight checklist (brand guidelines, compliance)
- Version history & approval tracking
- Compliance automation (FTC disclosure, hashtags)

#### 4. **Performance Attribution** (Differentiator)
- Multi-touch attribution modeling
- UTM link generation
- QR code tracking
- Conversion rate optimization

#### 5. **Community Features** (Differentiator)
- Influencer community hub
- Peer learning & best practices
- Leaderboards & recognition
- Networking events calendar

#### 6. **Compliance Automation** (Differentiator)
- Automatic FTC disclosure injection
- Brand guideline enforcement
- Content moderation AI
- Regulatory compliance tracking (GDPR, CCPA)

---

## User Roles & Permissions

### Role Hierarchy

```
Super Admin (Vercel)
├── Platform Admin
│   ├── Enterprise Account Manager
│   ├── Billing Manager
│   └── Support Team
├── Agency Owner
│   ├── Account Manager
│   ├── Campaign Manager
│   └── Content Reviewer
├── Brand Admin
│   ├── Campaign Manager
│   ├── Content Approver
│   └── Analyst
└── Influencer
    ├── Profile Manager
    ├── Content Creator
    └── Analytics Viewer
```

### Permissions Matrix

#### Super Admin
- Full system access
- User management
- Billing & invoicing
- Platform settings
- Audit logs
- All data access

#### Platform Admin
- User account management
- Support case management
- System health monitoring
- Bug fix verification
- Limited billing access

#### Enterprise Account Manager
- Multiple account management
- Billing oversight
- SLA monitoring
- Custom feature requests

#### Agency Owner
- Full account control
- Team member management
- Campaign management
- Billing access
- Client account management
- Analytics access

#### Account Manager
- Team member management (limited)
- Campaign creation
- Client management
- Limited analytics
- Cannot access billing

#### Campaign Manager
- Campaign CRUD operations
- Influencer management
- Content assignment
- Deadline tracking
- Cannot modify account settings

#### Content Reviewer/Approver
- View campaigns
- Review & approve content
- Comment & feedback
- Cannot modify campaign settings
- Cannot approve payments

#### Analyst
- View-only access
- Analytics dashboard
- Report generation
- Cannot modify data

#### Influencer
- Profile management
- Content submission
- Performance tracking (own content)
- Payment tracking

---

## Database Schema Changes

### Phase 1: User & Organization Management

#### Updated User Schema
```typescript
// src/auth/user.schema.ts
import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  // Authentication
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // bcrypt hashed
  
  // Profile
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, default: null }, // URL to avatar
  phone: { type: String, default: null },
  timezone: { type: String, default: 'UTC' },
  
  // Organization & Role
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'platform_admin', 'enterprise_manager', 'agency_owner', 'account_manager', 'campaign_manager', 'content_reviewer', 'analyst', 'influencer'],
    default: 'campaign_manager'
  },
  
  // Permissions (override role defaults if needed)
  customPermissions: [{
    resource: String,
    action: String, // 'create', 'read', 'update', 'delete'
  }],
  
  // Status
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  emailVerificationExpiry: { type: Date, default: null },
  
  // Security
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String, default: null },
  lastLogin: { type: Date, default: null },
  lastPasswordChange: { type: Date, default: null },
  passwordResetToken: { type: String, default: null },
  passwordResetExpiry: { type: Date, default: null },
  
  // Metadata
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    slackNotifications: { type: Boolean, default: false },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' },
  },
  
  // Audit
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  timezone: string;
  organizationId: string;
  role: UserRole;
  customPermissions?: CustomPermission[];
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  lastLogin?: Date;
  lastPasswordChange?: Date;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CustomPermission {
  resource: string;
  action: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  slackNotifications: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  PLATFORM_ADMIN = 'platform_admin',
  ENTERPRISE_MANAGER = 'enterprise_manager',
  AGENCY_OWNER = 'agency_owner',
  ACCOUNT_MANAGER = 'account_manager',
  CAMPAIGN_MANAGER = 'campaign_manager',
  CONTENT_REVIEWER = 'content_reviewer',
  ANALYST = 'analyst',
  INFLUENCER = 'influencer',
}
```

#### New Organization Schema
```typescript
// src/organizations/organization.schema.ts
export const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL-friendly name
  logo: { type: String, default: null },
  website: { type: String, default: null },
  description: { type: String, default: null },
  
  // Subscription
  subscriptionTier: { 
    type: String, 
    enum: ['starter', 'professional', 'enterprise'],
    default: 'starter'
  },
  subscriptionStatus: {
    type: String,
    enum: ['trial', 'active', 'past_due', 'cancelled', 'suspended'],
    default: 'trial'
  },
  subscriptionStartDate: { type: Date, default: Date.now },
  subscriptionEndDate: { type: Date, default: null },
  trialEndsAt: { type: Date, required: true }, // 14 days from creation
  
  // Billing
  stripeCustomerId: { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },
  billingEmail: { type: String, required: true },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  taxId: { type: String, default: null }, // VAT/Tax number
  
  // Limits (based on tier)
  limits: {
    activeCampaigns: { type: Number, default: 5 },
    influencersPerCampaign: { type: Number, default: 50 },
    teamMembers: { type: Number, default: 1 },
    apiCallsPerMonth: { type: Number, default: 1000 },
  },
  currentUsage: {
    activeCampaigns: { type: Number, default: 0 },
    teamMembers: { type: Number, default: 1 },
    apiCallsThisMonth: { type: Number, default: 0 },
  },
  
  // Features enabled
  features: {
    advancedAnalytics: { type: Boolean, default: false },
    influencerDiscovery: { type: Boolean, default: false },
    paymentIntegration: { type: Boolean, default: false },
    whiteLabel: { type: Boolean, default: false },
    apiAccess: { type: Boolean, default: false },
    sso: { type: Boolean, default: false },
  },
  
  // Settings
  settings: {
    defaultCurrency: { type: String, default: 'USD' },
    timezone: { type: String, default: 'UTC' },
    language: { type: String, default: 'en' },
    brandColor: { type: String, default: '#000000' },
    customDomain: { type: String, default: null },
  },
  
  // Metadata
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});
```

#### New Invitation Schema
```typescript
// src/organizations/invitation.schema.ts
export const InvitationSchema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  email: { type: String, required: true, lowercase: true },
  role: { 
    type: String, 
    enum: ['account_manager', 'campaign_manager', 'content_reviewer', 'analyst'],
    required: true
  },
  invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  invitationToken: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }, // 7 days
  acceptedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});
```

### Phase 2: Enhanced Campaign Management

#### Updated Campaign Schema
```typescript
// src/campaigns/campaign.schema.ts
export const CampaignSchema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  
  // Basic Info
  name: { type: String, required: true },
  description: { type: String, default: null },
  slug: { type: String, unique: true },
  
  // Campaign Details
  objective: { 
    type: String, 
    enum: ['awareness', 'consideration', 'conversion', 'retention', 'advocacy'],
    default: 'awareness'
  },
  category: { 
    type: String,
    enum: ['fashion', 'beauty', 'tech', 'fitness', 'lifestyle', 'food', 'travel', 'other'],
    default: 'other'
  },
  
  // Dates
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  contentDeadline: { type: Date, required: true },
  publishDate: { type: Date, default: null },
  
  // Status
  status: { 
    type: String, 
    enum: ['draft', 'planning', 'active', 'in_review', 'published', 'completed', 'paused', 'cancelled'],
    default: 'draft'
  },
  
  // Budget & ROI
  budget: {
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    perInfluencer: { type: Number, default: null },
    spent: { type: Number, default: 0 },
  },
  roi: {
    targetReach: { type: Number, required: true },
    targetEngagement: { type: Number, required: true }, // percentage
    targetConversions: { type: Number, default: 0 },
    actualReach: { type: Number, default: 0 },
    actualEngagement: { type: Number, default: 0 },
    actualConversions: { type: Number, default: 0 },
    roas: { type: Number, default: null }, // Return on Ad Spend
  },
  
  // Content Requirements
  contentRequirements: {
    formats: [String], // 'post', 'story', 'reel', 'tiktok', 'blog', 'video'
    platforms: [String], // 'instagram', 'tiktok', 'youtube', 'twitter'
    numberOfPosts: { type: Number, required: true },
    minCaption: { type: Number, default: null },
    maxCaption: { type: Number, default: null },
    hashtags: [String],
    requiredHashtags: [String],
    restrictions: [String], // Competitors, prohibited content
  },
  
  // Target Audience
  targetAudience: {
    ageMin: { type: Number, default: null },
    ageMax: { type: Number, default: null },
    genders: [String], // 'male', 'female', 'other'
    interests: [String],
    locations: [String],
    minFollowers: { type: Number, default: 1000 },
    maxFollowers: { type: Number, default: null },
    engagementRate: { type: Number, default: null }, // min percentage
  },
  
  // Influencers
  influencers: [{
    influencerId: { type: Schema.Types.ObjectId, ref: 'Influencer' },
    status: {
      type: String,
      enum: ['invited', 'accepted', 'rejected', 'content_submitted', 'approved', 'published', 'completed'],
      default: 'invited'
    },
    invitedAt: { type: Date, default: Date.now },
    respondedAt: { type: Date, default: null },
    contentSubmittedAt: { type: Date, default: null },
    approvedAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },
    paymentStatus: {
      type: String,
      enum: ['pending', 'scheduled', 'paid'],
      default: 'pending'
    },
    paymentAmount: { type: Number, default: null },
    performance: {
      reach: { type: Number, default: 0 },
      impressions: { type: Number, default: 0 },
      engagementCount: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    }
  }],
  
  // Approval Workflow
  approvalWorkflow: {
    enabled: { type: Boolean, default: false },
    levels: [{
      level: { type: Number, default: 1 },
      approverIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      }
    }],
  },
  
  // Tags & Custom Fields
  tags: [String],
  customFields: [{
    key: String,
    value: String,
  }],
  
  // Metadata
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});
```

### Phase 3: Content & Compliance

#### New Content Submission Schema
```typescript
// src/submissions/submission.schema.ts
export const SubmissionSchema = new Schema({
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  influencerId: { type: Schema.Types.ObjectId, ref: 'Influencer', required: true },
  campaignInfluencerId: { type: Schema.Types.ObjectId, required: true }, // ref to campaign influencer
  
  // Content
  content: [{
    platform: String, // instagram, tiktok, etc
    type: String, // post, story, reel
    url: String,
    caption: String,
    hashtags: [String],
    mentions: [String],
    mediaUrls: [String],
  }],
  
  // Submission Status
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'published', 'content_issue'],
    default: 'draft'
  },
  
  // Review & Approval
  reviewNotes: [{
    reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: String,
    timestamp: { type: Date, default: Date.now },
  }],
  revisionRequested: { type: Boolean, default: false },
  revisionNotes: String,
  
  // Compliance
  compliance: {
    fTCDisclsoureIncluded: { type: Boolean, default: false },
    brandGuidelinesFollowed: { type: Boolean, default: true },
    flaggedContent: [String], // List of potential issues
    complianceScore: { type: Number, default: 100 }, // 0-100
    lastCheckedAt: { type: Date, default: null },
  },
  
  // Performance (populated after publish)
  performance: {
    reach: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    lastSyncedAt: { type: Date, default: null },
  },
  
  // Timestamps
  submittedAt: { type: Date, default: null },
  publishedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

#### New Compliance Log Schema
```typescript
// src/compliance/compliance-log.schema.ts
export const ComplianceLogSchema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  submissionId: { type: Schema.Types.ObjectId, ref: 'Submission', default: null },
  
  checkType: {
    type: String,
    enum: ['ftc_disclosure', 'brand_guidelines', 'content_moderation', 'performance', 'scheduled'],
    default: 'scheduled'
  },
  
  findings: [{
    severity: { type: String, enum: ['info', 'warning', 'error', 'critical'] },
    message: String,
    category: String,
  }],
  
  status: {
    type: String,
    enum: ['passed', 'passed_with_warnings', 'failed', 'review_needed'],
    default: 'review_needed'
  },
  
  checkedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date, default: null },
});
```

### Phase 4: Analytics & Reporting

#### New Analytics Schema
```typescript
// src/analytics/campaign-analytics.schema.ts
export const CampaignAnalyticsSchema = new Schema({
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  
  // Aggregated metrics
  metrics: {
    totalReach: { type: Number, default: 0 },
    totalImpressions: { type: Number, default: 0 },
    totalEngagements: { type: Number, default: 0 },
    avgEngagementRate: { type: Number, default: 0 },
    totalClicks: { type: Number, default: 0 },
    totalConversions: { type: Number, default: 0 },
    totalSaves: { type: Number, default: 0 },
    totalShares: { type: Number, default: 0 },
  },
  
  // Financial metrics
  financials: {
    totalSpent: { type: Number, default: 0 },
    costPerReach: { type: Number, default: 0 },
    costPerEngagement: { type: Number, default: 0 },
    costPerClick: { type: Number, default: 0 },
    costPerConversion: { type: Number, default: 0 },
    roas: { type: Number, default: 0 }, // Return on Ad Spend
  },
  
  // Influencer performance ranking
  topInfluencers: [{
    influencerId: { type: Schema.Types.ObjectId, ref: 'Influencer' },
    reach: Number,
    engagement: Number,
    conversions: Number,
  }],
  
  // Platform breakdown
  platformMetrics: [{
    platform: String,
    reach: Number,
    engagement: Number,
    conversions: Number,
  }],
  
  // Time series data
  dailyMetrics: [{
    date: Date,
    reach: Number,
    impressions: Number,
    engagement: Number,
    conversions: Number,
  }],
  
  lastUpdatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});
```

### Phase 5: Payments & Transactions

#### New Payment Schema
```typescript
// src/payments/payment.schema.ts
export const PaymentSchema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  influencerId: { type: Schema.Types.ObjectId, ref: 'Influencer', required: true },
  
  // Payment Details
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  
  // Milestone-based (optional)
  milestones: [{
    name: String, // 'Content Creation', 'First Publication', 'Engagement Target'
    percentage: Number, // 0-100
    status: { type: String, enum: ['pending', 'completed'] },
    completedAt: Date,
  }],
  
  // Payout Method
  payoutMethod: {
    type: String,
    enum: ['stripe', 'bank_transfer', 'paypal', 'internal_credit'],
    required: true
  },
  
  // Stripe data
  stripePaymentIntentId: String,
  stripeTransferId: String,
  stripeFees: { type: Number, default: 0 },
  
  // Bank transfer data
  bankAccount: {
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    routingNumber: String,
    swiftCode: String,
    iban: String,
  },
  
  // Metadata
  invoiceNumber: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
});
```

---

## Backend Implementation

### Phase 1: Authentication & User Management

#### 1.1 Enhanced User Service

**File:** `src/auth/auth.service.ts`

Key features to implement:
- User registration with email verification
- Login with JWT + refresh tokens
- Password reset flow
- Two-factor authentication (2FA)
- Email verification
- Account deletion with data retention period

```typescript
// Key Methods:
- register(createUserDto: CreateUserDto): Promise<User>
- login(email: string, password: string): Promise<{ access_token: string, refresh_token: string }>
- refreshToken(refreshToken: string): Promise<{ access_token: string }>
- requestPasswordReset(email: string): Promise<void>
- resetPassword(token: string, newPassword: string): Promise<void>
- verifyEmail(email: string, token: string): Promise<void>
- sendVerificationEmail(email: string): Promise<void>
- enable2FA(userId: string): Promise<{ secret: string, qrCode: string }>
- verify2FA(userId: string, code: string): Promise<boolean>
```

#### 1.2 Organization Management Service

**File:** `src/organizations/organizations.service.ts` (NEW)

```typescript
// Key Methods:
- createOrganization(createOrgDto: CreateOrganizationDto, owner: User): Promise<Organization>
- getOrganization(orgId: string): Promise<Organization>
- updateOrganization(orgId: string, updateOrgDto: UpdateOrganizationDto): Promise<Organization>
- getOrgTeamMembers(orgId: string): Promise<User[]>
- inviteTeamMember(orgId: string, email: string, role: UserRole): Promise<Invitation>
- acceptInvitation(invitationToken: string): Promise<User>
- removeTeamMember(orgId: string, userId: string): Promise<void>
- updateUserRole(orgId: string, userId: string, newRole: UserRole): Promise<User>
- getLimitsUsage(orgId: string): Promise<LimitsUsage>
- upgradeSubscription(orgId: string, tier: SubscriptionTier): Promise<Organization>
```

#### 1.3 Permission/RBAC Service

**File:** `src/auth/rbac.service.ts` (NEW)

```typescript
// Key Methods:
- hasPermission(user: User, resource: string, action: string): Promise<boolean>
- canCreateCampaign(user: User, orgId: string): Promise<boolean>
- canEditCampaign(user: User, campaignId: string): Promise<boolean>
- canApprovecontent(user: User, submissionId: string): Promise<boolean>
- canViewAnalytics(user: User, campaignId: string): Promise<boolean>
- getAvailableActions(user: User, resource: string): Promise<string[]>
```

### Phase 2: Campaign & Content Management

#### 2.1 Enhanced Campaign Service

**File:** `src/campaigns/campaigns.service.ts`

Updates:
- Campaign lifecycle management (draft → active → completed)
- Budget tracking and alerts
- ROI calculation and tracking
- Approval workflow automation
- Performance metrics aggregation
- Campaign templates (reusable)

```typescript
// New Methods:
- createCampaignFromTemplate(templateId: string, orgId: string): Promise<Campaign>
- getCampaignROI(campaignId: string): Promise<ROIMetrics>
- updateCampaignPerformance(campaignId: string): Promise<Campaign>
- getStatusChangeHistory(campaignId: string): Promise<StatusChange[]>
- approveCampaign(campaignId: string, userId: string): Promise<Campaign>
- pauseCampaign(campaignId: string): Promise<Campaign>
- completeCampaign(campaignId: string): Promise<Campaign>
```

#### 2.2 Submission & Approval Service

**File:** `src/submissions/submissions.service.ts`

New features:
- Content submission tracking
- Multi-level approval workflows
- Compliance checking
- Performance syncing with social platforms
- Revision request handling

```typescript
// Key Methods:
- submitContent(submissionDto: SubmissionDto): Promise<Submission>
- requestRevision(submissionId: string, notes: string): Promise<Submission>
- approveSubmission(submissionId: string, userId: string): Promise<Submission>
- rejectSubmission(submissionId: string, reason: string): Promise<Submission>
- publishSubmission(submissionId: string): Promise<Submission>
- syncPerformanceMetrics(submissionId: string): Promise<Submission>
- getSubmissionHistory(campaignId: string): Promise<Submission[]>
```

### Phase 3: Compliance & Analytics

#### 3.1 Compliance Service

**File:** `src/compliance/compliance.service.ts` (NEW)

Features:
- FTC disclosure checking
- Brand guideline validation
- Content moderation
- Regulatory compliance tracking
- Automated compliance reports

```typescript
// Key Methods:
- checkFTCCompliance(submissionId: string): Promise<ComplianceCheck>
- validateBrandGuidelines(content: string, brandId: string): Promise<ValidationResult>
- scanForProhibitedContent(content: string): Promise<ContentFlag[]>
- generateComplianceReport(campaignId: string): Promise<ComplianceReport>
- createComplianceCheckpoint(campaignId: string, checkType: string): Promise<void>
```

#### 3.2 Analytics Service

**File:** `src/analytics/analytics.service.ts` (NEW)

Features:
- Campaign performance aggregation
- ROI attribution modeling
- Influencer performance ranking
- Platform performance breakdown
- Real-time dashboards

```typescript
// Key Methods:
- getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics>
- getInfluencerPerformance(campaignId: string): Promise<InfluencerPerformance[]>
- calculateROAS(campaignId: string): Promise<number>
- getPlatformMetrics(campaignId: string): Promise<PlatformMetrics[]>
- generateReport(campaignId: string, format: 'pdf' | 'csv'): Promise<Buffer>
- getDashboardMetrics(orgId: string): Promise<DashboardMetrics>
```

### Phase 4: Payments & Billing

#### 4.1 Payment Service

**File:** `src/payments/payments.service.ts` (NEW)

Features:
- Stripe integration for payments
- Milestone-based payment releases
- Multi-currency support
- Payment tracking and invoicing
- Payout management

```typescript
// Key Methods:
- createPayment(paymentDto: PaymentDto): Promise<Payment>
- schedulePayment(paymentId: string, date: Date): Promise<Payment>
- processPayment(paymentId: string): Promise<Payment>
- refundPayment(paymentId: string, reason: string): Promise<Payment>
- generateInvoice(paymentId: string): Promise<Buffer>
- getInfluencerPayments(influencerId: string): Promise<Payment[]>
- createMilestonePayment(campaignId: string, milestones: Milestone[]): Promise<Payment>
```

#### 4.2 Billing Service

**File:** `src/billing/billing.service.ts` (NEW)

Features:
- Subscription management
- Invoice generation
- Payment method management
- Usage tracking for limits
- Dunning management (failed payments)

```typescript
// Key Methods:
- createSubscription(orgId: string, tier: SubscriptionTier): Promise<Subscription>
- updateSubscription(orgId: string, newTier: SubscriptionTier): Promise<Subscription>
- cancelSubscription(orgId: string): Promise<Subscription>
- createInvoice(orgId: string): Promise<Invoice>
- trackUsage(orgId: string, resource: string, increment: number): Promise<void>
- checkLimitExceeded(orgId: string, resource: string): Promise<boolean>
```

### Phase 5: Integration Points

#### 5.1 Social Media APIs

- **Instagram Graph API** - Fetch metrics, post content
- **TikTok API** - Video analytics, follower data
- **YouTube API** - Channel analytics, video performance
- **Twitter API** - Tweet metrics, engagement

#### 5.2 Third-party Integrations

- **Stripe** - Payment processing
- **SendGrid/AWS SES** - Email notifications
- **Slack** - Campaign notifications
- **Zapier** - Workflow automation
- **Google Analytics** - Conversion tracking

---

## Frontend Implementation

### Phase 1: Authentication & Onboarding

#### Pages to Create:
1. **Landing Page** (`app/page.tsx`) - Marketing site
2. **Pricing Page** (`app/pricing/page.tsx`) - Subscription tiers
3. **Sign Up** (`app/(auth)/signup/page.tsx`) - Registration
4. **Sign In** (`app/(auth)/login/page.tsx`) - Login
5. **Email Verification** (`app/(auth)/verify-email/page.tsx`)
6. **Password Reset** (`app/(auth)/reset-password/page.tsx`)
7. **Onboarding** (`app/onboarding/*`) - Multi-step setup

#### Components:
- Auth form with validation
- Email verification UI
- 2FA setup wizard
- Organization creation form
- Team member invitation form

### Phase 2: Dashboard & Layout

#### New Layout Structure:
```
app/
├── (public)/
│   ├── page.tsx (landing)
│   ├── pricing/
│   ├── about/
│   └── features/
├── (auth)/
│   ├── login/
│   ├── signup/
│   └── reset-password/
├── onboarding/
│   ├── organization/
│   ├── team/
│   └── payment/
├── dashboard/ (protected)
│   ├── layout.tsx (main layout)
│   ├── page.tsx (overview)
│   ├── campaigns/
│   ├── influencers/
│   ├── submissions/
│   ├── analytics/
│   ├── team/
│   ├── settings/
│   └── billing/
└── admin/ (super_admin only)
    ├── organizations/
    ├── users/
    ├── billing/
    └── reports/
```

#### Key Pages:

1. **Dashboard Overview** - KPI metrics, recent campaigns
2. **Campaigns List** - All campaigns with filters
3. **Campaign Detail** - Full campaign info, influencers, content
4. **Create Campaign** - Multi-step form with AI suggestions
5. **Influencer Management** - Discover, manage, rate influencers
6. **Content Review** - Approval workflow UI
7. **Analytics** - Dashboards and reports
8. **Team Management** - Member management and invitations
9. **Settings** - Account, organization, preferences
10. **Billing** - Subscription management and invoices

### Phase 3: Design System & Theming

#### Color Palette:
- Primary: `#6366F1` (Indigo)
- Secondary: `#EC4899` (Pink)
- Success: `#10B981` (Emerald)
- Warning: `#F59E0B` (Amber)
- Danger: `#EF4444` (Red)
- Neutral: `#6B7280` (Gray)

#### Typography:
- Heading: Inter (sans-serif)
- Body: Inter (sans-serif)
- Mono: JetBrains Mono

#### Components to Build:
- Button (variants: primary, secondary, danger, ghost)
- Card (with hover effects)
- Modal (with animations)
- Sidebar (collapsible)
- Navbar (responsive)
- Form inputs (text, email, password, select, checkbox)
- Data tables (sortable, filterable)
- Charts (Recharts integration)
- Loading spinners
- Toast notifications
- Badges and pills
- Progress bars
- Tabs

### Phase 4: Features & Interactions

#### Campaign Management:
- Drag-and-drop campaign builder
- Real-time budget tracking
- Influencer search and filtering
- Performance metrics in real-time
- Template library

#### Content Review:
- Carousel view of submissions
- Inline commenting
- Revision request workflow
- Automated compliance badges
- One-click approval/rejection

#### Analytics:
- Interactive dashboards
- Custom date ranges
- Export to PDF/CSV
- Comparison views (this campaign vs. average)
- Forecast models

#### Team Collaboration:
- @mentions in comments
- Activity timeline
- Notification center
- Audit logs

### Phase 5: Mobile Responsiveness

- Mobile-first design
- Touch-friendly buttons (min 44px)
- Simplified navigation (hamburger menu)
- Optimized tables (scrollable)
- Mobile app considerations (PWA)

---

## Security & Compliance

### 1. Data Protection

- **Encryption at Rest:** AES-256 for sensitive data
- **Encryption in Transit:** TLS 1.3
- **Password Hashing:** bcrypt with salt rounds 10+
- **PII Masking:** Mask emails, phone numbers in logs

### 2. Authentication Security

- **JWT Implementation:** Short-lived access tokens (15 min), refresh tokens (7 days)
- **Rate Limiting:** 5 login attempts per 15 minutes
- **2FA:** TOTP-based two-factor authentication
- **Session Management:** Invalidate on logout, device binding

### 3. API Security

- **API Key Management:** Scoped, rotatable keys
- **Rate Limiting:** Per-tier usage limits
- **CORS:** Whitelist specific origins only
- **Input Validation:** Sanitize all inputs
- **SQL Injection Prevention:** Parameterized queries (Mongoose)

### 4. Compliance Requirements

#### GDPR Compliance:
- User consent management
- Right to be forgotten (data deletion)
- Data portability exports
- Privacy policy
- Data processing agreements

#### CCPA Compliance:
- Consumer rights management
- Opt-out mechanisms
- Privacy notice

#### SOC 2 Type II:
- Access controls
- Change management
- Incident response
- Encryption
- Regular audits

#### FTC Compliance (for Influencer Content):
- Disclosure automation
- Compliance tracking
- Regulatory reporting

---

## Implementation Roadmap

### Q2 2026 (8 weeks)

**Sprint 1-2: Core Infrastructure**
- Updated schemas implementation
- Organization & user management
- RBAC system
- Basic payment integration
- Email notification system

**Sprint 3-4: Frontend Phase 1**
- Rebrand and design system
- Landing page
- Auth flows (signup, login)
- Onboarding flow
- Basic dashboard layout

### Q3 2026 (8 weeks)

**Sprint 5-6: Campaign Enhancement**
- Advanced campaign management
- Approval workflows
- Content submission system
- Compliance checking
- Analytics foundation

**Sprint 7-8: Frontend Phase 2**
- Campaign management UI
- Content review dashboard
- Team management
- Settings and profile management
- Analytics dashboards

### Q4 2026 (8 weeks)

**Sprint 9-10: Payment & Billing**
- Stripe integration
- Billing management
- Invoice generation
- Payout processing
- Subscription management

**Sprint 11-12: Polish & Optimization**
- Performance optimization
- Mobile responsiveness
- Security audit
- Load testing
- Bug fixes and refinement

### Q1 2027 (Launch)

- **Launch Marketing Site**
- **Public Beta Program** (100-500 users)
- **Enterprise Sales** (custom deals)
- **24/7 Support** team launch
- **Monitoring & Analytics** setup

---

## API Endpoint Summary

### Authentication Endpoints
```
POST /auth/register
POST /auth/login
POST /auth/refresh-token
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/verify-email/:token
POST /auth/2fa/setup
POST /auth/2fa/verify
```

### Organization Endpoints
```
POST   /organizations
GET    /organizations/:id
PUT    /organizations/:id
POST   /organizations/:id/team/invite
GET    /organizations/:id/team
DELETE /organizations/:id/team/:userId
PUT    /organizations/:id/team/:userId/role
POST   /organizations/:id/subscription/upgrade
```

### Campaign Endpoints
```
POST   /campaigns
GET    /campaigns
GET    /campaigns/:id
PUT    /campaigns/:id
DELETE /campaigns/:id
POST   /campaigns/:id/publish
POST   /campaigns/:id/influencers
PUT    /campaigns/:id/influencers/:influencerId
```

### Submission Endpoints
```
POST   /submissions
GET    /submissions/:id
PUT    /submissions/:id
POST   /submissions/:id/approve
POST   /submissions/:id/reject
POST   /submissions/:id/request-revision
POST   /submissions/:id/publish
```

### Analytics Endpoints
```
GET /analytics/campaigns/:id
GET /analytics/campaigns/:id/roi
GET /analytics/influencers/:id/performance
GET /analytics/dashboard
GET /analytics/reports/:campaignId
```

### Payment Endpoints
```
POST /payments
GET  /payments/:id
POST /payments/:id/schedule
POST /payments/:id/process
GET  /payments/invoices/:id
```

---

## Success Metrics

### User Acquisition
- 100 signups by end of Q2 2026
- 500 active users by end of Q3 2026
- 2,000 active users by end of 2026

### Revenue
- $2,000 MRR by Q3 2026
- $15,000 MRR by end of 2026
- $50,000 MRR by Q2 2027

### Product
- 99.9% uptime
- < 2s page load time
- 95% customer satisfaction score
- 30% feature adoption rate per user

### Business
- Reduce churn to < 5% monthly
- Achieve 3:1 CAC payback ratio
- Net revenue retention > 120%

---

## Key Dependencies & Tools

### Backend
- NestJS 11.x
- MongoDB 6.x with Mongoose 8.x
- Stripe SDK
- SendGrid/AWS SES
- JWT libraries
- Passport.js for auth strategies

### Frontend
- Next.js 16.x
- React 19.x
- TypeScript 5.x
- Tailwind CSS
- Recharts for analytics
- SWR for data fetching
- Zustand for state management (if needed)

### Infrastructure
- Vercel (hosting)
- MongoDB Atlas (database)
- Stripe (payments)
- SendGrid (email)
- CloudFlare (CDN)

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Approve schema changes** and database migration strategy
3. **Start Sprint 1** with user management implementation
4. **Set up project boards** for tracking progress
5. **Schedule weekly syncs** for alignment
6. **Begin load testing** infrastructure

This plan ensures TrendAI transforms into a professional, profitable SaaS platform with proper foundation for scaling and monetization.
