import { DishesType, DishesWithRestaurant } from "@/types/dishes";
import { createContext } from "react";

type DishContextProps = {
  dishes: DishesWithRestaurant[];
  loadAllDishes: () => void;
  restaurantDishes: DishesType[];
  loadRestaurantDishes: (restaurantId: string) => void;
  editDish: (
    dishId: string,
    title: string,
    price: number,
    description: string,
  ) => void;
};

export const DishContext = createContext<DishContextProps>(
  {} as DishContextProps,
);
