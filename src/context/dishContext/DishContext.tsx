import { DishesType } from "@/types/dishes";
import { createContext } from "react";

type DishContextProps = {
  dishes: DishesType[];
};

export const DishContext = createContext<DishContextProps>(
  {} as DishContextProps,
);
