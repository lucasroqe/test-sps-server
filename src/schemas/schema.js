import * as z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  type: z.enum(["admin", "user"], { errorMap: () => ({ message: "Tipo deve ser 'admin' ou 'user'" }) }),
  password: z.string().min(4, "A senha deve ter no mínimo 4 caracteres")
});

