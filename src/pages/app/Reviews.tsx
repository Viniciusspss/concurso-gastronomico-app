import { DefaultHeader } from "@/components/DefaultHeader";

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
        <div className="min-h-screen w-full bg-[var(--color-background)]">

            <Helmet title={`${dish?.name} | Concurso gastronômico`} />
            {userRole === "client" ? (
                <DefaultHeader />
            ) : <RestaurantHeader />}
            <div className="mt-10 mb-20 flex gap-4 flex-col justify-between px-20">
                <div className="px-6 ">
                    <h1 className=" text-4xl font-bold text-[var(--text-primary)]">
                        {dish?.name}
                    </h1>
                    <h2 className=" text-xl  text-[var(--color-primary)]">
                        {dish.restaurant.name}
                    </h2>
                </div>
                <div className="flex justify-between ">
                    <img
                        className="h-100 w-3/6 object-cover "
                        src={`http://localhost:8080/api/uploads/${dish?.image_url}`}
                    />
                    <div className="flex flex-col  justify-between h-80 bg-[var(--color-background)]">
                        <RatingCard reviews={dish.reviews} />
                        {dish?.reviews.length === 0 && (
                            <h1 className="flex w-full  justify-center text-2xl text-[var(--text-muted)]">
                                Este prato ainda não foi avaliado por ninguém.
                            </h1>
                        )}
                    </div>
                </div>

            </div>

            {dish?.reviews.length > 0 && (
                <div className="w-full py-20 bg-[var(--color-background)]">
                    <h1 className="text-4xl mb-10 text-[var(--text-primary)] font-bold text-center">AVALIAÇÕES</h1>

                    <div className="flex gap-8 flex-col items-center ">
                        {dish?.reviews.map((review, index) => {
                            return (
                                <ReviewCard review={review} key={index} />
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    );
}
