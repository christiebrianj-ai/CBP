import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later or call us directly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    // Pretend success to bots
    return NextResponse.json({ message: "Thank you!" });
  }

  // Server-side validation
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Name, phone, and email are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Save to DB
  try {
    insertLead({
      name,
      phone,
      email,
      address: String(body.address ?? ""),
      project_type: String(body.projectType ?? ""),
      service_types: Array.isArray(body.serviceTypes)
        ? (body.serviceTypes as string[]).join(", ")
        : "",
      rooms: String(body.rooms ?? ""),
      timeline: String(body.timeline ?? ""),
      budget: String(body.budget ?? ""),
      description: String(body.description ?? ""),
      preferred_contact: String(body.preferredContact ?? ""),
      photo_urls: "",
    });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { error: "Server error. Please call us directly." },
      { status: 500 },
    );
  }

  // Email notification (best-effort; doesn't block response)
  sendNotificationEmail({ name, phone, email, body }).catch(console.error);

  return NextResponse.json({
    message:
      "Thank you! We received your estimate request and will be in touch within a few hours.",
  });
}

async function sendNotificationEmail({
  name,
  phone,
  email,
  body,
}: {
  name: string;
  phone: string;
  email: string;
  body: Record<string, unknown>;
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !notificationEmail) {
    console.log("SMTP not configured — skipping email notification.");
    console.log("New lead:", { name, phone, email, ...body });
    return;
  }

  // Dynamic import to keep bundle small when SMTP isn't configured
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpUser,
      to: notificationEmail,
      subject: `New Estimate Request from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Address: ${body.address ?? "N/A"}`,
        `Project: ${body.projectType ?? "N/A"}`,
        `Services: ${Array.isArray(body.serviceTypes) ? (body.serviceTypes as string[]).join(", ") : "N/A"}`,
        `Rooms: ${body.rooms ?? "N/A"}`,
        `Timeline: ${body.timeline ?? "N/A"}`,
        `Budget: ${body.budget ?? "N/A"}`,
        `Preferred contact: ${body.preferredContact ?? "N/A"}`,
        `Description:\n${body.description ?? "N/A"}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send notification email:", err);
  }
}
