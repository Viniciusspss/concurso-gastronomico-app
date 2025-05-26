import { getAllDishesResponse } from "@/types/dishes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDish, loadAllDishes, loadRestaurantDishes } from "./dishThunks";

interface DishState {
  dishes: getAllDishesResponse[];
  restaurantDishes: getAllDishesResponse[];
  selectedDish: getAllDishesResponse | null;
  errorCreateDish: string | null;
  isCreated: boolean;
  loadError: string | null;
}

const initialState: DishState = {
  dishes: [],
  restaurantDishes: [],
  selectedDish: null,
  errorCreateDish: null,
  isCreated: false,
  loadError: null,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorCreateDish = null;
    },
    setSelectedDish(state, action: PayloadAction<getAllDishesResponse | null>) {
      state.selectedDish = action.payload;
    },
    editDish: (
      state,
      action: PayloadAction<{
        dishId: string;
        name: string;
        price: number;
        details: string;
      }>,
    ) => {
      const { dishId, price, details, name } = action.payload;
      const updatedDishes = state.restaurantDishes.map((dish) => {
        if (dish.id === dishId) {
          return {
            ...dish,
            name,
            price: JSON.stringify(price),
            details,
          };
        }
        return dish;
      });

      state.restaurantDishes = updatedDishes;
      localStorage.setItem("restaurantDishes", JSON.stringify(updatedDishes));
    },
    deleteDish: (state, action: PayloadAction<{ dishId: string }>) => {
      const updatedDishes = state.restaurantDishes.filter(
        (dish) => dish.id !== action.payload.dishId,
      );

      state.restaurantDishes = updatedDishes;
      localStorage.setItem("restaurantDishes", JSON.stringify(updatedDishes));
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
  },
});

export const { editDish, deleteDish, setSelectedDish, clearError } =
  dishSlice.actions;
export default dishSlice.reducer;
