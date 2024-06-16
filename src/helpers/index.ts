import { currency } from "$lib/utils/formatter";
import type { Order } from "$lib/types";

export const getItemsTotal = (orders: Order[], price: number): string => {
  const totalItems: number = orders.reduce((acc, o) => (acc += o.amount), 0);
  return currency.format(price * totalItems);
};

export const translate = (message: string): string => {
  const dicc: Record<string, string> = {
    ["Invalid login credentials"]: "Usuario y/o contraseña incorrectos",
  };

  return dicc[message] ?? message;
};
