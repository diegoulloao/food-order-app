import type { Database } from "./database.types";
import type { User, AuthError } from "@supabase/supabase-js";
import type { PageSize } from "pdfmake/interfaces";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrdersData = Order[] | null;
export type ConsultResponse = Order[] | null;
export type CreateOrderResult = "success" | "fail";

export type LoginResponse = {
  user: User | null;
  error: AuthError["message"] | null;
};

export type GeneratePdfResult = {
  pdf: ReadableStream<Uint8Array> | null;
  error: Error | null;
};

export type PdfModelParams = {
  data: any;
  pageSize: PageSize;
};

export type GeneratePdfParams = PdfModelParams;
