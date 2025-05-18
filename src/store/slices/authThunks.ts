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

export const registerClient = createAsyncThunk(
  "auth/registerClient",
  async (
    {
      email,
      password,
      firstName,
      lastName,
    }: { email: string; password: string; firstName: string; lastName: string },
    thunkAPI,
  ) => {
    const client: ClientType = {
      email,
      password,
      firstName,
      lastName,
      id: "1",
    };
    const allClients = localStorage.getItem("clients");
    const parsedAllClients: ClientType[] = allClients
      ? JSON.parse(allClients)
      : null;

    if (parsedAllClients.some((client) => client.email === email)) {
      return thunkAPI.rejectWithValue("Email já cadastrado");
    } else {
      parsedAllClients.push(client);
      localStorage.setItem("clients", JSON.stringify(parsedAllClients));
      return client;
    }
  },
);
