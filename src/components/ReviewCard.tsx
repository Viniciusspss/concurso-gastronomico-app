import { reviewCardType } from "@/types/review";
import StarRating from "./StarRating";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function ReviewCard(review: reviewCardType) {
    const firstName = review.review.user.first_name
    const lastName = review.review.user.last_name

    function stringToColor(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `hsl(${hash % 360}, 70%, 80%)`;
        return color;
    }

    const fullName = `${firstName} ${lastName}`;
    const bgColor = stringToColor(fullName);

    return (
        <div className="flex flex-col bg-[var(--color-background)] p-4 w-130 gap-6">
            <div className="flex justify-between text-[var(--text-primary)] text-2xl w-full">
                <div className="flex gap-2">
                    <Avatar>
                        <AvatarFallback className="text-sm"
                            style={{ backgroundColor: bgColor }}
                        >{firstName.split("")[0]}{lastName.split("")[0]}</AvatarFallback>
                    </Avatar>
                    <h2>{firstName}</h2>
                    <h2>{lastName}</h2>
                </div>
                <h2><StarRating value={review.review.rating} readOnly /></h2>
            </div>
            <h3 className="text-[var(--text-muted)]">{review.review.comment}</h3>
        </div>
    )
}