"use client";

import { assets } from "@/public/assets/asset";
import { ProductParams } from "@/shared.types";
import { cartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface ProductProp {
  product: ProductParams;
}

function ProductItem(product: ProductProp) {
  const { product: productItem } = product;

  const handleAddToCart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    cartStore.getState().addItem(productItem);

    toast.success("Added to Cart");
  };

  return (
    <Link
      href={`/product/${productItem.id}`}
      className="flex relative flex-row gap-2 max-w-[496px] py-1 sm:py-3 bg-white shadow-[0_0_25px_rgba(0,0,0,0.12)] lg:py-6 px-1 sm:px-3 lg:px-6 rounded-xl"
    >
      <div className="flex-1 flex flex-col  justify-between pt-0">
        <h2 className="text-lg font-bold">{productItem.name}</h2>

        {/* <p>{productItem.description}</p> */}

        <h1 className="font-bold text-lg">₦{productItem.price}</h1>
      </div>

      <div className="flex-1">
        <Image
          src={productItem.image_url_array[0]}
          height={199}
          width={203}
          className="h-full w-full"
          alt={`${productItem.name} image`}
        />
      </div>
      <div
        onClick={handleAddToCart}
        className="absolute flex cursor-pointer flex-row items-center justify-center bottom-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-white/80 rounded-tl-[40px] lg:rounded-tl-[45px]"
      >
        <Image src={assets.plusIcon} height={39} width={39} alt="plus icon" />
      </div>
    </Link>
  );
}

export default ProductItem;
