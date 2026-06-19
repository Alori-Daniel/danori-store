import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";
import { fetchProductsById } from "@/utils/actions/product.action";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductsById(id);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetails item={product} />
  );
}
