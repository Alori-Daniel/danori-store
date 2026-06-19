import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import React from "react";

async function Mainlayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  console.log("logged in user", user);
  return (
    <div>
      <Navbar user={user} />
      <div className="max-w-[1544px] mx-auto p-1 ">{children}</div>
      <Footer />
    </div>
  );
}

export default Mainlayout;
