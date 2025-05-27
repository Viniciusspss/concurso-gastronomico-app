import { DishesType, getAllDishesResponse } from "@/types/dishes";
import imageDish from "@/assets/pratoImage.jpg";
import { DefaultButton } from "@/components/DefaultButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DishDelete } from "./DishDelete";
import { useAppSelector } from "@/hooks/useAppSelector";

type DishDetailsProps = {
  dish?: getAllDishesResponse;
  restaurantDish?: DishesType;
  onClose: () => void;
};

export function DishDetails({
  dish,
  restaurantDish,
  onClose,
}: DishDetailsProps) {
  const { user } = useAppSelector(state => state.auth);
  const { selectedDish } = useAppSelector(state => state.dishes);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div>
      <DialogContent className="w-full max-w-3xl border-0 bg-[#272727]">
        <div className="flex gap-5 px-5 py-5">
          <div className="h-auto">
            <img className="h-45 w-auto" src={imageDish} alt="Foto do prato" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <DialogHeader>
                <DialogTitle className="font-bold text-amber-500">
                  {dish ? dish.name : restaurantDish?.name}
                </DialogTitle>
                <DialogDescription className="text-amber-50">
                  {dish ? dish.details : restaurantDish?.details}
                </DialogDescription>
                <DialogDescription className="text-amber-50">
                  <span className="text-amber-500">Restaurante: </span>
                  {user && "cnpj" in user && user.name}
                  {dish && dish.restaurant?.name}
                </DialogDescription>
                <DialogDescription className="text-amber-50">
                  <span className="text-amber-500">Preço: </span>R$
                  {dish ? dish.price : restaurantDish?.price}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="flex gap-3">
              {dish ? (
                <>
                  <Link to="/evaluate-dish">
                    <DefaultButton className="text-xs">AVALIAR</DefaultButton>
                  </Link>
                  <DefaultButton className="text-xs" onClick={() => onClose()}>
                    FECHAR
                  </DefaultButton>{" "}
                </>
              ) : (
                <>
                  <Link to={`/restaurant-edit-dish/${selectedDish?.id}`}>
                    <DefaultButton className="text-xs">EDITAR</DefaultButton>
                  </Link>
                  {selectedDish && (
                    <DefaultButton
                      className="text-xs"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      EXCLUIR
                    </DefaultButton>
                  )}

                  <DefaultButton className="text-xs" onClick={() => onClose()}>
                    FECHAR
                  </DefaultButton>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        {selectedDish && (
          <DishDelete
            onCloseDelete={() => setIsDeleteOpen(false)}
            onCloseMain={onClose}
          />
        )}
      </Dialog>
    </div>
  );
}
