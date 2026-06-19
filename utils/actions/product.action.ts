"use server";

import { ProductParams } from "@/shared.types";
import { createClient } from "../supabase/server";

export async function fetchProducts(): Promise<ProductParams[]> {
  const supabase = await createClient();
  const { data: products, error } = await supabase.from("products").select(`
    *,
    categories:category (
      id,
      name
    )
  `);

  if (error) {
    console.log(error);
    return [];
  }

  return products;
}
