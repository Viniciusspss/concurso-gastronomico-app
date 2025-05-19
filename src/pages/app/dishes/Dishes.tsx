import { DefaultHeader } from "@/components/DefaultHeader";
import { DishCard } from "../../../components/DishCard";
import { Dialog } from "@/components/ui/dialog";
import { DishDetails } from "../../../components/DishDetails";
import { useEffect, useState } from "react";
import { DishesWithRestaurant } from "@/types/dishes";
import { useAppSelector } from "@/hooks/useAppSelector";
import { loadAllDishes } from "@/store/slices/dishSlice/dishThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export function Dishes() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { dishes } = useAppSelector(state => state.dishes);
  const dispatch = useAppDispatch()
  const [selectedDish, setSelectedDish] = useState<DishesWithRestaurant | null>(
    null,
  );

  useEffect(() => {
    dispatch(loadAllDishes())
  }, [dispatch]);

  const handleOpenDialog = (dish: DishesWithRestaurant) => {
    setIsDetailsOpen(true);
    setSelectedDish(dish);
  };

  const handleCloseDialog = () => {
    setIsDetailsOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="flex w-full flex-col gap-15">
      <DefaultHeader />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dishes &&
          dishes.map((dish, index) => {
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
            dish={selectedDish}
            onClose={() => handleCloseDialog()}
          />
        )}
      </Dialog>
    </div>
  );
}
