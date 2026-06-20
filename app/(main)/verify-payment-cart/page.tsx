import { VerifyPay } from "@/components/VerifyPay";
import { VerifyPayCart } from "@/components/VerifyPayCart";
import { checkOrder } from "@/utils/actions/order.action";
import { redirect } from "next/navigation";

export default async function VerifyPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  console.log("param", searchParams);

  const { reference } = await searchParams;

  const orderExist = await checkOrder(reference);

  if (orderExist && orderExist.length > 0) {
    redirect("/");
  }

  const response = await fetch(
    `http://localhost:3000/api/verifyPayment/${reference}`,
  );

  const result = await response.json();
  console.log("Payment Verification Result:", result);

  return (
    <VerifyPayCart
      reference={reference}
      amount={result.data.amount}
      email={result.data.customer.email}
    />
  );
}
