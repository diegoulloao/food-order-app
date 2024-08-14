import { supabase } from "$lib/supabase/client";
import { generateOrdersPdf } from "$lib/factory/pdf";
import type { APIRoute } from "astro";
import type { GeneratePdfResult } from "$lib/types";

// on demand
export const prerender = false;

// api
export const GET: APIRoute = async () => {
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
