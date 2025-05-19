import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Senha deve ter no mínimo 8 caracteres"),
});

export type ClientType = z.infer<typeof clientSchema>;
