import { DishesType } from "../dishes";

export type RestaurantType = {
  id: string;
  cnpj: string;
  name: string;
  password: string;
  dishes: DishesType[];
};
