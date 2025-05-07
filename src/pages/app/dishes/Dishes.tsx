import { DefaultHeader } from "@/components/DefaultHeader";
import { dishes } from "../../../data/dishes";
import { DishCard } from "../../../components/DishCard";
import { Dialog } from "@/components/ui/dialog";
import { DishDetails } from "../../../components/DishDetails";
import { useState } from "react";
import { DishesType } from "@/types/dishes";

export function Dishes() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<DishesType | null>(null);

  const handleOpenDialog = (dish: DishesType) => {
    setIsDetailsOpen(true);
    setSelectedDish(dish);
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
            onClose={() => setIsDetailsOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}
