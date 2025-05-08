import { ReactNode, useState } from "react";
import { DishContext } from "./DishContext";
import { DishesType } from "@/types/dishes";

type DishContextProviderProps = {
  children: ReactNode;
};

export function DishContextProvider({ children }: DishContextProviderProps) {
  const [dishes, setDishes] = useState<DishesType[]>([]);

  return (
    <DishContext.Provider value={{ dishes }}>{children}</DishContext.Provider>
  );
}
