import { mockClients, mockRestaurants } from "@/data/users";
import { ClientType } from "@/types/user/client";
import { UserType } from "@/types/user/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: UserType | null;
  error: string | null;
}

const storageUser = localStorage.getItem("authUser");

const initialState: AuthState = {
  user: storageUser ? (JSON.parse(storageUser) as UserType) : null,
  error: null,
};

if (!localStorage.getItem("clients")) {
  localStorage.setItem("clients", JSON.stringify(mockClients));
}
if (!localStorage.getItem("restaurants")) {
  localStorage.setItem("restaurants", JSON.stringify(mockRestaurants));
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginClient.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(loginClient.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

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

export default authSlice.reducer;
