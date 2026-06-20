"use client";

import NewAddress from "@/components/NewAddress";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/public/assets/asset";
import { AddressParams, ProductParams } from "@/shared.types";
import { makeDefaultAddress } from "@/utils/actions/address.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const orderTypes = ["Delivery", "Pickup"] as const;

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function BuyNowPage({
  product,
  addresses,
}: {
  product: ProductParams;
  addresses: AddressParams[];
}) {
  const { session } = useAppContext();
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedOrderType, setSelectedOrderType] =
    useState<(typeof orderTypes)[number]>("Delivery");
  const [quantity, setQuantity] = useState(1);
  const [updatingAddressId, setUpdatingAddressId] = useState("");

  const primaryImage = product.image_url_array[0] || assets.regularBurger;
  const unitPrice =
    product.offer_price > 0 && product.offer_price < product.price
      ? product.offer_price
      : product.price;
  const subtotal = unitPrice * quantity;
  const shippingFee =
    selectedOrderType === "Pickup" ? 0 : product.product_shipping_fee;
  const total = subtotal + shippingFee;
  const router = useRouter();
  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId,
  );

  const decreaseQuantity = () =>
    setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  const handleSelectAddress = async (address: AddressParams) => {
    setSelectedAddressId(address.id);

    if (address.is_default) {
      return;
    }

    setUpdatingAddressId(address.id);

    const wasUpdated = await makeDefaultAddress(address.id);

    if (!wasUpdated) {
      toast.error("Could not update default address");
      setUpdatingAddressId("");
      return;
    }

    setUpdatingAddressId("");
    router.refresh();
  };

  const payNow = async () => {
    if (!session?.user.email || !session.user.id) {
      toast.error("Please sign in to continue");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user.email,
          amount: total * 100,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to start payment");
      }

      const payStackResult = await response.json();

      localStorage.setItem(
        "paymentInformation",
        JSON.stringify({
          userId: session.user.id,
          amount: total,
          userEmail: session.user.email,
          productName: product.name,
          quantity,
          productCategory: product.categories.name,
          image: primaryImage,
          fullAddressFields: selectedAddress,
          orderType: selectedOrderType,
        }),
      );

      router.push(payStackResult.data.authorization_url);
    } catch (error) {
      console.log("err", error);
      toast.error("Payment failed. Please try again");
    } finally {
      console.log("Payment Processed");
    }
  };

  useEffect(() => {
    localStorage.removeItem("paymentInformation");
  }, []);

  useEffect(() => {
    if (addresses.length === 0) {
      setSelectedAddressId("");
      return;
    }

    setSelectedAddressId((current) => {
      if (current && addresses.some((address) => address.id === current)) {
        return current;
      }

      const defaultAddress =
        addresses.find((address) => address.is_default) ?? addresses[0];

      return defaultAddress?.id ?? "";
    });
  }, [addresses]);

  return (
    <section className="space-y-6 px-2 py-4 lg:px-6 lg:py-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-banner lg:text-4xl">
          Secure Checkout
        </h2>
        <div className="mt-4 h-px w-full bg-banner/20" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.82fr)] xl:items-start">
        <div className="space-y-8">
          <section className=" p-4  sm:p-6">
            <div className="flex items-center gap-3">
              <Image
                src={assets.orangeLocation}
                height={28}
                width={28}
                alt="delivery icon"
              />
              <h3 className="text-2xl font-extrabold text-banner">
                Delivery address
              </h3>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {addresses.map((address) => {
                const isActive = selectedAddressId === address.id;
                const isUpdating = updatingAddressId === address.id;

                return (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => void handleSelectAddress(address)}
                    disabled={isUpdating}
                    className={`rounded-[12px] border p-6 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-80 ${isActive ? "border-primary bg-primary text-white " : "border-primary border-dashed bg-white text-foreground hover:border-primary/60"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            isActive ? assets.location : assets.orangeLocation
                          }
                          height={24}
                          width={24}
                          alt="address pin"
                        />
                        <p className="text-lg font-semibold">
                          {address.title || "Address"}
                        </p>
                      </div>

                      {address.is_default && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive ? "bg-white/18 text-white" : "bg-primary/10 text-primary"}`}
                        >
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-5 text-base leading-8">
                      {address.address}
                    </p>
                    <p
                      className={`mt-2 text-sm ${isActive ? "text-white/80" : "text-foreground/55"}`}
                    >
                      {[address.city, address.state, address.region]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {isUpdating && (
                      <p
                        className={`mt-3 text-xs font-semibold ${isActive ? "text-white/85" : "text-primary"}`}
                      >
                        Updating default...
                      </p>
                    )}
                  </button>
                );
              })}

              <NewAddress triggerVariant="card" />
            </div>
          </section>

          <section className=" p-4  sm:p-6">
            <div className="flex items-center gap-3">
              <Image
                src={assets.orangeLocation}
                height={28}
                width={28}
                alt="order type icon"
              />
              <h3 className="text-2xl font-extrabold text-banner">
                Type of Order
              </h3>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {orderTypes.map((type) => {
                const isActive = selectedOrderType === type;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedOrderType(type)}
                    className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-base font-semibold transition-colors ${isActive ? "border-primary bg-primary text-white" : "border-primary border-dashed bg-white text-foreground hover:border-primary/60"}`}
                  >
                    <Image
                      src={assets.clockIcon}
                      height={22}
                      width={22}
                      alt="order type"
                      className={isActive ? "brightness-0 invert" : ""}
                    />
                    {type}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="rounded-[10px] bg-[#f8f8f8] p-4 sm:p-6 xl:sticky xl:top-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-extrabold text-banner">Cart</h3>
            <p className="text-lg font-semibold text-banner">
              {quantity} Item{quantity > 1 ? "s" : ""}
            </p>
          </div>

          <div className="mt-6 rounded-[12px] p-4">
            <p className="text-sm text-foreground/55">
              from{" "}
              <span className="font-semibold text-primary">
                {product.brand || product.categories.name}
              </span>
            </p>

            <div className="mt-4 flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#fff7ed]">
                <Image
                  src={primaryImage}
                  alt={`${product.name} image`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold leading-7 text-banner">
                  {product.name}
                </p>
                <p className="mt-1 text-sm text-foreground/55">
                  {product.categories.name}
                </p>
                <p className="mt-3 text-2xl font-bold text-primary">
                  {currencyFormatter.format(unitPrice)}
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-full border border-banner/10 px-3 py-2 text-xl text-banner">
                <button type="button" onClick={decreaseQuantity}>
                  -
                </button>
                <span className="min-w-4 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <button type="button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[12px] p-5 ">
            <h4 className="text-lg font-semibold text-banner">Bill details</h4>

            <div className="mt-5 space-y-4 text-base text-foreground/70">
              <div className="flex items-center justify-between gap-4">
                <span>Item Total</span>
                <span className="font-semibold text-banner">
                  {currencyFormatter.format(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Delivery Fee</span>
                <span className="font-semibold text-banner">
                  {shippingFee > 0
                    ? currencyFormatter.format(shippingFee)
                    : "Free"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Order Type</span>
                <span className="font-semibold text-banner">
                  {selectedOrderType}
                </span>
              </div>
            </div>

            <div className="mt-5 h-px w-full bg-banner/10" />

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-lg font-semibold text-banner">To Pay</span>
              <span className="text-2xl font-extrabold text-primary">
                {currencyFormatter.format(total)}
              </span>
            </div>

            <button
              onClick={payNow}
              type="button"
              className="mt-6 h-14 w-full rounded-[10px] bg-primary text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Proceed to payment
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default BuyNowPage;
