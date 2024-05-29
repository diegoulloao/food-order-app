import { currency } from "$lib/utils/formatter";
import type { Order } from "$lib/types";

export const getItemsTotal = (orders: Order[], price: number): string => {
  const totalItems: number = orders.reduce((acc, o) => (acc += o.amount), 0);
  return currency.format(price * totalItems);
};
