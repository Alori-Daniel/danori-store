import Navbar from "@/components/Navbar";
import React from "react";

function Mainlayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Mainlayout;
