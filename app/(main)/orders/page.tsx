//@ts-ignore
import UserOrders from "@/components/UserOrders";
import { fetchUserOrders } from "@/utils/actions/order.action";

export default async function Orders() {
  const userOrders = await fetchUserOrders();

  console.log("order", userOrders);

  return <UserOrders userOrders={userOrders} />;
}
