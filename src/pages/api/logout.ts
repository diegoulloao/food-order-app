import { supabase } from "$lib/supabase/client";
import type { APIRoute, AstroCookieSetOptions } from "astro";

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
  const { error } = await supabase.auth.admin.signOut(access_token);

  if (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ success: false }));
  }

  cookies.delete("access_token", deleteOpts);
  cookies.delete("refresh_token", deleteOpts);

  return new Response(JSON.stringify({ success: true }));
};
