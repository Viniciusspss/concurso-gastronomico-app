import { z } from "zod";

export const dishesSchema = z.object({
  id: z.string().uuid(),
  imageURL: z.string().url(),
  title: z.string().min(1),
  description: z.string().min(5),
  price: z.preprocess((val) => Number(val), z.number().positive()),
});

export const dishesWithRestaurantSchema = dishesSchema.extend({
  restaurant: z.object({
    name: z.string().min(1),
  }),
});

export type DishesType = z.infer<typeof dishesSchema>;
export type DishesWithRestaurant = z.infer<typeof dishesWithRestaurantSchema>;
