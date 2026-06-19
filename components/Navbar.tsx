"use client";
import { assets } from "@/public/assets/asset";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className="flex flex-row justify-between items-center p-3 lg:p-6 mx-auto max-w-[1544px] border-primary ">
      <h1 className="text-2xl font-extrabold">Danori</h1>

      {/* Desktop View */}
      <div className="flex  lg:w-[60%] border flex-row justify-between items-center gap-2">
        <ul className="hidden lg:flex flex-row items-center gap-7  text-base lg:text-lg font-normal">
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

        <button className=" hidden sm:flex flex-row gap-3 bg-banner px-3 rounded-full justify-center items-center h-9 lg:h-[61px] lg:w-[234px] border">
          <Image
            src={assets.maleAvatar}
            alt="Male Avatar"
            width={30}
            height={30}
          />

          <p className="text-background lg:text-lg text-base font-normal">
            Login/Signup
          </p>
        </button>
      </div>

      {/* Mobile View */}
    </div>
  );
}

export default Navbar;
