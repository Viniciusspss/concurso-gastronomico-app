import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import dishReducer from "./slices/dishSlice/dishSlice";
import reviewReducer from "./slices/reviewSlice/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishReducer,
    reviews: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
