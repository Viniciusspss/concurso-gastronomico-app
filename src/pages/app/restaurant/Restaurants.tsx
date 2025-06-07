import { DefaultHeader } from "@/components/DefaultHeader";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllRestaurants } from "@/store/slices/authSlice/restaurantThunks";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export function Restaurants() {
  const restaurants = useAppSelector((state) => state.auth.allRestaurants);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Helmet title="Restaurantes | Concurso gastronômico" />
      <DefaultHeader />
      <div className="relative w-full bg-gradient-to-br from-[var-(--color-background)] to-[var(--text-foreground)]">
        <div className="p-8">
          <h1 className="mb-7 w-20 border-b-3 border-[var(--color-primary)] text-2xl font-bold text-[var(--text-primary)]">
            Restaurantes
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
