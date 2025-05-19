import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import dishReducer from "./slices/dishSlice/dishSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
