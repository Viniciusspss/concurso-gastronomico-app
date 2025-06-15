import { DishCard } from "@/components/DishCard";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { loadAllDishes } from "@/store/slices/dishSlice/dishThunks";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from "@/assets/backgroundDishesImage.png";
import { useRestaurantStats } from "@/hooks/useRestaurantStats";
import { getAllRestaurants } from "@/store/slices/authSlice/restaurantThunks";
import { setSelectedDish } from "@/store/slices/dishSlice/dishSlice";
import { Helmet } from "react-helmet-async";

export function RestaurantDishes() {
  const id = useParams<{ id: string }>();
  const state = useAppSelector((state) => state.auth);
  const restaurant = state?.allRestaurants?.find((r) => r.id === id.id);
  const { qtdDishes, qtdAllReviews, restaurantDishes } = useRestaurantStats(
    id.id,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    {
      dispatch(getAllRestaurants());
      dispatch(loadAllDishes());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedDish(null));
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const filtredDishes = restaurantDishes.filter((d) => {
    return d.name.toLowerCase().includes(search?.toLowerCase());
  });

  return (
    <div className="h-screen w-full bg-[var(--color-background)]">
      <Helmet title={`${restaurant?.name} | Concurso gastronômico`} />
      <RestaurantHeader />
      <img className="h-50 w-full mt-20 sm:mt-0" src={image} alt="" />
      <div className="-mt-10 sm:-mt-20 mb-15 flex justify-between sm:px-20 px-10">
        <img
          className="h-20 w-20 sm:h-40 sm:w-40 rounded-full"
          src={`http://localhost:8080/api${restaurant?.image_url}`}
        />
        <div className="flex flex-col items-end justify-center">
          <h1 className="mt-3 sm:mb-5 text-xl sm:text-4xl font-bold text-[var(--color-primary)]">
            {restaurant?.name}
          </h1>
          <h2 className="text-sm sm:text-xl font-bold text-[var(--text-primary)]">
            {qtdDishes} PRATOS
          </h2>
          {qtdAllReviews === 1 ? (
            <p className="text-[10px] sm:text-sm text-[var(--text-muted)]">
              {qtdAllReviews} AVALIAÇÃO NO TOTAL
            </p>
          ) : (
            <p className="text-[10px] sm:text-sm text-[var(--text-muted)]">
              {qtdAllReviews} AVALIAÇÕES NO TOTAL
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col px-8 sm:px-15">
        <div className="flex w-full justify-between items-end">
          <h2 className="h-5 sm:h-8 border-b-2 border-[var(--color-primary)] text-sm sm:text-2xl text-[var(--text-primary)]">
            Pratos do restaurante
          </h2>
          <div className="relative items-center flex w-36 sm:w-70">
            <Input
              placeholder="Buscar prato"
              className="bg-[var(--color-background)] h-6 sm:h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute right-3 mt-2 mb-2 size-4 text-[var(--text-muted)]" />
          </div>
        </div>
      </div>

      {restaurantDishes.length === 0 ? (
        <h1 className="flex mt-8 w-full justify-center text-sm sm:text-2xl text-[var(--text-foreground)]">
          Não há nenhum prato cadastrado pelo seu restaurante!
        </h1>
      ) : filtredDishes.length === 0 ? (
        <h1 className="flex mt-8 w-full justify-center text-sm sm:text-2xl text-[var(--text-foreground)]">
          Nenhum prato encontrado com esse nome!
        </h1>
      ) : (
        <div className=" px-8 py-5 grid gap-6 bg-[var(--color-background)] sm:px-15 sm:py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtredDishes.map((dish, index) => {
            return <DishCard dish={dish} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}
