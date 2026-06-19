"use client";
import { assets } from "@/public/assets/asset";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

type Selected = "home" | "about" | "orders" | "contact";
function Navbar() {
  const [selected, setSelected] = useState<Selected>();
  const router = useRouter();

  const handleButtonClick = (item: Selected) => {
    console.log(item);
    setSelected(item);
    router.push(item);
  };
  return (
    <div className="flex flex-row justify-between items-center p-3 lg:p-6 mx-auto max-w-[1544px] border-primary border">
      <h1 className="text-2xl font-extrabold">Danori</h1>

      {/* Desktop View */}
      <div className="flex  lg:w-[60%] border flex-row justify-between items-center gap-2">
        <ul className="flex flex-row items-center gap-7  text-base lg:text-lg font-normal">
          <li
            onClick={() => handleButtonClick("home")}
            className={`${selected === "home" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            Home
          </li>
          <li
            onClick={() => handleButtonClick("about")}
            className={`${selected === "about" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            About Us
          </li>
          <li
            onClick={() => handleButtonClick("orders")}
            className={`${selected === "orders" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            Orders
          </li>

          <li
            onClick={() => handleButtonClick("contact")}
            className={`${selected === "contact" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            Contact
          </li>
        </ul>

        <button className=" hidden sm:flex flex-row gap-3 bg-banner px-3 rounded-full justify-center items-center h-9 lg:h-[61px] lg:w-[234px] border">
          <Image
            src={assets.maleAvatar}
            alt="Male Avatar"
            width={30}
            height={30}
          />

          <p className="text-background text-lg font-normal">Login/Signup</p>
        </button>
      </div>

      {/* Mobile View */}
    </div>
  );
}

export default Navbar;
