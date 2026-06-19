"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { createClient } from "@/utils/supabase/server";
import React from "react";

function Mainlayout({ children }: { children: React.ReactNode }) {
  const { session, setSession } = useAppContext();
  // console.log(session);

  return (
    <div>
      <Navbar user={session?.user} />
      <div className="max-w-[1544px] mx-auto p-1 ">{children}</div>
      <Footer />
    </div>
  );
}

export default Mainlayout;
