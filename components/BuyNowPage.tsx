"use client";

import { useAppContext } from "@/context/AppContext";
import { assets } from "@/public/assets/asset";
import { AddressParams, ProductParams } from "@/shared.types";
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

const dummyAddresses = [
  {
    id: "home",
    title: "Home",
    address: "Dno. 12-34-12, XYC Apartments, Door Colony, Hyderabad, Telangana",
  },
  {
    id: "office",
    title: "Office",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  },
] as const;

function BuyNowPage({
  product,
  addresses,
}: {
  product: ProductParams;
  addresses: AddressParams[];
}) {
  const { session, setSession } = useAppContext();
  const [userAddresses, setUserAddresses] = useState<AddressParams[]>();
  const [selectedAddress, setSelectedAddress] = useState<AddressParams>();
  const [selectedOrderType, setSelectedOrderType] =
    useState<(typeof orderTypes)[number]>("Delivery");
  const [quantity, setQuantity] = useState(1);

  const primaryImage = product.image_url_array[0] || assets.regularBurger;
  const unitPrice =
    product.offer_price > 0 && product.offer_price < product.price
      ? product.offer_price
      : product.price;
  const subtotal = unitPrice * quantity;
  const shippingFee = product.product_shipping_fee;
  const total = subtotal + shippingFee;
  const router = useRouter();

  const decreaseQuantity = () =>
    setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  const payNow = async () => {
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
      const payStackResult = await response.json();
      if (response.status) {
        localStorage.setItem(
          "paymentInformation",
          JSON.stringify({
            amount: total,
            userEmail: session?.user.email,
          }),
        );
        router.push(payStackResult.data.authorization_url);
      }
    } catch (error) {
      console.log("err", error);
      toast.error("Payment failed. Please try again");
    } finally {
      console.log("Payment Processed");
    }
  };
  useEffect(() => {
    localStorage.removeItem("paymentInformation");
    if (addresses) {
      setUserAddresses(addresses);
      const defaultAddress = addresses.filter((eachAddress) => {
        return eachAddress.is_default === true;
      });
      setSelectedAddress(defaultAddress[0]);
    }
  }, [product.price, userAddresses, addresses]);

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
              {addresses.map((address, index) => {
                const isActive = selectedAddress === address;

                // console.log("assredd", address);

                return (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => setSelectedAddress(address)}
                    className={`rounded-[12px] border p-6 text-left transition-colors ${isActive ? "border-primary bg-primary text-white " : "border-primary border-dashed bg-white text-foreground hover:border-primary/60"}`}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={isActive ? assets.location : assets.orangeLocation}
                        height={24}
                        width={24}
                        alt="address pin"
                      />
                      <p className="text-lg font-semibold">{address.title}</p>
                    </div>
                    <p className="mt-5 text-base leading-8">
                      {address.address}
                    </p>
                  </button>
                );
              })}

              <button
                type="button"
                className="flex min-h-[60px] flex-col items-center justify-center  bg-white p-0 text-center text-primary "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary border-dashed">
                  <Image
                    src={assets.plusIcon}
                    height={28}
                    width={28}
                    alt="add address"
                  />
                </div>
                <p className="mt-1 text-lg font-semibold">Add new address</p>
              </button>
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
