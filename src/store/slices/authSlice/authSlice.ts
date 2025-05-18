import { mockClients, mockRestaurants } from "@/data/users";
import { UserType } from "@/types/user/user";
import { createSlice } from "@reduxjs/toolkit";
import { loginClient, registerClient } from "./clientThunks";
import { LoginRestaurant } from "./restaurantThunks";

interface AuthState {
  user: UserType | null;
  errorLogin: string | null;
  errorRegister: string | null;
}

const storageUser = localStorage.getItem("authUser");

const initialState: AuthState = {
  user: storageUser ? (JSON.parse(storageUser) as UserType) : null,
  errorLogin: null,
  errorRegister: null,
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
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authUser");
    },

    clearError: (state) => {
      state.errorLogin = null;
      state.errorRegister = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginClient.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorLogin = null;
    });

    builder.addCase(loginClient.rejected, (state, action) => {
      state.errorLogin = action.payload as string;
    });

    builder.addCase(loginClient.pending, (state) => {
      state.errorLogin = null;
    });

    builder.addCase(registerClient.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorRegister = null;
    });

    builder.addCase(registerClient.pending, (state) => {
      state.errorRegister = null;
    });

    builder.addCase(registerClient.rejected, (state, action) => {
      state.errorRegister = action.payload as string;
    });

    builder.addCase(LoginRestaurant.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorLogin = null;
    });

    builder.addCase(LoginRestaurant.rejected, (state, action) => {
      state.errorLogin = action.payload as string;
    });

    builder.addCase(LoginRestaurant.pending, (state) => {
      state.errorLogin = null;
    });
  },
});
export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
