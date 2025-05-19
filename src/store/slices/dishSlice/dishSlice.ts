import { DishesWithRestaurant } from "@/types/dishes";
import { createSlice } from "@reduxjs/toolkit";
import { loadAllDishes } from "./dishThunks";

interface DishState {
  dishes: DishesWithRestaurant[];
}
const storageDishes = localStorage.getItem("dishes");

const initialState: DishState = {
  dishes: storageDishes
    ? (JSON.parse(storageDishes) as DishesWithRestaurant[])
    : [],
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllDishes.fulfilled, (state, action) => {
      state.dishes = action.payload;
    });
  },
});

export default dishSlice.reducer;
