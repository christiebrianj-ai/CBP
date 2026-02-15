# Christie Brothers Painting — Website

A modern, mobile-first, conversion-focused website for a local painting company. Built with **Next.js 16 (App Router)**, **Tailwind CSS 4**, and **SQLite** for lead storage.

## Quick Start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                   # http://localhost:3000
```

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard (see `.env.example`)
4. Deploy

> **Note:** SQLite writes to disk, so for serverless you may want to swap to an external DB (Turso, PlanetScale) or use the Google Sheets integration pattern. For a small-volume lead gen site, Vercel's serverless functions with `/tmp` or a persistent volume work fine initially.

### Netlify

```bash
npm run build
# Deploy the `.next` directory via Netlify's Next.js plugin
```

## Environment Variables

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
| `NOTIFICATION_EMAIL` | No | Email to receive lead notifications |
| `SMTP_HOST` | No | SMTP server for email notifications |
| `SMTP_PORT` | No | SMTP port (default 587) |
| `SMTP_USER` | No | SMTP username |
| `SMTP_PASS` | No | SMTP password |
| `NEXT_PUBLIC_GA4_ID` | No | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible Analytics domain |

## Customization

### Change business name
Edit `NEXT_PUBLIC_COMPANY_NAME` in `.env.local`. The name propagates everywhere via `src/lib/config.ts`.

### Change phone / email / address
Edit the corresponding `NEXT_PUBLIC_*` variables in `.env.local`.

### Change service area towns
Edit the `SERVICE_AREA.towns` array in `src/lib/config.ts`.

### Change accent color
Edit the `--color-accent` values in `src/app/globals.css`.

### Add real images
Replace placeholder divs in `src/components/Hero.tsx` and `src/components/Gallery.tsx` with `<Image>` tags pointing to files in `public/images/`.

### Add testimonials
Edit the `TESTIMONIALS` array in `src/components/Gallery.tsx`.

### SMTP for email notifications
Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `NOTIFICATION_EMAIL` in `.env.local`. Uses `nodemailer` — install it: `npm install nodemailer @types/nodemailer`.

## Tech Stack

- **Next.js 16** (App Router) — server components + API routes
- **Tailwind CSS 4** — utility-first styling
- **better-sqlite3** — lightweight lead storage
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
