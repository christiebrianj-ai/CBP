import { COMPANY } from "@/lib/config";

export default function Hero() {
  const phoneHref = `tel:${COMPANY.phone.replace(/\D/g, "")}`;
  return (
    <section className="relative flex min-h-[85vh] items-center bg-gradient-to-br from-gray-50 to-white pt-16">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent-light/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent-light/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              West Chester, PA &amp; Surrounding Areas
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              Professional Interior Painting in West Chester, PA
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-600">
              Craftsmanship meets clear communication. We deliver beautiful results, clean job sites, and fast turnaround — so you can enjoy your space sooner.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-lg bg-accent px-8 py-3.5 text-center text-base font-semibold text-white shadow-md transition hover:bg-accent-dark hover:shadow-lg"
              >
                Request a Free Estimate
              </a>
              <a
                href={phoneHref}
                className="rounded-lg border-2 border-accent px-8 py-3.5 text-center text-base font-semibold text-accent transition hover:bg-accent hover:text-white"
              >
                Call / Text Now
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckIcon /> Fully Insured
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> Free Estimates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> 5-Star Rated
              </span>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-accent-light to-accent/20 shadow-2xl">
              <div className="flex h-full items-center justify-center text-accent/40">
                <svg className="h-32 w-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
