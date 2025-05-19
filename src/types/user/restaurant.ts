import { z } from "zod";
import { dishesSchema } from "../dishes";

export const restaurantSchema = z.object({
  id: z.string().uuid(),
  cnpj: z
    .string()
    .length(14, "CNPJ deve ter 14 dígitos")
    .regex(/^\d+$/, "CNPJ deve conter apenas números"),
  name: z.string(),
  password: z.string(),
  dishes: z.array(dishesSchema),
});

export const restaurantFormSchema = restaurantSchema.omit({
  id: true,
  dishes: true,
});
export type RestaurantType = z.infer<typeof restaurantSchema>;
