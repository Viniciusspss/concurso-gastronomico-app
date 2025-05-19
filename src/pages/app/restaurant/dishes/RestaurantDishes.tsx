import { DishCard } from "@/components/DishCard";
import { DishDetails } from "@/components/DishDetails";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setSelectedDish } from "@/store/slices/dishSlice/dishSlice";
import { loadRestaurantDishes } from "@/store/slices/dishSlice/dishThunks";
import { DishesType } from "@/types/dishes";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export function RestaurantDishes() {

  const { restaurantDishes, selectedDish } = useAppSelector(state => state.dishes)
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (user?.id) {
      dispatch(loadRestaurantDishes(user.id))
    }
  }, [dispatch, user?.id]);

  if (user?.id != id) {
    return <Navigate to="/" />;
  }

  const handleOpenDialog = (dish: DishesType) => {
    setIsDetailsOpen(true);
    dispatch(setSelectedDish(dish))
  };

  const handleCloseDialog = () => {
    setIsDetailsOpen(false);
    dispatch(setSelectedDish(null));
  };

  return (
    <div className="flex w-full flex-col gap-15">
      <RestaurantHeader />
      {restaurantDishes.length === 0 && (
        <h1 className="mx-auto text-2xl text-amber-50">
          Não há nenhum prato cadastrado pelo seu restaurante!
        </h1>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {restaurantDishes &&
          restaurantDishes.map((dish, index) => {
            return (
              <button key={index} onClick={() => handleOpenDialog(dish)}>
                <DishCard dish={dish} />
              </button>
            );
          })}
      </div>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedDish && (
          <DishDetails
            restaurantDish={selectedDish}
            onClose={() => handleCloseDialog()}
          />
        )}
      </Dialog>
    </div>
  );
}
