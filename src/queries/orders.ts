import { supabase } from "$lib/supabase/client";
import type { OrdersData } from "$lib/types";

export async function getOrders(): Promise<OrdersData> {
  const { data } = await supabase.from("orders").select();
  return data;
}
