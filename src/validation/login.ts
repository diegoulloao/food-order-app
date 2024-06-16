import z from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Ingresa un email" })
    .min(1, "Ingresa un email")
    .email("Ingresa un email válido"),
  password: z
    .string({ required_error: "Ingresa una contraseña" })
    .min(1, "Ingresa una contraseña")
    .min(6, "Debe tener al menos 6 carácteres")
    .max(12, "Debe tener hasta 12 caractéres"),
});

export { loginSchema };
export type Login = z.infer<typeof loginSchema>;
