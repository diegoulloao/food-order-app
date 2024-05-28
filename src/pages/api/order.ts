import { supabase } from "$lib/supabase/client";
import { orderSchema } from "$lib/validation";
import type { APIRoute } from "astro";
import type { CreateOrderResponse } from "$lib/types";
import type { Order } from "$lib/validation";

// astro
export const prerender = false;

export const POST: APIRoute<CreateOrderResponse> = async ({ request }) => {
  const data = (await request.json()) as Order;
  const { success: valid } = orderSchema.safeParse(data);

  if (!valid) {
    return new Response(
      JSON.stringify({
        status: 400,
        statusText: "Bad Request",
        error: "Los datos no cumplen el estándar de validación",
      }),
    );
  }

  const { name, address, cellphone, amount } = data;

  // format
  const formattedCellPhone = `+569${cellphone.replace(/\D+/g, "")}`;

  const { error } = await supabase.from("orders").insert({
    name,
    address,
    cellphone: formattedCellPhone,
    amount: parseInt(amount),
  });

  if (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        statusText: "Internal Server Error",
        error: error.message,
      }),
    );
  }

  return new Response(
    JSON.stringify({
      status: 202,
      statusText: "success",
    }),
  );
};
