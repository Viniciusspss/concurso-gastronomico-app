import { reviewSchema, reviewType } from "@/types/review";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createReview = createAsyncThunk(
  "review/createReview",
  async (
    {
      comment,
      rating,
      user_id,
      dish_id,
    }: { comment: string; rating: number; user_id: string; dish_id: string },
    thunkAPI,
  ) => {
    const parseResult = reviewSchema.safeParse({
      comment,
      rating,
      user_id,
      dish_id,
    });

    if (!parseResult.success) {
      return thunkAPI.rejectWithValue("Avaliação incompleta!");
    }

    const reviews = localStorage.getItem("reviews");
    const parsedReviews: reviewType[] = reviews ? JSON.parse(reviews) : [];

    const isVoted = parsedReviews.some((review) => {
      return user_id === review.user_id && dish_id === review.dish_id;
    });

    if (isVoted) {
      return thunkAPI.rejectWithValue(
        "Só é permitido votar uma vez por prato!",
      );
    }
    const newReview = {
      ...parseResult.data,
    };

    const storageReviews = localStorage.getItem("reviews");
    const parsedStorageReviews: reviewType[] = storageReviews
      ? JSON.parse(storageReviews)
      : [];

    parsedStorageReviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(parsedStorageReviews));

    return parsedStorageReviews;
  },
);
