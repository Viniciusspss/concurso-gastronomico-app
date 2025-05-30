import { getAllDishesResponse } from "@/types/dishes";
import { StarIcon } from "lucide-react";
import { Button } from "./ui/button";

type DishCardProps = {
  dish: getAllDishesResponse;
};

export function DishCard({ dish }: DishCardProps) {


  return (
    <div className=" h-115  bg-[var(--color-background)] flex flex-col hover:cursor-pointer border-2 border-[var(--color-primary)] rounded-2xl">
      <div className="h-55 w-full ">
        <img
          src={`http://localhost:8080/api/uploads/${dish.image_url}`}
          alt="Foto do prato"
          className="w-full object-cover rounded-t-2xl h-full"
        />

      </div>
      <div className="flex flex-col flex-1 items-start justify-between gap-2 px-3 py-3">
        <div className="flex w-full justify-between mt-5">
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-[var(--color-primary)]">{dish.name}</h1>
            <p className="text-sm text-[var(--text-primary)]">{dish.restaurant.name}</p>
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
        <div className="flex justify-center items-center w-full">
          <Button variant="default" className="w-[97%] hover:cursor-pointer">Avaliar prato</Button>
        </div>

      </div>
    </div>
  );
}
