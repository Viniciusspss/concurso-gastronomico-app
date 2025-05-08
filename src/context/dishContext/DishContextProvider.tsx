import { ReactNode, useEffect, useState } from "react";
import { DishContext } from "./DishContext";
import { DishesWithRestaurant } from "@/types/dishes";
import { restaurants } from "@/data/restaurants";

type DishContextProviderProps = {
  children: ReactNode;
};

export function DishContextProvider({ children }: DishContextProviderProps) {
  const [dishes, setDishes] = useState<DishesWithRestaurant[]>(() => {
    const storageDishes = localStorage.getItem("dishes");
    if (!storageDishes) return [];

    const parsedstorageDishes = JSON.parse(
      storageDishes,
    ) as DishesWithRestaurant[];
    return parsedstorageDishes;
  });

  function loadAllDishes() {
    const allDishes: DishesWithRestaurant[] = restaurants.flatMap(
      (restaurant) => {
        return restaurant.dishes.map((dish) => ({
          ...dish,
          restaurant: { name: restaurant.name },
        }));
      },
    );
    setDishes(allDishes);
    localStorage.setItem("dishes", JSON.stringify(allDishes));
  }

  useEffect(() => {
    loadAllDishes();
  }, []);

  return (
    <DishContext.Provider value={{ dishes, loadAllDishes }}>
      {children}
    </DishContext.Provider>
  );
}
