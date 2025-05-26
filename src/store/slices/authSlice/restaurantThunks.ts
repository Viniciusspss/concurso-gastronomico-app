import api from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTokens } from "./authSlice";
import axios from "axios";

export const LoginRestaurant = createAsyncThunk(
  "auth/loginRestaurant",
  async ({ cnpj, password }: { cnpj: string; password: string }, thunkAPI) => {
    try {
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
        image_url,
      } = response.data;

      const restaurant = {
        id,
        name,
        cnpj: restaurantCnpj,
        password: restaurantPassword,
        dishes,
        image_url,
      };

      const acessToken = tokens.acessToken;
      const refreshToken = tokens.refreshToken;

      localStorage.setItem("authUser", JSON.stringify(restaurant));
      thunkAPI.dispatch(setTokens({ acessToken, refreshToken }));

      return restaurant;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Erro desconhecido ao tentar realizar login";
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const RegisterRestaurant = createAsyncThunk(
  "auth/registerRestaurant",
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await api.post("/restaurants", formData);

      const { id, name, cnpj, tokens, dishes, image_url, password } =
        response.data;

      const restaurant = {
        id,
        name,
        cnpj,
        password,
        image_url,
        dishes,
      };

      const acessToken = tokens.acessToken;
      const refreshToken = tokens.refreshToken;

      localStorage.setItem("authUser", JSON.stringify(restaurant));
      thunkAPI.dispatch(setTokens({ acessToken, refreshToken }));
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
