import { cookiesToObj } from "$lib/utils/cookies";
import type { Session } from "@supabase/supabase-js";

export const logOut = async (): Promise<void> => {
  const { access_token } = cookiesToObj<Pick<Session, "access_token">>(
    document.cookie,
  );

  const result = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token }),
  });

  const { success } = await result.json();

  if (success) {
    window.location.pathname = "/admin";
  }
};
