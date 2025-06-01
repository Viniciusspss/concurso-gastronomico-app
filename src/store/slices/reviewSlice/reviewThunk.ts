import api from "@/api/axios";
import { RootState } from "@/store/store";
import { reviewType, validationReviewSchema } from "@/types/review";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (
    { comment, rating }: { comment: string; rating: number },
    thunkAPI,
  ) => {
    const parseResult = validationReviewSchema.safeParse({
      comment,
      rating,
    });

    if (!parseResult.success) {
      return thunkAPI.rejectWithValue("Avaliação incompleta!");
    }

    const state = thunkAPI.getState() as RootState;
    const dishId = state.dishes.selectedDish?.id;
    const token = state.auth.acessToken;

    try {
      const responseReview = await api.post(
        `/reviews/me/dishes/${dishId}`,
        parseResult.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result: reviewType = responseReview.data;
      return result;
    } catch {
      return thunkAPI.rejectWithValue("Você já avaliou esse prato!");
    }
  },
);
