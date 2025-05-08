import { ReactNode, useCallback, useState } from "react";
import { DishContext } from "./DishContext";
import { DishesType, DishesWithRestaurant } from "@/types/dishes";
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

  const [restaurantDishes, setRestaurantDishes] = useState<DishesType[]>(() => {
    const storageRestaurantDishes = localStorage.getItem("restaurantDishes");
    if (!storageRestaurantDishes) return [];

    const parsedstorageRestaurantDishes = JSON.parse(
      storageRestaurantDishes,
    ) as DishesType[];
    return parsedstorageRestaurantDishes;
  });

  const loadAllDishes = useCallback(() => {
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
  }, []);

  function loadRestaurantDishes(restaurantId: string) {
    const restaurant = restaurants.find(
      (restaurant) => restaurantId === restaurant.id,
    );
    if (!restaurant) return;

    setRestaurantDishes(restaurant.dishes);
    localStorage.setItem("restaurantDishes", JSON.stringify(restaurant.dishes));
  }

  return (
    <DishContext.Provider
      value={{ dishes, loadAllDishes, loadRestaurantDishes, restaurantDishes }}
    >
      {children}
    </DishContext.Provider>
  );
}
