import api from "@/api/axios";
import {
  clientSchema,
  ClientType,
  loginClientSchema,
} from "@/types/user/client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTokens } from "./authSlice";
import axios from "axios";
import { RootState } from "@/store/store";

export const loginClient = createAsyncThunk(
  "auth/loginClient",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    const parseResult = loginClientSchema.safeParse({
      email,
      password,
    });

    if (!parseResult.success) {
      return thunkAPI.rejectWithValue("Email ou senha inválidos!");
    }

    try {
      const response = await api.post("/users/auth/login", {
        ...parseResult.data,
      });

      const {
        id,
        email: responseEmail,
        password: responsePassword,
        tokens,
        first_name,
        last_name,
      } = response.data;

      const client: ClientType = {
        id,
        email: responseEmail,
        password: responsePassword,
        first_name,
        last_name,
      };

      const acessToken = tokens.acessToken;
      const refreshToken = tokens.refreshToken;
      localStorage.setItem("authUser", JSON.stringify(client));
      thunkAPI.dispatch(setTokens({ acessToken, refreshToken }));

      return client;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Erro desconhecido ao tentar realizar login!";
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const registerClient = createAsyncThunk(
  "auth/registerClient",
  async (
    {
      first_name,
      last_name,
      email,
      password,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    const parseResult = clientSchema.safeParse({
      id: crypto.randomUUID(),
      first_name,
      last_name,
      email,
      password,
    });

    if (!parseResult.success) {
      return thunkAPI.rejectWithValue("Dados inválidos no cadastro!");
    }

    try {
      const response = await api.post("/users", {
        ...parseResult.data,
      });

      const { id, first_name, last_name, email, password, tokens } =
        response.data;

      const acessToken = tokens.acessToken;
      const refreshToken = tokens.refreshToken;
      thunkAPI.dispatch(setTokens({ acessToken, refreshToken }));

      const client: ClientType = {
        id,
        email,
        first_name,
        last_name,
        password,
      };
      return client;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Erro desconhecido ao tentar realizar cadastro!";
        return thunkAPI.rejectWithValue(message);
      }
    }
  },
);

export const editClient = createAsyncThunk(
  "auth/editClient",
  async (
    {
      first_name,
      last_name,
      email,
      password,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.acessToken;
    try {
      await api.patch(
        `/users/me/`,
        { first_name, last_name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return true;
    } catch {
      return thunkAPI.rejectWithValue("Não foi possivel editar o usuário!");
    }
  },
);
