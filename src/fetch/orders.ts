import type { CreateOrderResponse } from "$lib/types";

// TODO: add types
export async function createOrder(formData: any): Promise<CreateOrderResponse> {
  console.log({ formData });
  return;

  const response = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({
      name: "Felipe Hernández",
      address: "Terreno N7, Iñaque",
      cellphone: "+56988437612",
      amount: 1,
    }),
  });

  const result: CreateOrderResponse = await response.json();
  return result;
}
