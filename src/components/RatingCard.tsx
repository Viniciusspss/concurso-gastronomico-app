import { Star } from "lucide-react";
import { Progress } from "./ui/progress";
import { useAppSelector } from "@/hooks/useAppSelector";

export type RatingCardProps = {
    id: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
    };
    rating: number;
    comment: string;
};

export function RatingCard({ reviews }: { reviews: RatingCardProps[] }) {
    const dish = useAppSelector(state => state.dishes)
    const total = reviews.length;

    const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter((r) => r.rating === rating).length;
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return { rating, count, percentage };
    });


    return (
        <div className="flex flex-col bg-[var(--color-background)] rounded-2xl border-1 p-4 shadow-2xs w-130 gap-6">
            <h1 className="text-[var(--text-primary)] font-bold">Avaliações dos clientes</h1>
            <div className="flex justify-between">
                <div className="h-full flex flex-col justify-between ">
                    <h1 className="flex items-center text-4xl font-bold gap-3">{dish.averageRating?.toFixed(1)} <Star className="w-10 h-10 fill-[var(--color-primary)] text-[var(--color-primary)] " /></h1>
                    <h2 className="text-[var(--text-muted)]">
                        {total} {total === 1 ? "avaliação" : "avaliações"}
                    </h2>
                </div>
                <div className="flex flex-col gap-2 w-3/6">
                    {ratingCounts.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center gap-2">
                            <span className="w-4">{rating}</span>
                            <Star className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                            <Progress value={percentage} color="bg-[var(--color-primary)]" />
                            <span className="w-6 text-right text-sm text-[var(--text-muted)] ">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
