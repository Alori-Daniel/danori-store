"use client";

import { AddressParams } from "@/shared.types";
import { makeDefaultAddress } from "@/utils/actions/address.action";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

function AddressCard({ address }: { address: AddressParams }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleMakeDefault = () => {
    startTransition(async () => {
      const wasUpdated = await makeDefaultAddress(address.id);

      if (!wasUpdated) {
        toast.error("Could not update default address");
        return;
      }

      toast.success("Default address updated");
      router.refresh();
    });
  };

  return (
    <article className="rounded-[24px] border border-banner/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,8,31,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Saved address
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-banner">
            {address.title || "Address"}
          </h3>
        </div>

        {address.is_default ? (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Default
          </span>
        ) : (
          <button
            type="button"
            onClick={handleMakeDefault}
            disabled={isPending}
            className="rounded-full border border-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Updating..." : "Make default"}
          </button>
        )}
      </div>

      <div className="mt-6 space-y-4 text-sm leading-7 text-foreground/75">
        <p className="text-base leading-8 text-banner">
          {address.address || "No address provided"}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <span>{address.city || "City not set"}</span>
          <span>{address.state || "State not set"}</span>
          <span>{address.region || "Region not set"}</span>
        </div>
        <p>
          {address.country_code || ""}
          {address.phone ? ` ${address.phone}` : " Phone not set"}
        </p>
      </div>
    </article>
  );
}

export default AddressCard;
