import { reviewType } from "@/types/review";
import { createSlice } from "@reduxjs/toolkit";
import { createReview } from "./reviewThunk";

interface reviewState {
  reviews: reviewType[] | null;
  errorReview: string | null;
  isCreatedReview: boolean;
}

const initialState: reviewState = {
  reviews: [],
  errorReview: null,
  isCreatedReview: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearAll: (state) => {
      state.errorReview = null;
      state.isCreatedReview = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.reviews?.push(action.payload);
      state.errorReview = null;
      state.isCreatedReview = true;
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.errorReview = action.payload as string;
      state.isCreatedReview = false;
    });
  },
});

export const { clearAll } = reviewSlice.actions;
export default reviewSlice.reducer;
