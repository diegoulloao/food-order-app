import z from "zod";

const consultSchema = z.object({
  cellphone: z
    .string({ required_error: "Por favor ingrese un celular" })
    .length(8, "Debe tener 11 dígitos incluyendo +569"),
});

export { consultSchema };
export type Consult = z.infer<typeof consultSchema>;
