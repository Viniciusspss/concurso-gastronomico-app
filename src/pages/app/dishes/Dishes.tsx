import { DefaultHeader } from "@/components/DefaultHeader";
import { dishs } from "../../../data/dishs";
import { DishCard } from "./DishCard";
import { Dialog } from "@/components/ui/dialog";
import { DishDetails } from "./DishDetails";
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
      <div className="grid grid-cols-4 gap-6">
        {dishs &&
          dishs.map((dish, index) => {
            return (
              <button key={index} onClick={() => handleOpenDialog(dish)}>
                <DishCard dish={dish} />
              </button>
            );
          })}
      </div>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedDish && <DishDetails dish={selectedDish} />}
      </Dialog>
    </div>
  );
}
