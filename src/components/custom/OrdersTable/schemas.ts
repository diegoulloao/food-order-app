// TODO: remove validation ?

import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  cellphone: z.string(),
  address: z.string().nullable(),
  amount: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
