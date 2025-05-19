import { DishesType, DishesWithRestaurant } from "@/types/dishes";
import { createSlice } from "@reduxjs/toolkit";
import { loadAllDishes, loadRestaurantDishes } from "./dishThunks";

interface DishState {
  dishes: DishesWithRestaurant[];
  restaurantDishes: DishesType[];
  selectedDish: DishesType | null;
}

const initialState: DishState = {
  dishes: [],
  restaurantDishes: [],
  selectedDish: null,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllDishes.fulfilled, (state, action) => {
      state.dishes = action.payload;
    });

    builder.addCase(loadRestaurantDishes.fulfilled, (state, action) => {
      state.restaurantDishes = action.payload;
    });
  },
});

export default dishSlice.reducer;
