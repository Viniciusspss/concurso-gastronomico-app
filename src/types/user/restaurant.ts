import { z } from "zod";
import { dishesSchema } from "../dishes";

export const restaurantSchema = z.object({
  id: z.string().uuid(),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  name: z.string().min(1, "nome é obrigatório"),
  password: z.string().min(6, "senha precisa ter no mínimo 6 caracteres"),
  dishes: z.array(dishesSchema),
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

export const getAllRestaurantsSchema = restaurantSchema.omit({
  cnpj: true,
  password: true,
  dishes: true,
});

export const editRestaurantSchema = restaurantSchema
  .omit({
    id: true,
    dishes: true,
  })
  .partial();

export type RestaurantType = z.infer<typeof restaurantSchema>;
export type getAllRestaurantsType = z.infer<typeof getAllRestaurantsSchema>;
export type EditRestaurantType = z.infer<typeof editRestaurantSchema>;
