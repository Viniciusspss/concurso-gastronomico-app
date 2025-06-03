import { getAllDishesResponse } from "@/types/dishes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createDish,
  deleteDish,
  editDish,
  loadAllDishes,
  loadRestaurantDishes,
} from "./dishThunks";

interface DishState {
  dishes: getAllDishesResponse[];
  restaurantDishes: getAllDishesResponse[];
  selectedDish: getAllDishesResponse | null;
  errorCreateDish: string | null;
  isCreated: boolean;
  loadError: string | null;
  isEditedDish: boolean;
  editedError: string | null;
  isDeletedDish: boolean;
  deletedError: string | null;
}

const initialState: DishState = {
  dishes: [],
  restaurantDishes: [],
  selectedDish: null,
  errorCreateDish: null,
  isCreated: false,
  loadError: null,
  isEditedDish: false,
  editedError: null,
  isDeletedDish: false,
  deletedError: null,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorCreateDish = null;
      state.loadError = null;
      state.editedError = null;
      state.isDeletedDish = false;
    },
    setSelectedDish(state, action: PayloadAction<getAllDishesResponse | null>) {
      state.selectedDish = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadAllDishes.fulfilled, (state, action) => {
      state.dishes = action.payload;
    });
    builder.addCase(loadAllDishes.rejected, (state, action) => {
      state.loadError = action.payload as string;
    });

    builder.addCase(loadRestaurantDishes.fulfilled, (state, action) => {
      state.restaurantDishes = action.payload || [];
    });

    builder.addCase(createDish.fulfilled, (state) => {
      state.isCreated = true;
      state.errorCreateDish = null;
    });
    builder.addCase(createDish.rejected, (state, action) => {
      state.errorCreateDish = action.payload as string;
      state.isCreated = false;
    });
    builder.addCase(editDish.fulfilled, (state) => {
      state.isEditedDish = true;
      state.editedError = null;
    });
    builder.addCase(editDish.rejected, (state, action) => {
      state.isEditedDish = false;
      state.editedError = action.payload as string;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.isDeletedDish = true;
      state.deletedError = null;
    });
    builder.addCase(deleteDish.rejected, (state, action) => {
      state.isDeletedDish = false;
      state.deletedError = action.payload as string;
    });
  },
});

export const { setSelectedDish, clearError } = dishSlice.actions;
export default dishSlice.reducer;
