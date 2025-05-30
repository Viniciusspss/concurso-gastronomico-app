import { DefaultHeader } from "@/components/DefaultHeader";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllRestaurants } from "@/store/slices/authSlice/restaurantThunks";
import { useEffect } from "react";

export function Restaurants() {
    const restaurants = useAppSelector(state => state.auth.allRestaurants)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch]);
    return (
        <div className="flex flex-col w-full">
            <DefaultHeader />
            <div className="relative p-8 w-full h-screen bg-gradient-to-br from-[var-(--color-background)] to-[var(--text-foreground)]">
                <h1 className="font-bold text-[var(--text-primary)] text-2xl mb-7 border-b-3 w-20 border-[var(--color-primary)]">Restaurantes</h1>
                <div className="grid  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {restaurants &&
                        restaurants.map((restaurant, index) => {
                            return (
                                <RestaurantCard restaurant={restaurant} key={index} />
                            );
                        })}
                </div>
            </div>
        </div>

    )
}