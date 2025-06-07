import { DefaultHeader } from "@/components/DefaultHeader";
import image from "@/assets/backgroundDishesImage.png";

import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loadAllDishes, reviewAverageRating } from "@/store/slices/dishSlice/dishThunks";
import { ReviewCard } from "@/components/ReviewCard";
import { RatingCard } from "@/components/RatingCard";
import { RestaurantHeader } from "@/components/RestaurantHeader";

export function Reviews() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { dishes } = useAppSelector(state => state.dishes)
    const dispatch = useAppDispatch()
    const userRole = localStorage.getItem("userRole")

    useEffect(() => {
        dispatch(loadAllDishes())
        if (id) {
            dispatch(reviewAverageRating(id))
        }
    }, [dispatch, id]);

    useEffect(() => {
        const userRole = localStorage.getItem("userRole")
        if (userRole !== "client" && userRole !== "restaurant") {
            navigate("/")
        }
    }, [navigate])

    const dish = dishes.find(d => d.id === id)

    if (!dish) {
        return (
            <div className="flex h-screen items-center justify-center text-lg text-[var(--text-muted)]">
                Carregando informações do prato...
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[var(--color-background)]">

            <Helmet title={`${dish?.name} | Concurso gastronômico`} />
            {userRole === "client" ? (
                <DefaultHeader />
            ) : <RestaurantHeader />}
            <img className="h-50 w-full" src={image} alt="" />
            <div className="-mt-20 mb-5 flex justify-between px-20">
                <img
                    className="h-40 w-40 rounded-full object-cover"
                    src={`http://localhost:8080/api/uploads/${dish?.image_url}`}
                />
                <div className="flex flex-col items-end justify-center">
                    <h1 className="mb-6 text-4xl font-bold text-[var(--color-primary)]">
                        {dish?.name}
                    </h1>
                </div>
            </div>
            <div className="flex w-full justify-end px-6">
                <RatingCard reviews={dish.reviews} />
            </div>

            {dish?.reviews.length === 0 ? (
                <h1 className="flex w-full justify-center text-2xl text-[var(--text-foreground)]">
                    Este prato ainda não foi avaliado por ninguém.
                </h1>
            ) : (
                <div className="grid gap-6 bg-[var(--color-background)] px-15 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {dish?.reviews.map((review, index) => {
                        return (
                            <ReviewCard review={review} key={index} />
                        )
                    })}
                </div>
            )}
        </div>
    );
}
