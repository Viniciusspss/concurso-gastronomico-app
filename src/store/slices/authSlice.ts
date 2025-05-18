import { mockClients, mockRestaurants } from "@/data/users";
import { UserType } from "@/types/user/user";
import { createSlice } from "@reduxjs/toolkit";
import { loginClient } from "./authThunks";

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
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authUser");
    },
  },
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
export const { logout } = authSlice.actions;

export default authSlice.reducer;
