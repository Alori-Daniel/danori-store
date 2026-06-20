import { assets } from "@/public/assets/asset";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "Fast by design",
    copy: "From kitchen prep to final dispatch, every part of the Danori flow is built to keep wait time short and quality high.",
  },
  {
    title: "Comfort-led menu",
    copy: "We focus on food people actually come back for: bold burgers, familiar sides, easy drinks, and crowd-pleasing bundles.",
  },
  {
    title: "Local rhythm",
    copy: "Danori is shaped around everyday city cravings: late lunches, quick dinners, shared platters, and convenient pickup.",
  },
];

const stats = [
  { value: "4.9", label: "Average rating" },
  { value: "20m", label: "Typical delivery window" },
  { value: "7 days", label: "Weekly availability" },
  { value: "Fresh", label: "Made-to-order kitchen" },
];

export default function Page() {
  return (
    <section className="space-y-8 px-3 py-6 lg:px-16 lg:py-10">
      <div
        className="h-[283px] relative flex flex-row items-center lg:h-[477px] p-16  rounded-lg"
        style={{
          backgroundImage: `url(${assets.overlayBurger})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-1 text-banner space-y-6 lg:mb-3 self-end">
          <p>
            We focus on food people actually come back for: bold burgers,
            familiar sides, easy drinks, and crowd-pleasing bundles.
          </p>
          <h1 className="font-semibold text-banner text-xl sm:text-3xl lg:text-6xl">
            Danori's East London
          </h1>
          <div className="flex text-banner flex-row gap-3 max-w-[600px] text-center">
            <p className="flex flex-row justify-center gap-2 items-center border flex-1 p-3 rounded-4xl">
              <Image
                src={assets.orderComplete}
                height={20}
                width={20}
                alt="order icon"
              />
              Minimum Order: 2500
            </p>

            <p className="flex flex-row justify-center gap-2 items-center border flex-1 p-3 rounded-4xl">
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
            src={assets.eatpizza}
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
    </section>
  );
}
