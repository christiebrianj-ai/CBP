import { COMPANY } from "@/lib/config";

const GALLERY_ITEMS = [
  { label: "Living Room Repaint", before: "Before", after: "After" },
  { label: "Kitchen Cabinet Refresh", before: "Before", after: "After" },
  { label: "Master Bedroom", before: "Before", after: "After" },
  { label: "Office Trim & Walls", before: "Before", after: "After" },
  { label: "Dining Room Accent Wall", before: "Before", after: "After" },
  { label: "Hallway & Staircase", before: "Before", after: "After" },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "West Chester, PA",
    text: "They were on time, communicated every step, and left our house cleaner than they found it. The finish is flawless.",
    rating: 5,
  },
  {
    name: "James & Linda K.",
    location: "Downingtown, PA",
    text: "We got three quotes — Christie Brothers had the best communication by far. Fair price, beautiful work, done in two days.",
    rating: 5,
  },
  {
    name: "Michael R.",
    location: "Malvern, PA",
    text: "Had our kitchen cabinets painted and they look brand new. Highly recommend for anyone considering cabinet painting.",
    rating: 5,
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-warm-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Before / After */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Our Work
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            See the difference quality painting makes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.label} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="grid grid-cols-2">
                <div className="flex aspect-square items-center justify-center bg-gray-200 text-xs font-medium text-gray-400">
                  {item.before}
                </div>
                <div className="flex aspect-square items-center justify-center bg-accent-light text-xs font-medium text-accent">
                  {item.after}
                </div>
              </div>
              <div className="p-3 text-center text-sm font-medium text-charcoal">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 text-sm font-semibold text-charcoal">
                {t.name}
              </div>
              <div className="text-xs text-gray-400">{t.location}</div>
            </div>
          ))}
        </div>

        {/* Review CTA */}
        <div className="mt-12 text-center">
          <a
            href={COMPANY.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-accent px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Leave Us a Review on Google
          </a>
        </div>
      </div>
    </section>
  );
}
