import BuyNowPage from "@/components/BuyNowPage";
import { fetchProductsById } from "@/utils/actions/product.action";
import React from "react";

async function BuyNow({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const products = await fetchProductsById(productId);
  return <BuyNowPage product={products!} />;
}

export default BuyNow;
