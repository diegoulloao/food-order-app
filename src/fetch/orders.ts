import type { CreateOrderResponse } from "$lib/types";
import type { Order } from "$lib/validation";

export async function createOrder(data: Order): Promise<CreateOrderResponse> {
  const response = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result: CreateOrderResponse = await response.json();
  return result;
}
