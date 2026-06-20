import BuyNowPage from "@/components/BuyNowPage";
import { fetchAddresses } from "@/utils/actions/address.action";
import { fetchProductsById } from "@/utils/actions/product.action";
import React from "react";

async function BuyNow({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const products = await fetchProductsById(productId);

  const addresses = await fetchAddresses();
  return <BuyNowPage product={products!} addresses={addresses} />;
}

export default BuyNow;
