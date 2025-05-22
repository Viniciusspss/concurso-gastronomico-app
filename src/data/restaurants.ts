import { DishesType } from "@/types/dishes";
import { RestaurantType } from "@/types/user/restaurant";

export const restaurants: RestaurantType[] = [
  {
    id: crypto.randomUUID(),
    cnpj: "000",
    name: "BDC",
    password: "123",
    dishes: [],
  },
  {
    id: "2",
    cnpj: "001",
    name: "Bar da Curva",
    password: "123",
    dishes: [],
  },
];

const restaurantId = restaurants[0].id;
const restaurantId2 = restaurants[1].id;

const dish: DishesType = {
  id: crypto.randomUUID(),
  imageURL: "https://",
  title: "Arroz",
  description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  price: 35,
  restaurantId: restaurantId,
};

const dish2: DishesType = {
  id: crypto.randomUUID(),
  imageURL: "https://",
  title: "Cuscuz",
  description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  price: 35,
  restaurantId: restaurantId2,
};

restaurants[0].dishes.push(dish);
restaurants[1].dishes.push(dish2);
