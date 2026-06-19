import Navbar from "@/components/Navbar";
import React from "react";

function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1544px] mx-auto p-1 ">{children}</div>
    </div>
  );
}

export default Mainlayout;
