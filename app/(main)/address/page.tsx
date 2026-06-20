import AddressCard from "@/components/AddressCard";
import NewAddress from "@/components/NewAddress";
import { fetchAddresses } from "@/utils/actions/address.action";

export default async function Address() {
  const addresses = await fetchAddresses();

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Address book
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-banner sm:text-4xl">
              My addresses
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/65">
              Save delivery locations and switch your default address anytime.
            </p>
          </div>

          <NewAddress />
        </div>

        {addresses.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {addresses.map((address) => (
              <AddressCard address={address} key={address.id} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[28px] border border-dashed border-primary/35 bg-primary/5 p-6 sm:p-8">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <h2 className="text-2xl font-extrabold text-banner">
                No address saved yet
              </h2>
              <p className="mt-3 text-sm leading-7 text-foreground/65">
                Add your first address to speed up checkout and delivery.
              </p>
              <div className="mt-6 w-full max-w-sm">
                <NewAddress
                  triggerVariant="card"
                  triggerLabel="Add your first address"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
