import { mockClients, mockRestaurants } from "@/data/users";
import { ClientType } from "@/types/user/client";
import { UserType } from "@/types/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserType | null;
}

const storageUser = localStorage.getItem("authUser");

const initialState: AuthState = {
  user: storageUser ? (JSON.parse(storageUser) as UserType) : null,
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
  reducers: {

    loginClient(
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) {
      const clients = localStorage.getItem("clients");
      const clientsParsed: ClientType[] = clients ? JSON.parse(clients) : [];

      const client = clientsParsed.find(
        (c) =>
          c.email === action.payload.email &&
          c.password === action.payload.password,
      );

      if (client) {
      localStorage.setItem("authUser", JSON.stringify(client));
      state.user = client
    }
    },

    
  },
});

export const { loginClient } = authSlice.actions;

export default authSlice.reducer;
