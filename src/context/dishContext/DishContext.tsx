import { DishesType } from "@/types/dishes";
import { createContext } from "react";

type DishContextProps = {
  dishes: DishesType[];
  loadAllDishes: () => void;
};

export const DishContext = createContext<DishContextProps>(
  {} as DishContextProps,
);
