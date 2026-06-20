import HomeProducts from "@/components/HomeProducts";
import { assets } from "@/public/assets/asset";
import { GroupedProductParams, ProductParams } from "@/shared.types";
import { fetchProducts } from "@/utils/actions/product.action";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";

type GroupedMap = Record<string, GroupedProductParams>;

async function page() {
  const allProducts = await fetchProducts();

  const grouped: GroupedMap = {};

  for (const product of allProducts) {
    const category = product.categories;

    if (!grouped[category.id]) {
      grouped[category.id] = {
        id: category.id,
        name: category.name,
        products: [],
      };
    }

    grouped[category.id].products.push(product);
  }

  const groupedProducts = Object.values(grouped);
  return (
    <div className="space-y-10">
      <div
        className="h-[283px] relative flex flex-row items-center lg:h-[477px] p-16  rounded-lg"
        style={{
          backgroundImage: `url(${assets.blackOverlayBurger})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-1 space-y-6 text-white mb-0 lg:mb-3 lg:self-end">
          <p>I'm lovin it!</p>
          <h1 className="font-semibold text-xl sm:text-3xl lg:text-6xl">
            Danori's East London
          </h1>
          <div className="flex xl:flex-row flex-col gap-3 max-w-[450px] lg:max-w-[600px] text-center">
            <p className="flex flex-row text-sm sm:text-base justify-center gap-2 items-center border flex-1 p-3 rounded-4xl">
              <Image
                src={assets.orderComplete}
                height={20}
                width={20}
                alt="order icon"
              />
              Minimum Order: 2500
            </p>

            <p className="flex flex-row text-sm sm:text-base  justify-center gap-2 items-center border flex-1 p-3 rounded-4xl">
              <Image
                src={assets.motocross}
                height={20}
                width={20}
                alt="motocross icon"
              />
              Delivery in 20-25 Minutes
            </p>
          </div>
        </div>

        <div className="hidden border-primary lg:block relative">
          <Image
            src={assets.platterBurger}
            alt="burger-platter-image"
            className="hidden lg:block"
            height={361}
            width={580}
          />

          <div className="absolute -bottom-4 left-[-68] gap-1 flex flex-col items-center justify-center rounded-2xl h-[158px] w-[136px] bg-white">
            <h1 className="text-7xl font-bold">5.0</h1>
            <div className="flex flex-row gap-1">
              {[0, 1, 2, 3, 4].map((index, item) => {
                return (
                  <Image
                    key={index}
                    src={assets.starIcon}
                    alt="starIcon"
                    height={14}
                    width={14}
                  />
                );
              })}
            </div>
            <p>1,200 reviews</p>
          </div>
        </div>

        <div className="absolute bottom-[-20] left-0 h-10 lg:h-16 w-[225px] lg:w-[335px] bg-primary rounded-r-2xl flex flex-row items-center justify-center">
          <p className="text-white">Open until 8:00 PM</p>
        </div>

        {/* All Offers */}
      </div>

      <div className="px-3  lg:px-16 h-[90px] flex flex-row items-center justify-between">
        <h1 className="font-bold text-lg lg:text-4xl">
          All Offers from Danori's East London
        </h1>
        {/* <div className="flex flex-row gap-2 items-center">
          <Image
            src={assets.searchIcon}
            height={28}
            width={28}
            alt="search icon"
            className=" text-gray-400"
          />
          <input
            type="text"
            placeholder="Search offers..."
            className="w-32 lg:w-72 rounded-4xl border border-gray-300 py-2 pl-3 lg:pl-8 pr-4 outline-none focus:border-primary "
          />
        </div> */}
      </div>

      <div>
        {groupedProducts.map((group) => {
          return <HomeProducts key={group.id} group={group} />;
        })}
      </div>
    </div>
  );
}

export default page;
