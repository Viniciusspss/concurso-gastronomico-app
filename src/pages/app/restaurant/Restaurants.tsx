import { DefaultHeader } from "@/components/DefaultHeader";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllRestaurants } from "@/store/slices/authSlice/restaurantThunks";
import { useEffect } from "react";
import image from "@/assets/backgroundRestaurants.jpg";

export function Restaurants() {
  const restaurants = useAppSelector((state) => state.auth.allRestaurants);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);
  return (
    <div className="flex w-full flex-col">
      <DefaultHeader />
      <div className="relative h-screen w-full bg-gradient-to-br from-[var-(--color-background)] to-[var(--text-foreground)]">
        <img
          src={image}
          className="absolute z-[-1] h-full w-full object-cover"
        />
        <div className="p-8">
          <h1 className="mb-7 w-20 border-b-3 border-[var(--color-primary)] text-2xl font-bold text-[var(--color-background)]">
            Restaurantes
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {restaurants &&
              restaurants.map((restaurant, index) => {
                return <RestaurantCard restaurant={restaurant} key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
