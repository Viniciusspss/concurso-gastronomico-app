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
