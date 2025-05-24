import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().uuid(),
  first_name: z
    .string()
    .trim()
    .min(1, "Primeiro nome precisa ter pelo menos um caracter"),
  last_name: z
    .string()
    .trim()
    .min(1, "último nome precisa ter pelo menos um caracter"),
  email: z
    .string({
      required_error: "Email é obrigatório!",
    })
    .trim()
    .email({
      message: "Por favor insira um email válido!",
    })
    .min(1, {
      message: "Por favor insira um email válido!",
    }),
  password: z
    .string({
      required_error: "Password é obrigatório!",
    })
    .trim()
    .min(6, {
      message: "Senha precisa ter no mínimo 6 caracteres",
    }),
});

export type ClientType = z.infer<typeof clientSchema>;
