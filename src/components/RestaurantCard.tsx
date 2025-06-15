import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllRestaurantsType } from "@/types/user/restaurant";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loadAllDishes } from "@/store/slices/dishSlice/dishThunks";


type RestaurantCardProps = {
  restaurant: getAllRestaurantsType;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const restaurantDishes = dishes.filter((dish) => {
    return dish.restaurant.id === restaurant.id;
  }).length;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllDishes());
  }, [dispatch]);
  return (
    <Link to={`/view-restaurant-dishes/${restaurant.id}`}>

      <div className="mb-8 flex  w-60 sm:h-80 sm:w-80 flex-col  shadow-2xl hover:cursor-pointer ">

        <div className="h-55 w-full">
          <img
            src={`http://localhost:8080/api${restaurant.image_url}`}
            alt="Foto do prato"
            className="h-full w-full  object-cover"
          />
        </div>
        <div className="flex w-full flex-1 flex-col items-start justify-between gap-2 px-3 py-3">
          <div className=" flex w-full">
            <div className="flex w-full flex-col  justify-center">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                {restaurant.name}
              </h1>
              {restaurantDishes === 1 ? (
                <p className="text-sm text-[var(--text-muted)]">
                  {restaurantDishes} prato cadastrado
                </p>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">
                  {restaurantDishes} pratos cadastrados
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full items-center justify-center">

          </div>
        </div>
      </div>
    </Link>
  );
}
