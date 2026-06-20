import { assets } from "@/public/assets/asset";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "Fast by design",
    copy:
      "From kitchen prep to final dispatch, every part of the Danori flow is built to keep wait time short and quality high.",
  },
  {
    title: "Comfort-led menu",
    copy:
      "We focus on food people actually come back for: bold burgers, familiar sides, easy drinks, and crowd-pleasing bundles.",
  },
  {
    title: "Local rhythm",
    copy:
      "Danori is shaped around everyday city cravings: late lunches, quick dinners, shared platters, and convenient pickup.",
  },
];

const stats = [
  { value: "4.9", label: "Average rating" },
  { value: "20m", label: "Typical delivery window" },
  { value: "7 days", label: "Weekly availability" },
  { value: "Fresh", label: "Made-to-order kitchen" },
];

export default function Page() {
  return (
    <section className="space-y-8 px-3 py-6 lg:px-16 lg:py-10">
      <div className="relative overflow-hidden rounded-[32px] bg-banner px-6 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,138,6,0.24),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_48%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
              About Danori
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Food that feels quick, warm, and worth repeating.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Danori blends the speed of modern food delivery with the feel of
              a familiar neighborhood spot. We keep the menu focused, the
              flavors direct, and the experience easy from first click to final
              bite.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Talk to our team
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Browse menu
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
            <div className="absolute -right-3 bottom-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
              <Image
                src={assets.platterBurger}
                alt="Danori food platter"
                width={580}
                height={361}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] border border-banner/10 bg-white px-5 py-6 shadow-[0_12px_40px_rgba(3,8,31,0.05)]"
          >
            <p className="text-3xl font-extrabold text-banner">{stat.value}</p>
            <p className="mt-2 text-sm text-foreground/65">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[30px] bg-[#fff6eb] px-6 py-8 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Our Story
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-banner">
            Built for the everyday craving.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-8 text-foreground/75 sm:text-base">
            <p>
              Danori started with a simple idea: food ordering should feel
              clear, fast, and satisfying without forcing people through a noisy
              menu or a complicated checkout.
            </p>
            <p>
              That is why the experience stays intentionally direct. Clear
              categories, recognizable items, practical bundles, and checkout
              flows that help users move from product to payment with less
              friction.
            </p>
            <p>
              We are not trying to be everything at once. We are building a
              dependable food brand people can return to when they want speed,
              flavor, and consistency.
            </p>
          </div>
        </div>

        <div className="rounded-[30px] bg-white px-6 py-8 shadow-[0_18px_60px_rgba(3,8,31,0.06)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            What matters here
          </p>
          <div className="mt-6 grid gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-[24px] border border-banner/8 px-5 py-5"
              >
                <h3 className="text-xl font-extrabold text-banner">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/70">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-banner px-6 py-8 text-white sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Looking ahead
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              We are shaping Danori into a food experience that stays simple as
              it grows.
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Contact Danori
          </Link>
        </div>
      </div>
    </section>
  );
}
