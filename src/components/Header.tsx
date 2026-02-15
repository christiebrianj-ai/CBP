"use client";

import { useState } from "react";
import { COMPANY, NAV_LINKS } from "@/lib/config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const phoneHref = `tel:${COMPANY.phone.replace(/\D/g, "")}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Name */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-charcoal">
            {COMPANY.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 transition hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
          >
            Free Estimate
          </a>
          <a
            href={phoneHref}
            className="text-sm font-semibold text-accent hover:text-accent-dark"
          >
            {COMPANY.phone}
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="h-6 w-6 text-charcoal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-accent py-2.5 text-center text-sm font-semibold text-white"
          >
            Free Estimate
          </a>
          <a
            href={phoneHref}
            className="mt-2 block text-center text-sm font-semibold text-accent"
          >
            {COMPANY.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
