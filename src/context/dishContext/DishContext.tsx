import { DishesWithRestaurant } from "@/types/dishes";
import { createContext } from "react";

type DishContextProps = {
  dishes: DishesWithRestaurant[];
  loadAllDishes: () => void;
};

export const DishContext = createContext<DishContextProps>(
  {} as DishContextProps,
);
