import { DishesType, DishesWithRestaurant } from "@/types/dishes";
import { createContext } from "react";

type DishContextProps = {
  dishes: DishesWithRestaurant[];
  loadAllDishes: () => void;
  restaurantDishes: DishesType[];
  loadRestaurantDishes: (restaurantId: string) => void;
  deleteDish: (dishId: string) => void;
  editDish: (
    dishId: string,
    title: string,
    price: number,
    description: string,
  ) => void;
  selectedDish: DishesType | null;
  setSelectedDish: (dish: DishesType | null) => void;
};

export const DishContext = createContext<DishContextProps>(
  {} as DishContextProps,
);
