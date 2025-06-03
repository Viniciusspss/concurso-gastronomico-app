import { UserType } from "@/types/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editClient, loginClient, registerClient } from "./clientThunks";
import {
  editRestaurant,
  getAllRestaurants,
  LoginRestaurant,
  RegisterRestaurant,
} from "./restaurantThunks";
import { getAllRestaurantsType } from "@/types/user/restaurant";

interface AuthState {
  user: UserType | null;
  errorLogin: string | null;
  errorRegister: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isEditedClient: boolean;
  errorEdited: string | null;
  allRestaurants: getAllRestaurantsType[] | null;
  errorLoadRestaurants: string | null;
}

const storageUser = localStorage.getItem("authUser");

const initialState: AuthState = {
  allRestaurants: null,
  errorLoadRestaurants: null,
  user: storageUser ? (JSON.parse(storageUser) as UserType) : null,
  errorLogin: null,
  errorRegister: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isEditedClient: false,
  errorEdited: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("restaurantDishes");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    clearError: (state) => {
      state.errorLogin = null;
      state.errorRegister = null;
      state.errorEdited = null;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },

    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginClient.fulfilled, (state, action) => {
      state.user = action.payload || null;
      state.errorLogin = null;
    });

    builder.addCase(loginClient.rejected, (state, action) => {
      state.errorLogin = action.payload as string;
    });

    builder.addCase(loginClient.pending, (state) => {
      state.errorLogin = null;
    });

    builder.addCase(registerClient.fulfilled, (state, action) => {
      state.user = action.payload || null;
      state.errorRegister = null;
    });

    builder.addCase(registerClient.pending, (state) => {
      state.errorRegister = null;
    });

    builder.addCase(registerClient.rejected, (state, action) => {
      state.errorRegister = action.payload as string;
    });

    builder.addCase(LoginRestaurant.fulfilled, (state, action) => {
      state.user = action.payload || null;
      state.errorLogin = null;
    });

    builder.addCase(LoginRestaurant.rejected, (state, action) => {
      state.errorLogin = action.payload as string;
    });

    builder.addCase(LoginRestaurant.pending, (state) => {
      state.errorLogin = null;
    });

    builder.addCase(editClient.fulfilled, (state, action) => {
      state.errorEdited = null;
      state.user = action.payload;
    });

    builder.addCase(editClient.rejected, (state, action) => {
      state.errorEdited = action.payload as string;
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
    builder.addCase(getAllRestaurants.fulfilled, (state, action) => {
      state.allRestaurants = action.payload;
    });

    builder.addCase(getAllRestaurants.rejected, (state, action) => {
      state.errorLoadRestaurants = action.payload as string;
    });

    builder.addCase(editRestaurant.fulfilled, (state, action) => {
      state.errorEdited = null;
      state.user = action.payload;
    });

    builder.addCase(editRestaurant.rejected, (state, action) => {
      state.errorEdited = action.payload as string;
    });
  },
});
export const { logout, clearError, setToken, setTokens } = authSlice.actions;

export default authSlice.reducer;
