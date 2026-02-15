import { COMPANY, NAV_LINKS } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* NAP */}
          <div>
            <h3 className="text-lg font-bold text-white">{COMPANY.name}</h3>
            <p className="mt-2 text-sm leading-relaxed">
              {COMPANY.address}
              <br />
              <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="hover:text-white">
                {COMPANY.phone}
              </a>
              <br />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-2 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white">Services</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Interior Painting</li>
              <li>Trim &amp; Doors</li>
              <li>Cabinet Painting</li>
              <li>Drywall Repair</li>
              <li>Small Commercial</li>
              <li>Handyman Services</li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-white">Get Your Free Estimate</h4>
            <p className="mt-2 text-sm">
              Ready to transform your space? Reach out today for a no-obligation quote.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Request Estimate
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          &copy; {year} {COMPANY.name}. All rights reserved. | Interior Painter West Chester PA
        </div>
      </div>
    </footer>
  );
}
