import { z } from "zod";
import { dishesWithRestaurantSchema } from "../dishes";

export const restaurantSchema = z.object({
  id: z.string().uuid(),
  cnpj: z.string(),
  name: z.string(),
  password: z.string(),
  dishes: z.array(dishesWithRestaurantSchema),
  image_url: z
    .instanceof(File, { message: "Imagem é obrigatória" })
    .refine((file) => file.size > 0, {
      message: "O arquivo não pode estar vazio",
    }),
});

export const restaurantFormSchema = restaurantSchema.omit({
  id: true,
  dishes: true,
});

export const signUpFormDataSchema = restaurantSchema
  .omit({ id: true, dishes: true })
  .extend({
    repeatPassword: z.string(),
  });

export type RestaurantType = z.infer<typeof restaurantSchema>;
