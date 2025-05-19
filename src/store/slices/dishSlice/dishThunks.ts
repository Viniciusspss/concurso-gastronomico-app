import { restaurants } from "@/data/restaurants";
import { DishesWithRestaurant } from "@/types/dishes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadAllDishes = createAsyncThunk(
  "dish/loadAllDishes",
  async (): Promise<DishesWithRestaurant[]> => {
    const allDishes = restaurants.flatMap((restaurant) => {
      return restaurant.dishes.map((dish) => ({
        ...dish,
        restaurant: { name: restaurant.name },
      }));
    });
    localStorage.setItem("dishes", JSON.stringify(allDishes));
    return allDishes;
  },
);
