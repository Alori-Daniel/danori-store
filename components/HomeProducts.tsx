"use client";

import { GroupedProductParams } from "@/shared.types";
import React, { useEffect, useRef, useState } from "react";
import ProductItem from "./ProductItem";

interface HomeProductsProps {
  group: GroupedProductParams;
}

function HomeProducts({ group }: HomeProductsProps) {
  const { name, products } = group;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="">
      <h2
        className={`lg:text-5xl sm:text-4xl text-3xl font-extrabold text-banner my-3 sm:my-5 lg:my-10 transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {name}
      </h2>

      <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
        {products.map((product, index) => {
          return (
            <div
              key={product.id}
              className={`transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${100 + index * 60}ms` : "0ms",
              }}
            >
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HomeProducts;
