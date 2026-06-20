import UserOrders from "@/components/UserOrders";
import { fetchUserOrders } from "@/utils/actions/order.action";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Orders() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const userOrders = await fetchUserOrders();

  return <UserOrders userOrders={userOrders} />;
}
