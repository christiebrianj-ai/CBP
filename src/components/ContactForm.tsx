"use client";

import { useState, type FormEvent } from "react";
import {
  COMPANY,
  PROJECT_TYPES,
  TIMELINE_OPTIONS,
  BUDGET_RANGES,
  CONTACT_METHODS,
} from "@/lib/config";

const SERVICE_CHECKBOXES = [
  "Interior Painting",
  "Cabinet Painting",
  "Trim & Doors",
  "Small Commercial",
  "Handyman",
] as const;

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  projectType: string;
  serviceTypes: string[];
  rooms: string;
  timeline: string;
  budget: string;
  description: string;
  preferredContact: string;
  /** Honeypot field — must remain empty */
  website: string;
}

const INITIAL: FormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  projectType: "",
  serviceTypes: [],
  rooms: "",
  timeline: "",
  budget: "",
  description: "",
  preferredContact: "Call",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const bookedThisWeek = COMPANY.bookedThisWeek;

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function toggleService(svc: string) {
    setForm((f) => {
      const arr = f.serviceTypes.includes(svc)
        ? f.serviceTypes.filter((s) => s !== svc)
        : [...f.serviceTypes, svc];
      return { ...f, serviceTypes: arr };
    });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.projectType) e.projectType = "Select a project type";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    // Honeypot check (bots fill hidden fields)
    if (form.website) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMsg(data.message ?? "Thank you! We'll be in touch soon.");
        setForm(INITIAL);
      } else {
        setStatus("error");
        setServerMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please call us directly.");
    }
  }

  return (
    <section id="contact" className="bg-warm-gray py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Request a Free Estimate
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Tell us about your project and we&apos;ll get back to you within a few hours.
          </p>
        </div>

        {/* Lead qualification notice */}
        {bookedThisWeek && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
            We may be booked this week — still submit your request and we&apos;ll confirm
            availability.
          </div>
        )}

        {status === "success" ? (
          <div className="mt-10 rounded-xl border border-green-200 bg-green-50 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-green-800">Estimate Request Received</h3>
            <p className="mt-2 text-sm text-green-700">{serverMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>

            {/* Are we a fit? — service checkboxes */}
            <fieldset>
              <legend className="text-sm font-semibold text-charcoal">
                What do you need help with?
              </legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {SERVICE_CHECKBOXES.map((svc) => (
                  <label
                    key={svc}
                    className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                      form.serviceTypes.includes(svc)
                        ? "border-accent bg-accent text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-accent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.serviceTypes.includes(svc)}
                      onChange={() => toggleService(svc)}
                    />
                    {svc}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Name & Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name *"
                error={errors.name}
                type="text"
                value={form.name}
                onChange={(v) => set("name", v)}
              />
              <Field
                label="Phone *"
                error={errors.phone}
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
              />
            </div>

            {/* Email & Address */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email *"
                error={errors.email}
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
              />
              <Field
                label="Address / Zip"
                type="text"
                value={form.address}
                onChange={(v) => set("address", v)}
              />
            </div>

            {/* Project type & Timeline */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-charcoal">Project Type *</label>
                <select
                  className={`mt-1 block w-full rounded-lg border ${
                    errors.projectType ? "border-red-400" : "border-gray-200"
                  } bg-white px-3 py-2.5 text-sm shadow-sm focus:border-accent focus:ring-1 focus:ring-accent`}
                  value={form.projectType}
                  onChange={(e) => set("projectType", e.target.value)}
                >
                  <option value="">Select…</option>
                  {PROJECT_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-xs text-red-500">{errors.projectType}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal">Timeline</label>
                <select
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-accent focus:ring-1 focus:ring-accent"
                  value={form.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                >
                  <option value="">Select…</option>
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rooms & Budget */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Rooms / Approx. Sqft (optional)"
                type="text"
                value={form.rooms}
                onChange={(v) => set("rooms", v)}
                placeholder='e.g. "3 rooms" or "~1,200 sqft"'
              />
              <div>
                <label className="block text-sm font-medium text-charcoal">
                  Budget Range (optional)
                </label>
                <select
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-accent focus:ring-1 focus:ring-accent"
                  value={form.budget}
                  onChange={(e) => set("budget", e.target.value)}
                >
                  <option value="">Select…</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-charcoal">
                Project Description
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-accent focus:ring-1 focus:ring-accent"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Tell us about your project…"
              />
            </div>

            {/* Preferred contact */}
            <fieldset>
              <legend className="text-sm font-medium text-charcoal">
                Preferred Contact Method
              </legend>
              <div className="mt-2 flex gap-4">
                {CONTACT_METHODS.map((m) => (
                  <label key={m} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="preferredContact"
                      className="text-accent focus:ring-accent"
                      checked={form.preferredContact === m}
                      onChange={() => set("preferredContact", m)}
                    />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Error message */}
            {status === "error" && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-accent-dark disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Submit Estimate Request"}
            </button>

            <p className="text-center text-xs text-gray-400">
              We respond within a few hours. Your information is never shared.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal">{label}</label>
      <input
        type={type}
        className={`mt-1 block w-full rounded-lg border ${
          error ? "border-red-400" : "border-gray-200"
        } bg-white px-3 py-2.5 text-sm shadow-sm focus:border-accent focus:ring-1 focus:ring-accent`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
