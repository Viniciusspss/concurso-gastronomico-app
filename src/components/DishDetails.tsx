import { DishesWithRestaurant } from "@/types/dishes";
import imageDish from "@/assets/pratoImage.jpg";
import { DefaultButton } from "@/components/DefaultButton";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

type DishDetailsProps = {
  dish: DishesWithRestaurant;
  onClose: () => void;
};

export function DishDetails({ dish, onClose }: DishDetailsProps) {
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
                {dish.title}
              </DialogTitle>
              <DialogDescription className="text-amber-50">
                {dish.description}
              </DialogDescription>
              <DialogDescription className="text-amber-50">
                <span className="text-amber-500">Restaurante: </span>
                {dish.restaurant?.name}
              </DialogDescription>
              <DialogDescription className="text-amber-50">
                <span className="text-amber-500">Preço: </span>R${dish.price}
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="flex gap-3">
            <Link to="/evaluate-dish">
              <DefaultButton className="text-xs">AVALIAR</DefaultButton>
            </Link>
            <DefaultButton className="text-xs" onClick={() => onClose()}>
              FECHAR
            </DefaultButton>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
