import { restaurantFormSchema, RestaurantType } from "@/types/user/restaurant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginRestaurant = createAsyncThunk(
  "auth/loginRestaurant",
  async ({ cnpj, password }: { cnpj: string; password: string }, thunkAPI) => {
    const restaurants = localStorage.getItem("restaurants");
    const restaurantsParsed: RestaurantType[] = restaurants
      ? JSON.parse(restaurants)
      : [];

    const restaurant = restaurantsParsed.find(
      (c) => c.cnpj === cnpj && c.password === password,
    );
    if (restaurant) {
      localStorage.setItem("authUser", JSON.stringify(restaurant));
      return restaurant;
    } else {
      return thunkAPI.rejectWithValue("cnpj ou senha inválidos!");
    }
  },
);

export const RegisterRestaurant = createAsyncThunk(
  "auth/registerRestaurant",
  async (
    { cnpj, name, password }: { cnpj: string; name: string; password: string },
    thunkAPI,
  ) => {
    const parseResult = restaurantFormSchema.safeParse({
      cnpj,
      name,
      password,
    });

    if (!parseResult.success) {
      return thunkAPI.rejectWithValue("Dados inválidos no cadastro!");
    }

    const allRestaurants = localStorage.getItem("restaurants");
    const parsedAllRestaurants: RestaurantType[] = allRestaurants
      ? JSON.parse(allRestaurants)
      : [];

    if (parsedAllRestaurants.some((restaurant) => restaurant.cnpj === cnpj)) {
      return thunkAPI.rejectWithValue("cnpj já cadastrado!");
    } else {
      const restaurant = {
        ...parseResult.data,
        id: crypto.randomUUID(),
        dishes: [],
      };
      parsedAllRestaurants.push(restaurant);
      localStorage.setItem("restaurants", JSON.stringify(parsedAllRestaurants));
      localStorage.setItem("authUser", JSON.stringify(restaurant));
      return restaurant;
    }
  },
);
