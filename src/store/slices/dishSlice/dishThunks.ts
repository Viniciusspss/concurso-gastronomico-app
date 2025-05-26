import api from "@/api/axios";
import { RootState } from "@/store/store";
import { getAllDishesResponse } from "@/types/dishes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createDish = createAsyncThunk(
  "dish/createDish",
  async (data: FormData, thunkAPI) => {
    const response = thunkAPI.getState() as RootState;
    const token = response.auth.acessToken;

    try {
      await api.post("/dishes/me", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Erro desconhecido ao tentar criar novo prato!";
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const loadAllDishes = createAsyncThunk(
  "dish/loadAllDishes",
  async (_, thunkAPI) => {
    const response = thunkAPI.getState() as RootState;
    const token = response.auth.acessToken;
    try {
      const response = await api.get("/dishes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allDishes = response.data;
      return allDishes;
    } catch {
      return thunkAPI.rejectWithValue("Não foi possivel carregar os pratos!");
    }
  },
);

export const loadRestaurantDishes = createAsyncThunk(
  "dish/loadRestaurantDishes",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = state.auth.user;

    if (!user) {
      return thunkAPI.rejectWithValue("Usuáro não encontrado");
    }

    const response = thunkAPI.getState() as RootState;
    const token = response.auth.acessToken;

    try {
      const response = await api.get("/dishes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: getAllDishesResponse[] = response.data;

      const restaurantDishes: getAllDishesResponse[] = data.filter(
        (dish) => dish.restaurant.select.id === user.id,
      );

      return restaurantDishes;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Erro desconhecido ao tentar carregar pratos!";
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);
