import { DefaultButton } from "./DefaultButton";
import { DialogContent } from "./ui/dialog";
import { DishesType } from "@/types/dishes";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteDish } from "@/store/slices/dishSlice/dishSlice";
import { toast } from "react-toastify";

type DishDeleteProps = {
  onCloseDelete: () => void;
  onCloseMain: () => void;
};

export function DishDelete({ onCloseDelete, onCloseMain }: DishDeleteProps) {
  const { selectedDish } = useAppSelector(state => state.dishes)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false);

  function handleDeleteDish(dish: DishesType) {
    setIsLoading(true);

    setTimeout(() => {
      dispatch(deleteDish({ dishId: dish.id }));
      setIsLoading(false);
      onCloseMain();
      toast.success("Prato excluído com sucesso!")
    }, 1000);
  }

  return (
    <DialogContent className="flex w-full max-w-3xl flex-col items-center justify-center border-0 bg-[#272727]">
      <h2 className="text-xl text-amber-50">
        Tem certeza que deseja excluir o prato?
      </h2>
      <div className="flex items-center justify-center gap-4">
        {selectedDish && (
          <DefaultButton
            className="w-[60%] text-xs"
            onClick={() => handleDeleteDish(selectedDish)}
          >
            EXCLUIR
          </DefaultButton>
        )}

        <DefaultButton
          className="w-[60%] text-xs"
          onClick={() => onCloseDelete()}
        >
          CANCELAR
        </DefaultButton>
      </div>
      {isLoading && <Loader2Icon className="animate-spin text-amber-400" />}
    </DialogContent>
  );
}
