"use client";
import { assets } from "@/public/assets/asset";
import { ProductParams } from "@/shared.types";
import { cartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function titleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function ProductDetails({ item }: { item: ProductParams }) {
  const productImages =
    item.image_url_array.length > 0
      ? item.image_url_array
      : [assets.regularBurger];
  const primaryImage = productImages[0];
  const displayPrice =
    item.offer_price > 0 && item.offer_price < item.price
      ? item.offer_price
      : item.price;
  const hasSalePrice = displayPrice !== item.price;
  const stockLabel =
    item.quantity > 0 ? `${item.quantity} available` : "Out of stock";
  const infoItems = [
    { label: "Brand", value: item.brand || "Danori" },
    { label: "Category", value: item.categories.name },
    { label: "Location", value: item.location || "Nigeria" },
  ];

  const handleAddToCart = () => {
    const addItem = cartStore.getState().addItem;

    addItem(item);
    toast.success("Added to cart");
  };
  return (
    <section className="mx-auto max-w-[1544px] px-3 py-6 lg:px-16 lg:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span>{item.categories.name}</span>
        <span>/</span>
        <span className="text-foreground">{item.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-[28px] bg-white/75">
            <Image
              src={primaryImage}
              alt={`${item.name} image`}
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="ml-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {productImages.slice(0, 5).map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-white p-2 ${index === 0 ? "border-primary " : "border-primary/10"}`}
              >
                <Image
                  src={image}
                  alt={`${item.name} preview ${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {item.categories.name}
            </span>
            <span className="rounded-full border border-banner/10 bg-banner/5 px-4 py-2 text-sm font-medium text-banner">
              {titleCase(item.status || "available")}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-banner sm:text-4xl lg:text-5xl">
            {item.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((star) => (
                <Image
                  key={star}
                  src={assets.starIcon}
                  alt="star icon"
                  width={16}
                  height={16}
                />
              ))}
            </div>
            <span>{stockLabel}</span>
            <span className="hidden sm:inline">•</span>
            <span>{item.brand || "Danori"}</span>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/75 sm:text-lg">
            {item.description}
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-extrabold text-banner sm:text-4xl">
              {currencyFormatter.format(displayPrice)}
            </p>

            {/* {hasSalePrice ? (
              <div className="pb-2">
                <p className="text-lg text-foreground/40 line-through">
                  {currencyFormatter.format(item.price)}
                </p>
                <p className="text-sm font-semibold text-primary">
                  Save {currencyFormatter.format(item.price - displayPrice)}
                </p>
              </div>
            ) : null} */}
          </div>

          <div className="mt-8 h-px w-full bg-banner/10" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {infoItems.map((info) => (
              <div
                key={info.label}
                className="rounded-2xl border-banner/8 bg-white px-4 py-4"
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/40">
                  {info.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-banner">
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          {item.product_comment ? (
            <div className="mt-8 rounded-[28px] border border-primary/10 bg-[linear-gradient(135deg,#fff8ef_0%,#ffffff_100%)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                Product Note
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/75">
                {item.product_comment}
              </p>
            </div>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              onClick={handleAddToCart}
              type="button"
              className="rounded-2xl border border-banner/15 bg-white px-6 py-4 text-base font-semibold text-banner transition-transform duration-200 hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
            <Link
              href={`/buy-now/${item.id}`}
              className="rounded-2xl bg-banner px-6 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(3,8,31,0.16)] text-center transition-transform duration-200 hover:-translate-y-0.5"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
