import { assets } from "@/public/assets/asset";
import Image from "next/image";
import Link from "next/link";

const contactCards = [
  {
    title: "Call us",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
    note: "For delivery support, pickup coordination, and urgent order issues.",
  },
  {
    title: "Send an email",
    value: "hello@danori.ng",
    href: "mailto:hello@danori.ng",
    note: "For partnerships, support follow-ups, and general enquiries.",
  },
  {
    title: "Visit us",
    value: "12 Admiralty Way, Lekki Phase 1, Lagos",
    href: "#",
    note: "Best for brand meetings, pickup questions, and local coordination.",
  },
  {
    title: "Opening hours",
    value: "Mon - Sun • 10:00 AM to 10:00 PM",
    href: "#",
    note: "Orders placed during open hours are handled fastest.",
  },
];

export default function Page() {
  return (
    <section className="space-y-8 px-3 py-6 lg:px-16 lg:py-10">
      <div className="relative overflow-hidden rounded-[32px] bg-banner px-6 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,138,6,0.24),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_48%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
              Contact Danori
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Reach the team behind your next order.
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
              If you need help with an order, want to ask about delivery zones,
              or just want to speak with the Danori team, this is the right
              place to start.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-sm text-white/85">
              <Image
                src={assets.contactInfo}
                alt="Contact info"
                width={20}
                height={20}
              />
              Typical response time: within one business day
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-5 transition-colors duration-200 hover:bg-white/12"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {card.title}
                  </p>
                  <p className="mt-3 text-lg font-bold text-white">
                    {card.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {card.note}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[30px] bg-[#fff6eb] px-6 py-8 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Before you send
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-banner">
            A few useful shortcuts.
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-[24px] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(3,8,31,0.05)]">
              <h3 className="text-lg font-bold text-banner">Order support</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                If your message is about an active order, include the order ID
                and the email used during checkout.
              </p>
            </div>
            <div className="rounded-[24px] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(3,8,31,0.05)]">
              <h3 className="text-lg font-bold text-banner">Business enquiries</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                For collaborations, catering, or partnerships, use the message
                form and add your company name plus objective.
              </p>
            </div>
            <div className="rounded-[24px] bg-white px-5 py-5 shadow-[0_12px_40px_rgba(3,8,31,0.05)]">
              <h3 className="text-lg font-bold text-banner">Pickup questions</h3>
              <p className="mt-2 text-sm leading-7 text-foreground/70">
                If you plan to pick up your order, mention the preferred time so
                the team can advise properly.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] bg-white px-6 py-8 shadow-[0_18px_60px_rgba(3,8,31,0.06)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Message form
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-banner">
            Tell us what you need.
          </h2>
          <p className="mt-3 text-sm leading-7 text-foreground/65">
            This is a static contact UI for now. When you are ready, it can be
            wired to email, Supabase, or a support inbox.
          </p>

          <form className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-banner">
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="h-14 w-full rounded-2xl border border-banner/12 bg-[#fbfbfb] px-5 text-base text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-banner">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-14 w-full rounded-2xl border border-banner/12 bg-[#fbfbfb] px-5 text-base text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-banner">
                Subject
              </span>
              <input
                type="text"
                placeholder="What is this about?"
                className="h-14 w-full rounded-2xl border border-banner/12 bg-[#fbfbfb] px-5 text-base text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-banner">
                Message
              </span>
              <textarea
                rows={6}
                placeholder="Tell us how we can help"
                className="w-full rounded-2xl border border-banner/12 bg-[#fbfbfb] px-5 py-4 text-base text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground/60">
                Prefer a faster route? Use the direct contact options above.
              </p>

              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-[30px] bg-banner px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Need something else?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Browse the menu or check your order status while you wait for a
              reply.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Browse menu
            </Link>
            <Link
              href="/orders"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/18 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              View orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
