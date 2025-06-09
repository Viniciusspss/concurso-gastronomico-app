import { DefaultHeader } from "@/components/DefaultHeader";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllRestaurants } from "@/store/slices/authSlice/restaurantThunks";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import bgImage from "@/assets/backgroundDishesImage.png";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function Restaurants() {
  const restaurants = useAppSelector((state) => state.auth.allRestaurants);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const filtredRestaurants = restaurants?.filter((d) => {
    return d.name.toLowerCase().includes(search?.toLowerCase());
  });


  return (
    <div className="flex min-h-screen w-full flex-col  ">
      <Helmet title="Restaurantes | Concurso gastronômico" />
      <DefaultHeader />
      <div className="relative w-full">
        <img
          src={bgImage}
          alt="Imagem de fundo"
          className="w-full  h-80 object-cover"
        />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[60%] flex flex-col items-center justify-center gap-4">
          <div className="flex relative w-full">
            <SearchIcon className="absolute left-3 top-3 mt-2 mb-2 size-4" />
            <Input
              className="h-14 rounded-4xl text-base px-10"
              placeholder="Nome do restaurante"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <h1 className="text-white text-2xl font-semibold text-center ">
            Busque por um restaurante
          </h1>
        </div>




        {restaurants?.length === 0 ? (
          <h1 className="p-8 flex w-full justify-center text-2xl text-[var(--text-muted)]">
            Nenhum restaurante foi cadastrado até o momento!
          </h1>
        ) : filtredRestaurants?.length === 0 ? (
          <h1 className="p-8 flex w-full justify-center text-2xl text-[var(--text-muted)]">
            Nenhum restaurante encontrado com esse nome!
          </h1>
        ) : (
          <div className="p-8">
            <div className="grid  px-22 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {filtredRestaurants?.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant} key={index} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
