export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Story */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Christie Brothers Painting is a family operation built on a simple idea: great painting
              should come with a great experience.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              My brother is the craftsman painter — meticulous prep, clean lines, and a keen eye for
              detail. I run operations and technology to make the experience smooth from your first
              estimate request to the final walkthrough.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Together, we combine old-school craftsmanship with modern communication. You&#39;ll
              always know what&#39;s happening, when we&#39;ll arrive, and exactly what the job will
              cost — no surprises.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Respect for Your Home", icon: "🏠" },
                { label: "Punctuality", icon: "⏰" },
                { label: "Clean Work Sites", icon: "✨" },
                { label: "Clear Estimates", icon: "📋" },
              ].map((v) => (
                <div key={v.label} className="text-center">
                  <div className="text-2xl">{v.icon}</div>
                  <div className="mt-1 text-xs font-medium text-gray-600">{v.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              How It Works
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                {
                  step: "1",
                  title: "Request an Estimate",
                  desc: "Fill out our form or give us a call. We respond within a few hours.",
                },
                {
                  step: "2",
                  title: "On-Site Walkthrough or Photo Quote",
                  desc: "We'll visit your home or review photos you send to provide an accurate, detailed estimate.",
                },
                {
                  step: "3",
                  title: "Schedule & Prep",
                  desc: "Pick a date that works for you. We handle all furniture protection and surface prep.",
                },
                {
                  step: "4",
                  title: "Paint, Clean & Final Walkthrough",
                  desc: "We paint, clean up completely, and walk through the finished project with you.",
                },
              ].map((s) => (
                <li key={s.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
