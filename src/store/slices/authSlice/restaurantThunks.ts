import { RestaurantType } from "@/types/user/restaurant";
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
    const restaurant: RestaurantType = {
      cnpj,
      name,
      password,
      id: "1",
      dishes: [],
    };
    const allRestaurants = localStorage.getItem("restaurants");
    const parsedAllRestaurants: RestaurantType[] = allRestaurants
      ? JSON.parse(allRestaurants)
      : null;

    if (parsedAllRestaurants.some((restaurant) => restaurant.cnpj === cnpj)) {
      return thunkAPI.rejectWithValue("cnpj já cadastrado!");
    } else {
      parsedAllRestaurants.push(restaurant);
      localStorage.setItem("restaurants", JSON.stringify(parsedAllRestaurants));
      localStorage.setItem("authUser", JSON.stringify(restaurant));
      return restaurant;
    }
  },
);
