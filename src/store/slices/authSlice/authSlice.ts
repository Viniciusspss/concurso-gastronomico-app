import { mockClients, mockRestaurants } from "@/data/users";
import { UserType } from "@/types/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginClient, registerClient } from "./clientThunks";
import { LoginRestaurant, RegisterRestaurant } from "./restaurantThunks";

interface AuthState {
  user: UserType | null;
  errorLogin: string | null;
  errorRegister: string | null;
  token: string | null;
}

const storageUser = localStorage.getItem("authUser");

const initialState: AuthState = {
  user: storageUser ? (JSON.parse(storageUser) as UserType) : null,
  errorLogin: null,
  errorRegister: null,
  token: localStorage.getItem("token"),
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
      state.token = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("restaurantDishes");
      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.errorLogin = null;
      state.errorRegister = null;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
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

    builder.addCase(RegisterRestaurant.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorRegister = null;
    });

    builder.addCase(RegisterRestaurant.pending, (state) => {
      state.errorRegister = null;
    });

    builder.addCase(RegisterRestaurant.rejected, (state, action) => {
      state.errorRegister = action.payload as string;
    });
  },
});
export const { logout, clearError, setToken } = authSlice.actions;

export default authSlice.reducer;
