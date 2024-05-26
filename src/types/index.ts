import { Database } from "./database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrdersData = Order[] | null;

export type CreateOrderResponse = {
  status: number;
  statusText: string;
  error?: string;
};
