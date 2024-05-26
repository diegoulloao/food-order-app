import type { APIRoute } from "astro";
import moongose from "mongoose";

// astro
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  return new Response(JSON.stringify(body));
};
