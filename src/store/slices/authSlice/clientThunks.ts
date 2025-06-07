import api from "@/api/axios";
import {
  clientSchema,
  ClientType,
  EditClientType,
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

      const accessToken = tokens.accessToken;
      const refreshToken = tokens.refreshToken;
      localStorage.setItem("authUser", JSON.stringify(client));
      localStorage.setItem("userRole", "client")
      thunkAPI.dispatch(setTokens({ accessToken, refreshToken }));

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

      const accessToken = tokens.accessToken;
      const refreshToken = tokens.refreshToken;
      thunkAPI.dispatch(setTokens({ accessToken, refreshToken }));

      const client: ClientType = {
        id,
        email,
        first_name,
        last_name,
        password,
      };

      localStorage.setItem("userRole", "client")
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
  async (data: EditClientType, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.accessToken;
    try {
      const response = await api.patch(`/users/me/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const clientData: ClientType = response.data;
      return clientData;
    } catch {
      return thunkAPI.rejectWithValue("Não foi possivel editar o usuário!");
    }
  },
);
