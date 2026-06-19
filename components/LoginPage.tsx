import { assets } from "@/public/assets/asset";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <section className="px-3 py-8 lg:px-16 lg:py-12">
      <div className="mx-auto grid min-h-[620px] max-w-6xl overflow-hidden rounded-[32px] border border-primary/12 bg-white lg:grid-cols-[1.02fr_0.98fr]">
        <div className="hidden lg:flex relative  min-h-[280px] flex-col justify-end overflow-hidden rounded-[28px] bg-primary p-8 text-white lg:min-h-full lg:p-10">
          <Image
            src={assets.loginImage}
            alt="Login visual"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="w-full max-w-md">
            <div className="space-y-3 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold tracking-tight text-banner">
                Sign In
              </h2>
              <p className="text-sm leading-7 text-foreground/65 sm:text-base">
                No password needed. Enter your email and continue with your
                secure sign-in flow.
              </p>
            </div>

            <form className="mt-10 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold tracking-[0.18em] text-foreground/50"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="h-14 w-full rounded-2xl border border-banner/12 bg-[#fbfbfb] px-5 text-base text-banner outline-none transition-colors placeholder:text-foreground/30 focus:border-primary"
                />
              </div>

              {/* <div className="rounded-2xl border border-primary/14 bg-primary/5 px-4 py-4">
                <p className="text-sm leading-6 text-foreground/70">
                  We will only use your email to verify your account and send
                  your sign-in access.
                </p>
              </div> */}

              <button
                type="submit"
                className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
