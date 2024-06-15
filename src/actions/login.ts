import { defineAction } from "astro:actions";
import { supabase } from "$lib/supabase/client";
import { loginSchema } from "$lib/validation";
import type { AstroCookieSetOptions } from "astro";
import type { LoginResponse } from "$lib/types";

const config: AstroCookieSetOptions = {
  path: "/admin",
  sameSite: "strict",
};

export const login = defineAction({
  input: loginSchema,
  handler: async ({ email, password }, ctx): Promise<LoginResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    const { session, user } = data;

    ctx.cookies.set("access_token", session.access_token, config);
    ctx.cookies.set("refresh_token", session.refresh_token, config);

    return { user, error };
  },
});
