import { restaurants } from "@/data/restaurants";
import { dishesSchema, DishesType, DishesWithRestaurant } from "@/types/dishes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createDish = createAsyncThunk(
  "dish/createDish",
  async (
    {
      title,
      price,
      description,
      imageURL,
      restaurantId,
    }: {
      title: string;
      price: number;
      description: string;
      imageURL: string;
      restaurantId: string;
    },
    thunkAPI,
  ) => {
    const parseResult = dishesSchema.safeParse({
      id: crypto.randomUUID(),
      title,
      price,
      description,
      imageURL,
      restaurantId,
    });

    if (!parseResult.success) {
      return thunkAPI.rejectWithValue("Dados inválidos!");
    }

    const newDish = {
      ...parseResult.data,
    };

    const restaurantDishes = localStorage.getItem("restaurantDishes");
    const parsedRestaurantDishes: DishesType[] = restaurantDishes
      ? JSON.parse(restaurantDishes)
      : [];

    parsedRestaurantDishes.push(newDish);
    localStorage.setItem(
      "restaurantDishes",
      JSON.stringify(parsedRestaurantDishes),
    );
    return parsedRestaurantDishes.filter(
      (dish) => dish.restaurantId === restaurantId,
    );
  },
);

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

    const restaurant = restaurants.find((r) => r.id === restaurantId);
    if (!restaurant) return [];

    const mapped = restaurant.dishes.map((dish) => ({
      ...dish,
      restaurantId,
    }));

    localStorage.setItem("restaurantDishes", JSON.stringify(mapped));
    return mapped;
  },
);
