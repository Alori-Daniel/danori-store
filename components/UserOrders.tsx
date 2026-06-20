import { assets } from "@/public/assets/asset";
import { OrderParams } from "@/shared.types";
import Image from "next/image";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function formatOrderDate(value?: string) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date(value));
}

const UserOrders = ({ userOrders }: { userOrders: OrderParams[] }) => {
  if (userOrders.length === 0) {
    return (
      <div className="flex min-h-screen px-6 py-6 md:px-16 lg:px-32">
        <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col items-center justify-center rounded-[12px] px-6 py-14 text-center sm:px-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-2xl bg-white ">
            <Image
              src={assets.shoppingCart}
              alt="Empty orders"
              width={34}
              height={34}
            />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-banner">
            No orders yet
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-foreground/65">
            You have not placed any orders yet. Add something to your cart and
            complete checkout to see it here.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-[16px] bg-primary px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <h2 className="text-lg font-medium mt-6">My Orders</h2>
        <div className="w-full border-t border-gray-300 text-sm">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
            >
              <div className="flex-1 flex gap-5 max-w-80">
                <Image
                  className="max-w-16 max-h-16 object-cover"
                  src={order.image_url}
                  alt="box_icon"
                  width={150}
                  height={150}
                  quality={100}
                />
                <p className="flex flex-col gap-3">
                  <span className="font-medium text-base">
                    {order.product_name + ` x ${order.quantity_bought}`}
                  </span>
                  <span>Items : {order.quantity_bought}</span>
                  {order.size && <span>Size {order.size}</span>}
                </p>
              </div>
              <div>
                <p>
                  <span>{order.region}</span>

                  <br />
                  <span className="font-medium">{order.address}</span>
                  <br />
                  <span>{`${order.state}, ${order.city}`}</span>
                  <br />
                  <span>{`${order.country_code}${order.phone}`}</span>
                </p>
              </div>
              <div>
                <p>Amount paid</p>
                <p className="font-medium my-auto">
                  {currencyFormatter.format(order.amount_paid)}
                </p>
              </div>
              <div>
                <div className="flex flex-col">
                  <span>Date : {formatOrderDate(order.created_at)}</span>
                  <span>status: {order.status}</span>
                  <div className="flex flex-row gap-2">
                    {(order.status === "completed" ||
                      order.status === "cancelled") && (
                      <button className="bg-red-400 p-1  rounded-lg ">
                        Delete
                      </button>
                    )}
                    {order.status !== "reviewed" &&
                      order.status !== "processing" &&
                      order.status === "completed" && (
                        <Link
                          href={`/add-review/${order.id}`}
                          className="bg-black text-[#fce3c7] p-1  rounded-lg"
                        >
                          Review product
                        </Link>
                      )}
                    <Link
                      href={`/order/${order.id}`}
                      className="bg-black text-[#fce3c7] p-1  rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
