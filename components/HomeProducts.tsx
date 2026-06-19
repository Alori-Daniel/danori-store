import { GroupedProductParams } from "@/shared.types";
import React from "react";
import ProductItem from "./ProductItem";

interface HomeProductsProps {
  group: GroupedProductParams;
}

function HomeProducts({ group }: HomeProductsProps) {
  const { name, products } = group;

  return (
    <section className="">
      <h2 className="lg:text-5xl sm:text-4xl text-3xl font-extrabold text-banner my-3 sm:my-5 lg:my-10">
        {name}
      </h2>

      <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
        {products.map((product, index) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
}

export default HomeProducts;
