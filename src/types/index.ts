import type { Database } from "./database.types";
import type { User, AuthError } from "@supabase/supabase-js";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrdersData = Order[] | null;
export type ConsultResponse = Order[] | null;
export type CreateOrderResult = "success" | "fail";

export type LoginResponse = {
  user: User | null;
  error: AuthError["message"] | null;
};
