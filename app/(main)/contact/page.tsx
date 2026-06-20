import { assets } from "@/public/assets/asset";
import Image from "next/image";

export default function Page() {
  return (
    <section className="px-3 py-6 lg:px-16 lg:py-10">
      <div className="overflow-hidden rounded-[16px] border border-banner/8 bg-white shadow-[0_22px_70px_rgba(3,8,31,0.08)]">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[340px] border-b-4 border-primary lg:min-h-[720px] lg:border-b-0 lg:border-r-4">
            <Image
              src={assets.contactUs}
              alt="Contact Danori"
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,31,0.08),rgba(3,8,31,0.42))]" /> */}
            {/* <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                Contact Danori
              </p>
              <h2 className="mt-3 max-w-sm text-3xl font-extrabold tracking-tight">
                Reach the team behind your next order.
              </h2>
            </div> */}
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
            {/* <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Message form
            </p> */}
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-banner sm:text-5xl">
              Tell us what you
              <span className="block text-primary underline decoration-primary/65 underline-offset-10">
                need.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/65 sm:text-base">
              If you have a question about an order, pickup, delivery, or a
              business enquiry, send it here and the Danori team can follow up.
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
                    className="h-14 w-full rounded-[12px] border border-banner/12 bg-[#f8f8f8] px-5 text-base font-medium text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-banner">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-[12px] border border-banner/12 bg-[#f8f8f8] px-5 text-base font-medium text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
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
                  className="h-14 w-full rounded-[12px] border border-banner/12 bg-[#f8f8f8] px-5 text-base font-medium text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-banner">
                  Message
                </span>
                <textarea
                  rows={6}
                  placeholder="Tell us how we can help"
                  className="w-full rounded-[12px] border border-banner/12 bg-[#f8f8f8] px-5 py-4 text-base text-banner outline-none placeholder:text-foreground/30 focus:border-primary"
                />
              </label>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-foreground/60">
                  We typically respond within one business day.
                </p>

                <button
                  type="button"
                  className="inline-flex h-14 items-center justify-center rounded-[16px] bg-primary px-8 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
