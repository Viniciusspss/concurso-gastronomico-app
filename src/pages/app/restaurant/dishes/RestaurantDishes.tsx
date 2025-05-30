import { DefaultButton } from "@/components/DefaultButton";
import { DishCard } from "@/components/DishCard";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { loadRestaurantDishes } from "@/store/slices/dishSlice/dishThunks";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export function RestaurantDishes() {

  const { restaurantDishes } = useAppSelector(state => state.dishes)
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch()
  const { id } = useParams();

  useEffect(() => {
    if (user?.id) {
      dispatch(loadRestaurantDishes())
    }

  }, [dispatch, user?.id, restaurantDishes]);

  if (user?.id != id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex w-full flex-col gap-15">
      <RestaurantHeader />
      {restaurantDishes.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="mx-auto text-2xl text-amber-50">
            Não há nenhum prato cadastrado pelo seu restaurante!
          </h1>
          <Link to="/create-dish">
            <DefaultButton>
              CADASTRAR PRATO
            </DefaultButton>
          </Link>

        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {restaurantDishes &&
          restaurantDishes.map((dish, index) => {
            return (
              <DishCard dish={dish} key={index} />
            );
          })}
      </div>
    </div>
  );
}
