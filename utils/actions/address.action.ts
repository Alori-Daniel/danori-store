"use server";

import { AddressParams } from "@/shared.types";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

interface AddressDBParams {
  region: string;
  title: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  countryCode?: string;
  flag?: string;
  isDefault?: boolean;
}
export async function fetchAddresses(): Promise<AddressParams[]> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    console.log("User not authenticated-->>cartActions.ts");
    redirect("/login");
    // throw new Error("User not authenticated-->>cartActions.ts");
  }

  const { data: addresses, error } = await supabase
    .from("address")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching addresses in address action :", error);
    throw new Error("Error fetching addresses from address action  ");
  }

  return addresses ?? [];
}

export async function saveAddressDB(formData: AddressDBParams) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    console.log("User not authenticated-->>cartActions.ts");
    redirect("/login");
  }

  const { data: existingAddresses, error: fetchExistingError } = await supabase
    .from("address")
    .select("id")
    .eq("user_id", userId);

  if (fetchExistingError) {
    console.error("Error fetching existing addresses:", fetchExistingError);
    return { success: false };
  }

  const shouldBeDefault =
    Boolean(formData.isDefault) || (existingAddresses?.length ?? 0) === 0;

  if (shouldBeDefault) {
    const { error: resetDefaultError } = await supabase
      .from("address")
      .update({ is_default: false })
      .eq("user_id", userId);

    if (resetDefaultError) {
      console.error("Error resetting default address:", resetDefaultError);
      return { success: false };
    }
  }

  const { data: address, error } = await supabase
    .from("address")
    .insert([
      {
        user_id: userId,
        region: formData.region,
        title: formData.title,
        address: formData.address,
        state: formData.state,
        city: formData.city,
        country_code: `${formData.countryCode ?? "+234"}`,
        flag: `${formData.flag ?? "🇳🇬"}`,
        phone: `${formData.phone}`,
        is_default: shouldBeDefault,
      },
    ])
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Error fetching addresses in address action :", error);
    return { success: false };
  }

  revalidatePath("/address");
  revalidatePath("/buy-now/[productId]", "page");
  return { success: true, address: address?.[0] ?? null };
}

export async function makeDefaultAddress(addressId: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    console.log("User not authenticated-->>cartActions.ts");
    redirect("/login");
    // throw new Error("User not authenticated-->>cartActions.ts");
  }

  const { error: resetDefaultError } = await supabase
    .from("address")
    .update({ is_default: false })
    .eq("user_id", userId);

  if (resetDefaultError) {
    console.log("error resetting previous default address", resetDefaultError);
    return false;
  }

  const { error } = await supabase
    .from("address")
    .update({ is_default: true })
    .eq("id", addressId)
    .eq("user_id", userId)
    .select();

  if (error) {
    console.log("error updating default address", error);
    return false;
  }

  revalidatePath("/address");
  revalidatePath("/buy-now/[productId]", "page");
  return true;
}
