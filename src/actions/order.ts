import { defineAction } from "astro:actions";
import { supabase } from "$lib/supabase/client";
import { orderSchema } from "$lib/validation";
import type { CreateOrderResult } from "$lib/types";

export const order = defineAction({
  input: orderSchema,
  handler: async ({ name, cellphone, amount }): Promise<CreateOrderResult> => {
    // format
    cellphone = `+569${cellphone.replace(/\D+/g, "")}`;

    const { error } = await supabase.from("orders").insert({
      name,
      cellphone,
      amount: parseInt(amount),
    });

    if (error) {
      return "fail";
    }

    return "success";
  },
});
