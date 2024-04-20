import { cookies } from "next/headers";
// PLUGINS
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// MODELS
import type { ProductWithPrice } from "@/models/stripe";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[] | null> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .returns<ProductWithPrice[]>()
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  if (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }

  return data;
};

export default getActiveProductsWithPrices;
