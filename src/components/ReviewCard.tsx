import { reviewCardType } from "@/types/review";
import StarRating from "./StarRating";

export function ReviewCard(review: reviewCardType) {
    return (
        <div className="flex flex-col bg-[var(--color-background)] rounded-4xl border-1 p-4 shadow-2xl w-130 gap-6">
            <div className="flex justify-between text-[var(--text-primary)] text-2xl w-full">
                <div className="flex gap-2">
                    <h2>{review.review.user.first_name}</h2>
                    <h2>{review.review.user.last_name}</h2>
                </div>
                <h2><StarRating value={review.review.rating} readOnly /></h2>
            </div>
            <h3 className="text-[var(--text-muted)]">{review.review.comment}</h3>
        </div>
    )
}