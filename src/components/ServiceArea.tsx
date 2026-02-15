import { COMPANY, SERVICE_AREA } from "@/lib/config";

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-warm-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Service Area
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Proudly serving {SERVICE_AREA.center} and communities within {SERVICE_AREA.radiusMiles}{" "}
            miles.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Town list */}
          <div>
            <h3 className="text-lg font-semibold text-charcoal">
              Serving {SERVICE_AREA.center} &amp; Surrounding Towns
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              We provide interior painting, cabinet painting, and handyman services throughout
              Chester County and the greater Philadelphia suburbs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICE_AREA.towns.map((town) => (
                <span
                  key={town}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-charcoal shadow-sm"
                >
                  {town}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Don&apos;t see your town listed? We likely serve your area —{" "}
              <a href="#contact" className="font-medium text-accent hover:underline">
                contact us
              </a>{" "}
              to confirm.
            </p>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl shadow-sm">
            <iframe
              src={COMPANY.googleMapsEmbedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${SERVICE_AREA.center} service area`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
