import z from "zod";

const orderSchema = z.object({
  name: z
    .string({ required_error: "Por favor ingrese un nombre" })
    .min(5, "Debe contener al menos 5 carácteres"),
  cellphone: z
    .string({ required_error: "Por favor ingrese un celular" })
    .length(8, "Debe tener 11 dígitos incluyendo +569"),
  address: z.string().optional(),
  amount: z.string({ required_error: "Por favor agregar cantidad" }),
});

export { orderSchema };
export type Order = z.infer<typeof orderSchema>;
