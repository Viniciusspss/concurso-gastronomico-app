import { DefaultHeader } from "@/components/DefaultHeader";
import { DishCard } from "../../../components/DishCard";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { loadAllDishes } from "@/store/slices/dishSlice/dishThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import bgImage from "@/assets/backgroundDishesImage.png"

export function Dishes() {
  const { dishes } = useAppSelector(state => state.dishes);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadAllDishes())
  }, [dispatch]);



  return (
    <div className="flex w-full flex-col">
      <DefaultHeader />
      <div className="relative p-8 w-full ">
        <img src={bgImage} alt="Imagem de fundo" className="absolute z-[-1] w-full inset-0" />
        <h1 className="font-bold text-[var(--color-background)] text-2xl mb-7 border-b-3 w-10 border-[var(--color-primary)]">Pratos</h1>
        <div className="grid  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dishes &&
            dishes.map((dish, index) => {
              return (
                <DishCard dish={dish} key={index} />
              );
            })}
        </div>
      </div>

    </div>
  );
}
