import { reviewType } from "@/types/review";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createReview } from "./reviewThunk";

interface reviewState {
  reviews: reviewType[] | null;
  errorReview: string | null;
}

const initialState: reviewState = {
  reviews: [],
  errorReview: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorReview = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createReview.fulfilled,
      (state, action: PayloadAction<reviewType[]>) => {
        state.reviews = action.payload;
        state.errorReview = null;
      },
    );
    builder.addCase(createReview.rejected, (state, action) => {
      state.errorReview = action.payload as string;
    });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
