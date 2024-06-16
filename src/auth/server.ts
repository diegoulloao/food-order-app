import { supabase } from "$lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Session = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export const getUser = async ({
  accessToken,
  refreshToken,
}: Session): Promise<User | null> => {
  try {
    if (!accessToken) throw new Error("no accessToken");
    if (!refreshToken) throw new Error("no refreshToken");

    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const sessionResponse = await supabase.auth.getSession();
    const { user } = sessionResponse.data.session ?? {};

    if (!user) throw new Error("no user");
    return user;
  } catch (e: any) {
    console.log({ error: e.message });
    return null;
  }
};
