import { generateOrdersPdf } from "$lib/factory/pdf";
import type { APIRoute } from "astro";
import type { GeneratePdfResult } from "$lib/types";

// on demand
export const prerender = false;

// api
export const GET: APIRoute = async () => {
  // TODO: fetch data

  const { pdf, error }: GeneratePdfResult = generateOrdersPdf({
    data: {},
    pageSize: "LETTER",
  });

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  const fileHash: number = Date.now();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="pedidos-${fileHash}.pdf"`,
    },
  });
};