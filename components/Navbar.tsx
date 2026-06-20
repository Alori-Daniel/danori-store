"use client";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/public/assets/asset";
import { cartStore } from "@/store/cart-store";
import { signOut } from "@/utils/actions/userAuth.action";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

function Navbar() {
  const { session, setSession } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = session?.user ?? null;
  const email = user?.email ?? "";
  const displayName = email ? email.split("@")[0] : "Guest";
  const displayInitial = displayName.charAt(0).toUpperCase();
  const cart = cartStore((state) => state.items);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleButtonClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleSignOut = async () => {
    await signOut();

    setSession(null);
    setIsOpen(false);
    toast.success("Signed out");
    router.refresh();
  };

  return (
    <div
      className={`sticky top-0 z-50 mx-auto flex max-w-[1544px] flex-row items-center justify-between p-3 transition-all duration-300 ease-out lg:px-16 lg:py-6 ${
        isScrolled
          ? "mt-3 rounded-full  bg-white/95 shadow-[0_22px_60px_rgba(3,8,31,0.16)]"
          : "mt-0 rounded-none bg-background shadow-none"
      }`}
    >
      <div className="flex items-end gap-2">
        <h2 className="lg:text-5xl text-2xl font-black tracking-[-0.06em] text-banner sm:text-4xl">
          Danori
        </h2>
        <span className="mb-0 inline-flex h-7 px-1 sm:h-10 items-center rounded-md bg-black sm:px-2 text-lg font-black uppercase tracking-[-0.04em] text-white">
          NG
        </span>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex w-full xl:w-[70%] mx-2 xl:mx-0   flex-row justify-between items-center gap-2">
        <ul className="flex flex-row items-center gap-7   text-sm lg:text-lg font-normal">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li
                key={item.key}
                onClick={() => handleButtonClick(item.href)}
                className={`cursor-pointer rounded-3xl px-4 py-2 transition-[background-color,color,transform,box-shadow] duration-300 ease-out lg:px-6 ${
                  isActive
                    ? "bg-primary text-white "
                    : "text-banner hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {item.label}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-row gap-2 items-center">
          <Link href={"/cart"}>
            <div className=" relative">
              <Image
                src={assets.shoppingCart}
                alt="shoppingCart"
                width={30}
                height={30}
              />
              <div className="absolute -right-2 -top-2 h-5 w-5 flex flex-row items-center justify-center rounded-full bg-primary">
                {cart.length}
              </div>
            </div>
          </Link>
          {user ? (
            <div className="flex items-center gap-2  px-2 py-2 ">
              <div className="pr-1">
                <p className="max-w-[110px] truncate text-base font-semibold text-banner">
                  Hi,{displayName}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/18 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M7.5 3.75H5.83A2.08 2.08 0 0 0 3.75 5.83v8.34c0 1.15.93 2.08 2.08 2.08H7.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.67 6.67 15 10m0 0-3.33 3.33M15 10H7.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex items-center gap-3 lg:hidden">
        <Link
          href={"/cart"}
          type="button"
          aria-label="Open cart"
          className="flex h-11 w-11 items-center justify-center "
        >
          {/* <Image
            src={assets.shoppingCart}
            alt="shoppingCart"
            width={30}
            height={30}
          /> */}
          <div className=" relative">
            <Image
              src={assets.shoppingCart}
              alt="shoppingCart"
              width={30}
              height={30}
            />
            <div className="absolute -right-2 -top-2 h-5 w-5 flex flex-row items-center justify-center rounded-full bg-primary">
              {cart.length}
            </div>
          </div>
        </Link>

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

          {user ? (
            <div
              className={`mt-auto rounded-[16px] border border-banner/10 bg-banner px-4 py-5 text-white transition-[transform,opacity] duration-300 ease-out ${isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
              style={{ transitionDelay: isOpen ? "260ms" : "0ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">
                    Hi, {displayName}
                  </p>
                  {/* <p className="truncate text-sm text-white/70">{email}</p> */}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-primary"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M7.5 3.75H5.83A2.08 2.08 0 0 0 3.75 5.83v8.34c0 1.15.93 2.08 2.08 2.08H7.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.67 6.67 15 10m0 0-3.33 3.33M15 10H7.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              href={"/login"}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
