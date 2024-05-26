// TODO: remove validation ?

import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  rut: z.string(),
  amount: z.number(),
  address: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
