import { supabase } from "$lib/supabase/client";
import type { APIRoute, AstroCookieSetOptions } from "astro";

// on demand
export const prerender = false;

type AstroCookieDeleteOptions = Omit<
  AstroCookieSetOptions,
  "expires" | "maxAge" | "encode"
>;

const deleteOpts: AstroCookieDeleteOptions = {
  path: "/admin",
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const { access_token } = await request.json();

  if (!access_token) {
    console.error("no access token provided");
    return new Response(JSON.stringify({ success: false }));
  }

  const { error } = await supabase.auth.admin.signOut(access_token);

  if (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ success: false }));
  }

  // NOTE: does this actually work?
  cookies.delete("access_token", deleteOpts);
  cookies.delete("refresh_token", deleteOpts);

  return new Response(JSON.stringify({ success: true }));
};
