import { supabase } from "$lib/supabase/client";
import type { APIRoute } from "astro";
import type { CreateOrderResponse } from "$lib/types";

// astro
export const prerender = false;

export const POST: APIRoute<CreateOrderResponse> = async ({ request }) => {
  const { name, address, cellphone, amount } = await request.json();

  const { error } = await supabase.from("orders").insert({
    name,
    address,
    cellphone,
    amount,
  });

  // TODO: validate and sanitize if needed
  console.log({ name, address, cellphone, amount });

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
