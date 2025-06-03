import { getAllDishesResponse } from "@/types/dishes";
import { useAppSelector } from "./useAppSelector";

export function useRestaurantStats(restaurantId?: string) {
  const dishes: getAllDishesResponse[] = useAppSelector(
    (state) => state.dishes.dishes,
  );
  const restaurantDishes: getAllDishesResponse[] = dishes.filter((d) => {
    return d.restaurant.id === restaurantId;
  });

  const qtdDishes = restaurantDishes.length;
  const qtdAllReviews = restaurantDishes.reduce(
    (total, dish) => total + dish.reviews.length,
    0,
  );

  return { qtdDishes, qtdAllReviews, restaurantDishes };
}
