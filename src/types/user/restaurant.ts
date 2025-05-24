import { z } from "zod";
import { dishesSchema } from "../dishes";

export const restaurantSchema = z.object({
  id: z.string().uuid(),
  cnpj: z.string(),
  name: z.string(),
  password: z.string(),
  dishes: z.array(dishesSchema),
});

export const restaurantFormSchema = restaurantSchema.omit({
  id: true,
  dishes: true,
});
export type RestaurantType = z.infer<typeof restaurantSchema>;
