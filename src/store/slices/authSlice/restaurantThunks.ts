import api from "@/api/axios";
import { restaurantFormSchema } from "@/types/user/restaurant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "./authSlice";
import axios from "axios";

export const LoginRestaurant = createAsyncThunk(
  "auth/loginRestaurant",
  async ({ cnpj, password }: { cnpj: string; password: string }, thunkAPI) => {
    const response = await api.post("restaurants/auth/login", {
      cnpj,
      password,
    });

    const {
      id,
      name,
      cnpj: restaurantCnpj,
      tokens,
      dishes,
      password: restaurantPassword,
    } = response.data;

    const restaurant = {
      id,
      name,
      cnpj: restaurantCnpj,
      password: restaurantPassword,
      dishes,
    };

    const token = tokens.acessToken;

    localStorage.setItem("authUser", JSON.stringify(restaurant));
    thunkAPI.dispatch(setToken(token));

    return restaurant;
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

    try {
      const response = await api.post("/restaurants", { ...parseResult.data });

      const {
        id,
        name: restaurantName,
        cnpj: restaurantCnpj,
        tokens,
        dishes,
        password: restaurantPassword,
      } = response.data;

      const restaurant = {
        id,
        name: restaurantName,
        cnpj: restaurantCnpj,
        password: restaurantPassword,
        dishes,
      };

      const token = tokens.acessToken;

      localStorage.setItem("authUser", JSON.stringify(restaurant));
      thunkAPI.dispatch(setToken(token));
      return restaurant;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Erro desconhecido ao registrar restaurante";
        return thunkAPI.rejectWithValue(message);
      }

      return thunkAPI.rejectWithValue(
        "Erro desconhecido ao registrar restaurante",
      );
    }
  },
);
