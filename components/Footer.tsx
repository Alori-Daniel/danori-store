import { assets } from "@/public/assets/asset";
import Image from "next/image";
import React from "react";

const legalLinks = [
  { label: "Terms and conditions", href: "#" },
  // { label: "Privacy", href: "#" },
  // { label: "Cookies", href: "#" },
  // { label: "Modern Slavery Statement", href: "#" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "#" },
  // { label: "Terms", href: "#" },
  // { label: "Pricing", href: "#" },
  // { label: "Do not sell or share my personal information", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: assets.facebook },
  { label: "Instagram", href: "#", icon: assets.instagram },
  { label: "TikTok", href: "#", icon: assets.tikTok },
  { label: "Snapchat", href: "#", icon: assets.snapchat },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16">
      <div className="bg-[#f7f7f7]">
        <div className="mx-auto grid max-w-[1544px] gap-10 px-3 py-10 md:grid-cols-2 xl:grid-cols-[0.9fr_1.35fr_0.85fr] xl:gap-14 lg:px-16 lg:py-14">
          <div className="space-y-6 xl:pr-6">
            <div className="flex items-end gap-2">
              <h2 className="text-5xl font-black tracking-[-0.06em] text-banner sm:text-6xl">
                Danori
              </h2>
              <span className="mb-2 inline-flex h-10 items-center rounded-md bg-black px-2 text-lg font-black uppercase tracking-[-0.04em] text-white">
                NG
              </span>
            </div>

            <p className="max-w-sm text-base leading-7 text-foreground/75">.</p>
          </div>

          <div className="space-y-6 xl:px-4">
            <div>
              <h3 className="text-2xl font-extrabold text-banner">
                Get Exclusive Deals in your Inbox
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/65">
                Early menu drops, weekly meal bundles, and subscribers-only
                promo codes. No noise.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="h-14 flex-1 rounded-full border border-transparent bg-white px-6 text-base text-banner outline-none placeholder:text-foreground/35 focus:border-primary"
              />
              <button
                type="button"
                className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </div>

            <p className="text-sm text-foreground/65">
              we wont spam, read our{" "}
              <a href="#" className="underline underline-offset-4">
                email policy
              </a>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 xl:col-span-1 xl:pl-6">
            <h3 className="text-2xl font-extrabold text-banner">Legal Pages</h3>
            <div className="mt-6 grid gap-5 text-base text-foreground/85 sm:grid-cols-2 xl:grid-cols-1">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="underline underline-offset-4 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-banner">
        <div className="mx-auto flex max-w-[1544px] flex-col gap-5 px-3 py-6 text-sm text-white/90 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <p>Danori Copyright {currentYear}, All Rights Reserved.</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
