import { ClientType } from "@/types/user/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginClient = createAsyncThunk(
  "auth/loginClient",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    const clients = localStorage.getItem("clients");
    const clientsParsed: ClientType[] = clients ? JSON.parse(clients) : [];

    const client = clientsParsed.find(
      (c) => c.email === email && c.password === password,
    );

    if (client) {
      localStorage.setItem("authUser", JSON.stringify(client));
      return client;
    } else {
      return thunkAPI.rejectWithValue("Email ou senha inválidos!");
    }
  },
);
