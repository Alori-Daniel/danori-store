"use client";
import { assets } from "@/public/assets/asset";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  key: "home" | "about" | "orders" | "contact";
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About Us", href: "/about", key: "about" },
  { label: "Orders", href: "/orders", key: "orders" },
  { label: "Contact", href: "/contact", key: "contact" },
];

function Navbar({ user }: User | null) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  console.log("user", user);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleButtonClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };
  return (
    <div className="relative flex flex-row justify-between items-center lg:px-16 p-3 lg:p-6 mx-auto max-w-[1544px] border-primary ">
      <h1 className="text-2xl font-extrabold">Danori</h1>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:w-[60%]  flex-row justify-between items-center gap-2">
        <ul className="flex flex-row items-center gap-7  text-base lg:text-lg font-normal">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li
                key={item.key}
                onClick={() => handleButtonClick(item.href)}
                className={`${isActive ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
              >
                {item.label}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-row gap-2">
          <Image
            src={assets.shoppingCart}
            alt="shoppingCart"
            width={30}
            height={30}
          />
          <p>hello {user?.email}</p>
          <Link
            href={"/login"}
            className=" hidden sm:flex flex-row gap-3 bg-banner px-3 rounded-full justify-center items-center h-9 lg:h-[61px] lg:w-[234px] border"
          >
            <Image
              src={assets.maleAvatar}
              alt="Male Avatar"
              width={30}
              height={30}
            />

            <p className="text-background lg:text-lg text-base font-normal">
              Login/Signup
            </p>
          </Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          aria-label="Open cart"
          className="flex h-11 w-11 items-center justify-center "
        >
          <Image
            src={assets.shoppingCart}
            alt="shoppingCart"
            width={24}
            height={24}
          />
        </button>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative flex h-11 w-11 items-center justify-center "
        >
          <span
            className={`absolute h-0.5 w-5 bg-banner transition-transform duration-200 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-banner transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-banner transition-transform duration-200 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-banner/30 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
        />

        <div
          id="mobile-nav"
          className={`absolute right-0 top-0 flex h-full w-[min(84vw,360px)] flex-col bg-background px-5 pb-6 pt-5 shadow-[-18px_0_50px_rgba(3,8,31,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span className="absolute h-0.5 w-5 rotate-45 bg-banner" />
              <span className="absolute h-0.5 w-5 -rotate-45 bg-banner" />
            </button>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-base font-normal">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <li
                  key={item.key}
                  className={`transition-[transform,opacity] duration-300 ease-out ${isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
                  style={{
                    transitionDelay: isOpen ? `${80 + index * 45}ms` : "0ms",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleButtonClick(item.href)}
                    className={`${isActive ? " text-primary " : "text-foreground"} flex w-full justify-center items-center  rounded-2xl px-4 py-3 text-center`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <Link
            href={"/login"}
            type="button"
            className={`mt-auto flex w-full flex-row items-center justify-center gap-3 rounded-full bg-banner px-3 py-3 transition-[transform,opacity] duration-300 ease-out ${isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
            style={{ transitionDelay: isOpen ? "260ms" : "0ms" }}
          >
            <Image
              src={assets.maleAvatar}
              alt="Male Avatar"
              width={30}
              height={30}
            />

            <p className="text-background text-base font-normal">
              Login/Signup
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
