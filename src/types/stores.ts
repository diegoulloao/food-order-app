import type { User } from "@supabase/supabase-js";

export type AppStore = {
  user: User | null;
};
