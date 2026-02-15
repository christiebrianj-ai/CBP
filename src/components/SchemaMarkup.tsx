import { COMPANY, SERVICE_AREA } from "@/lib/config";

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HousePainter"],
    name: COMPANY.name,
    description:
      "Professional interior painting services in West Chester, PA. Specializing in residential interior painting, cabinet painting, trim work, and drywall repair with fast turnaround and clear communication.",
    url: COMPANY.siteUrl,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "West Chester",
      addressRegion: "PA",
      postalCode: "19380",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREA.towns.map((town) => ({
      "@type": "City",
      name: `${town}, PA`,
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 39.9607,
        longitude: -75.6055,
      },
      geoRadius: `${SERVICE_AREA.radiusMiles} mi`,
    },
    priceRange: "$$",
    openingHours: "Mo-Sa 07:00-18:00",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Painting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cabinet Painting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Trim and Door Painting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Drywall Repair",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
