"use client";
import { assets } from "@/public/assets/asset";
import { ProductParams } from "@/shared.types";
import Image from "next/image";
import React from "react";

function BuyNowPage({ product }: { product: ProductParams }) {
  const dummyAddress = [
    {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  ];
  return (
    <div>
      <h2 className="font-bold text-lg">Secure Checkout</h2>
      <hr className="border-banner mt-2" />

      <div className="flex flex-row flex-1">
        <div className="border">
          {/* Delivery */}
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-2">
              <Image
                src={assets.orangeLocation}
                height={20}
                width={20}
                alt="image-icon"
              />
              <h2 className="font-bold text-lg">Delivery Address</h2>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <div className="h-[150px] w-[369px] border border-primary border-dashed rounded-lg"></div>

              <div className="h-20 w-20 flex flex-col items-center justify-center rounded-full border border-primary border-dashed">
                <Image
                  src={assets.plusIcon}
                  height={30}
                  width={30}
                  alt="plus"
                />
              </div>
            </div>
          </div>

          {/* order type */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <Image
                src={assets.orangeLocation}
                height={20}
                width={20}
                alt="image-icon"
              />
              <h2 className="font-bold text-lg">Type of Order</h2>
            </div>
            <div className="flex flex-row gap-3">
              <div className="h-[54px] w-[181px] border border-primary border-dashed rounded-lg">
                <p>Delivery</p>
              </div>
              <div className="h-[54px] w-[181px] border border-primary border-dashed rounded-lg">
                <p>PickUp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout */}
        <div className="flex-1 border">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}

export default BuyNowPage;
