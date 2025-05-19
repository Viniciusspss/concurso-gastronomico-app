import { restaurants } from "@/data/restaurants";
import { DishesType, DishesWithRestaurant } from "@/types/dishes";
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

export const loadRestaurantDishes = createAsyncThunk(
  "dish/loadRestaurantDishes",
  async (restaurantId: string) => {
    const storageDishes = localStorage.getItem("restaurantDishes");

    if (storageDishes) {
      const parsedDishes = JSON.parse(storageDishes) as DishesType[];
      return parsedDishes;
    }
    const restaurant = restaurants.find(
      (restaurant) => restaurantId === restaurant.id,
    );
    if (!restaurant) return [];

    localStorage.setItem("restaurantDishes", JSON.stringify(restaurant.dishes));
    return restaurant.dishes;
  },
);
