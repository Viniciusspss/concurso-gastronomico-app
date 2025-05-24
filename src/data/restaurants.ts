import { DishesType } from "@/types/dishes";
import { RestaurantType } from "@/types/user/restaurant";

export const mockRestaurants: RestaurantType[] = [
  {
    id: crypto.randomUUID(),
    cnpj: "20.182.807/0004-42",
    name: "BDC",
    password: "123",
    dishes: [],
  },
  {
    id: "2",
    cnpj: "20.182.807/0004-43",
    name: "Bar da Curva",
    password: "123",
    dishes: [],
  },
];

const dish: DishesType = {
  id: crypto.randomUUID(),
  imageURL: "https://",
  title: "Arroz",
  description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  price: 35,
};

const dish2: DishesType = {
  id: crypto.randomUUID(),
  imageURL: "https://",
  title: "Cuscuz",
  description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  price: 35,
};

mockRestaurants[0].dishes.push(dish);
mockRestaurants[1].dishes.push(dish2);
