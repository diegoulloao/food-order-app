import type { Database } from "./database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrdersData = Order[] | null;
export type ConsultResponse = Order[] | null;
export type CreateOrderResult = "success" | "fail";
