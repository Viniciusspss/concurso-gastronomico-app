import { DefaultHeader } from "@/components/DefaultHeader";
import { DishCard } from "../../../components/DishCard";
import { Dialog } from "@/components/ui/dialog";
import { DishDetails } from "../../../components/DishDetails";
import { useState } from "react";
import { DishesWithRestaurant } from "@/types/dishes";
import { useDishContext } from "@/context/dishContext/useDishContext";

export function Dishes() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { dishes } = useDishContext();
  const [selectedDish, setSelectedDish] = useState<DishesWithRestaurant | null>(
    null,
  );

  const handleOpenDialog = (dish: DishesWithRestaurant) => {
    setIsDetailsOpen(true);
    setSelectedDish(dish);
  };

  const handleCloseDialog = () => {
    setIsDetailsOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="flex flex-col gap-15">
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
