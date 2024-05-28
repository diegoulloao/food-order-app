import { defineAction } from "astro:actions";
import { supabase } from "$lib/supabase/client";
import { consultSchema } from "$lib/validation";
import type { ConsultResponse } from "$lib/types";

export const consult = defineAction({
  accept: "form",
  input: consultSchema,
  handler: async ({ cellphone }): Promise<ConsultResponse> => {
    // format
    cellphone = `+569${cellphone.replace(/\D+/g, "")}`;

    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("cellphone", cellphone);

    if (error) {
      return null;
    }

    return data;
  },
});
