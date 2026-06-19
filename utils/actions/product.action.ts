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

export async function fetchProductsById(
  id: string,
): Promise<ProductParams | null> {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
    *,
    categories:category (
      id,
      name
    )
  `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.log(error);
    return null;
  }

  return product;
}
