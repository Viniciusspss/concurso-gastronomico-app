import { z } from "zod";

export const reviewSchema = z.object({
  user_id: z
    .string({
      required_error: "O ID do usuário é obrigatório.",
    })
    .uuid({
      message: "O ID do usuário deve ser um UUID válido.",
    }),

  dish_id: z
    .string({
      required_error: "O ID do prato é obrigatório.",
    })
    .uuid({
      message: "O ID do prato deve ser um UUID válido.",
    }),

  rating: z
    .number({
      required_error: "A nota é obrigatória.",
      invalid_type_error: "A nota deve ser um número.",
    })
    .min(1, {
      message: "A nota mínima é 1.",
    })
    .max(5, {
      message: "A nota máxima é 5.",
    }),

  comment: z
    .string({
      required_error: "O comentário é obrigatório.",
    })
    .min(1, {
      message: "O comentário não pode estar vazio.",
    }),
});

export type reviewType = z.infer<typeof reviewSchema>;
