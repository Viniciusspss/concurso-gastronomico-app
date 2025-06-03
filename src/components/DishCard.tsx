import { getAllDishesResponse } from "@/types/dishes";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { DishDialog } from "./DishDialog";
import { Dialog } from "./ui/dialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setSelectedDish } from "@/store/slices/dishSlice/dishSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Link } from "react-router-dom";

type DishCardProps = {
  dish: getAllDishesResponse;
};

export function DishCard({ dish }: DishCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const qtdReviews = dish.reviews.length;
  const dispatch = useAppDispatch();

  function handleOpen() {
    setDialogOpen(true);
    dispatch(setSelectedDish(dish));
  }

  function handleSelectDish() {
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
              {qtdReviews === 1 ? (
                <p className="text-[11px] text-[var(--text-primary)]">
                  (1 avaliação)
                </p>
              ) : (
                <p className="text-[11px] text-[var(--text-primary)]">
                  ({qtdReviews} avaliações)
                </p>
              )}
            </div>
            <div className="flex gap-1">
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
          {user && "email" in user ? (
            <Button
              onClick={handleOpen}
              variant="default"
              className="w-[97%] hover:cursor-pointer"
            >
              Avaliar prato
            </Button>
          ) : (
            <Link
              to={`/restaurant-edit-dish/${dish.id}`}
              className="flex w-full"
            >
              <Button
                onClick={handleSelectDish}
                variant="default"
                className="w-[97%] hover:cursor-pointer"
              >
                Editar prato
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DishDialog onClose={handleCloseDialog} />
      </Dialog>
    </div>
  );
}
