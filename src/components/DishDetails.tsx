import { DishesType, DishesWithRestaurant } from "@/types/dishes";
import imageDish from "@/assets/pratoImage.jpg";
import { DefaultButton } from "@/components/DefaultButton";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/authContext/useAuthContext";
import { showMessage } from "@/adapters/showMessage";
import { useDishContext } from "@/context/dishContext/useDishContext";

type DishDetailsProps = {
  dish?: DishesWithRestaurant;
  restaurantDish?: DishesType;
  onClose: () => void;
};

export function DishDetails({
  dish,
  restaurantDish,
  onClose,
}: DishDetailsProps) {
  const { user } = useAuthContext();
  const { deleteDish, selectedDish } = useDishContext();

  function handleDelete(dish: DishesType) {
    showMessage.confirm(
      "Tem certeza que deseja limpar o histórico?",
      (confirmation) => {
        if (confirmation) {
          deleteDish(dish.id);
        }
      },
    );
  }

  return (
    <DialogContent className="w-full max-w-3xl border-0 bg-[#272727]">
      <div className="flex gap-5 px-5 py-5">
        <div className="h-auto">
          <img className="h-45 w-auto" src={imageDish} alt="Foto do prato" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <DialogHeader>
              <DialogTitle className="font-bold text-amber-500">
                {dish ? dish.title : restaurantDish?.title}
              </DialogTitle>
              <DialogDescription className="text-amber-50">
                {dish ? dish.description : restaurantDish?.description}
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
                <Link to="/restaurant-edit-dish">
                  <DefaultButton className="text-xs">EDITAR</DefaultButton>
                </Link>
                {selectedDish && (
                  <DefaultButton
                    className="text-xs"
                    onClick={() => handleDelete(selectedDish)}
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
  );
}
