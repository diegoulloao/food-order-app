import { supabase } from "$lib/supabase/client";
import { generateOrdersPdf } from "$lib/factory/pdf";
import type { APIRoute } from "astro";
import type { GeneratePdfResult } from "$lib/types";

// on demand
export const prerender = false;

// api
export const POST: APIRoute = async ({ request }) => {
  const { access_token } = await request.json();

  if (!access_token) {
    return new Response(
      JSON.stringify({
        error: { message: "Access token is required." },
      }),
      { status: 400 },
    );
  }

  const {
    data: { user },
    error: checkUserError,
  } = await supabase.auth.getUser(access_token);

  if (checkUserError) {
    return new Response(
      JSON.stringify({
        error: { message: "Access could not be verified." },
      }),
      { status: 503 },
    );
  }

  const validToken = !!user;

  if (!validToken) {
    return new Response(
      JSON.stringify({
        error: { message: "Unauthotized." },
      }),
      { status: 401 },
    );
  }

  const { data, error } = await supabase.from("orders").select();

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  const { pdf, error: pdfError }: GeneratePdfResult = generateOrdersPdf({
    data,
  });

  if (pdfError) {
    return new Response(JSON.stringify({ error: pdfError }), { status: 500 });
  }

  const fileHash: number = Date.now();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="pedidos-${fileHash}.pdf"`,
    },
  });
};
