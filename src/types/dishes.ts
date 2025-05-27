import { z } from "zod";

export const dishesSchema = z.object({
  id: z.string().uuid(),
  image_url: z.string().url(),
  name: z.string().min(1),
  details: z.string().min(5),
  price: z.string().refine((val) => /^\d+(\.\d{2})$/.test(val), {
    message: "Preço deve estar no formato 0.00",
  }),
});

export const dishesWithRestaurantSchema = dishesSchema.extend({
  restaurant: z.object({
    name: z.string().min(1),
  }),
});

export const getAllDishesResponseSchema = dishesSchema.extend({
  restaurant: z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    image_url: z.string().min(1),
  }),
  reviews: z.object({
    id: z.string().uuid(),
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
    user: z.object({
      id: z.string().uuid(),
      first_name: z.string(),
      last_name: z.string(),
    }),
  }),
});

export const createDishesSchema = z.object({
  image_url: z
    .instanceof(File, { message: "Imagem é obrigatória" })
    .refine((file) => file.size > 0, {
      message: "O arquivo não pode estar vazio",
    }),
  price: z.string(),
  details: z.string().min(1),
  name: z.string().min(1),
});

export type DishesType = z.infer<typeof dishesSchema>;
export type DishesWithRestaurant = z.infer<typeof dishesWithRestaurantSchema>;
export type getAllDishesResponse = z.infer<typeof getAllDishesResponseSchema>;
export type createDishFormData = z.infer<typeof createDishesSchema>;
