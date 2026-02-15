# Christie Brothers Painting — Website

A modern, mobile-first, conversion-focused website for a local painting company. Built with **Next.js 16 (App Router)**, **Tailwind CSS 4**, and **DynamoDB** for lead storage. Configured for **AWS Amplify** deployment.

## Quick Start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                   # http://localhost:3000
```

## Deployment — AWS Amplify

### Prerequisites

- An AWS account
- AWS CLI installed and configured (`aws configure`)
- A GitHub repo with this code pushed to it

### Step 1: Create the DynamoDB table

```bash
chmod +x scripts/create-dynamodb-table.sh
./scripts/create-dynamodb-table.sh
```

This creates a `cbp-leads` table with on-demand billing (pay-per-request, stays in free tier for low volume).

### Step 2: Deploy to Amplify

**Option A — AWS Console (easiest)**

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"Host web app"** → Connect your GitHub repo
3. Amplify auto-detects the `amplify.yml` build spec
4. Add environment variables (see table below) under **App settings → Environment variables**
5. Click **Save and deploy**

**Option B — Amplify CLI**

```bash
npm install -g @aws-amplify/cli
amplify init
amplify push
```

### Step 3: Grant DynamoDB permissions

The Amplify SSR compute role needs permission to write to DynamoDB. In the AWS Console:

1. Go to **IAM → Roles**
2. Find the role named like `amplify-<appid>-...-ssrLambdaRole`
3. Attach this inline policy (or use the managed `AmazonDynamoDBFullAccess` for simplicity):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:YOUR_ACCOUNT_ID:table/cbp-leads"
    }
  ]
}
```

### Step 4: Custom domain (optional)

In Amplify Console → **Domain management** → Add your domain. Amplify handles SSL certificates automatically.

## Environment Variables

Set these in **Amplify Console → App settings → Environment variables**:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_COMPANY_NAME` | Yes | Business name displayed everywhere |
| `NEXT_PUBLIC_PHONE` | Yes | Phone number (NAP, header, CTAs) |
| `NEXT_PUBLIC_EMAIL` | Yes | Contact email |
| `NEXT_PUBLIC_ADDRESS` | Yes | Business address for footer/SEO |
| `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | No | Google review link |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | No | Google Maps embed URL |
| `NEXT_PUBLIC_BOOKED_THIS_WEEK` | No | Set `"true"` to show booking notice |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for SEO |
| `AWS_REGION` | No | AWS region (default: `us-east-1`) |
| `LEADS_TABLE_NAME` | No | DynamoDB table name (default: `cbp-leads`) |
| `NOTIFICATION_EMAIL` | No | Email to receive lead notifications |
| `SMTP_HOST` | No | SMTP server for email notifications |
| `SMTP_PORT` | No | SMTP port (default 587) |
| `SMTP_USER` | No | SMTP username |
| `SMTP_PASS` | No | SMTP password |
| `NEXT_PUBLIC_GA4_ID` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible Analytics domain |

## Customization

### Change business name
Edit `NEXT_PUBLIC_COMPANY_NAME` in Amplify environment variables (or `.env.local` for local dev). The name propagates everywhere via `src/lib/config.ts`.

### Change phone / email / address
Edit the corresponding `NEXT_PUBLIC_*` variables.

### Change service area towns
Edit the `SERVICE_AREA.towns` array in `src/lib/config.ts`.

### Change accent color
Edit the `--color-accent` values in `src/app/globals.css`.

### Add real images
Replace placeholder divs in `src/components/Hero.tsx` and `src/components/Gallery.tsx` with `<Image>` tags pointing to files in `public/images/`.

### Add testimonials
Edit the `TESTIMONIALS` array in `src/components/Gallery.tsx`.

### SMTP for email notifications
Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `NOTIFICATION_EMAIL`. Uses `nodemailer` (already included).

## Tech Stack

- **Next.js 16** (App Router) — server components + API routes
- **Tailwind CSS 4** — utility-first styling
- **DynamoDB** — serverless lead storage (AWS free tier)
- **AWS Amplify** — hosting + CI/CD
- **TypeScript** — type safety throughout

## Features

- Mobile-first responsive design
- Sticky call button on mobile
- SEO: meta tags, Open Graph, LocalBusiness + HousePainter schema markup
- Spam protection: honeypot field + server-side rate limiting
- Lead qualification: service type checkboxes, booking availability notice
- FAQ accordion
- Before/after gallery layout
- Google Maps embed
- Google Analytics 4 / Plausible analytics support
