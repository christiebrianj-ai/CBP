"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How do you price your projects?",
    a: "We price by the project, not by the hour. After an on-site walkthrough or reviewing photos of your space, we provide a detailed written estimate that covers prep, materials, labor, and cleanup. No hidden fees.",
  },
  {
    q: "Do you require a deposit?",
    a: "For most residential projects, we collect a small deposit to secure your date on the schedule. The remainder is due upon satisfactory completion of the work.",
  },
  {
    q: "How soon can you start?",
    a: "Depending on our current schedule, we can often start within 1–2 weeks. For urgent projects, reach out and we'll do our best to accommodate you.",
  },
  {
    q: "What paint brands do you use?",
    a: "We primarily use Benjamin Moore and Sherwin-Williams — trusted, high-quality paints that deliver excellent coverage and durability. We're happy to discuss specific product lines and finishes for your project.",
  },
  {
    q: "Are you insured?",
    a: "Yes. We carry full general liability insurance for your protection and peace of mind.",
  },
  {
    q: "Do you move furniture?",
    a: "Yes. We carefully move and protect furniture as part of our prep process. Large or specialty items may need to be moved beforehand — we'll let you know during the estimate.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <dl className="mt-12 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-warm-gray transition"
              >
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-charcoal">{faq.q}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-gray-400 transition ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="px-6 pb-4 text-sm leading-relaxed text-gray-600">
                    {faq.a}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
