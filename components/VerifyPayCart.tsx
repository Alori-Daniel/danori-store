"use client";
import { assets } from "@/public/assets/asset";
import { createOrder } from "@/utils/actions/order.action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import toast from "react-hot-toast";

export const VerifyPayCart = ({
  reference,
  amount,
  email,
}: {
  reference: string;
  amount: number;
  email: string;
}) => {
  const router = useRouter();
  useEffect(() => {
    const paymentInfo = JSON.parse(
      localStorage.getItem("paymentInformation") || "{}",
    );
    if (
      paymentInfo.amount !== amount / 100 ||
      paymentInfo.userEmail !== email
    ) {
      toast.error("Payment Verification Error");
      return;
    } else {
      toast.success("Payment Verified Successfully");

      console.log("payment info", paymentInfo);

      const makeOrder = async () => {
        for (const eachItem of paymentInfo.cartItems) {
          const orderItem = {
            user_id: paymentInfo.userId,
            amount: paymentInfo.amount,
            user_email: paymentInfo.userEmail,
            productName: eachItem.name,
            quantity: eachItem.quantity,
            productCategory: eachItem.categories.name,
            productImage: eachItem.image_url_array[0],
            address: paymentInfo.fullAddressFields,
            paymentReference: reference,
            type: paymentInfo.orderType,
          };

          console.log("Make Order", orderItem);

          await createOrder(orderItem);

          router.replace(`/orders`);
        }
      };

      makeOrder();
    }
  });
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-[12px] border border-banner/8 bg-white px-6 py-10 text-center shadow-[0_22px_60px_rgba(3,8,31,0.10)] sm:px-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Image
            src={assets.shoppingCart}
            alt="Cart payment verification"
            width={38}
            height={38}
          />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-banner">
          Verifying Cart Payment
        </h1>
        <p className="mt-3 text-sm leading-7 text-foreground/65">
          We are confirming your cart payment and syncing your orders now.
        </p>

        <div className="mt-8 grid gap-4 ">
          <div className=" flex flex-row items-center justify-between rounded-[18px] bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Reference
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-banner">
              {reference}
            </p>
          </div>

          <div className=" flex flex-row items-center justify-between rounded-[18px] bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Amount
            </p>
            <p className="mt-2 text-sm font-semibold text-banner">
              ₦{(amount / 100).toLocaleString("en-NG")}
            </p>
          </div>

          <div className=" flex flex-row items-center justify-between rounded-[18px] bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Customer
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-banner">
              {email}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70 animate-pulse [animation-delay:120ms]" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/45 animate-pulse [animation-delay:240ms]" />
        </div>

        <Link
          href="/orders"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-[16px] bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          Go to orders
        </Link>
      </div>
    </section>
  );
};
