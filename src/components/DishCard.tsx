import { getAllDishesResponse } from "@/types/dishes";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { DishDialog } from "./DishDialog";
import { Dialog } from "./ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setSelectedDish } from "@/store/slices/dishSlice/dishSlice";

type DishCardProps = {
  dish: getAllDishesResponse;
};

export function DishCard({ dish }: DishCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  function handleOpen() {
    setDialogOpen(true);
    dispatch(setSelectedDish(dish));
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    dispatch(setSelectedDish(null));
  }

  return (
    <div className="flex h-115 flex-col rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-background)] hover:cursor-pointer">
      <div className="h-55 w-full">
        <img
          src={`http://localhost:8080/api/uploads/${dish.image_url}`}
          alt="Foto do prato"
          className="h-full w-full rounded-t-2xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-between gap-2 px-3 py-3">
        <div className="mt-5 flex w-full justify-between">
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-[var(--color-primary)]">
              {dish.name}
            </h1>
            <p className="text-sm text-[var(--text-primary)]">
              {dish.restaurant.name}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div>
              <p className="text-sm text-[var(--text-primary)]">avaliações</p>
            </div>
            <div className="flex gap-2">
              <StarIcon className="text-[var(--color-primary)]" />
              <StarIcon className="text-[var(--color-primary)]" />
              <StarIcon className="text-[var(--color-primary)]" />
              <StarIcon className="text-[var(--color-primary)]" />
              <StarIcon className="text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <p className="text-left text-sm break-words text-[var(--text-muted)]">
          {dish.details}
        </p>
        <div className="flex w-full items-center justify-center">
          <Button
            onClick={handleOpen}
            variant="default"
            className="w-[97%] hover:cursor-pointer"
          >
            Avaliar prato
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DishDialog onClose={handleCloseDialog} />
      </Dialog>
    </div>
  );
}
