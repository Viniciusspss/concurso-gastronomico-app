import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "./ui/button";
import { getAllRestaurantsType } from "@/types/user/restaurant";
import { Link } from "react-router-dom";

type RestaurantCardProps = {
  restaurant: getAllRestaurantsType;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const restaurantDishes = dishes.filter((dish) => {
    return dish.restaurant.id === restaurant.id;
  }).length;
  return (
    <div className="flex h-115 flex-col rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-background)] hover:cursor-pointer">
      <div className="h-55 w-full">
        <img
          src={`http://localhost:8080/api${restaurant.image_url}`}
          alt="Foto do prato"
          className="h-full w-full rounded-t-2xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-between gap-2 px-3 py-3">
        <div className="mt-5 flex w-full">
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              {restaurant.name}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {restaurantDishes} pratos cadastrados
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <Link to={`/view-restaurant-dishes/${restaurant.id}`}>
            <Button variant="default" className="w-[97%] hover:cursor-pointer">
              Ver pratos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
