import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
    totalStars?: number;
    onChange?: (rating: number) => void;
    value?: number
    readOnly?: boolean
}

const StarRating: React.FC<StarRatingProps> = ({
    totalStars = 5,
    onChange,
    value,
    readOnly = false,
}) => {
    const [hovered, setHovered] = useState<number>(0);
    const [selected, setSelected] = useState<number>(value ?? 0);

    const handleMouseEnter = (index: number) => {
        if (!readOnly) setHovered(index);
    };

    const handleMouseLeave = () => {
        if (!readOnly) setHovered(0);
    };

    const handleClick = (index: number) => {
        if (!readOnly) {
            setSelected(index);
            onChange?.(index);
        }
    };

    const currentSelection = value ?? selected;
    const currentHovered = hovered;

    return (
        <div className="flex gap-1">
            {Array.from({ length: totalStars }, (_, i) => {
                const starIndex = i + 1;
                const isFilled = currentHovered >= starIndex || currentSelection >= starIndex;

                return (
                    <Star
                        key={starIndex}
                        className={`w-8 h-8 transition-colors ${isFilled ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "text-gray-300"} ${!readOnly ? "cursor-pointer" : "cursor-default"}`}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starIndex)}
                    />
                );
            })}
        </div>
    );
};


export default StarRating;
