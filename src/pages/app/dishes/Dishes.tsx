import { DefaultHeader } from "@/components/DefaultHeader";
import { DishCard } from "../../../components/DishCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { loadAllDishes } from "@/store/slices/dishSlice/dishThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import bgImage from "@/assets/backgroundDishesImage.png"
import { Helmet } from "react-helmet-async";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Dishes() {
  const { dishes } = useAppSelector(state => state.dishes);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadAllDishes())
  }, [dispatch]);


  const [search, setSearch] = useState("");
  const filtredDishes = dishes.filter((d) => {
    return d.name.toLowerCase().includes(search?.toLowerCase());
  });


  return (
    <div className="flex w-full flex-col">
      <Helmet title="Pratos | Concurso Gastronômico" />
      <DefaultHeader />
      <div className="relative w-full ">
        <img src={bgImage} alt="Imagem de fundo" className="h-80 w-full " />

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[60%] flex flex-col items-center justify-center gap-4">
          <div className="flex relative w-full">
            <SearchIcon className="absolute left-3 top-3 mt-2 mb-2 size-4" />
            <Input
              className="h-14 rounded-4xl text-base px-10"
              placeholder="Nome do prato"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <h1 className="text-white text-2xl font-semibold text-center ">
            Busque por um prato
          </h1>
        </div>


        {dishes.length === 0 ? (
          <h1 className="p-8 flex w-full justify-center text-2xl text-[var(--text-muted)]">
            Nenhum prato foi cadastrado até o momento!
          </h1>
        ) : filtredDishes.length === 0 ? (
          <h1 className="p-8 flex w-full justify-center text-2xl text-[var(--text-muted)]">
            Nenhum prato encontrado com esse nome!
          </h1>
        ) : (
          <div className="grid p-8 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtredDishes.map((dish, index) => {
              return (
                <DishCard dish={dish} key={index} />
              );
            })}
          </div>
        )}



      </div>

    </div>
  );
}
