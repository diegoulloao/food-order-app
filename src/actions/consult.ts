import { defineAction, ActionError } from "astro:actions";
import { supabase } from "$lib/supabase/client";
import { consultSchema } from "$lib/validation";
import type { ConsultResponse } from "$lib/types";

export const consult = defineAction({
  input: consultSchema,
  handler: async ({ cellphone }): Promise<ConsultResponse> => {
    // format
    cellphone = `+569${cellphone.replace(/\D+/g, "")}`;

    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("cellphone", cellphone);

    if (error) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return data;
  },
});
