/**
 * Central configuration — edit here to update across the entire site.
 */

export const COMPANY = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Christie Brothers Painting",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "(610) 555-0123",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@christiebrotherspainting.com",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "West Chester, PA 19380",
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? "#",
  googleMapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48972.54741498!2d-75.6!3d39.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6f17e1a3b830f%3A0x3c8f1e6b5f3e2a1d!2sWest%20Chester%2C%20PA!5e0!3m2!1sen!2sus!4v1700000000000",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://christiebrotherspainting.com",
  bookedThisWeek: process.env.NEXT_PUBLIC_BOOKED_THIS_WEEK === "true",
} as const;

export const SERVICE_AREA = {
  center: "West Chester, PA",
  radiusMiles: 50,
  towns: [
    "West Chester",
    "Downingtown",
    "Exton",
    "Malvern",
    "Kennett Square",
    "Chester Springs",
    "Wayne",
    "Media",
    "Paoli",
    "Phoenixville",
    "Newtown Square",
    "Glen Mills",
    "Bryn Mawr",
    "Coatesville",
    "Oxford",
  ],
} as const;

export const ACCENT_COLOR = {
  DEFAULT: "#2563EB", // blue-600
  light: "#DBEAFE", // blue-100
  dark: "#1E40AF", // blue-800
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Service Area", href: "#service-area" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const PROJECT_TYPES = [
  "Interior Painting (Walls & Ceilings)",
  "Trim & Doors",
  "Cabinet Painting",
  "Drywall Repair & Touch-ups",
  "Small Commercial Interior",
  "Light Handyman Service",
  "Multiple / Not Sure",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1–2 Weeks",
  "This Month",
  "Flexible",
] as const;

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000 – $15,000",
  "$15,000+",
  "Not sure / prefer not to say",
] as const;

export const CONTACT_METHODS = ["Call", "Text", "Email"] as const;
