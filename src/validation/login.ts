import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { loginSchema };
export type Login = z.infer<typeof loginSchema>;
