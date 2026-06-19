"use client";
import { assets } from "@/public/assets/asset";
import Image from "next/image";
import { useState } from "react";

type Selected = "Home" | "About" | "Orders" | "Contact";
function Navbar() {
  const [selected, setSelected] = useState<Selected>();

  const handleButtonClick = (item: Selected) => {
    console.log(item);
    setSelected(item);
  };
  return (
    <div className="flex flex-row justify-between items-center p-3 lg:p-6 mx-auto max-w-[1544px] border-primary border">
      <h1 className="text-2xl font-extrabold">Danori</h1>

      <div className="flex  lg:w-[60%] border flex-row justify-between items-center gap-2">
        <ul className="flex flex-row items-center gap-7  text-base lg:text-lg font-normal">
          <li
            onClick={() => handleButtonClick("Home")}
            className={`${selected === "Home" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            Home
          </li>
          <li
            onClick={() => handleButtonClick("About")}
            className={`${selected === "About" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            About Us
          </li>
          <li
            onClick={() => handleButtonClick("Orders")}
            className={`${selected === "Orders" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            Orders
          </li>

          <li
            onClick={() => handleButtonClick("Contact")}
            className={`${selected === "Contact" ? "bg-primary text-white" : ""} cursor-pointer lg:px-6 rounded-3xl py-1`}
          >
            Contact
          </li>
        </ul>

        <button className="flex flex-row gap-3 bg-banner px-3 rounded-full justify-center items-center h-9 lg:h-[61px] lg:w-[234px] border">
          <Image
            src={assets.maleAvatar}
            alt="Male Avatar"
            width={30}
            height={30}
          />

          <p className="text-background text-lg font-normal">Login/Signup</p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
