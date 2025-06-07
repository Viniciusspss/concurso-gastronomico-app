import { DefaultHeader } from "@/components/DefaultHeader";
import image from "@/assets/backgroundDishesImage.png";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getAllRestaurants } from "@/store/slices/authSlice/restaurantThunks";
import { loadAllDishes } from "@/store/slices/dishSlice/dishThunks";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { DishCard } from "@/components/DishCard";
import { toast } from "react-toastify";
import { clearAll } from "@/store/slices/reviewSlice/reviewSlice";
import { useRestaurantStats } from "@/hooks/useRestaurantStats";
import { Helmet } from "react-helmet-async";

export function ViewRestaurantDishes() {
  const id = useParams<{ id: string }>();
  const state = useAppSelector((state) => state.auth);
  const reviewState = useAppSelector((state) => state.reviews);
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
    if (reviewState.errorReview) {
      toast.error(reviewState.errorReview);
      dispatch(clearAll());
    }
  }, [dispatch, reviewState.errorReview]);

  const [search, setSearch] = useState("");
  const filtredDishes = restaurantDishes.filter((d) => {
    return d.name.toLowerCase().includes(search?.toLowerCase());
  });

  return (
    <div className="h-screen w-full bg-[var(--color-background)]">
      <Helmet title={`${restaurant?.name} | Concurso gastronômico`} />
      <DefaultHeader />
      <img className="h-50 w-full" src={image} alt="" />
      <div className="-mt-20 mb-15 flex justify-between px-20">
        <img
          className="h-40 w-40 rounded-full"
          src={`http://localhost:8080/api${restaurant?.image_url}`}
        />
        <div className="flex flex-col items-end justify-center">
          <h1 className="mb-5 text-4xl font-bold text-[var(--color-primary)]">
            {restaurant?.name}
          </h1>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {qtdDishes} PRATOS
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {qtdAllReviews} AVALIAÇÕES NO TOTAL
          </p>
        </div>
      </div>
      <div className="mb-10 flex w-full flex-col px-15">
        <div className="flex w-full justify-between">
          <h2 className="border-b-2 border-[var(--color-primary)] text-2xl text-[var(--text-primary)]">
            Pratos do restaurante
          </h2>
          <div className="relative flex">
            <Input
              placeholder="Buscar prato"
              className="bg-[var(--color-background)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="absolute right-3 mt-2 mb-2 size-4" />
          </div>
        </div>
      </div>

      {restaurantDishes.length === 0 ? (
        <h1 className="flex w-full justify-center text-2xl text-[var(--text-foreground)]">
          Este restaurante ainda não possui pratos cadastrados.
        </h1>
      ) : filtredDishes.length === 0 ? (
        <h1 className="flex w-full justify-center text-2xl text-[var(--text-foreground)]">
          Nenhum prato encontrado com esse nome!
        </h1>
      ) : (
        <div className="grid gap-6 bg-[var(--color-background)] px-15 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtredDishes.map((dish, index) => {
            return <DishCard dish={dish} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}
