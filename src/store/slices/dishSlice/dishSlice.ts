import { DishesType, DishesWithRestaurant } from "@/types/dishes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    editDish: (
      state,
      action: PayloadAction<{
        dishId: string;
        title: string;
        price: number;
        description: string;
      }>,
    ) => {
      const { dishId, price, description, title } = action.payload;
      state.restaurantDishes = state.restaurantDishes.map((dish) => {
        if (dish.id === dishId) {
          return {
            ...dish,
            title,
            price,
            description,
          };
        }
        return dish;
      });
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

    builder.addCase(loadRestaurantDishes.fulfilled, (state, action) => {
      state.restaurantDishes = action.payload;
    });
  },
});

export const { editDish, deleteDish } = dishSlice.actions;
export default dishSlice.reducer;
